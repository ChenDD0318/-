const qs=(s,r=document)=>r.querySelector(s);const qsa=(s,r=document)=>[...r.querySelectorAll(s)];
const toast=qs('.toast');let toastTimer;
function showToast(message){toast.textContent=message;toast.classList.add('is-visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('is-visible'),2200)}
const wordmarkSrc='assets/brand/zealyn-wordmark.png';
const createWordmark=(variant='dark')=>{const image=document.createElement('img');image.className=`brand-wordmark brand-wordmark-inline brand-wordmark--${variant}`;image.src=wordmarkSrc;image.alt='Zealyn';return image};
const renderBrandText=(element,text,variant='dark')=>{if(!element)return;element.replaceChildren();text.split('Zealyn').forEach((part,index)=>{if(index)element.appendChild(createWordmark(variant));if(part)element.appendChild(document.createTextNode(part))})};
const zealynNavigation=['Zealyn Duo','Sonder','幕后','下载','支持'];
qsa('.global-links a').forEach((link,index)=>{if(zealynNavigation[index])link.textContent=zealynNavigation[index]});
const renameText=(selector,text,root=document)=>{const element=qs(selector,root);if(element)element.textContent=text};
qsa('.hero-download').forEach(link=>{const label=qs('span',link);if(label&&!qs('.os-icon',link))label.textContent=link.getAttribute('href')==='#sonder'?'探索 Sonder':'探索 Zealyn Duo'});
renameText('.footer-breadcrumb strong','官方创作平台');
const tourImage=qs('.tour-media img');if(tourImage)tourImage.alt='Zealyn 创作工作室主视觉';
const managedVideos=qsa('video');
const videoRetryCounts=new WeakMap();
const videoRetryTimers=new WeakMap();
const videoPositions=new WeakMap();
const playVideo=video=>{
  if(!video.isConnected)return;
  video.autoplay=true;
  video.muted=true;
  video.loop=true;
  video.playsInline=true;
  if(!video.paused&&!video.ended)return;
  video.play().catch(()=>scheduleVideoRetry(video,false));
};
function scheduleVideoRetry(video,reload){
  if(!video.isConnected||document.hidden||videoRetryTimers.has(video))return;
  const attempt=(videoRetryCounts.get(video)||0)+1;
  videoRetryCounts.set(video,attempt);
  const delay=Math.min(30000,750*Math.pow(2,Math.min(attempt-1,5)));
  const timer=window.setTimeout(()=>{
    videoRetryTimers.delete(video);
    if(reload){
      const currentPosition=Number.isFinite(video.currentTime)?video.currentTime:0;
      const position=currentPosition>0?currentPosition:(videoPositions.get(video)||0);
      videoPositions.set(video,position);
      video.addEventListener('loadedmetadata',()=>{
        const resumeAt=Math.min(position,Math.max(0,video.duration-.25));
        if(resumeAt>0)try{video.currentTime=resumeAt}catch{}
        playVideo(video);
      },{once:true});
      video.load();
      return;
    }
    playVideo(video);
  },delay);
  videoRetryTimers.set(video,timer);
}
managedVideos.forEach(video=>{
  video.autoplay=true;
  video.muted=true;
  video.loop=true;
  video.playsInline=true;
  video.preload='auto';
  video.addEventListener('playing',()=>videoRetryCounts.set(video,0));
  video.addEventListener('timeupdate',()=>videoPositions.set(video,video.currentTime));
  video.addEventListener('pause',()=>{
    if(!document.hidden) scheduleVideoRetry(video,false);
  });
  video.addEventListener('ended',()=>{
    try{video.currentTime=0}catch{}
    playVideo(video);
  });
  video.addEventListener('error',()=>scheduleVideoRetry(video,true));
  playVideo(video);
});
document.addEventListener('visibilitychange',()=>{
  if(document.hidden)return;
  managedVideos.forEach(playVideo);
});
qsa('.search-icon,.bag-icon').forEach(button=>button.addEventListener('click',()=>showToast(button.classList.contains('search-icon')?'搜索功能即将打开':'命令中心已打开')));
const mobileToggle=qs('.menu-toggle');
mobileToggle?.addEventListener('click',()=>{const open=mobileToggle.getAttribute('aria-expanded')==='true';mobileToggle.setAttribute('aria-expanded',String(!open));document.body.classList.toggle('menu-open',!open);if(!open)showToast('菜单已打开')});
const productMenu=qs('.product-menu');productMenu?.addEventListener('click',()=>{const open=productMenu.getAttribute('aria-expanded')==='true';productMenu.setAttribute('aria-expanded',String(!open));qs('.product-links').classList.toggle('mobile-visible',!open)});
const featureData={size:['Agent 协作','设定智能体角色和项目目标，连接文件、插件与 Canvas；让 Agent 将复杂任务拆成可逐步检查的工作计划。','assets/realistic-ads/feature-agent-real.jpg'],color:['Canvas 编排','把文本提示、图片、视频和声音素材加入画布，用节点标出输入、生成和后续处理之间的关系。','assets/zealyn-duo-generated/canvas-exhibition.png'],display:['图片创作','从文字描述或参考图开始生成视觉方案，并在同一创作流程中继续调整与编辑。','assets/zealyn-duo-generated/image-creation-studio.png'],connect:['视频创作','组合参考图、视频片段和音频素材，为项目生成动态画面，并把结果接入后续流程。','assets/zealyn-duo-generated/video-creation-gallery.png'],camera:['自动成片','导入素材文件夹后自动整理内容并生成时间线初稿，再继续检查和编辑成片顺序。','assets/realistic-ads/feature-auto-real.jpg'],audio:['旋律编译','输入情绪、风格或歌词生成可试听的声音，再将音频素材放进项目继续编排。','assets/realistic-ads/feature-melody-real.jpg'],durable:['提示词与资产','按项目集中管理常用提示词、图片、视频、音频和文件，需要时查找并再次调用。','assets/realistic-ads/feature-prompt-assets-real.jpg']};
const defaultFeature=['创作工作区','从 Agent 拆解任务、Canvas 编排素材，到生成内容和管理项目资产，各模块围绕同一条创作流程协作。','assets/realistic-ads/feature-main-real.jpg'];
const title=qs('#feature-title'),copy=qs('#feature-copy'),tour=qs('.tour');
let media=qs('.tour-media img');
let featureSwapToken=0;
const swapFeature=(data)=>{
  if(!title||!copy||!media)return;
  const token=++featureSwapToken;
  renderBrandText(title,data[0],'light');
  copy.textContent=data[1];
  media.classList.toggle('is-image-creation',data[0]==='图片创作');
  if(media.getAttribute('src')===data[2])return;

  qsa('.tour-media img.is-feature-outgoing').forEach(image=>image.remove());
  media.style.opacity='1';

  const nextImage=new Image();
  let imageHandled=false;
  const showImage=()=>{
    if(imageHandled||token!==featureSwapToken)return;
    imageHandled=true;
    const outgoing=media;
    const incoming=outgoing.cloneNode();
    incoming.src=data[2];
    incoming.classList.remove('is-feature-outgoing');
    incoming.style.opacity='0';
    incoming.style.transform='scale(1.035)';
    outgoing.classList.add('is-feature-outgoing');
    outgoing.parentElement.insertBefore(incoming,qs('.tour-close',outgoing.parentElement));
    media=incoming;
    requestAnimationFrame(()=>{
      outgoing.style.opacity='0';
      outgoing.style.transform='scale(1.015)';
      incoming.style.opacity='1';
      incoming.style.transform='scale(1.015)';
    });
    window.setTimeout(()=>{
      if(token===featureSwapToken)outgoing.remove();
    },560);
  };
  nextImage.onload=showImage;
  nextImage.onerror=showImage;
  nextImage.src=data[2];
  if(nextImage.complete&&nextImage.naturalWidth)showImage();
};
const resetFeatureTour=()=>{
  if(!tour)return;
  tour.classList.remove('is-feature-open');
  qsa('.tour-control',tour).forEach(item=>{
    item.classList.remove('is-active');
    item.setAttribute('aria-expanded','false');
  });
  swapFeature(defaultFeature);
};
qsa('.tour-control').forEach(btn=>{
  btn.setAttribute('aria-expanded','false');
  btn.addEventListener('click',()=>{
    qsa('.tour-control',tour||document).forEach(item=>{
      item.classList.remove('is-active');
      item.setAttribute('aria-expanded','false');
    });
    btn.classList.add('is-active');
    btn.setAttribute('aria-expanded','true');
    tour?.classList.add('is-feature-open');
    swapFeature(featureData[btn.dataset.feature]);
  });
});
// Delegate the close action from the tour itself so media pointer capture cannot swallow it.
tour?.addEventListener('click',event=>{
  const close=event.target.closest?.('.tour-close');
  if(!close||!tour.contains(close))return;
  event.preventDefault();
  event.stopPropagation();
  resetFeatureTour();
});
tour?.addEventListener('pointerdown',event=>{
  const close=event.target.closest?.('.tour-close');
  if(!close||!tour.contains(close))return;
  event.preventDefault();
  event.stopPropagation();
  resetFeatureTour();
},true);
tour?.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&tour.classList.contains('is-feature-open')){
    event.preventDefault();
    resetFeatureTour();
  }
});
qsa('a[href="#buy"],.model-card .buy-button').forEach(link=>link.addEventListener('click',e=>{if(link.classList.contains('product-buy')||link.closest('.hero-price')||link.closest('.model-card')){e.preventDefault();showToast('购买页面即将打开');setTimeout(()=>{if(link.closest('.hero-price'))qs('#buy')?.scrollIntoView({behavior:'smooth'});},300)}}));
qsa('a[href="#top"]').forEach(link=>link.addEventListener('click',e=>{e.preventDefault();window.scrollTo({top:0,behavior:'smooth'})}));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{entry.target.classList.toggle('in-view',entry.isIntersecting)}),{threshold:.22,rootMargin:'-5% 0px -8%'});
qsa('.hero-copy,.tour-intro,.tour-grid,.performance-heading,.performance-art,.cards-heading,.highlight-card,.model-card').forEach(el=>observer.observe(el));

// Horizontal gestures can switch feature panels; vertical wheel input stays
// available for ordinary page scrolling across the full-bleed preview.
const tourMedia=qs('.tour-media');
const tourControls=qsa('.tour-control');
if(tour&&tourMedia&&tourControls.length){
  let gestureStart=null;
  let gestureLock=false;
  const moveFeature=(step)=>{
    const active=Math.max(0,tourControls.findIndex(control=>control.classList.contains('is-active')));
    const next=(active+step+tourControls.length)%tourControls.length;
    tourControls[next]?.click();
  };
  tourMedia.addEventListener('pointerdown',event=>{
    if(event.pointerType==='mouse'&&event.button!==0)return;
    gestureStart={x:event.clientX,y:event.clientY};
    tourMedia.classList.add('is-swiping');
    tourMedia.setPointerCapture?.(event.pointerId);
  });
  tourMedia.addEventListener('pointerup',event=>{
    if(!gestureStart||gestureLock)return;
    const dx=event.clientX-gestureStart.x;
    const dy=event.clientY-gestureStart.y;
    gestureStart=null;
    tourMedia.classList.remove('is-swiping');
    const distance=Math.max(Math.abs(dx),Math.abs(dy));
    if(distance<42)return;
    gestureLock=true;
    moveFeature((Math.abs(dx)>Math.abs(dy)?dx:dy)<0?1:-1);
    window.setTimeout(()=>{gestureLock=false},520);
  });
  tourMedia.addEventListener('pointercancel',()=>{gestureStart=null;tourMedia.classList.remove('is-swiping')});
  const handleWheel=(event)=>{
    const delta=Math.abs(event.deltaX)>Math.abs(event.deltaY)?event.deltaX:event.deltaY;
    if(Math.abs(delta)<18||gestureLock)return;
    const horizontal= Math.abs(event.deltaX)>Math.abs(event.deltaY);
    if(!horizontal)return;
    event.preventDefault();
    gestureLock=true;
    moveFeature(delta>0?1:-1);
    window.setTimeout(()=>{gestureLock=false},560);
  };
  tour.addEventListener('wheel',handleWheel,{passive:false});
}

// Restored four-scene capability page. It keeps the original side-slide feel
// while also accepting trackpad swipes, touch drags, dots, and arrow keys.
const showcase=qs('.showcase');
const showcaseMedia=qs('.showcase-media',showcase||document);
const showcaseSlides=qsa('.showcase .slide');
const showcaseDots=qsa('.showcase-progress .progress-dot');
if(showcaseMedia&&showcaseSlides.length){
  let showcaseIndex=0;
  let showcaseTimer;
  let showcaseResumeTimer;
  let showcaseStart=null;
  let showcaseLock=false;
  let showcaseDragged=false;
  const setShowcaseSlide=(index)=>{
    showcaseIndex=(index+showcaseSlides.length)%showcaseSlides.length;
    showcaseSlides.forEach((slide,itemIndex)=>{
      const active=itemIndex===showcaseIndex;
      let offset=itemIndex-showcaseIndex;
      const half=showcaseSlides.length/2;
      if(offset>half)offset-=showcaseSlides.length;
      if(offset<-half)offset+=showcaseSlides.length;
      slide.classList.toggle('is-active',active);
      slide.classList.toggle('is-prev',offset===-1);
      slide.classList.toggle('is-next',offset===1);
      slide.classList.toggle('is-near',Math.abs(offset)===1);
      slide.setAttribute('aria-hidden',String(!active));
      slide.style.setProperty('--showcase-offset',String(offset));
    });
    showcaseDots.forEach((dot,itemIndex)=>{
      const active=itemIndex===showcaseIndex;
      dot.classList.toggle('is-active',active);
      dot.setAttribute('aria-current',String(active));
    });
  };
  const restartShowcase=()=>{
    clearInterval(showcaseTimer);
    showcaseTimer=window.setInterval(()=>setShowcaseSlide(showcaseIndex+1),5200);
  };
  const pauseShowcase=()=>{clearInterval(showcaseTimer);clearTimeout(showcaseResumeTimer)};
  const scheduleShowcaseResume=()=>{pauseShowcase();showcaseResumeTimer=window.setTimeout(restartShowcase,4800)};
  const stepShowcase=(step,manual=true)=>{setShowcaseSlide(showcaseIndex+step);if(manual)scheduleShowcaseResume()};
  showcaseDots.forEach(dot=>dot.addEventListener('click',()=>{setShowcaseSlide(Number(dot.dataset.slide)||0);scheduleShowcaseResume()}));
  showcaseMedia.addEventListener('pointerdown',event=>{
    if(event.pointerType==='mouse'&&event.button!==0)return;
    pauseShowcase();
    showcaseStart={x:event.clientX,y:event.clientY};
    showcaseMedia.classList.add('is-dragging');
    showcaseMedia.setPointerCapture?.(event.pointerId);
  });
  showcaseMedia.addEventListener('pointerup',event=>{
    if(!showcaseStart||showcaseLock)return;
    const dx=event.clientX-showcaseStart.x;
    const dy=event.clientY-showcaseStart.y;
    showcaseStart=null;
    showcaseMedia.classList.remove('is-dragging');
    if(Math.max(Math.abs(dx),Math.abs(dy))<44||Math.abs(dx)<=Math.abs(dy)){scheduleShowcaseResume();return;}
    showcaseDragged=true;
    window.setTimeout(()=>{showcaseDragged=false},520);
    showcaseLock=true;
    stepShowcase(dx<0?1:-1);
    window.setTimeout(()=>{showcaseLock=false},860);
  });
  showcaseMedia.addEventListener('pointercancel',()=>{showcaseStart=null;showcaseMedia.classList.remove('is-dragging');scheduleShowcaseResume()});
  showcaseMedia.addEventListener('wheel',event=>{
    const delta=Math.abs(event.deltaX)>Math.abs(event.deltaY)?event.deltaX:(event.shiftKey?event.deltaY:0);
    if(Math.abs(delta)<18||showcaseLock)return;
    event.preventDefault();
    pauseShowcase();
    showcaseLock=true;
    stepShowcase(delta>0?1:-1);
    window.setTimeout(()=>{showcaseLock=false},920);
  },{passive:false});
  showcaseMedia.addEventListener('keydown',event=>{
    if(event.key==='ArrowRight'){event.preventDefault();stepShowcase(1,true)}
    if(event.key==='ArrowLeft'){event.preventDefault();stepShowcase(-1,true)}
  });
  showcaseMedia.addEventListener('click',event=>{
    if(event.target.closest('button')||showcaseStart||showcaseDragged)return;
    stepShowcase(1);
  });
  setShowcaseSlide(0);
  restartShowcase();
}

// The restored middle page uses a single-card horizontal reel. It responds
// to trackpad swipes, touch drags, mouse drags, dots, and arrow keys.
const canvasReel=qs('.canvas-reel');
const canvasTrack=qs('.canvas-track');
const canvasSlides=qsa('.canvas-slide');
const canvasDots=qsa('.canvas-reel-dots button');
const canvasControls=qsa('.canvas-reel-controls button');
if(canvasReel&&canvasTrack&&canvasSlides.length){
  let canvasIndex=0;
  let canvasStart=null;
  let canvasGestureLock=false;
  const setCanvasSlide=(index)=>{
    canvasIndex=(index+canvasSlides.length)%canvasSlides.length;
    canvasTrack.style.transform=`translate3d(-${canvasIndex*100}%,0,0)`;
    canvasSlides.forEach((slide,i)=>slide.classList.toggle('is-active',i===canvasIndex));
    [...canvasDots,...canvasControls].forEach((dot,i)=>{const itemIndex=i%canvasSlides.length;dot.classList.toggle('is-active',itemIndex===canvasIndex);dot.setAttribute('aria-selected',String(itemIndex===canvasIndex))});
  };
  const stepCanvas=(step)=>setCanvasSlide(canvasIndex+step);
  canvasDots.forEach(dot=>dot.addEventListener('click',()=>setCanvasSlide(Number(dot.dataset.slide)||0)));
  canvasControls.forEach(control=>control.addEventListener('click',()=>setCanvasSlide(Number(control.dataset.slide)||0)));
  canvasReel.addEventListener('keydown',event=>{
    if(event.key==='ArrowRight'){event.preventDefault();stepCanvas(1)}
    if(event.key==='ArrowLeft'){event.preventDefault();stepCanvas(-1)}
  });
  canvasReel.addEventListener('pointerdown',event=>{
    if(event.pointerType==='mouse'&&event.button!==0)return;
    canvasStart={x:event.clientX,y:event.clientY};
    canvasReel.setPointerCapture?.(event.pointerId);
  });
  canvasReel.addEventListener('pointerup',event=>{
    if(!canvasStart||canvasGestureLock)return;
    const dx=event.clientX-canvasStart.x;
    const dy=event.clientY-canvasStart.y;
    canvasStart=null;
    if(Math.max(Math.abs(dx),Math.abs(dy))<44||Math.abs(dx)<=Math.abs(dy))return;
    canvasGestureLock=true;
    stepCanvas(dx<0?1:-1);
    window.setTimeout(()=>{canvasGestureLock=false},860);
  });
  canvasReel.addEventListener('pointercancel',()=>{canvasStart=null});
  canvasReel.addEventListener('wheel',event=>{
    if(Math.abs(event.deltaX)<=Math.abs(event.deltaY)||canvasGestureLock)return;
    event.preventDefault();
    canvasGestureLock=true;
    stepCanvas(event.deltaX>0?1:-1);
    window.setTimeout(()=>{canvasGestureLock=false},920);
  },{passive:false});
}

const scrollStory=qs('.scroll-story');
const scrollStoryVideo=qs('.scroll-story-video');
if(scrollStory&&scrollStoryVideo){
  let scrollStoryFrame=0;
  const clamp=(value,min=0,max=1)=>Math.min(max,Math.max(min,value));
  const updateScrollStory=()=>{
    scrollStoryFrame=0;
    const bounds=scrollStory.getBoundingClientRect();
    const travel=Math.max(1,scrollStory.offsetHeight-window.innerHeight);
    const progress=clamp(-bounds.top/travel);
    const reveal=clamp((progress-.1)/.3);
    const orbit=clamp((progress-.38)/.46);
    const radius=110+(orbit*clamp(window.innerWidth*.12,90,170));
    scrollStory.style.setProperty('--story-progress',progress.toFixed(4));
    scrollStory.style.setProperty('--story-reveal',reveal.toFixed(4));
    scrollStory.style.setProperty('--story-orbit',orbit.toFixed(4));
    scrollStory.style.setProperty('--story-radius',`${radius.toFixed(1)}px`);
    scrollStory.style.setProperty('--story-radius-negative',`${(-radius).toFixed(1)}px`);
    scrollStory.style.setProperty('--story-video-opacity',(1-(progress*.34)).toFixed(4));
    scrollStory.style.setProperty('--story-video-scale',(1.06-(progress*.06)).toFixed(4));
    scrollStory.style.setProperty('--story-wash',(0.14+(progress*.42)).toFixed(4));
    scrollStory.style.setProperty('--story-reveal-opacity',reveal.toFixed(4));
    scrollStory.style.setProperty('--story-reveal-scale',(0.72+(reveal*.28)).toFixed(4));
    scrollStory.style.setProperty('--story-orbit-opacity',(orbit*.95).toFixed(4));
    scrollStory.style.setProperty('--story-orbit-scale',(0.72+(orbit*.28)).toFixed(4));
    scrollStory.style.setProperty('--story-ring-opacity',(orbit*.8).toFixed(4));
    scrollStory.style.setProperty('--story-ring-scale',(0.58+(orbit*.42)).toFixed(4));
    scrollStory.style.setProperty('--story-rotation',`${(progress*72).toFixed(2)}deg`);
    scrollStory.style.setProperty('--story-caption-opacity',(reveal*.86).toFixed(4));
    scrollStory.style.setProperty('--story-caption-y',`${((1-reveal)*16).toFixed(1)}px`);
    scrollStory.style.setProperty('--story-meter-width',`${(progress*100).toFixed(2)}%`);
  };
  const queueScrollStory=()=>{if(scrollStoryFrame)return;scrollStoryFrame=window.requestAnimationFrame(updateScrollStory)};
  window.addEventListener('scroll',queueScrollStory,{passive:true});
  window.addEventListener('resize',queueScrollStory,{passive:true});
  updateScrollStory();
}

// Render every visible Zealyn brand name with the supplied wordmark asset.
const applyBrandWordmarks=()=>{
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  const nodes=[];
  let node;
  while(node=walker.nextNode())nodes.push(node);
  nodes.forEach(textNode=>{
    if(!textNode.nodeValue.includes('Zealyn'))return;
    const parent=textNode.parentElement;
    if(!parent||parent.closest('script,style,[data-brand-wordmark-ignore]'))return;
    const variant=parent.closest('.global-header,.product-nav,.zealyn-hero,.showcase,.scroll-story,.tour,.cards-section,.performance-overlay,.band-dark,.zx-craft,.zx-download,.site-footer')?'light':'dark';
    renderBrandText(parent,textNode.nodeValue,variant);
  });
};
applyBrandWordmarks();
/* ============================================================
   Zealyn 体验层：滚动渐入 · 粒子场 · 视差 · 微交互
   ============================================================ */

/* ---------- 1. 滚动渐入：全站元素进入视口时淡入上浮 ---------- */
(() => {
  const revealTargets = qsa('.zx-reveal');
  // 旧板块没有 .zx-reveal 标记时，自动为其主要内容补上渐入
  const autoTargets = qsa('.tour-control, .tour-media, .showcase-caption, .showcase-progress, .scroll-story-content, .footer-columns > div, .footer-breadcrumb');
  const targets = [...new Set([...revealTargets, ...autoTargets])];
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    targets.forEach(el => el.classList.add('is-revealed'));
  } else {
    const io = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        // 同组元素错峰浮现，形成呼吸节奏
        const siblings = el.parentElement ? [...el.parentElement.children].filter(c => c.classList.contains('zx-reveal') || c === el) : [el];
        const order = Math.max(0, siblings.indexOf(el));
        el.style.transitionDelay = Math.min(order * 90, 450) + 'ms';
        el.classList.add('is-revealed');
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    targets.forEach(el => { el.classList.add('zx-reveal'); io.observe(el); });
  }
})();

/* ---------- 2. 轻盈粒子场：Canvas 2D 漂浮微粒，随滚动缓慢漂移 ---------- */
(() => {
  const host = qs('.zx-particles');
  if (!host || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const canvas = document.createElement('canvas');
  host.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let w = 0, h = 0, dpr = Math.min(devicePixelRatio || 1, 2);
  let particles = [];
  let scrollDrift = 0, lastScroll = scrollY, raf = null, visible = true;

  const COUNT = () => Math.min(90, Math.round(innerWidth / 16));
  const make = () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: .6 + Math.random() * 1.9,
    vx: (Math.random() - .5) * .12,
    vy: -.04 - Math.random() * .1,
    hue: 215 + Math.random() * 70,          // 蓝到紫
    alpha: .12 + Math.random() * .3,
    pulse: Math.random() * Math.PI * 2,
  });
  const resize = () => {
    w = innerWidth; h = innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    particles = Array.from({ length: COUNT() }, make);
  };
  const tick = t => {
    ctx.clearRect(0, 0, w, h);
    scrollDrift += (scrollY - lastScroll) * .06;
    lastScroll = scrollY;
    scrollDrift *= .92;
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy + scrollDrift * .1;
      p.pulse += .015;
      if (p.y < -12) { p.y = h + 12; p.x = Math.random() * w; }
      if (p.y > h + 12) p.y = -12;
      if (p.x < -12) p.x = w + 12;
      if (p.x > w + 12) p.x = -12;
      const glow = p.alpha + Math.sin(p.pulse) * .08;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 85%, 72%, ${Math.max(0, glow)})`;
      ctx.fill();
    }
    raf = requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !raf) raf = requestAnimationFrame(tick);
    if (!visible && raf) { cancelAnimationFrame(raf); raf = null; }
  });
  io.observe(host);
  addEventListener('resize', resize, { passive: true });
  resize();
})();

/* ---------- 3. Hero 视差：滚动时文案轻轻上浮、视频微微推进 ---------- */
(() => {
  const hero = qs('.zealyn-hero');
  const copy = qs('.hero-copy', hero || document);
  const video = qs('.hero-video', hero || document);
  if (!hero || !copy || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let ticking = false;
  const update = () => {
    ticking = false;
    const y = scrollY;
    const limit = hero.offsetHeight || innerHeight;
    const p = Math.min(1, Math.max(0, y / limit));
    copy.style.transform = `translateY(${y * .28}px)`;
    copy.style.opacity = String(Math.max(0, 1 - p * 1.25));
    if (video) video.style.transform = `scale(${1 + p * .08}) translateY(${y * .12}px)`;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
})();

/* ---------- 4. 卡片磁性倾斜：duo-card / band-tile / highlight-card 随指针微倾 ---------- */
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || matchMedia('(hover: none)').matches) return;
  const tilt = (card, strength = 5) => {
    let raf = null;
    card.addEventListener('pointermove', e => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - .5;
        const py = (e.clientY - r.top) / r.height - .5;
        card.style.transform = `perspective(900px) rotateX(${(-py * strength).toFixed(2)}deg) rotateY(${(px * strength).toFixed(2)}deg) translateY(-6px)`;
      });
    });
    card.addEventListener('pointerleave', () => {
      if (raf) cancelAnimationFrame(raf), raf = null;
      card.style.transform = '';
    });
  };
  qsa('.duo-card').forEach(c => tilt(c, 3.5));
  qsa('.band-tile').forEach(c => tilt(c, 6));
  qsa('.highlight-card').forEach(c => tilt(c, 4));
})();

/* ---------- 5. 下载按钮反馈：点击后给出弹性提示 ---------- */
qsa('.dl-card .hero-download').forEach(link => link.addEventListener('click', e => {
  e.preventDefault();
  const card = link.closest('.dl-card');
  const name = card?.classList.contains('dl-sonder') ? 'Sonder' : 'Zealyn Duo';
  const os = link.textContent.includes('macOS') ? 'macOS' : 'Windows';
  showToast(`${name} ${os} 版即将开放下载`);
  link.classList.remove('zx-pop');
  void link.offsetWidth;
  link.classList.add('zx-pop');
}));

/* ============================================================
   艺术化交互层
   指挥棒光标 · 键盘画廊 · 磁吸按钮 · 板块进度点
   ============================================================ */

/* ---------- 1. 指挥棒光标（mix-blend difference，全场合适配） ---------- */
(() => {
  if (matchMedia('(hover: none), (pointer: coarse)').matches) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const baton = document.createElement('div');
  baton.className = 'zx-baton';
  baton.setAttribute('aria-hidden', 'true');
  document.body.appendChild(baton);
  let bx = innerWidth / 2, by = innerHeight / 2, tx = bx, ty = by, live = false;
  addEventListener('pointermove', e => {
    tx = e.clientX; ty = e.clientY;
    if (!live) { live = true; baton.classList.add('is-live'); bx = tx; by = ty; }
    const hit = e.target.closest('a,button,.duo-card,.band-tile,.highlight-card,.tour-control,[role="button"]');
    baton.classList.toggle('is-hover', !!hit);
  }, { passive: true });
  document.addEventListener('mouseleave', () => { live = false; baton.classList.remove('is-live'); });
  (function loop() {
    bx += (tx - bx) * .16;
    by += (ty - by) * .16;
    baton.style.left = bx + 'px';
    baton.style.top = by + 'px';
    requestAnimationFrame(loop);
  })();
})();

/* ---------- 2. 键盘画廊：↑ ↓ 或 J / K 在板块间跳跃 ---------- */
(() => {
  const sections = qsa('main#top > section[id]');
  if (sections.length < 2) return;
  const hint = document.createElement('div');
  hint.className = 'zx-keys-hint';
  hint.innerHTML = '<kbd>↑</kbd><kbd>↓</kbd><span>在板块之间漫游</span>';
  document.body.appendChild(hint);
  const goTo = dir => {
    const y = scrollY + 2;
    const tops = sections.map(s => s.offsetTop);
    let target;
    if (dir > 0) target = tops.find(t => t > y) ?? tops[tops.length - 1];
    else target = [...tops].reverse().find(t => t < y - 2) ?? 0;
    window.scrollTo({ top: target - 60, behavior: 'smooth' });
  };
  addEventListener('keydown', e => {
    if (e.target.matches('input,textarea,[contenteditable]')) return;
    if (e.key === 'ArrowDown' || e.key === 'j') { e.preventDefault(); goTo(1); }
    if (e.key === 'ArrowUp' || e.key === 'k') { e.preventDefault(); goTo(-1); }
  });
  // 首次滚动后淡出提示
  let shown = false;
  const showHint = () => {
    if (shown || scrollY < innerHeight * .3) return;
    shown = true;
    hint.classList.add('is-live');
    setTimeout(() => hint.classList.remove('is-live'), 3800);
    removeEventListener('scroll', showHint);
  };
  addEventListener('scroll', showHint, { passive: true });
})();

/* ---------- 3. 磁吸按钮：靠近指针时轻轻被吸引 ---------- */
(() => {
  if (matchMedia('(hover: none), (pointer: coarse)').matches) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  qsa('.pill, .zealyn-hero .hero-download, .dl-card .hero-download').forEach(el => {
    const strength = 16;
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${(dx / r.width) * strength}px, ${(dy / r.height) * strength * .6}px)`;
    });
    el.addEventListener('pointerleave', () => {
      el.style.transition = 'transform .55s cubic-bezier(.22,1.4,.36,1)';
      el.style.transform = '';
      setTimeout(() => (el.style.transition = ''), 560);
    });
  });
})();

/* ---------- 4. 板块进度点：右侧小圆点，点击直达 ---------- */
(() => {
  const sections = qsa('main#top > section[id]');
  if (sections.length < 3 || innerWidth < 861) return;
  const labels = {
    overview: '开篇', ecosystem: '两大应用', duo: 'Zealyn Duo',
    features: '能力导览', sonder: 'Sonder', craft: '幕后', download: '下载'
  };
  const rail = document.createElement('nav');
  rail.className = 'zx-rail';
  rail.setAttribute('aria-label', '板块导航');
  rail.innerHTML = sections.map(s => `<a href="#${s.id}" data-label="${labels[s.id] || s.id}" aria-label="前往 ${labels[s.id] || s.id}"></a>`).join('');
  document.body.appendChild(rail);
  const dots = qsa('a', rail);
  const lightSections = new Set(['ecosystem', 'sonder', 'features']);
  const onScroll = () => {
    const mid = scrollY + innerHeight / 2;
    let active = 0;
    sections.forEach((s, i) => { if (s.offsetTop <= mid) active = i; });
    dots.forEach((d, i) => d.classList.toggle('is-active', i === active));
    rail.classList.toggle('on-light', lightSections.has(sections[active].id));
    document.body.classList.toggle('zx-rail-on', scrollY > innerHeight * .4);
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ---------- 5. 七模块概览态文案：返回概览后恢复完整标题 ---------- */
(() => {
  const tour = qs('.zx-modules .tour') || qs('.tour');
  if (!tour) return;
  const title = qs('#feature-title');
  const copy = qs('#feature-copy');
  if (!title || !copy) return;
  const HOME = ['一个工作区，装下整个流程', '从任务拆解、素材编排到生成与交付——Duo 的每个模块，都是画布上的一块拼图。'];
  new MutationObserver(() => {
    if (!tour.classList.contains('is-feature-open')) {
      title.textContent = HOME[0];
      copy.textContent = HOME[1];
    }
  }).observe(tour, { attributes: true, attributeFilter: ['class'] });
})();
