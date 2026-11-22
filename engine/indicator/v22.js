// VIDEO 22: CONFLUENCE (silibus Hari 3)
function mk(c,seed){const D=ohlc(c,seed);return D}
function ck(x,y,t0,t,col=GOLD,s=1){if(t<t0)return"";const q=back((t-t0)/0.3)*s;return `<g transform="translate(${x} ${y}) scale(${q})"><circle r="30" fill="${col}"/><path d="M-14 0 L-4 11 L16 -12" stroke="#0F1B33" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`}
let D7,H7,R7,ZL,ZH;
const V={stamp:"TEKA!",title:"CONFLUENCE",sub:"Cara betul bina",pill:"CONFLUENCE CARA BETUL",cta:true,q:"KOMEN NOMBOR: 1 / 2 / 3",
 cheat:["Confluence: banyak alasan, satu tempat","Arah dulu: fundamental + timeframe besar","Lokasi: zon support resistance yang jelas","Pengesahan: reaksi candle di zon tu","Indicator paling akhir, cuma tambahan"],
 groups:[{p:[0,1]}],red:[[0,2],[0,3],[1,6]],
 stampT:()=>W(1,6),
 init(){
  // hook: chart berombak tanpa arah
  const h=[];for(let i=0;i<46;i++)h.push(104+2.2*Math.sin(i/2.1)+1.3*Math.sin(i/0.9+1)+(rnd(i*3.7)-0.5)*1.2);
  for(let i=24;i<46;i++)h[i]-=(i-23)*0.32;H7=mk(h,11);
  // chart utama: naik, tarik balik ke zon, engulfing, sambung naik
  const c=[];for(let i=0;i<18;i++)c.push(100+0.5*i+(rnd(i*5.3)-0.5)*0.8);
  for(let i=18;i<28;i++)c.push(108.6-0.52*(i-17)+(rnd(i*2.9)-0.5)*0.5);
  c.push(c[27]-0.5);c.push(c[27]+1.0);
  for(let i=30;i<46;i++)c.push(c[29]+0.55*(i-29)+(rnd(i*4.1)-0.5)*0.7);
  D7=mk(c,7);
  // zon support: kawasan sekitar candle 6 hingga 9 (resistance lama jadi support)
  ZL=Math.min(D7.l[27],D7.l[28])-0.15;ZH=ZL+1.3;
  R7=rsi(c,14)},
 hits:()=>[W(0,2),W(1,6),S(5),W(6,2),S(8),W(9,0),S(11),W(15,1),S(18),S(20),S(22)],
 fl:()=>[[W(1,6),"#E0465A",.35],[S(20),"#E0465A",.3],[S(22),"#E7CE7C",.3]],
 hook(t){const D=H7,a1=W(1,6),k=20+prog(t,0,a1,26);const C=chart(D,k,{a:0,b:46,H:600,y0:120});let h=C.svg;
  const e=22;if(t>=W(0,2)){const x=C.X(e),y=C.Y(D.c[e]);h+=dot(x,y,GOLD,W(0,2),t,13)+popc(x,y-110,"BUY",GOLD,"#0F1B33",52,W(0,2),t)+popc(x+40,y+110,"1 ALASAN",RED,"#fff",44,W(0,3),t)}
  if(t>=S(1))h+=popc(700,80,"RASA JE",INK,"#0F1B33",46,S(1),t);
  if(t>=W(1,6))h+=burst(C.head[0],C.head[1],W(1,6),t,24,RED,320,9,1)+popc(680,C.head[1]+110,"KENA SL",RED,"#fff",52,W(1,6),t);return h},
 steps:[
  (t,a,b)=>{let h="";const L=[["ARAH",GOLD,160,200,W(5,2)],["LOKASI",CY,740,200,W(5,3)],["PENGESAHAN",INK,450,700,W(5,4)]];
   const cv=ease((t-S(6))/Math.max(0.3,E(6)-S(6)));
   const tgt=[[340,340],[560,340],[450,520]];
   L.forEach(([s,col,x,y,t0],i)=>{if(t<t0)return;const q=back((t-t0)/0.3),px=lerp(x,tgt[i][0],cv),py=lerp(y,tgt[i][1],cv);
    h+=`<g transform="translate(${px} ${py}) scale(${q})"><circle r="170" fill="${col}" fill-opacity=".16" stroke="${col}" stroke-width="7"/>${txt(0,i===2?120:-30,s,col,i===2?44:52)}</g>`});
   if(t>=W(6,2)){h+=`<circle cx="450" cy="410" r="${26*back((t-W(6,2))/0.3)}" fill="#fff" filter="url(#gw)"/>`+ring(450,410,W(6,2),t,GOLD,200,0.7,12)+popc(450,820,"SATU TEMPAT",GOLD,"#0F1B33",60,W(6,2),t)}
   h+=popc(450,30,"BANYAK ALASAN",GOLD,"#0F1B33",54,W(5,2),t);return h},
  (t,a,b)=>{const D=D7,k=prog(t,a,a+1.2,46);const C=chart(D,k,{a:0,b:46,H:560,y0:120});let h="";
   if(t>=S(8)){const q=ease((t-S(8))/0.6);h+=`<line x1="${C.X(1)}" y1="${C.Y(D.l[1])+30}" x2="${lerp(C.X(1),C.X(45),q)}" y2="${lerp(C.Y(D.l[1])+30,C.Y(D.h[45])+60,q)}" stroke="${GOLD}" stroke-width="12" stroke-linecap="round" opacity=".35"/>`+popc(450,30,"ARAH: NAIK",GOLD,"#0F1B33",60,S(8),t)}
   h+=C.svg;
   const rows=[["FUNDAMENTAL",W(9,0)],["TIMEFRAME BESAR",W(9,3)]];
   rows.forEach(([s,t0],i)=>{if(t<t0)return;const y=740+i*90,q=ease((t-t0)/0.3);h+=`<g opacity="${q}"><rect x="140" y="${y-48}" width="620" height="80" rx="20" fill="rgba(5,8,15,.85)" stroke="${GOLD}" stroke-width="4"/>${txt(230,y+10,s,INK,46,"start")}</g>`+ck(190,y-8,t0,t)});return h},
  (t,a,b)=>{const D=D7,k=18+prog(t,a,b-0.1,10);const C=chart(D,k,{a:0,b:46,H:620,y0:140,extra:[ZL-0.5]});let h="";
   const zq=t>=S(11)?ease((t-S(11))/0.5):0;if(zq>0)h+=band(C.Y(ZH),C.Y(ZL),CY,zq,0.2)+txt(890,C.Y(ZL)+50,"ZON SUPPORT",CY,40,"end",zq);
   h+=C.svg;
   if(t>=S(12)){[7,8].forEach((i,j)=>{h+=ring(C.X(i),C.Y(D.l[i]),S(12)+j*0.2,t,CY,90,0.6,8)})}
   h+=popc(450,30,"TAMBAH LOKASI",CY,"#0F1B33",56,S(11),t);if(t>=W(12,3))h+=ck(820,30,W(12,3),t,CY);return h},
  (t,a,b)=>{const D=D7,k=28+prog(t,a,W(15,1),3);const C=chart(D,k,{a:0,b:46,H:620,y0:140,extra:[ZL-0.5]});let h=band(C.Y(ZH),C.Y(ZL),CY,1,0.2)+C.svg;
   const j=29;if(t>=W(15,1)){const x=C.X(j),y=C.Y(D.h[j]);h+=`<rect x="${C.X(j-1)-C.cw*0.6}" y="${C.Y(D.h[j])-14}" width="${C.cw*2.2}" height="${C.Y(D.l[28])-C.Y(D.h[j])+28}" rx="12" fill="none" stroke="${GOLD}" stroke-width="6" filter="url(#gw)"/>`+ring(x,y,W(15,1),t,GOLD,140,0.6,10)+popc(x,y-80,"REAKSI DI ZON",GOLD,"#0F1B33",46,W(15,1),t)}
   if(t>=S(16))h+=popc(330,830,"ENGULFING",GOLD,"#0F1B33",52,W(16,1),t)+popc(650,830,"PIN BAR",INK,"#0F1B33",52,W(16,3),t);
   h+=popc(450,30,"TAMBAH PENGESAHAN",INK,"#0F1B33",52,S(14),t);return h},
  (t,a,b)=>{const D=D7,k=31+prog(t,a,a+1.2,15);const C=chart(D,k,{a:0,b:46,H:330,y0:80,extra:[ZL-0.5]});let h=band(C.Y(ZH),C.Y(ZL),CY,1,0.2)+C.svg;
   if(t>=S(18)){const O=osc(C,k,{H:170,y0:440,range:[0,100],levels:[{v:70,label:"70"},{v:30,label:"30"}],lines:[{arr:R7,col:PU,w:5}],title:"RSI 14"});h+=`<g opacity="${ease((t-S(18))/0.4)}">${O.svg}</g>`}
   h+=popc(450,20,"INDICATOR PALING AKHIR",PU,"#0F1B33",48,S(18),t);
   if(t>=W(19,2)&&t<S(20))h+=popc(450,665,"CUMA TAMBAHAN",INK,"#0F1B33",44,W(19,2),t);
   if(t>=S(20)){const q=ease((t-S(20))/0.3);h+=`<rect x="0" y="0" width="900" height="880" fill="#05080F" opacity="${0.82*q}"/>`;
    h+=popc(450,250,"1 ALASAN",RED,"#fff",80,S(20),t)+popc(450,360,"= TEKA",RED,"#fff",70,S(21),t)}
   if(t>=S(22)){h+=cross(450,300,150,S(22)-0.05,t);["ARAH","LOKASI","PENGESAHAN"].forEach((s,i)=>{const t0=S(22)+i*0.12;if(t<t0)return;h+=`<g opacity="${ease((t-t0)/0.25)}"><rect x="170" y="${470+i*90}" width="560" height="74" rx="18" fill="rgba(231,206,124,.12)" stroke="${GOLD}" stroke-width="4"/>${txt(290,520+i*90,s,INK,44,"start")}</g>`+ck(225,507+i*90,t0,t)});
    h+=popc(450,780,"3 ALASAN = PELAN",GOLD,"#0F1B33",64,S(23),t)}return h}
 ]};
