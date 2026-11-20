// VIDEO 4: STOCHASTIC
function wave(n,f,seed,z=0.5){const c=[];for(let i=0;i<n;i++)c.push(f(i)+(rnd(i*7.31+seed)-0.5)*2*z);return ohlc(c,seed)}
function st(D){D.K=stoch(D);return D}
function kx(D,a,b,up,lv){const r=[];for(let i=Math.max(a,1);i<b;i++){const p=D.K.k[i-1]-D.K.d[i-1],q=D.K.k[i]-D.K.d[i];if(D.K.d[i]==null||D.K.d[i-1]==null)continue;if(up?(p<=0&&q>0&&D.K.k[i]<lv):(p>=0&&q<0&&D.K.k[i]>lv))r.push(i)}return r}
const SO=(C,k,D,o={})=>osc(C,k,{y0:540,H:300,range:[0,100],lines:[{arr:D.K.k,col:CY,w:5},{arr:D.K.d,col:"#FF9F5A",w:4}],levels:[{v:80,col:RED,label:"80"},{v:20,col:GOLD,label:"20"}],title:"STOCH 14 3 3",...o});
let H4,A4,B4,C4,D4,E4;
const V={stamp:"PERANGKAP!",title:"STOCHASTIC",pill:"STOCHASTIC CARA BETUL",
 cheat:["Stochastic banding harga tutup dengan julat high low 14 candle","Atas 80 overbought, bawah 20 oversold. Itu bukan signal","Uptrend: cari cross naik dari kawasan 20","Downtrend: cari cross turun dari kawasan 80","Paling berguna dalam sideways, dekat zon SNR"],
 groups:[{p:[0,1],until:2},{p:[2,3]}],red:[[0,2],[0,3],[1,2],[3,1]],
 stampT:()=>W(3,1),
 init(){
  H4=st(wave(80,i=>100+(i>30?0.9*(i-30):0)+1.8*Math.sin(i/2.4),3,1.0));
  A4=st(wave(80,i=>100+5*Math.sin(i/5)+2*Math.sin(i/2),5,1));
  B4=st(wave(80,i=>100+6*Math.sin(i/4.2),7,1.2));
  C4=st(wave(84,i=>100+0.55*i+6.5*Math.sin(i/3.2),11,0.8));
  D4=st(wave(84,i=>160-0.55*i-6.5*Math.sin(i/3.2),13,0.8));
  E4=st(wave(84,i=>100+7.5*Math.sin(i/3.6),17,1.0))},
 hits:()=>[W(0,3),W(1,2),W(3,1),W(7,6),W(8,2),S(10),S(11),S(12),W(15,2),W(18,2),W(21,1)],
 fl:()=>[[W(3,1),"#E0465A",.45],[S(12),"#E0465A",.25]],
 hook(t){const D=H4,b=D.n,a=b-46;let si=a+24;for(let i=a+20;i<a+32;i++)if(D.K.k[i]>85){si=i;break}const sellT=W(1,2),sT=W(3,1);
  const k=t<sellT?prog(t,0,sellT,si-a+1):si-a+1+prog(t,sellT+0.15,sT,b-si-1);const C=chart(D,k,{a,b,H:470});const O=SO(C,k,D,{zones:[[80,100,RED,0.18]]});let h=C.svg+O.svg;const x=C.X(si);
  if(t>=W(0,3))h+=dot(x,O.Y(D.K.k[si]),RED,W(0,3),t,12);
  if(t>=sellT){const ey=C.Y(D.c[si]);h+=`<line x1="${x}" x2="900" y1="${ey}" y2="${ey}" stroke="${RED}" stroke-width="4" stroke-dasharray="12 8"/>`+popc(x-20,ey+80,"SELL",RED,"#fff",60,sellT,t);
   if(t>sellT+0.4){const pp=Math.max(0,Math.round((ey-C.head[1])*1.6));h+=chip(730,40,`-${pp} PIPS`,"rgba(224,70,90,.25)",RED,56)}}
  if(t>=S(2))h+=popc(200,40,"TREND KUAT",GOLD,"#0F1B33",50,S(2),t);
  if(t>=sT)h+=burst(C.head[0],C.head[1],sT,t,24,RED,360,10,1);return h},
 steps:[
  (t,a,b)=>{const D=A4,k=prog(t,a,W(7,3),46);const C=chart(D,k,{H:470});const O=SO(C,k,D);let h=C.svg+O.svg;
   if(t>=W(7,5)){const i1=Math.min(C.last,C.b-1),i0=i1-13;if(i0>C.a){let hh=-1e9,ll=1e9;for(let j=i0;j<=i1;j++){hh=Math.max(hh,D.h[j]);ll=Math.min(ll,D.l[j])}const q=ease((t-W(7,5))/0.4);
     h+=`<rect x="${C.X(i0)-C.cw/2}" y="${C.Y(hh)}" width="${(C.X(i1)-C.X(i0)+C.cw)*q}" height="${C.Y(ll)-C.Y(hh)}" fill="${CY}" opacity=".1" stroke="${CY}" stroke-width="3" stroke-dasharray="8 6"/>`+txt(C.X(i0),C.Y(hh)-12,"HIGH",CY,34,"start",q)+txt(C.X(i0),C.Y(ll)+40,"LOW",CY,34,"start",q)+dot(C.X(i1),C.Y(D.c[i1]),GOLD,W(7,3),t,12)}}
   h+=popc(450,30,"14 CANDLE",CY,"#0F1B33",60,W(8,1),t);return h},
  (t,a,b)=>{const D=B4,k=prog(t,a,E(11),46);const C=chart(D,k,{H:470});const z1=t>=S(10),z2=t>=S(11);const O=SO(C,k,D,{zones:[...(z1?[[80,100,RED,0.25]]:[]),...(z2?[[0,20,GOLD,0.22]]:[])]});let h=C.svg+O.svg;
   h+=popc(300,O.Y(90)+12,"OVERBOUGHT",RED,"#fff",40,S(10),t)+popc(600,O.Y(10)+12,"OVERSOLD",GOLD,"#0F1B33",40,S(11),t);
   if(t>=S(12)){const s=2-back((t-S(12))/0.25);h+=`<g transform="translate(450 60) rotate(-4) scale(${s})"><rect x="-260" y="-60" width="520" height="110" rx="20" fill="rgba(5,8,15,.85)" stroke="${RED}" stroke-width="8"/>${txt(0,26,"BUKAN SIGNAL",RED,76)}</g>`}return h},
  (t,a,b)=>{const D=C4,a1=E(15),k=prog(t,a,a1,46);const C=chart(D,k,{H:470});const O=SO(C,k,D,{zones:[[0,30,GOLD,0.18]]});let h=C.svg+O.svg;
   kx(D,C.a,C.b,true,40).forEach(i=>{const at=Math.max(tAt(i,C,a,a1),W(15,1));if(t<at)return;h+=dot(C.X(i),O.Y(D.K.k[i]),GOLD,at,t,11)+arrow(C.X(i),C.Y(D.l[i])+90,-1,40,GOLD,ease((t-at)/0.3),8)});
   h+=popc(450,30,"CROSS NAIK DARI 20",GOLD,"#0F1B33",56,W(15,3),t);return h},
  (t,a,b)=>{const D=D4,a1=E(18),k=prog(t,a,a1,46);const C=chart(D,k,{H:470});const O=SO(C,k,D,{zones:[[70,100,RED,0.18]]});let h=C.svg+O.svg;
   kx(D,C.a,C.b,false,60).forEach(i=>{const at=Math.max(tAt(i,C,a,a1),W(18,1));if(t<at)return;h+=dot(C.X(i),O.Y(D.K.k[i]),RED,at,t,11)+arrow(C.X(i),C.Y(D.h[i])-90,1,40,RED,ease((t-at)/0.3),8)});
   h+=popc(450,30,"CROSS TURUN DARI 80",RED,"#fff",56,W(18,3),t);return h},
  (t,a,b)=>{const D=E4,a1=E(20),k=prog(t,a,a1,46);const C0=chart(D,46,{H:470});let hi=-1e9,lo=1e9;for(let i=C0.a;i<C0.b;i++){hi=Math.max(hi,D.h[i]);lo=Math.min(lo,D.l[i])}
   const zt=W(21,1),zq=t>=zt?ease((t-zt)/0.4):0;let h="";if(zq>0)h+=band(C0.Y(hi)-20,C0.Y(hi)+50,RED,zq,0.2)+band(C0.Y(lo)-50,C0.Y(lo)+20,GOLD,zq,0.2)+txt(890,C0.Y(hi)-30,"ZON RESISTANCE",RED,34,"end",zq)+txt(890,C0.Y(lo)+56,"ZON SUPPORT",GOLD,34,"end",zq);
   const C=chart(D,k,{H:470});const O=SO(C,k,D);h+=C.svg+O.svg;
   if(zq>0){let last=-9;for(let i=C.a+2;i<C.b-2;i++){if(i>C.last)break;const top=D.h[i]>=hi-2.5&&D.h[i]>=Math.max(D.h[i-1],D.h[i+1]),bot=D.l[i]<=lo+2.5&&D.l[i]<=Math.min(D.l[i-1],D.l[i+1]);if((!top&&!bot)||i-last<4)continue;last=i;const at=Math.max(zt+0.3,tAt(i,C,a,a1));if(t<at)continue;
     h+=`<g opacity="${ease((t-at)/0.25)}">`+(top?arrow(C.X(i),C.Y(D.h[i])-100,1,40,RED,1,8):arrow(C.X(i),C.Y(D.l[i])+100,-1,40,GOLD,1,8))+`</g>`+dot(C.X(i),O.Y(D.K.k[i]),top?RED:GOLD,at,t,9)}}
   h+=popc(170,-30,"SIDEWAYS",CY,"#0F1B33",56,W(20,5),t);return h}
 ]};
