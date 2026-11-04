import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 4173);
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
};

function resolveFile(requestUrl) {
  const pathname = decodeURIComponent(new URL(requestUrl, 'http://localhost').pathname);
  const relative = pathname === '/' ? 'index.html' : pathname.slice(1);
  const file = path.resolve(root, relative);
  return file.startsWith(root + path.sep) ? file : null;
}

function streamFile(response, file, start, end, status, headers) {
  let activeStream;
  let retries = 0;
  response.once('close', () => {
    if (!response.writableEnded) activeStream?.destroy();
  });

  const openStream = () => {
    activeStream = fs.createReadStream(file, { start, end });
    activeStream.once('open', () => {
      if (response.destroyed) return activeStream.destroy();
      response.writeHead(status, headers);
      activeStream.pipe(response);
    });
    activeStream.once('error', error => {
      if ((error.code === 'EMFILE' || error.code === 'ENFILE') && retries < 5 && !response.destroyed) {
        const delay = 100 * (2 ** retries++);
        setTimeout(openStream, delay);
        return;
      }
      if (!response.headersSent) {
        response.writeHead(503, {
          'Content-Type': 'text/plain; charset=utf-8',
          'Retry-After': '1',
        });
        response.end('Preview media temporarily unavailable');
      } else if (!response.destroyed) {
        response.destroy(error);
      }
    });
  };

  openStream();
}

const server = http.createServer((request, response) => {
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    response.end();
    return;
  }

  let file;
  try {
    file = resolveFile(request.url);
    if (!file || !fs.statSync(file).isFile()) throw new Error('Not found');
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }

  const stat = fs.statSync(file);
  const headers = {
    'Accept-Ranges': 'bytes',
    'Cache-Control': 'no-cache',
    'Content-Type': mime[path.extname(file).toLowerCase()] || 'application/octet-stream',
  };
  const range = request.headers.range;
  let start = 0;
  let end = stat.size - 1;

  if (range) {
    const match = /^bytes=(\d*)-(\d*)$/.exec(range);
    if (match) {
      if (match[1]) start = Number(match[1]);
      if (match[2]) end = Number(match[2]);
      if (!match[1]) start = Math.max(0, stat.size - Number(match[2]));
      if (start <= end && start < stat.size) {
        end = Math.min(end, stat.size - 1);
        headers['Content-Range'] = `bytes ${start}-${end}/${stat.size}`;
        headers['Content-Length'] = end - start + 1;
        if (request.method === 'GET') streamFile(response, file, start, end, 206, headers);
        else {
          response.writeHead(206, headers);
          response.end();
        }
        return;
      }
    }
  }

  headers['Content-Length'] = stat.size;
  if (request.method === 'GET') streamFile(response, file, start, end, 200, headers);
  else {
    response.writeHead(200, headers);
    response.end();
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Preview server running at http://127.0.0.1:${port}`);
});
