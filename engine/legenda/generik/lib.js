// ===== enjin generik kisah legenda (emosi) =====
const GW=`<defs><filter id="gw" filterUnits="userSpaceOnUse" x="-500" y="-500" width="2200" height="3000"><feGaussianBlur stdDeviation="9" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<radialGradient id="lamp" cx="50%" cy="0%" r="100%"><stop offset="0" stop-color="#FFE7A8" stop-opacity=".55"/><stop offset=".6" stop-color="#FFE7A8" stop-opacity=".06"/><stop offset="1" stop-color="#FFE7A8" stop-opacity="0"/></radialGradient>
<radialGradient id="spot" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>`;
let GR=[];
function T(x,y,s,col,size,anchor="middle",op=1,font="Anton"){return `<text x="${x}" y="${y}" font-family="${font}" font-size="${size}" fill="${col}" text-anchor="${anchor}" opacity="${op}" ${font==="Pop"?'font-weight="600"':''}>${s}</text>`}
function pop(x,y,s,col,size,t0,t,font="Anton"){if(t<t0)return"";const sc=back(cl((t-t0)/0.3));return `<g transform="translate(${x} ${y}) scale(${lerp(1.8,1,sc)})" opacity="${cl((t-t0)/0.12)}">${T(0,0,s,col,size,"middle",1,font)}</g>`}
function fadeUp(x,y,s,col,size,t0,t,font="Anton"){if(t<t0)return"";const q=ease(cl((t-t0)/0.6));return T(x,y+40*(1-q),s,col,size,"middle",q,font)}
function box(x,y,w,h,s,bg,fg,size,t0,t,stroke){if(t<t0)return"";const q=back(cl((t-t0)/0.35));return `<g transform="translate(${x} ${y}) scale(${q})"><rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="${h*0.22}" fill="${bg}" ${stroke?`stroke="${stroke}" stroke-width="8"`:""}/>${T(0,size*0.36,s,fg,size)}</g>`}
function person(x,y,s,col,op=1){return `<g transform="translate(${x} ${y}) scale(${s})" opacity="${op}"><circle cx="0" cy="-70" r="26" fill="${col}"/><path d="M-38 40 Q-40 -30 0 -36 Q40 -30 38 40 Z" fill="${col}"/></g>`}
function shatter(cx,cy,t0,t,n=26,col="#fff"){if(t<t0||t>t0+1.4)return"";const d=t-t0;let g="";for(let i=0;i<n;i++){const a=rnd(i+3)*6.283,sp=150+rnd(i+7)*600,x=cx+Math.cos(a)*sp*d,y=cy+Math.sin(a)*sp*d+500*d*d,s=8+rnd(i+11)*26,r=d*400*(rnd(i)-0.5);
  g+=`<polygon points="0,${-s} ${s*0.8},${s*0.6} ${-s*0.7},${s*0.4}" fill="${col}" opacity="${0.75*(1-d/1.4)}" transform="translate(${x} ${y}) rotate(${r})"/>`}return g}
function curve(pts,t,col,w=10){let d="",head=pts[0];for(let i=0;i<pts.length;i++){const [x,y,tt]=pts[i];if(i===0){d=`M${x} ${y}`;continue}const [px,py,pt]=pts[i-1];if(t>=tt){d+=` L${x} ${y}`;head=[x,y]}else{if(t>pt){const p=(t-pt)/(tt-pt);head=[lerp(px,x,p),lerp(py,y,p)];d+=` L${head[0]} ${head[1]}`}break}}
  return `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round" filter="url(#gw)"/><circle cx="${head[0]}" cy="${head[1]}" r="${w*1.6}" fill="#fff" filter="url(#gw)"/>`}
// laluan rawak: dari (x0,y0) ke (x1,y1), n titik, masa a..b
function path(x0,y0,x1,y1,n,a,b,jit=40,seed=1){const r=[];for(let i=0;i<=n;i++){const p=i/n;r.push([lerp(x0,x1,p),i===0||i===n?lerp(y0,y1,p):lerp(y0,y1,p)+(rnd(i*3+seed)-0.5)*2*jit,lerp(a,b,p)])}return r}
function count(v0,v1,t0,t1,t){return lerp(v0,v1,ease(cl((t-t0)/Math.max(0.01,t1-t0))))}
function check(x,y,t0,t,col=GOLD){if(t<t0)return"";const q=back(cl((t-t0)/0.3));return `<g transform="translate(${x} ${y}) scale(${q})"><circle r="34" fill="${col}"/><path d="M-16 0 L-4 13 L18 -14" stroke="#0F1B33" stroke-width="8" fill="none" stroke-linecap="round"/></g>`}
function xmark(x,y,r,t0,t,col=RED,w=16){if(t<t0)return"";const q=ease(cl((t-t0)/0.25));return `<line x1="${x-r}" y1="${y-r}" x2="${lerp(x-r,x+r,q)}" y2="${lerp(y-r,y+r,q)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/><line x1="${x+r}" y1="${y-r}" x2="${lerp(x+r,x-r,q)}" y2="${lerp(y-r,y+r,q)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`}
function bill(x,y,s,rot,lab){return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><rect x="-190" y="-85" width="380" height="170" rx="10" fill="#cfe0c4" stroke="#7a9a6a" stroke-width="6"/><circle cx="0" cy="0" r="55" fill="none" stroke="#7a9a6a" stroke-width="5"/>${T(0,24,lab,"#3d5a30",64)}</g>`}
function candles(x0,y0,n,w,vals,cols,k=99){let g="";for(let i=0;i<Math.min(n,Math.ceil(k));i++){const [o,c]=vals[i],x=x0+i*w;const hi=Math.min(o,c)-10-rnd(i)*20,lo=Math.max(o,c)+10+rnd(i+5)*20;g+=`<line x1="${x+w*0.3}" x2="${x+w*0.3}" y1="${y0+hi}" y2="${y0+lo}" stroke="${cols(i,o,c)}" stroke-width="4"/><rect x="${x}" y="${y0+Math.min(o,c)}" width="${w*0.6}" height="${Math.max(4,Math.abs(c-o))}" fill="${cols(i,o,c)}" rx="3"/>`}return g}
let SC=[];
function build(tl){TL=tl;P=tl.p;
  let dh="";for(let i=0;i<46;i++){const s=2+rnd(i)*5;dh+=`<i style="width:${s}px;height:${s}px"></i>`}$("dust").innerHTML=dh;
  for(let k=0;k<6;k++){const cv=document.createElement("canvas");cv.width=cv.height=256;const x=cv.getContext("2d"),im=x.createImageData(256,256);for(let i=0;i<im.data.length;i+=4){const v=rnd(i*0.37+k*999)*255;im.data[i]=im.data[i+1]=im.data[i+2]=v;im.data[i+3]=255}x.putImageData(im,0,0);GR.push(cv.toDataURL())}
  V.init&&V.init();
  SC=V.scenes.map((s,k)=>({...s,a:S(s.from)}));
  HITS=V.hits();FL=V.fl();CUTS=SC.slice(1).map(s=>s.a);
  return tl.total}
function inR(t,rs){return rs.some(([a,b])=>t>=a&&t<b)}
function render(t){
  $("prog").firstElementChild.style.width=cl(t/TL.total)*100+"%";
  $("floor").style.backgroundPosition=`0 ${t*60}px`;
  document.querySelectorAll("#dust i").forEach((d,i)=>{const sp=10+rnd(i+5)*30;const x=(rnd(i)*1080+Math.sin(t*0.5+i)*30)%1080,y=((rnd(i+9)*1920-t*sp)%1920+1920)%1920;d.style.transform=`translate(${x}px,${y}px)`;d.style.opacity=0.25+0.5*rnd(i+2)*(0.6+0.4*Math.sin(t*2+i))});
  let punch=0,shake=0;HITS.forEach(h=>{const d=t-h;if(d>=0&&d<0.35){punch=Math.max(punch,(1-d/0.35)*0.045);shake=Math.max(shake,(1-d/0.28)*10)}});
  let blur=0;CUTS.forEach(c=>{const d=t-c;if(Math.abs(d)<0.16){const q=1-Math.abs(d)/0.16;blur=Math.max(blur,q*18)}});
  const dolly=1+0.04*((t%8)/8);const cam=$("cam");cam.style.transform=`translate(${shake*Math.sin(t*90)}px,${shake*Math.cos(t*77)}px) scale(${dolly+punch})`;cam.style.filter=blur>0.5?`blur(${blur}px)`:"none";
  let fo=0,fc="#E0465A";FL.forEach(([a,c,g])=>{const d=t-a;if(d>=0&&d<0.5&&(1-d/0.5)*g>fo){fo=(1-d/0.5)*g;fc=c}});$("flash").style.opacity=fo;$("flash").style.background=fc;
  $("bars").innerHTML="";
  const DK=V.dark(),dark=inR(t,DK);let warm=1;if(!dark){let a=0;DK.forEach(([x,y])=>{if(t>=y)a=Math.max(a,y)});warm=a?cl((t-a)/2):1}
  $("world").style.filter=dark?`saturate(.35) brightness(.92) hue-rotate(-8deg)`:`saturate(${lerp(.5,1.15,warm)}) brightness(${lerp(.95,1.05,warm)})`;
  const g=$("grain");g.style.backgroundImage=`url(${GR[Math.floor(t*24)%6]})`;g.style.opacity=dark?0.12:0.06;
  let rh="";const RN=V.rain();if(inR(t,RN)){for(let i=0;i<70;i++){const sp=1400+rnd(i)*800,x=(rnd(i+1)*1200-60+t*120)%1140-30,y=((rnd(i+2)*1920+t*sp)%2100)-100;rh+=`<line x1="${x}" y1="${y}" x2="${x-14}" y2="${y+60}" stroke="#9fb8d8" stroke-width="2" opacity="${0.35*(0.4+rnd(i+3)*0.6)}"/>`}}$("rain").innerHTML=rh;
  for(let k=0;k<SC.length;k++){const s=SC[k],b=k+1<SC.length?SC[k+1].a:99;
    if(s.id==="nm"){if(scene("nm",s.a-0.02,b-0.02,t)){show("n0",s.a,t);const n1=$("n1");show(n1,W(s.from+1,0),t,"pop");shine(n1,t,1.0);n1.style.letterSpacing=`${lerp(30,0,ease(cl((t-W(s.from+1,0))/0.9)))}px`;show("n2",W(s.from+1,0)+0.5,t);}continue}
    if(s.id==="fin"){if(scene("fin",s.a-0.02,99,t)){show("sig",s.a,t,"pop");shine($("sig").firstElementChild,t,0.8);const f1=$("f1");show(f1,s.a+0.5,t,"pop");show("disc",s.a+0.8,t);if($("cta"))show("cta",s.a+0.3,t,"pop");}continue}
    if(scene(s.id,s.a-0.02,b-0.02,t)){if(s.id==="pov"){let wh="";const grp=V.povGroup(t);grp.forEach(pi=>P[pi].words.forEach(([w,a],j)=>{if(t<a)return;const sc=back((t-a)/0.22);const red=V.povRed.some(([x,y])=>x===pi&&y===j);wh+=(wh?" ":"")+`<span class="word ${red?'r':''}" style="transform:scale(${1.5-0.5*sc});opacity:${cl((t-a)/0.08)}">${w}</span>`}));$("pw").innerHTML=wh}
      $(s.id+"svg").innerHTML=GW+s.draw(t,s.a,b)}}
  $("cap").innerHTML="";
}
window.build=build;window.render=render;
