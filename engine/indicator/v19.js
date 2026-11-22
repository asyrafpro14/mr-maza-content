// VIDEO 19: TOP DOWN H4 > H1 > M30
function wv4(n,f,seed,z=0.5){const c=[];for(let i=0;i<n;i++)c.push(f(i)+(rnd(i*7.31+seed)-0.5)*2*z);return ohlc(c,seed)}
function tfChip(x,y,s,col,q=1){return `<g opacity="${q}"><rect x="${x-90}" y="${y-48}" width="180" height="70" rx="18" fill="${col}"/>${txt(x,y+6,s,"#0F1B33",54)}</g>`}
let M4,H4,H1,M30;
const V={stamp:"SALAH ARAH",title:"TOP DOWN",sub:"Cara betul buat",pill:"TOP DOWN CARA BETUL",
 cta:true,q:"KOMEN: H4 / H1 / M30",msgRe:/^Top down bukan/,m1:"TOP DOWN",m3:"Ia peta untuk",m4:"STORY CHART",
 msgTimes:()=>[S(iMsg),W(iMsg,2),S(iMsg+1),W(iMsg+1,3)],
 cheat:["H4: tentukan arah besar dan zon penting","H1: baca struktur, harga tolak atau rehat","M30: cari pengesahan, bukan arah baru","H4 dan M30 bercanggah? Tunggu","Arah dari atas, ketepatan dari bawah"],
 groups:[{p:[0,1]}],red:[[0,1],[0,4],[1,4],[1,5]],
 stampT:()=>W(1,5),
 init(){
  M4=wv4(46,i=>100+0.32*i+1.0*Math.sin(i/2.2),3,0.45);
  H4=wv4(46,i=>i<30?130-0.75*i+2.6*Math.sin(i/2.4):107.5-0.25*(i-30)+1.6*Math.sin(i/1.8),5,0.6);
  H1=wv4(46,i=>i<10?100-0.6*i:i<26?94+0.55*(i-10)+1.0*Math.sin(i/1.6):i<36?102.8+0.9*Math.sin(i/1.1):102.8-0.7*(i-36),9,0.45);
  M30=wv4(46,i=>i<28?98+0.18*i+1.1*Math.sin(i/1.7):103-0.0*(i-28)+0.6*Math.sin(i),11,0.4);
  // candle tolak (ekor atas panjang + engulf turun) di zon
  {const j=30;M30.o[j]=103.2;M30.c[j]=103.6;M30.h[j]=106.2;M30.l[j]=102.9;M30.o[j+1]=103.6;M30.c[j+1]=101.2;M30.h[j+1]=104;M30.l[j+1]=101;
   for(let i=j+2;i<46;i++){const v=101.2-0.35*(i-j-1)+0.5*Math.sin(i);M30.c[i]=v;M30.o[i]=M30.c[i-1];M30.h[i]=Math.max(v,M30.o[i])+0.35;M30.l[i]=Math.min(v,M30.o[i])-0.35}}},
 hits:()=>[W(0,0),W(0,4),W(1,4),W(1,5),S(5),W(6,2),S(8),W(10,2),W(10,5),S(12),W(13,4),S(14),W(16,4),S(17),S(18),S(20),S(21),S(22)],
 fl:()=>[[W(1,5),"#E0465A",.35],[S(17),"#E0465A",.3],[S(22),"#E0465A",.3]],
 hook(t){let h="";const zT=W(1,0);
  if(t<zT+0.35){const op=t<zT?1:1-ease((t-zT)/0.35);const k=12+prog(t,0,zT,34);const C=chart(M4,k,{a:0,b:46,H:600,y0:200});
   h+=`<g opacity="${op}">`+C.svg+tfChip(110,150,"M5",CY)+(t>=W(0,1)?popc(C.head[0]-120,C.head[1]-90,"BUY",GOLD,"#0F1B33",56,W(0,1),t):"")+`</g>`}
  if(t>=zT){const q=ease((t-zT)/0.5);const C=chart(H4,46,{a:0,b:46,H:600,y0:200});
   h+=`<g opacity="${q}">`+C.svg+tfChip(110,150,"H4",GOLD)+`</g>`;
   const bx=C.X(40),by=C.Y(108);const s=lerp(4,1,q);h+=`<rect x="${bx-60*s}" y="${by-70*s}" width="${120*s}" height="${140*s}" rx="10" fill="none" stroke="${CY}" stroke-width="5" opacity="${q}"/>`;
   if(t>=W(1,2))h+=popc(bx-20,by+130,"M5 KAU",CY,"#0F1B33",42,W(1,2),t);
   if(t>=W(1,4)){const p=ease((t-W(1,4))/0.6);h+=`<line x1="${C.X(2)}" y1="${C.Y(132)}" x2="${lerp(C.X(2),C.X(44),p)}" y2="${lerp(C.Y(132),C.Y(100),p)}" stroke="${RED}" stroke-width="12" stroke-linecap="round" opacity=".85" filter="url(#gw)"/>`+popc(620,C.Y(124),"ARAH BESAR TURUN",RED,"#fff",46,W(1,4),t)}}
  return h},
 steps:[
  (t,a,b)=>{const D=H4,a1=W(6,2),k=prog(t,a,a1,46);const C=chart(D,k,{a:0,b:46,H:640,y0:170,extra:[134]});let h="";
   const zt=W(6,4);if(t>=zt)h+=band(C.Y(124),C.Y(120.5),RED,ease((t-zt)/0.5),0.2)+txt(890,C.Y(124)-14,"ZON PENTING",RED,40,"end",ease((t-zt)/0.5));
   h+=C.svg+tfChip(110,90,"H4",GOLD,ease((t-a)/0.3));
   if(t>=W(6,1)){const p=ease((t-W(6,1))/0.6);h+=`<line x1="${C.X(1)}" y1="${C.Y(131)}" x2="${lerp(C.X(1),C.X(44),p)}" y2="${lerp(C.Y(131),C.Y(101),p)}" stroke="${GOLD}" stroke-width="8" stroke-dasharray="16 12" opacity=".8"/>`+popc(640,90,"ARAH: TURUN",GOLD,"#0F1B33",52,W(6,2),t)}
   return h},
  (t,a,b)=>{const D=H1,a1=W(10,5),k=prog(t,a,a1,46);const C=chart(D,k,{a:0,b:46,H:640,y0:170});let h="";
   h+=band(C.Y(104.6),C.Y(102.2),RED,1,0.15)+txt(890,C.Y(104.6)-14,"ZON H4",RED,38,"end");
   h+=C.svg+tfChip(110,90,"H1",GOLD,ease((t-a)/0.3));
   const lo=peaks(D.l,0,26,3,true).slice(-1)[0]??10;
   if(t>=S(9)){h+=dot(C.X(lo),C.Y(D.l[lo])+20,CY,S(9),t,12)+popc(C.X(lo),C.Y(D.l[lo])+90,"LOW",CY,"#0F1B33",40,S(9),t)}
   const tt=Math.max(W(10,2),tAt(25,C,a,a1));if(t>=tt)h+=popc(C.X(22),C.Y(D.h[22])-90,"TOLAK NAIK",GOLD,"#0F1B33",44,tt,t);
   const rt=Math.max(W(10,5),tAt(34,C,a,a1));if(t>=rt)h+=`<rect x="${C.X(27)}" y="${C.Y(104.4)}" width="${C.X(36)-C.X(27)}" height="${C.Y(101.2)-C.Y(104.4)}" rx="12" fill="none" stroke="${CY}" stroke-width="5" stroke-dasharray="12 8"/>`+popc(C.X(31),C.Y(101.2)+70,"REHAT",CY,"#0F1B33",44,rt,t);
   return h},
  (t,a,b)=>{const D=M30,a1=E(13),k=prog(t,a,a1,46);const C=chart(D,k,{a:0,b:46,H:640,y0:170,extra:[107]});let h="";
   h+=band(C.Y(106),C.Y(103),RED,1,0.15)+txt(10,C.Y(106)-14,"ZON H4",RED,38,"start");
   h+=C.svg+tfChip(110,90,"M30",GOLD,ease((t-a)/0.3));
   const ct=Math.max(W(13,4),tAt(31,C,a,a1));if(t>=ct){const x=C.X(30.5),y=C.Y(106.4);h+=`<rect x="${x-C.cw*1.6}" y="${y-20}" width="${C.cw*3.2}" height="${C.Y(100.8)-y+40}" rx="14" fill="none" stroke="${GOLD}" stroke-width="5" filter="url(#gw)"/>`+ring(x,y,ct,t,GOLD,140,0.6,10)+popc(x-60,y-70,"PENGESAHAN",GOLD,"#0F1B33",46,ct,t)}
   if(t>=S(14)){const q=ease((t-S(14))/0.3);h+=`<g opacity="${q}">`+arrow(760,C.Y(100)+40,-1,140,CY,1,10)+`</g>`+cross(760,C.Y(100)-40,60,W(14,1),t)+popc(560,40,"BUKAN ARAH BARU",RED,"#fff",50,W(14,1),t)}
   return h},
  (t,a,b)=>{let h="";const q=ease((t-a)/0.4);
   h+=`<g opacity="${q}"><rect x="20" y="120" width="410" height="480" rx="26" fill="rgba(5,8,15,.6)" stroke="${GOLD}" stroke-width="5"/><rect x="470" y="120" width="410" height="480" rx="26" fill="rgba(5,8,15,.6)" stroke="${CY}" stroke-width="5"/></g>`;
   h+=tfChip(225,200,"H4",GOLD,q)+tfChip(675,200,"M30",CY,q);
   if(t>=W(16,1))h+=arrow(225,300,1,150,RED,ease((t-W(16,1))/0.4),14)+txt(225,575,"TURUN",RED,46,"middle",ease((t-W(16,1))/0.4));
   if(t>=W(16,3))h+=arrow(675,480,-1,150,GOLD,ease((t-W(16,3))/0.4),14)+txt(675,575,"NAIK",GOLD,46,"middle",ease((t-W(16,3))/0.4));
   if(t>=W(16,4))h+=popc(450,70,"BERCANGGAH",RED,"#fff",62,W(16,4),t);
   if(t>=S(17)){const p=back((t-S(17))/0.3);h+=`<g transform="translate(450 700) scale(${p})"><rect x="-210" y="-70" width="420" height="140" rx="30" fill="${GOLD}"/><rect x="-170" y="-40" width="22" height="80" rx="6" fill="#0F1B33"/><rect x="-130" y="-40" width="22" height="80" rx="6" fill="#0F1B33"/>${txt(40,32,"TUNGGU","#0F1B33",90)}</g>`}
   if(t>=S(18))h+=popc(450,820,"TAK TRADE = KEPUTUSAN",INK,"#0F1B33",48,S(18),t);
   return h},
  (t,a,b)=>{let h="";const rows=[["H4",700,GOLD],["H1",500,GOLD],["M30",300,CY]];
   rows.forEach(([s,w,col],i)=>{const t0=a+0.1+i*0.15;if(t<t0)return;const q=back((t-t0)/0.3),y=150+i*170;h+=`<g transform="translate(450 ${y+60}) scale(${q} 1)"><rect x="${-w/2}" y="-60" width="${w}" height="120" rx="20" fill="rgba(5,8,15,.7)" stroke="${col}" stroke-width="6"/></g>`+txt(450,y+82,s,col,72,"middle",cl((t-t0)/0.2))});
   if(t>=S(20))h+=arrow(50,150,1,420,GOLD,ease((t-S(20))/0.5),12)+popc(150,95,"ARAH",GOLD,"#0F1B33",44,S(20),t);
   if(t>=S(21))h+=popc(745,550,"KETEPATAN",CY,"#0F1B33",48,W(21,0),t);
   if(t>=S(22)){h+=popc(450,760,"JANGAN TERBALIKKAN",RED,"#fff",56,S(22),t)}
   return h}
 ]};
