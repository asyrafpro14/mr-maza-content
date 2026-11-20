// VIDEO 3: MACD
function wave(n,f,seed,z=0.5){const c=[];for(let i=0;i<n;i++)c.push(f(i)+(rnd(i*7.31+seed)-0.5)*2*z);return ohlc(c,seed)}
function mc(D){Object.assign(D,{M:macd(D.c)});return D}
function xings(D,a,b,up=true){const r=[];for(let i=Math.max(a,1);i<b;i++){const p=D.M.m[i-1]-D.M.sg[i-1],q=D.M.m[i]-D.M.sg[i];if(up?(p<=0&&q>0):(p>=0&&q<0))r.push(i)}return r}
const MO=(C,k,D,o={})=>osc(C,k,{y0:540,H:300,hist:D.M.h,lines:[{arr:D.M.m,col:CY,w:5},{arr:D.M.sg,col:"#FF9F5A",w:4}],levels:[{v:0,col:MUTE,label:"0"}],title:"MACD 12 26 9",...o});
let TP3,H3,A3,B3,C3,D3,E3,HI3,EI3,EX3;
const V={stamp:"TERLAMBAT!",title:"MACD",pill:"MACD CARA BETUL",
 cheat:["Setting 12, 26, 9. MACD = jarak antara dua EMA","Histogram = momentum. Bar makin pendek = trend lemah","Uptrend: cross naik atas garisan sifar lebih kuat","Divergence harga vs histogram = amaran awal reversal","MACD lambat. Guna untuk sahkan arah, bukan cari entry"],
 groups:[{p:[0,1]}],red:[[0,3],[1,4],[1,5]],
 stampT:()=>W(1,5),
 init(){
  H3=mc(seg([[40,0,.4],[24,0.8,.3],[4,0.1,.2],[9,-1.6,.3],[12,1.1,.35]],5));TP3=64;for(let i=60;i<70;i++)if(H3.h[i]>H3.h[TP3])TP3=i;HI3=xings(H3,TP3,80,false)[0]??TP3+4;
  A3=mc(wave(100,i=>100+5*Math.sin(i/6)+2*Math.sin(i/2.2),7,1));
  B3=mc(seg([[60,0,.6],[12,1.6,.5],[14,0.55,.45],[10,0.08,.45]],9));
  C3=mc(wave(110,i=>100+0.35*i+4*Math.sin(i/4),11,0.9));
  D3=mc(seg([[60,0,.5],[12,1.7,.5],[8,-1.3,.5],[18,0.8,.45],[6,-1.2,.5]],13));
  E3=mc(seg([[64,0.15,.5],[14,1.1,.5],[18,-1.1,.5]],17));EI3=77;for(let i=70;i<82;i++)if(E3.h[i]>E3.h[EI3])EI3=i;EX3=xings(E3,EI3,96,false)[0]??EI3+5},
 hits:()=>[W(0,1),W(0,3),W(1,5),W(5,2),S(6),S(7),S(8),S(11),S(12),W(15,3),W(15,6),W(17,6),S(19),S(20),W(21,1)],
 fl:()=>[[W(1,5),"#E0465A",.45],[S(12),"#E0465A",.2],[W(17,6),"#E0465A",.25]],
 hook(t){const D=H3,T=TP3,a=T-22,b=D.n,eT=W(0,3),sT=W(1,5);const k=t<eT?prog(t,0,eT,HI3-a+1):HI3-a+1+prog(t,eT+0.15,sT+0.2,b-HI3-1);
  const C=chart(D,k,{a,b,H:470});const O=MO(C,k,D);let h=C.svg+O.svg;const x=C.X(HI3);
  if(t>=W(0,1))h+=dot(x,O.Y(D.M.m[HI3]),RED,W(0,1),t,12)+popc(x+40,O.Y(D.M.m[HI3])-60,"CROSS!",RED,"#fff",44,W(0,1),t);
  if(t>=eT){const ey=C.Y(D.c[HI3]);h+=`<line x1="${x}" x2="900" y1="${ey}" y2="${ey}" stroke="${RED}" stroke-width="4" stroke-dasharray="12 8"/>`+popc(x+90,ey+10,"SELL",RED,"#fff",58,eT,t);
   if(t>=S(1)){const q=ease((t-S(1))/0.5),ty=C.Y(D.h[T]);h+=`<rect x="${C.X(T)}" y="${ty}" width="${(x-C.X(T))*q}" height="${ey-ty}" fill="${RED}" opacity=".18" stroke="${RED}" stroke-width="3" stroke-dasharray="8 6"/>`+txt(C.X(T)-14,(ty+ey)/2,"DAH TERLEPAS",RED,40,"end",q)}}
  if(t>=sT)h+=burst(C.head[0],C.head[1],sT,t,24,RED,360,10,1);return h},
 steps:[
  (t,a,b)=>{let h="";[["12",W(5,2),190],["26",S(6),450],["9",S(7),710]].forEach(([s,t0,x])=>{if(t<t0)return;const sc=2-back((t-t0)/0.25);h+=`<g transform="translate(${x} 70) scale(${sc})"><rect x="-110" y="-70" width="220" height="140" rx="28" fill="${GOLD}"/>${txt(0,38,s,"#0F1B33",110)}</g>`+ring(x,70,t0,t,GOLD,160,0.5,10)});
   if(t>=S(8)){const D=A3,k=prog(t,S(8),E(8)+0.3,46);const e12=ema(D.c,12),e26=ema(D.c,26);const C=chart(D,k,{H:360,y0:180,lines:[{arr:e12,col:CY,w:5},{arr:e26,col:"#FF9F5A",w:5}]});
    const O=MO(C,k,D,{y0:600,H:240,hist:null,lines:[{arr:D.M.m,col:CY,w:6,glow:true}],title:"MACD = EMA12 - EMA26"});h+=C.svg+O.svg;const i=Math.min(C.last,C.b-1);if(i>C.a+2){const x=C.X(i);h+=`<line x1="${x+18}" x2="${x+18}" y1="${C.Y(e12[i])}" y2="${C.Y(e26[i])}" stroke="${GOLD}" stroke-width="6"/>`+txt(x+30,(C.Y(e12[i])+C.Y(e26[i]))/2,"JARAK",GOLD,34,"start")}}return h},
  (t,a,b)=>{const D=B3,k=prog(t,a,E(10),46);const C=chart(D,k,{H:450});const O=MO(C,k,D,{histOp:0.9});let h=C.svg+O.svg;
   if(t>=S(11)){let pk=C.a;for(let i=C.a;i<C.b;i++)if(D.M.h[i]>D.M.h[pk])pk=i;const q=ease((t-S(11))/0.6);for(let i=pk;i<=Math.min(C.b-1,pk+Math.floor(18*q));i+=3){h+=`<circle cx="${C.X(i)}" cy="${O.Y(D.M.h[i])-14}" r="7" fill="${RED}"/>`}
    h+=seg2(C.X(pk),O.Y(D.M.h[pk])-20,C.X(Math.min(C.b-1,pk+18)),O.Y(D.M.h[Math.min(C.b-1,pk+18)])-20,RED,S(11),t,6,0.6)+popc(450,O.Y(0)+5-220,"BAR MAKIN PENDEK",RED,"#fff",44,W(11,1),t)}
   if(t>=S(12)){const q=1-0.75*ease((t-S(12)-0.2)/0.8);h+=`<g transform="translate(250 40) scale(${2-back((t-S(12))/0.25)})"><rect x="-200" y="-44" width="400" height="88" rx="16" fill="rgba(5,8,15,.85)" stroke="${GOLD}" stroke-width="4"/><rect x="-182" y="-28" width="${150*q}" height="56" rx="8" fill="${q>0.5?GOLD:RED}"/>${txt(70,18,"LEMAH",RED,52)}</g>`}return h},
  (t,a,b)=>{const D=C3,k=prog(t,a,E(15)-0.3,46);const C=chart(D,k,{H:450});const zg=t>=W(15,3);const O=MO(C,k,D,{levels:[{v:0,col:zg?GOLD:MUTE,w:zg?5:2,glow:zg,label:"SIFAR"}]});let h=C.svg+O.svg;
   xings(D,C.a,C.b,true).forEach(i=>{const at=Math.max(tAt(i,C,a,E(15)-0.3),W(15,1));if(t<at)return;const strong=D.M.m[i]>0;h+=strong?dot(C.X(i),O.Y(D.M.m[i]),GOLD,at,t,14)+popc(C.X(i),O.Y(D.M.m[i])-60,"KUAT",GOLD,"#0F1B33",36,at,t):`<circle cx="${C.X(i)}" cy="${O.Y(D.M.m[i])}" r="10" fill="${MUTE}" opacity=".7"/>`});
   h+=popc(450,30,"CROSS ATAS SIFAR = LEBIH KUAT",GOLD,"#0F1B33",46,W(15,6),t);return h},
  (t,a,b)=>{const D=D3,k=prog(t,a,W(17,2),46);const C=chart(D,k,{H:450});const O=MO(C,k,D,{histOp:0.9});let h=C.svg+O.svg;let p1=64,p2=86;for(let i=64;i<77;i++)if(D.h[i]>D.h[p1])p1=i;for(let i=86;i<101;i++)if(D.h[i]>D.h[p2])p2=i;
   let r1=p1,r2=p2;for(let i=p1-3;i<=p1+3;i++)if(D.M.h[i]>D.M.h[r1])r1=i;for(let i=p2-3;i<=p2+3;i++)if(D.M.h[i]>D.M.h[r2])r2=i;
   h+=seg2(C.X(p1),C.Y(D.h[p1])-14,C.X(p2),C.Y(D.h[p2])-14,GOLD,W(17,2)+0.1,t)+seg2(C.X(r1),O.Y(D.M.h[r1])-10,C.X(r2),O.Y(D.M.h[r2])-10,RED,W(17,4),t);
   if(t>=W(17,6)){const s=2-back((t-W(17,6))/0.25);h+=`<g transform="translate(250 40) scale(${s})"><path d="M-60 40 L0 -60 L60 40 Z" fill="${RED}"/>${txt(0,26,"!","#fff",70)}${txt(80,30,"AMARAN",RED,80,"start")}</g>`}return h},
  (t,a,b)=>{const D=E3,a1=S(19)+0.2,k=prog(t,a,a1,46);const C=chart(D,k,{H:450});const O=MO(C,k,D);let h=C.svg+O.svg;
   if(t>=a1){const x1=C.X(EI3),x2=C.X(EX3),y=C.Y(D.h[EI3])-50,q=ease((t-a1)/0.5);h+=`<line x1="${x1}" x2="${lerp(x1,x2,q)}" y1="${y}" y2="${y}" stroke="${RED}" stroke-width="8"/><line x1="${x1}" x2="${x1}" y1="${y-20}" y2="${y+20}" stroke="${RED}" stroke-width="8"/>`+txt((x1+x2)/2,y-20,"LAMBAT",RED,40,"middle",q)+dot(x2,O.Y(D.M.m[EX3]),RED,a1+0.4,t,12)+`<line x1="${x2}" x2="${x2}" y1="${y}" y2="${O.Y(D.M.m[EX3])}" stroke="${RED}" stroke-width="3" stroke-dasharray="8 8" opacity="${q}"/>`}
   h+=popc(250,780,"SAHKAN ARAH",GOLD,"#0F1B33",52,S(20),t)+popc(660,780,"CARI ENTRY",RED,"#fff",52,S(21),t)+cross(660,780,90,W(21,2),t);return h}
 ]};
