# Zealyn Website Transfer Package

This folder is the current runnable Zealyn website.

## Run locally

1. Install Node.js LTS on the new computer.
2. Open a terminal in this folder.
3. Run `node server.mjs`.
4. Open `http://127.0.0.1:4173/`.

The project has no external npm dependencies. `index.html`, `styles.css`,
`styles-overrides.css`, `script.js`, `server.mjs`, and `assets/` are the
working website files. Keep the relative folder structure unchanged.

## Continue the design with GPT/Codex

Open this folder as the project, then send:

> 这是 Zealyn 当前官方网站项目。请先阅读 index.html、styles.css、styles-overrides.css、script.js 和 ZEALYN_TRANSFER_README.md，再基于现有内容继续修改。不要删除已有视频和图片资源。修改后运行 node server.mjs，在 http://127.0.0.1:4173/ 实际检查桌面端和移动端，并告诉我新的预览地址。

For visual changes, include the exact target section, desired behavior,
desktop/mobile requirements, and whether existing interactions should stay.

## Main sections

- `#overview`: homepage video hero
- `#capabilities`: interactive side-slide capability cards
- `#canvas-showcase`: scroll-driven Zealyn capability story
- `#features`: Zealyn Studio feature tour
- `#mac`: Zealyn Engine performance section
- `#compare`: capability highlights
- `#support`: footer and support links

## Optional public preview

The local server must be running before creating a temporary tunnel. A tunnel
URL is temporary and should be regenerated on the new computer when needed.
