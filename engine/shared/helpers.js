
const cl=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)),ease=p=>1-Math.pow(1-cl(p),3),eio=p=>{p=cl(p);return p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2},back=p=>{p=cl(p);const c=1.9;return 1+(c+1)*Math.pow(p-1,3)+c*Math.pow(p-1,2)},lerp=(a,b,p)=>a+(b-a)*p;
const $=id=>document.getElementById(id);
const GOLD="#E7CE7C",RED="#E0465A",INK="#F4F1E8",MUTE="#9AA6BF";
let TL,P,HITS=[],FL=[],CUTS=[],GL=[];
const S=i=>P[i].start,E=i=>P[i].end,W=(i,j)=>P[i].words[j][1];
function rnd(i){const x=Math.sin(i*127.1+311.7)*43758.5453;return x-Math.floor(x)}
// partikel letupan
function burst(x,y,t0,t,n,col,spd=420,sz=10,dur=0.9){if(t<t0||t>t0+dur)return"";const p=(t-t0)/dur;let h="";
  for(let i=0;i<n;i++){const a=rnd(i+x)*Math.PI*2,v=spd*(0.4+rnd(i*3+y)*0.8),px=x+Math.cos(a)*v*ease(p),py=y+Math.sin(a)*v*ease(p)+300*p*p;
    h+=`<circle cx="${px}" cy="${py}" r="${sz*(1-p)}" fill="${col}" opacity="${1-p}"/>`}return h}
function ring(x,y,t0,t,col,r1=260,dur=0.6,w=12){if(t<t0||t>t0+dur)return"";const p=(t-t0)/dur;return `<circle cx="${x}" cy="${y}" r="${20+r1*ease(p)}" fill="none" stroke="${col}" stroke-width="${w*(1-p)}" opacity="${1-p}"/>`}
function txt(x,y,s,col,size=50,anchor="middle",op=1){return `<text x="${x}" y="${y}" fill="${col}" font-family="Anton" font-size="${size}" text-anchor="${anchor}" opacity="${op}">${s}</text>`}
function glitch(el,t,hits){let g=0;hits.forEach(h=>{const d=t-h;if(d>=0&&d<0.45)g=Math.max(g,1-d/0.45)});
  const dx=g*(10+14*rnd(Math.floor(t*30)));el.style.textShadow=g>0.02?`${dx}px 0 #ff2a55,${-dx}px 0 #22e1ff`:"none";
  el.style.clipPath=g>0.5&&rnd(Math.floor(t*30)+7)>0.5?`inset(${rnd(Math.floor(t*30))*60}% 0 ${rnd(Math.floor(t*30)+1)*30}% 0)`:"none"}
function shine(el,t,speed=0.5,off=0){const p=((t*speed+off)%1.6)/1.6;el.style.backgroundPosition=`${lerp(140,-40,p)}% 0`}
function show(el,t0,t,mode="up",dur=0.3){const e=typeof el==="string"?$(el):el;if(t<t0){e.style.opacity=0;return}
  if(mode==="pop"){const s=back((t-t0)/0.26);e.style.opacity=cl((t-t0)/0.07);e.style.transform=`scale(${2-s})`}
  else if(mode==="fly"){const p=ease((t-t0)/0.45);e.style.opacity=cl((t-t0)/0.15);e.style.transform=`scale(${lerp(3.2,1,p)})`;e.style.filter=`blur(${(1-p)*14}px)`}
  else{const p=ease((t-t0)/dur);e.style.opacity=p;e.style.transform=`translateY(${(1-p)*60}px)`}}
function scene(id,a,b,t){const e=$(id);let o=0;if(t>=a&&t<b)o=Math.min(ease((t-a)/0.1),ease((b-t)/0.1));e.style.opacity=o;return o>0}
