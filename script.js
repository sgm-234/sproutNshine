
// ════════════════════════════════════════
//  BUDDY APP (accepts any document context)
// ════════════════════════════════════════
function initBuddy(d) {
  // All buddy logic scoped to document d (either main or PiP)
  
  
  // ═══ SPLASH — 7 seconds ═══
  (function(){
    const DURATION=7000;
    const fill=d.getElementById('splashFill');
    const label=d.getElementById('splashLabel');
    const msgs=[[0,'SPROUTING...'],[1500,'WARMING UP ☀️'],[3200,'GATHERING SUNSHINE...'],[5000,'ALMOST READY 🌿'],[6200,'HERE WE GO! ✦']];
    let mi=0; const t0=performance.now();
    function tick(now){
      const el=now-t0;
      fill.style.width=Math.min(el/DURATION*100,100)+'%';
      while(mi<msgs.length-1&&el>=msgs[mi+1][0])mi++;
      label.textContent=msgs[mi][1];
      if(el<DURATION){requestAnimationFrame(tick);}
      else{
        const s=d.getElementById('screenSplash');
        s.style.transition='opacity .5s,transform .5s';
        s.style.opacity='0';s.style.transform='scale(1.03)';
        setTimeout(()=>{s.classList.remove('active');s.style.cssText='';loadProfile();},520);
      }
    }
    requestAnimationFrame(tick);
  })();
  
  // ═══ PIXEL RENDERER ═══
  function px(rows,pal,s=4){
    const h=rows.length,w=Math.max(...rows.map(r=>r.length));let out='';
    for(let y=0;y<h;y++)for(let x=0;x<w;x++){const c=rows[y][x]||'.';if(c==='.'||c===' ')continue;const f=pal[c];if(!f)continue;out+=`<rect x="${x*s}" y="${y*s}" width="${s}" height="${s}" fill="${f}"/>`;}
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${w*s}" height="${h*s}" shape-rendering="crispEdges" style="image-rendering:pixelated;display:block">${out}</svg>`;
  }
  
  // ═══ SPRITES ═══
  const sprites={
  avocado:{pal:{'K':'#1a2e00','G':'#3a7a10','g':'#5faa20','L':'#90d838','l':'#bef060','B':'#7a4a10','b':'#b07828','y':'#e8cc70','W':'#ffffff','P':'#f4c8a8','T':'#5a3008'},frames:{idle0:['................','.....KTTTTK.....','....KGLlLLGK....','...KGLLllLGGK...','..KGLLllLLGGGK..','..KGLlKBBBKlGGK.','.KGGLKBbbbBKLGGK','.KGGLKBbyyBKLGGK','.KGGLKBbyyBKLGGK','.KGGLKBbbbBKLGGK','.KGGGKBBBBBKGGGK','.KGGGWWGGGWWGGGK','.KGGGWWGGGWWGGGK','.KGGGGGGGGGGGGK.','.KGGPGGGGGGPGGK.','.KGGGGGGGGGGGGK.','..KGGGGGGGGGKK..','...KKKK..KKKK...','..KKK......KKK..','................'],idle1:['................','.....KTTTTK.....','....KGLlLLGK....','...KGLLllLGGK...','..KGLLllLLGGGK..','..KGLlKBBBKlGGK.','.KGGLKBbbbBKLGGK','.KGGLKBbyyBKLGGK','.KGGLKBbyyBKLGGK','.KGGLKBbbbBKLGGK','.KGGGKBBBBBKGGGK','.KGGGKKGGGKKGGGK','.KGGGGGGGGGGGGK.','.KGGGGGGGGGGGGK.','.KGGPGGGGGGPGGK.','.KGGKWWWWWWKGGK.','..KGGGGGGGGGKK..','...KKKK..KKKK...','..KKK......KKK..','................'],walk0:['................','.....KTTTTK.....','....KGLlLLGK....','...KGLLllLGGK...','..KGLLllLLGGGK..','..KGLlKBBBKlGGK.','.KGGLKBbbbBKLGGK','.KGGLKBbyyBKLGGK','.KGGLKBbyyBKLGGK','.KGGLKBbbbBKLGGK','.KGGGKBBBBBKGGGK','.KGGGWWGGGWWGGGK','.KGGGWWGGGWWGGGK','.KGGGGGGGGGGGGK.','.KGGPGGGGGGPGGK.','.KGGGGGGGGGGGGK.','..KGGGGGGGGGKK..','....KKKK.KKKK...','...KKK.....KKK..','..KK.........KK.'],walk1:['................','.....KTTTTK.....','....KGLlLLGK....','...KGLLllLGGK...','..KGLLllLLGGGK..','..KGLlKBBBKlGGK.','.KGGLKBbbbBKLGGK','.KGGLKBbyyBKLGGK','.KGGLKBbyyBKLGGK','.KGGLKBbbbBKLGGK','.KGGGKBBBBBKGGGK','.KGGGWWGGGWWGGGK','.KGGGWWGGGWWGGGK','.KGGGGGGGGGGGGK.','.KGGPGGGGGGPGGK.','.KGGGGGGGGGGGGK.','..KGGGGGGGGGKK..','....KKKK.KKKK...','.KKK.......KKKK.','KK...........KK.'],doze0:['................','.....KTTTTK.....','....KGLlLLGK....','...KGLLllLGGK...','..KGLLllLLGGGK..','..KGLlKBBBKlGGK.','.KGGLKBbbbBKLGGK','.KGGLKBbyyBKLGGK','.KGGLKBbyyBKLGGK','.KGGLKBbbbBKLGGK','.KGGGKBBBBBKGGGK','.KGGGKKGGGKKGGGK','.KGGGGGGGGGGGGK.','.KGGGGGGGGGGGGK.','.KGGGGGGGGGGGGK.','.KGGGGGGGGGGGGK.','..KGGGGGGGGGKK..','...KKKK..KKKK...','..KKK......KKK..','................']}},
  watermelon:{pal:{'K':'#1a0a0a','R':'#e03030','r':'#f06060','L':'#f89898','l':'#ffc0c0','G':'#2a8020','g':'#50b830','W':'#ffffff','S':'#1a1a1a','P':'#f8b8b8'},frames:{idle0:['................','................','.....KGGGGGK....','....KGgggggGK...','...KGgRRRRRrGK..','..KGgRLlRRRrRGK.','.KGgRLllRSRrRRGK','.KGgRLlRRSRRRRGK','.KGgRRRRSRSRRRGK','.KGgRRRRRRRRRRGK','.KGgRRWWRRWWRRGK','.KGgRRWWRRWWRRGK','.KGgRRRRRRRRRRGK','.KGgRRPRRRPRRRGK','.KGgRRRRRRRRRRGK','..KGGGRRRRRRGGk.','...KKKKKKKKKK...','....KKK..KKK....','...KK......KK...','................'],idle1:['................','................','.....KGGGGGK....','....KGgggggGK...','...KGgRRRRRrGK..','..KGgRLlRRRrRGK.','.KGgRLllRSRrRRGK','.KGgRLlRRSRRRRGK','.KGgRRRRSRSRRRGK','.KGgRRRRRRRRRRGK','.KGgRRKKRRKKRRGK','.KGgRRRRRRRRRRGK','.KGgRRRRRRRRRRGK','.KGgRRPRRRPRRRGK','.KGgRKWWWWWKRRGK','..KGGGRRRRRRGGk.','...KKKKKKKKKK...','....KKK..KKK....','...KK......KK...','................'],walk0:['................','................','.....KGGGGGK....','....KGgggggGK...','...KGgRRRRRrGK..','..KGgRLlRRRrRGK.','.KGgRLllRSRrRRGK','.KGgRLlRRSRRRRGK','.KGgRRRRSRSRRRGK','.KGgRRRRRRRRRRGK','.KGgRRWWRRWWRRGK','.KGgRRWWRRWWRRGK','.KGgRRRRRRRRRRGK','.KGgRRPRRRPRRRGK','.KGgRRRRRRRRRRGK','..KGGGRRRRRRGGk.','...KKKKKKKKKK...','....KKKK.KKKK...','...KKK.....KKK..','..KK.........KK.'],walk1:['................','................','.....KGGGGGK....','....KGgggggGK...','...KGgRRRRRrGK..','..KGgRLlRRRrRGK.','.KGgRLllRSRrRRGK','.KGgRLlRRSRRRRGK','.KGgRRRRSRSRRRGK','.KGgRRRRRRRRRRGK','.KGgRRWWRRWWRRGK','.KGgRRWWRRWWRRGK','.KGgRRRRRRRRRRGK','.KGgRRPRRRPRRRGK','.KGgRRRRRRRRRRGK','..KGGGRRRRRRGGk.','...KKKKKKKKKK...','....KKKK.KKKK...','.KKK.......KKKK.','KK...........KK.'],doze0:['................','................','.....KGGGGGK....','....KGgggggGK...','...KGgRRRRRrGK..','..KGgRLlRRRrRGK.','.KGgRLllRSRrRRGK','.KGgRLlRRSRRRRGK','.KGgRRRRSRSRRRGK','.KGgRRRRRRRRRRGK','.KGgRRKKRRKKRRGK','.KGgRRRRRRRRRRGK','.KGgRRRRRRRRRRGK','.KGgRRRRRRRRRRGK','.KGgRRRRRRRRRRGK','..KGGGRRRRRRGGk.','...KKKKKKKKKK...','....KKK..KKK....','...KK......KK...','................']}},
  strawberry:{pal:{'K':'#3a0808','R':'#d42020','r':'#f04848','L':'#f88080','l':'#ffb0b0','G':'#2a8010','g':'#50b828','T':'#3a6010','W':'#ffffff','P':'#f8c0c0','s':'#f8f0e0'},frames:{idle0:['....KGgGgGK.....','...KGgTgTgGK....','..KGgGTTTGgGK...','...KKKKTKKKk....','....KRRTRRk.....','...KRLlRrRRK....','..KRLllRsRRRK...','..KRLlRRsRRRK...','..KRRRsRRRsRRK..','..KRRRRsRsRRRK..','..KRRWWRRWWRRRk.','..KRRWWRRWWRRRk.','..KRRRRRRRRRRRk.','..KRRPRRRPRRRRk.','..KRRRRRRRRRRRk.','...KRRRRRRRRRk..','....KKRRRRKKk...','..','....KK.....KK...','................'],idle1:['....KGgGgGK.....','...KGgTgTgGK....','..KGgGTTTGgGK...','...KKKKTKKKk....','....KRRTRRk.....','...KRLlRrRRK....','..KRLllRsRRRK...','..KRLlRRsRRRK...','..KRRRsRRRsRRK..','..KRRRRsRsRRRK..','..KRRKKRRKKRRRk.','..KRRRRRRRRRRRk.','..KRRRRRRRRRRRk.','..KRRPRRRPRRRRk.','..KRRKWWWWKRRRk.','...KRRRRRRRRRk..','....KKRRRRKKk...','..','....KK.....KK...','................'],walk0:['....KGgGgGK.....','...KGgTgTgGK....','..KGgGTTTGgGK...','...KKKKTKKKk....','....KRRTRRk.....','...KRLlRrRRK....','..KRLllRsRRRK...','..KRLlRRsRRRK...','..KRRRsRRRsRRK..','..KRRRRsRsRRRK..','..KRRWWRRWWRRRk.','..KRRWWRRWWRRRk.','..KRRRRRRRRRRRk.','..KRRPRRRPRRRRk.','..KRRRRRRRRRRRk.','...KRRRRRRRRRk..','....KKKK.KKKk...','...KKK.....KKK..','..KK.........KK.','................'],walk1:['....KGgGgGK.....','...KGgTgTgGK....','..KGgGTTTGgGK...','...KKKKTKKKk....','....KRRTRRk.....','...KRLlRrRRK....','..KRLllRsRRRK...','..KRLlRRsRRRK...','..KRRRsRRRsRRK..','..KRRRRsRsRRRK..','..KRRWWRRWWRRRk.','..KRRWWRRWWRRRk.','..KRRRRRRRRRRRk.','..KRRPRRRPRRRRk.','..KRRRRRRRRRRRk.','...KRRRRRRRRRk..','....KKKK.KKKk....','.KKK.......KKKK.','KK...........KK.','................'],doze0:['....KGgGgGK.....','...KGgTgTgGK....','..KGgGTTTGgGK...','...KKKKTKKKk....','....KRRTRRk.....','...KRLlRrRRK....','..KRLllRsRRRK...','..KRLlRRsRRRK...','..KRRRsRRRsRRK..','..KRRRRsRsRRRK..','..KRRKKRRKKRRRk.','..KRRRRRRRRRRRk.','..KRRRRRRRRRRRk.','..KRRRRRRRRRRRk.','..KRRRRRRRRRRRk.','...KRRRRRRRRRk..','....KKRRRRKKk...','..','....KK.....KK...','................']}},
  pear:{pal:{'K':'#1a2a00','P':'#8cb820','p':'#b8e030','L':'#d8f060','l':'#eeff90','T':'#6b3c08','t':'#a06018','W':'#ffffff','C':'#f0c8a0'},frames:{idle0:['.....KTTTK......','.....KTtTK......','....KPPpPPK.....','....KPLlLPK.....','....KPLllPK.....','...KPLLllLPK....','...KPLLllLPK....','..KPPLLllLPPK...','..KPPpLllpPPK...','.KPPPppLlppPPPK.','.KPPPppppppPPPK.','.KPPWWPPPWWPPPPK','.KPPWWPPPWWPPPPK','.KPPPPPPPPPPPPPK','.KPPCPPPPPCPPPPK','.KPPPPPPPPPPPPPK','..KPPPPPPPPPPKK.','...KKKPPPPPKKK..','....KKK...KKK...','...KK.......KK..'],idle1:['.....KTTTK......','.....KTtTK......','....KPPpPPK.....','....KPLlLPK.....','....KPLllPK.....','...KPLLllLPK....','...KPLLllLPK....','..KPPLLllLPPK...','..KPPpLllpPPK...','.KPPPppLlppPPPK.','.KPPPppppppPPPK.','.KPPKKPPPKKPPPPK','.KPPPPPPPPPPPPPK','.KPPPPPPPPPPPPPK','.KPPCPPPPPCPPPPK','.KPPPKWWWWKPPPPK','..KPPPPPPPPPPKK.','...KKKPPPPPKKK..','....KKK...KKK...','...KK.......KK..'],walk0:['.....KTTTK......','.....KTtTK......','....KPPpPPK.....','....KPLlLPK.....','....KPLllPK.....','...KPLLllLPK....','...KPLLllLPK....','..KPPLLllLPPK...','..KPPpLllpPPK...','.KPPPppLlppPPPK.','.KPPPppppppPPPK.','.KPPWWPPPWWPPPPK','.KPPWWPPPWWPPPPK','.KPPPPPPPPPPPPPK','.KPPCPPPPPCPPPPK','.KPPPPPPPPPPPPPK','..KPPPPPPPPPPKK.','...KKKK...KKKK..','..KKK.......KKK.','.KK...........KK'],walk1:['.....KTTTK......','.....KTtTK......','....KPPpPPK.....','....KPLlLPK.....','....KPLllPK.....','...KPLLllLPK....','...KPLLllLPK....','..KPPLLllLPPK...','..KPPpLllpPPK...','.KPPPppLlppPPPK.','.KPPPppppppPPPK.','.KPPWWPPPWWPPPPK','.KPPWWPPPWWPPPPK','.KPPPPPPPPPPPPPK','.KPPCPPPPPCPPPPK','.KPPPPPPPPPPPPPK','..KPPPPPPPPPPKK.','...KKKK...KKKK..','...KKK.........KKK','KK.............KK'],doze0:['.....KTTTK......','.....KTtTK......','....KPPpPPK.....','....KPLlLPK.....','....KPLllPK.....','...KPLLllLPK....','...KPLLllLPK....','..KPPLLllLPPK...','..KPPpLllpPPK...','.KPPPppLlppPPPK.','.KPPPppppppPPPK.','.KPPKKPPPKKPPPPK','.KPPPPPPPPPPPPPK','.KPPPPPPPPPPPPPK','.KPPCPPPPPCPPPPK','.KPPPPPPPPPPPPPK','..KPPPPPPPPPPKK.','...KKKPPPPPKKK..','....KKK...KKK...','...KK.......KK..']}},
  lychee:{pal:{'K':'#1a0830','V':'#6030a8','v':'#8850d0','L':'#b888f0','l':'#ddc0ff','T':'#2a5a10','G':'#4a9020','g':'#70c038','W':'#ffffff','P':'#e0b8ff'},frames:{idle0:['......KTTTK.....','.....KGgGgGK....','.....KGGTGGk....','......KKTK......','.....KVLlVVK....','....KVLllVvVK...','...KVLLllVvVVK..','..KVVLLllvVVVVK.','..KVVVvvvvVVVVK.','..KVVVvvvvVVVVK.','..KVVWWVVVWWVVK.','..KVVWWVVVWWVVK.','..KVVVVVVVVVVVK.','..KVVPVVVVPVVVK.','..KVVVVVVVVVVVK.','...KVVVVVVVVVK..','....KKKKVVKKKK..','..','....KK.....KK...','................'],idle1:['......KTTTK.....','.....KGgGgGK....','.....KGGTGGk....','......KKTK......','.....KVLlVVK....','....KVLllVvVK...','...KVLLllVvVVK..','..KVVLLllvVVVVK.','..KVVVvvvvVVVVK.','..KVVVvvvvVVVVK.','..KVVKKVVVKKVVK.','..KVVVVVVVVVVVK.','..KVVVVVVVVVVVK.','..KVVPVVVVPVVVK.','..KVVVKWWWKVVVK.','...KVVVVVVVVVK..','....KKKKVVKKKK..','..','....KK.....KK...','................'],walk0:['......KTTTK.....','.....KGgGgGK....','.....KGGTGGk....','......KKTK......','.....KVLlVVK....','....KVLllVvVK...','...KVLLllVvVVK..','..KVVLLllvVVVVK.','..KVVVvvvvVVVVK.','..KVVVvvvvVVVVK.','..KVVWWVVVWWVVK.','..KVVWWVVVWWVVK.','..KVVVVVVVVVVVK.','..KVVPVVVVPVVVK.','..KVVVVVVVVVVVK.','...KVVVVVVVVVK..','....KKKKVVKKKK..','...KKK.....KKK..','..KK.........KK.','................'],walk1:['......KTTTK.....','.....KGgGgGK....','.....KGGTGGk....','......KKTK......','.....KVLlVVK....','....KVLllVvVK...','...KVLLllVvVVK..','..KVVLLllvVVVVK.','..KVVVvvvvVVVVK.','..KVVVvvvvVVVVK.','..KVVWWVVVWWVVK.','..KVVWWVVVWWVVK.','..KVVVVVVVVVVVK.','..KVVPVVVVPVVVK.','..KVVVVVVVVVVVK.','...KVVVVVVVVVK..','....KKKKVVKKKK....','.KKK.......KKKK.','KK...........KK.','................'],doze0:['......KTTTK.....','.....KGgGgGK....','.....KGGTGGk....','......KKTK......','.....KVLlVVK....','....KVLllVvVK...','...KVLLllVvVVK..','..KVVLLllvVVVVK.','..KVVVvvvvVVVVK.','..KVVVvvvvVVVVK.','..KVVKKVVVKKVVK.','..KVVVVVVVVVVVK.','..KVVVVVVVVVVVK.','..KVVVVVVVVVVVK.','..KVVVVVVVVVVVK.','...KVVVVVVVVVK..','....KKKKVVKKKK..','..','....KK.....KK...','................']}}
  };
  
  function getTimeOfDay(){const h=new Date().getHours();if(h>=5&&h<12)return'morning';if(h>=12&&h<17)return'afternoon';if(h>=17&&h<21)return'evening';return'night';}
  const greetings={morning:{label:'GOOD MORNING!',msgs:["RISE AND SHINE!","A BRAND NEW DAY.","YOU'VE GOT THIS."],emoji:'☀️'},afternoon:{label:'GOOD AFTERNOON!',msgs:["KEEP GOING!","HALFWAY THROUGH.","YOU'RE DOING GREAT."],emoji:'🌤️'},evening:{label:'GOOD EVENING!',msgs:["WIND DOWN GENTLY.","YOU MADE IT TODAY.","REST IS EARNED."],emoji:'🌅'},night:{label:'GOOD NIGHT!',msgs:["SWEET DREAMS.","REST UP, CHAMP.","SEE YOU TOMORROW."],emoji:'🌙'}};
  
  let chosenCritter=null,critterName='',idleTimer=null,dozeTimer=null;
  let walkX=120,walkDir=1,walkSpeed=18,isWalking=false,walkRaf=null,lastWalkTime=null;
  let isAnimating=false,isDozing=false;
  const WALK_MIN=20,WALK_MAX=218;
  let frameIndex=0,frameTimer=null;
  
  const affirmations=["YOU ARE CRUSHING IT!","THE WORLD IS BRIGHTER WITH YOU.","EVERY STEP COUNTS.","YOU'VE GOT THIS!","TODAY IS YOURS.","YOU ARE SO WORTHY.","YOUR ENERGY IS CONTAGIOUS!","CHALLENGES = OPPORTUNITIES.","BE KIND TO YOURSELF.","STRONGER THAN YOU KNOW.","SOMEONE IS GLAD YOU EXIST.","ONE BREATH AT A TIME.","YOU'RE RIGHT ON TIME.","YOUR WEIRDNESS = SUPERPOWER.","PROGRESS OVER PERFECTION.","DRINK WATER, CHAMPION.","100% SURVIVAL RATE SO FAR.","THE BEST IS YET TO COME."];
  for(let i=affirmations.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[affirmations[i],affirmations[j]]=[affirmations[j],affirmations[i]];}
  let affirmIdx=0;
  
  function getFrameKey(){if(isDozing)return'doze0';if(isWalking)return frameIndex%2===0?'walk0':'walk1';return frameIndex%2===0?'idle0':'idle1';}
  function updateSprite(){const wrap=d.getElementById('critterWrap');if(!wrap)return;const img=wrap.querySelector('.px-sprite');if(!img)return;const sp=sprites[chosenCritter];const key=getFrameKey();img.innerHTML=px(sp.frames[key]||sp.frames.idle0,sp.pal,4);frameIndex++;}
  function startFrameLoop(){if(frameTimer)clearInterval(frameTimer);frameIndex=0;frameTimer=setInterval(updateSprite,380);}
  function stopFrameLoop(){if(frameTimer)clearInterval(frameTimer);frameTimer=null;}
  function buildCritter(c){const sp=sprites[c];return`<div class="critter-wrap standing" id="critterWrap" style="left:120px"><div class="px-sprite">${px(sp.frames.idle0,sp.pal,4)}</div><div class="px-shadow"></div></div>`;}
  function renderCritter(){d.getElementById('critterContainer').innerHTML=buildCritter(chosenCritter);attachCritterClick();startIdleLoop();startFrameLoop();checkDoze();}
  
  function checkDoze(){if(dozeTimer)clearInterval(dozeTimer);dozeTimer=setInterval(()=>{const h=new Date().getHours();const sd=(h>=23);const wrap=d.getElementById('critterWrap');if(!wrap)return;if(sd&&!isDozing){isDozing=true;stopWalking();isAnimating=false;wrap.classList.remove('standing','walking');wrap.classList.add('dozing');spawnZzz();}else if(!sd&&isDozing){isDozing=false;wrap.classList.remove('dozing');wrap.classList.add('standing');d.querySelectorAll('.zzz').forEach(z=>z.remove());}},10000);if(new Date().getHours()>=23)isDozing=true;}
  let zzzInterval=null;
  function spawnZzz(){if(zzzInterval)clearInterval(zzzInterval);zzzInterval=setInterval(()=>{if(!isDozing){clearInterval(zzzInterval);return;}const wrap=d.getElementById('critterWrap');if(!wrap)return;const c=d.getElementById('critterContainer');if(!c)return;const z=d.createElement('span');z.className='zzz';z.style.fontSize=['6px','7px','9px'][Math.floor(Math.random()*3)];z.textContent=['z','z','Z'][Math.floor(Math.random()*3)];z.style.left=(parseInt(wrap.style.left||'120')+30+Math.random()*20)+'px';z.style.bottom='80px';z.style.animationDelay=(Math.random()*.5)+'s';c.appendChild(z);setTimeout(()=>z.remove(),2200);},800);}
  const idleBehaviors=[{cls:'idle-look-left',dur:2600,weight:3},{cls:'idle-look-right',dur:2600,weight:3},{cls:'idle-happy-bounce',dur:1800,weight:2},{cls:'idle-wiggle',dur:1600,weight:3},{cls:'idle-yawn',dur:3200,weight:2},{cls:'idle-surprised',dur:1400,weight:1},{cls:'idle-shimmy',dur:2200,weight:2},{cls:'idle-spin',dur:2000,weight:1}];
  function pickBehavior(){const t=idleBehaviors.reduce((s,b)=>s+b.weight,0);let r=Math.random()*t;for(const b of idleBehaviors){r-=b.weight;if(r<=0)return b;}return idleBehaviors[0];}
  function clearIdle(w){idleBehaviors.forEach(b=>w.classList.remove(b.cls));w.classList.remove('idle-click-wiggle');}
  function playIdle(b){const w=d.getElementById('critterWrap');if(!w||isAnimating||isDozing)return;isAnimating=true;clearIdle(w);void w.offsetWidth;w.classList.add(b.cls);setTimeout(()=>{if(w)w.classList.remove(b.cls);isAnimating=false;},b.dur);}
  function playIdleOnce(){playIdle(pickBehavior());}
  function getWrap(){return d.getElementById('critterWrap');}
  function startWalking(){const w=getWrap();if(!w||isAnimating||isDozing)return;isWalking=true;lastWalkTime=null;w.classList.remove('standing');w.classList.add('walking');function step(ts){if(!isWalking)return;const w=getWrap();if(!w)return;if(!lastWalkTime)lastWalkTime=ts;const dt=(ts-lastWalkTime)/1000;lastWalkTime=ts;walkX+=walkDir*walkSpeed*dt;if(walkX>=WALK_MAX){walkX=WALK_MAX;walkDir=-1;}if(walkX<=WALK_MIN){walkX=WALK_MIN;walkDir=1;}w.style.left=walkX+'px';const img=w.querySelector('.px-sprite');if(img)img.style.transform=walkDir<0?'scaleX(-1)':'scaleX(1)';walkRaf=requestAnimationFrame(step);}walkRaf=requestAnimationFrame(step);}
  function stopWalking(){isWalking=false;if(walkRaf){cancelAnimationFrame(walkRaf);walkRaf=null;}const w=getWrap();if(!w)return;w.classList.remove('walking');w.classList.add('standing');const img=w.querySelector('.px-sprite');if(img)img.style.transform='scaleX(1)';}
  function scheduleNext(){idleTimer=setTimeout(()=>{if(isDozing)return;if(Math.random()<.45){startWalking();setTimeout(()=>{stopWalking();setTimeout(scheduleNext,1800+Math.random()*2000);},3000+Math.random()*4000);}else{stopWalking();playIdleOnce();setTimeout(scheduleNext,3500+Math.random()*3000);}},1200+Math.random()*1800);}
  function startIdleLoop(){if(idleTimer)clearTimeout(idleTimer);if(walkRaf)cancelAnimationFrame(walkRaf);isAnimating=false;isWalking=false;walkX=120;const w=getWrap();if(w)w.style.left=walkX+'px';if(!isDozing)setTimeout(()=>{startWalking();setTimeout(()=>{stopWalking();scheduleNext();},1400+Math.random()*700);},300);}
  function attachCritterClick(){const c=d.getElementById('critterContainer');if(!c)return;c.addEventListener('click',e=>{e.stopPropagation();if(isDozing)return;const w=getWrap();if(!w)return;clearIdle(w);void w.offsetWidth;w.classList.add('idle-click-wiggle');isAnimating=true;setTimeout(()=>{if(w)w.classList.remove('idle-click-wiggle');isAnimating=false;},500);});}
  
  function showGreeting(){const tod=getTimeOfDay(),g=greetings[tod];d.getElementById('greetTime').textContent=g.label+' '+g.emoji;d.getElementById('greetMsg').textContent=g.msgs[Math.floor(Math.random()*g.msgs.length)];d.getElementById('greetNameTag').textContent='— '+critterName+' —';d.getElementById('greetSprite').innerHTML=px(sprites[chosenCritter].frames.idle0,sprites[chosenCritter].pal,3);d.getElementById('screenGreeting').classList.add('active');}
  d.getElementById('btnGreetOk').addEventListener('click',e=>{e.stopPropagation();d.getElementById('screenGreeting').classList.remove('active');d.getElementById('screenMain').classList.add('active');setTopGreeting();renderCritter();d.getElementById('nameTag').textContent='— '+critterName+' —';showAffirmation();});
  const pickBtns=d.querySelectorAll('.pick-btn');
  const nameInput=d.getElementById('nameInput');
  const btnStart=d.getElementById('btnStart');
  pickBtns.forEach(btn=>btn.addEventListener('click',e=>{e.stopPropagation();pickBtns.forEach(b=>b.classList.remove('chosen'));btn.classList.add('chosen');chosenCritter=btn.dataset.c;checkReady();}));
  nameInput.addEventListener('input',checkReady);
  function checkReady(){btnStart.classList.toggle('ready',!!(chosenCritter&&nameInput.value.trim().length));}
  btnStart.addEventListener('click',e=>{e.stopPropagation();if(!btnStart.classList.contains('ready'))return;critterName=nameInput.value.trim().toUpperCase();saveProfile();d.getElementById('screenSetup').classList.remove('active');showGreeting();});
  function setTopGreeting(){d.getElementById('greetingName').textContent={morning:'GOOD MORNING ☀️',afternoon:'GOOD AFTERNOON 🌤️',evening:'GOOD EVENING 🌅',night:'GOOD NIGHT 🌙'}[getTimeOfDay()];}
  function goSetup(){if(idleTimer){clearTimeout(idleTimer);idleTimer=null;}if(walkRaf){cancelAnimationFrame(walkRaf);walkRaf=null;}if(dozeTimer){clearInterval(dozeTimer);dozeTimer=null;}if(zzzInterval){clearInterval(zzzInterval);zzzInterval=null;}stopFrameLoop();isAnimating=false;isWalking=false;isDozing=false;d.querySelectorAll('.zzz').forEach(z=>z.remove());d.getElementById('screenMain').classList.remove('active');d.getElementById('screenGreeting').classList.remove('active');d.getElementById('screenSetup').classList.add('active');}
  function showAffirmation(){const el=d.getElementById('affirmation');el.classList.remove('pop');void el.offsetWidth;el.textContent=affirmations[affirmIdx];el.classList.add('pop');affirmIdx=(affirmIdx+1)%affirmations.length;spawnSparkles();const w=getWrap();if(w&&!isDozing){clearIdle(w);void w.offsetWidth;isAnimating=true;w.classList.add('idle-happy-bounce');setTimeout(()=>{if(w)w.classList.remove('idle-happy-bounce');isAnimating=false;},800);}}
  function spawnSparkles(){const wg=d.getElementById('widget');const chars=['★','✦','♦','◆','●','▲'];const cols=['#f0a030','#e85050','#50c880','#5090e0','#e060a0','#c8e000'];for(let i=0;i<6;i++){const s=d.createElement('span');s.className='sparkle';s.textContent=chars[Math.floor(Math.random()*chars.length)];s.style.color=cols[Math.floor(Math.random()*cols.length)];s.style.left=(20+Math.random()*240)+'px';s.style.top=(20+Math.random()*100)+'px';s.style.setProperty('--tx',((Math.random()-.5)*80)+'px');s.style.setProperty('--ty',(-(20+Math.random()*60))+'px');wg.appendChild(s);setTimeout(()=>s.remove(),700);}}
  d.getElementById('btnNext').addEventListener('click',e=>{e.stopPropagation();showAffirmation();});
  d.getElementById('btnSettings').addEventListener('click',e=>{e.stopPropagation();goSetup();});
  d.getElementById('btnHide').addEventListener('click',e=>{e.stopPropagation();const wg=d.getElementById('widget');wg.style.transition='opacity .2s,transform .2s';wg.style.opacity='0';wg.style.transform='scale(.9)';setTimeout(()=>{wg.style.transition='';wg.style.opacity='1';wg.style.transform='scale(1)';},2500);});
  function saveProfile(){try{localStorage.setItem('buddyCritter',chosenCritter);localStorage.setItem('buddyName',critterName);}catch(e){}}
  function loadProfile(){try{const c=localStorage.getItem('buddyCritter'),n=localStorage.getItem('buddyName');if(c&&n){chosenCritter=c;critterName=n;pickBtns.forEach(b=>{if(b.dataset.c===c)b.classList.add('chosen');});nameInput.value=n;checkReady();showGreeting();return;}}catch(e){}d.getElementById('screenSetup').classList.add('active');}
  
  // ═══ DRAG WIDGET ═══
  const widget=d.getElementById('widget');
  let dragging=false,dStartX,dStartY,dOrigL,dOrigT;
  widget.addEventListener('mousedown',e=>{if(e.target.closest('button')||e.target.tagName==='INPUT')return;dragging=true;widget.classList.add('dragging');const r=widget.getBoundingClientRect();dStartX=e.clientX;dStartY=e.clientY;dOrigL=r.left;dOrigT=r.top;widget.style.transform='none';widget.style.left=dOrigL+'px';widget.style.top=dOrigT+'px';widget.style.position='fixed';});
  document.addEventListener('mousemove',e=>{if(!dragging)return;widget.style.left=(dOrigL+e.clientX-dStartX)+'px';widget.style.top=(dOrigT+e.clientY-dStartY)+'px';});
  document.addEventListener('mouseup',()=>{dragging=false;widget.classList.remove('dragging');});
  widget.addEventListener('touchstart',e=>{if(e.target.closest('button')||e.target.tagName==='INPUT')return;dragging=true;const t=e.touches[0],r=widget.getBoundingClientRect();dStartX=t.clientX;dStartY=t.clientY;dOrigL=r.left;dOrigT=r.top;widget.style.transform='none';widget.style.left=dOrigL+'px';widget.style.top=dOrigT+'px';widget.style.position='fixed';},{passive:true});
  document.addEventListener('touchmove',e=>{if(!dragging)return;const t=e.touches[0];widget.style.left=(dOrigL+t.clientX-dStartX)+'px';widget.style.top=(dOrigT+t.clientY-dStartY)+'px';},{passive:true});
  document.addEventListener('touchend',()=>{dragging=false;});
  
}

// ════════════════════════════════════════
//  DOCUMENT PiP LAUNCHER
// ════════════════════════════════════════
(function() {
  const btnPop   = document.getElementById('btnPop');
  const lStatus  = document.getElementById('lStatus');
  const noSupport= document.getElementById('noSupport');
  let pipWin = null;

  btnPop.addEventListener('click', async () => {

    // browser support check
    if (!('documentPictureInPicture' in window)) {
      noSupport.style.display = 'block';
      btnPop.style.display    = 'none';
      return;
    }

    // if already open, just focus it
    if (pipWin && !pipWin.closed) {
      pipWin.focus();
      return;
    }

    try {
      // open the floating window — Chrome sizes it, user can resize
      pipWin = await window.documentPictureInPicture.requestWindow({
        width : 310,
        height: 480,
      });

      // ── copy all styles into PiP ──
      // inline <style> blocks
      document.querySelectorAll('style').forEach(s => {
        const el = pipWin.document.createElement('style');
        el.textContent = s.textContent;
        pipWin.document.head.appendChild(el);
      });
      // linked stylesheets
      document.querySelectorAll('link[rel="stylesheet"]').forEach(l => {
        const el = pipWin.document.createElement('link');
        el.rel  = 'stylesheet';
        el.href = l.href;
        pipWin.document.head.appendChild(el);
      });

      // body reset
      Object.assign(pipWin.document.body.style, {
        margin: '0', padding: '0',
        background: 'transparent',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      });

      // ── clone buddy template into PiP ──
      const tpl   = document.getElementById('buddyTpl');
      const clone = tpl.content.cloneNode(true);
      pipWin.document.body.appendChild(clone);

      // ── run buddy logic ──
      initBuddy(pipWin.document);

      // ── update launcher ──
      btnPop.textContent = '🪟  REFOCUS BUDDY';
      lStatus.classList.add('on');

      // ── cleanup on close ──
      pipWin.addEventListener('pagehide', () => {
        pipWin = null;
        btnPop.innerHTML = '🪟 &nbsp;POP OUT TO DESKTOP';
        lStatus.classList.remove('on');
      });

    } catch (err) {
      console.warn('Document PiP failed:', err.message);
    }
  });
})();

