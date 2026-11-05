const qs=(s,r=document)=>r.querySelector(s);const qsa=(s,r=document)=>[...r.querySelectorAll(s)];
const toast=qs('.toast');let toastTimer;
function showToast(message){toast.textContent=message;toast.classList.add('is-visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('is-visible'),2200)}
const wordmarkSrc='assets/brand/zealyn-wordmark.png';
const createWordmark=(variant='dark')=>{const image=document.createElement('img');image.className=`brand-wordmark brand-wordmark-inline brand-wordmark--${variant}`;image.src=wordmarkSrc;image.alt='Zealyn';return image};
const renderBrandText=(element,text,variant='dark')=>{if(!element)return;element.replaceChildren();text.split('Zealyn').forEach((part,index)=>{if(index)element.appendChild(createWordmark(variant));if(part)element.appendChild(document.createTextNode(part))})};
const zealynNavigation=['Zealyn Duo','智能体','画布','Sonder','图片创作','声音','资源','案例','支持'];
qsa('.global-links a').forEach((link,index)=>{if(zealynNavigation[index])link.textContent=zealynNavigation[index]});
const renameText=(selector,text,root=document)=>{const element=qs(selector,root);if(element)element.textContent=text};
renameText('.hero-kicker','一套生态，两款应用，覆盖创作的每一步');
renameText('.hero-subtitle','Zealyn Duo 负责思考与编排——Agent 拆解任务，Canvas 连接素材；Sonder 专注生成与打磨——图片、视频、音乐与声音。从目标到成片，都在同一生态里完成。');
qsa('.hero-download').forEach(link=>{const label=qs('span',link);if(label&&!qs('.os-icon',link))label.textContent=link.getAttribute('href')==='#sonder'?'探索 Sonder':'探索 Zealyn Duo'});
renameText('.tour-intro .eyebrow','七个模块，连接一条流程');
renameText('.tour-title','一个工作区，完成从策划到交付');
const tourLede=qs('.tour-lede');if(tourLede)tourLede.textContent='Agent 负责拆解目标，Canvas 组织提示词与媒体素材；图片、视频、声音和自动成片模块接续处理，常用资产可在项目中集中管理。';
renameText('.performance .eyebrow','一套生态，两款应用');
const performanceTitle=qs('.performance h2');if(performanceTitle?.firstChild)performanceTitle.firstChild.textContent='从任务拆解';
renameText('.performance h2 em','到素材生成与交付');
const performanceCopy=qs('.performance-heading>p:last-child');if(performanceCopy)performanceCopy.textContent='把项目目标交给 Agent 拆解，在 Canvas 中连接文本、图片、视频和声音模块。保存当前进度，后续可以继续编辑、复用已有素材并推进交付。';
renameText('.performance-overlay strong','同一项目，接续每一步');
const performanceOverlay=qs('.performance-overlay span');if(performanceOverlay)performanceOverlay.textContent='任务、素材和生成结果沿着工作流向下传递。';
qsa('.stat-row strong').forEach((stat,index)=>{stat.textContent=['2','7','4'][index]||stat.textContent});
qsa('.stat-row span').forEach((label,index)=>{label.textContent=['款创作应用：Duo 与 Sonder','项创作模块','类媒体素材'][index]||label.textContent});
const cardsTitle=qs('.cards-section h2');if(cardsTitle?.firstChild)cardsTitle.firstChild.textContent='从输入素材，';
renameText('.cards-section h2 em','到持续产出。');
const highlightCopy=[
  ['Canvas 编排','把提示词、图片、视频和声音放在同一画布，用节点连接素材与生成步骤，整理成可以继续运行的流程。'],
  ['Agent 与自动成片','先让 Agent 将目标拆成清晰步骤，再导入素材文件夹生成时间线初稿，减少重复整理与剪辑准备。'],
  ['提示词与项目资产','将常用提示词和项目中的图片、视频、音频集中管理；开始新任务时可以查找并再次调用。'],
  ['模型与数据管理','查看项目使用的模型服务、同步方式和文件存放位置，让创作数据的去向清楚可查。']
];
qsa('.highlight-card').forEach((card,index)=>{
  const heading=qs('h3',card);const paragraph=qs('p',card);
  if(highlightCopy[index]){if(heading)heading.innerHTML=highlightCopy[index][0];if(paragraph)paragraph.textContent=highlightCopy[index][1]}
});
const highlightImages=qsa('.highlight-card img');
if(highlightImages[0])highlightImages[0].alt='真实创作工作室中的 Zealyn 画布工作场景';
if(highlightImages[1])highlightImages[1].alt='团队在真实工作空间中协作使用 Zealyn';
if(highlightImages[2])highlightImages[2].alt='创作团队在笔记本电脑上整理提示词与素材';
if(highlightImages[3])highlightImages[3].alt='真实创作空间中的本地工作环境';
const footerBreadcrumb=qsa('.footer-breadcrumb span');if(footerBreadcrumb[1])footerBreadcrumb[1].textContent='Zealyn 创作平台';
const footerLogo=qs('.footer-breadcrumb img');if(footerLogo){footerLogo.src=wordmarkSrc;footerLogo.classList.add('footer-wordmark');footerLogo.alt='Zealyn';}
renameText('.footer-breadcrumb strong','官方创作平台');
qsa('.footer-columns h4').forEach((heading,index)=>{heading.textContent=['了解 Zealyn','客户支持','关于 Zealyn'][index]||heading.textContent});
qsa('.footer-columns a').forEach((link,index)=>{const labels=['概览','核心能力','工作流','功能支持','客户方案','系统状态','品牌故事','隐私与数据','安全与责任'];if(labels[index])link.textContent=labels[index]});
const footerDownload=qs('.footer-download>span');if(footerDownload)footerDownload.textContent='下载 Zealyn 创作应用';
const footerBottom=qs('.footer-bottom span');if(footerBottom)footerBottom.textContent='Copyright © 2026 Zealyn 保留所有权利。';
qsa('.product-links a').forEach((link,index)=>{link.textContent=['概览','Zealyn Duo','Sonder','立即体验'][index]||link.textContent});
const capabilityContent=[
  ['Agent 智能体','先写清要完成的事，再为 Agent 指定角色、连接项目文件与工具。它会把目标拆成可执行步骤，逐项推进；你可以随时查看计划、补充要求，再决定如何继续。'],
  ['Canvas 无限画布','提示词、参考图片、视频片段和声音素材可以放进同一张画布。把输入连接到生成步骤，清楚看到素材从哪里来、结果接到哪里；改动一个环节，也能沿着原流程继续创作。'],
  ['工作流持续运行','在同一项目里衔接任务、素材与生成结果。把 Agent 整理出的步骤交给 Canvas，再接入图片、视频、声音或自动成片；保存进度后回到项目，沿用已有内容继续处理。'],
  ['旋律编译','从情绪、音乐风格或歌词开始生成声音。先试听不同方向，再挑选合适的音频放回项目，与画面和视频素材一起编排，让配乐探索和视觉创作在同一条流程里衔接。']
];
qsa('.showcase-progress .progress-dot').forEach((dot,index)=>{dot.setAttribute('aria-label',`第 ${index+1} 张：${capabilityContent[index]?.[0]||'核心能力'}`)});
const showcaseMediaLabel=qs('.showcase-media');if(showcaseMediaLabel)showcaseMediaLabel.setAttribute('aria-label','左右滑动浏览 Zealyn 核心能力');
qsa('.scroll-story-orbit').forEach((label,index)=>{label.textContent=['Agent 拆解','Canvas 编排','图片生成','视频与声音','导出交付'][index]||label.textContent});
renameText('.scroll-story-kicker','双应用协作流');
renameText('.scroll-story-caption','在 Duo 里把目标拆成步骤、把素材连成流程；在 Sonder 里生成图片、视频与声音。产出回到画布继续编排，直到成为可以交付的作品。');
const scrollStorySection=qs('.scroll-story');if(scrollStorySection)scrollStorySection.setAttribute('aria-label','Zealyn 双应用协作流');
const tourLabels=['Agent 协作','Canvas 编排','图片创作','视频创作','自动成片','旋律编译','提示词与资产'];
const tourDetails=['设定角色与目标，再连接文件、插件和 Canvas，让 Agent 按步骤处理任务。','把提示词、图片、视频和声音放在画布上，用节点连接创作步骤。','输入文字并加入参考图，生成视觉方向后继续调整与编辑。','组合参考图、视频片段与音频，为画面补充动态表达。','导入素材文件夹，自动整理素材并生成可继续编辑的时间线初稿。','输入情绪、风格或歌词，生成声音并试听，再加入项目使用。','集中归档常用提示词、图片、视频、音频和项目文件，方便后续调用。'];
qsa('.tour-control').forEach((control,index)=>{if(tourLabels[index]){renameText('.control-label',tourLabels[index],control);renameText('.control-detail',tourDetails[index],control)}});
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
qsa('.product-links a,.global-links a,.product-menu').forEach(link=>link.addEventListener('click',()=>{document.body.classList.remove('menu-open')}));
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
    const variant=parent.closest('.global-header,.product-nav,.zealyn-hero,.showcase,.scroll-story,.tour,.cards-section,.performance-overlay')?'light':'dark';
    renderBrandText(parent,textNode.nodeValue,variant);
  });
};
applyBrandWordmarks();
