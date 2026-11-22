// VIDEO 16: BREAKOUT PALSU
function pth(pts,seed,z=0.45,n){n=n||pts[pts.length-1][0]+1;const c=[];let k=0;for(let i=0;i<n;i++){while(k<pts.length-2&&i>pts[k+1][0])k++;const [i0,v0]=pts[k],[i1,v1]=pts[k+1];const p=cl((i-i0)/((i1-i0)||1));c.push(lerp(v0,v1,p)+(rnd(i*7.31+seed)-0.5)*2*z)}return ohlc(c,seed)}
function setC(D,i,o,c,h,l){D.o[i]=o;D.c[i]=c;D.h[i]=h;D.l[i]=l;if(i+1<D.n)D.o[i+1]=c}
function capR(D,a,b,top){for(let i=a;i<b;i++){D.c[i]=Math.min(D.c[i],top-0.3);D.o[i]=Math.min(D.o[i],top-0.3);D.h[i]=Math.min(D.h[i],top-0.05)}}
function bigC(x,o,c,hi,lo,Y,w,col,op=1){const top=Y(Math.max(o,c)),bot=Y(Math.min(o,c));return `<g opacity="${op}"><line x1="${x}" x2="${x}" y1="${Y(hi)}" y2="${Y(lo)}" stroke="${col}" stroke-width="10" stroke-linecap="round"/><rect x="${x-w/2}" y="${top}" width="${w}" height="${Math.max(6,bot-top)}" rx="10" fill="${col}"/></g>`}
function tick(x,y,t0,t){if(t<t0)return"";const q=back((t-t0)/0.3);return `<g transform="translate(${x} ${y}) scale(${q})"><circle r="44" fill="${GOLD}"/><path d="M-20 0 L-5 16 L22 -18" stroke="#0F1B33" stroke-width="10" fill="none" stroke-linecap="round"/></g>`}
const RL=104;let H1,R1,T1,M1;
const V={stamp:"TRAP!",title:"BREAKOUT",sub:"Cara betul baca",pill:"BREAKOUT CARA BETUL",cta:true,q:"KOMEN: YA / TAK",
 msgRe:/^Breakout bukan/,m1:"BREAKOUT",m3:"Sebahagian dari",m4:"STORY CHART",msgTimes:()=>[S(23),W(23,1),S(24),W(24,3)],
 cheat:["Breakout sah = candle TUTUP lepas level","Ekor je tembus = belum breakout","Badan besar ada tenaga, ekor panjang = ditolak","Breakout sah selalu retest level dan bertahan","Lawan arah TF besar = peluang palsu tinggi"],
 groups:[{p:[0,1]}],red:[[0,1],[1,5]],
 stampT:()=>W(1,5),
 init(){
  H1=pth([[0,99],[6,103],[11,99.5],[17,103.3],[23,99.8],[28,103.2]],3,0.7,46);capR(H1,0,29,RL);
  setC(H1,29,H1.c[28],105.4,105.8,H1.c[28]-0.3);setC(H1,30,105.4,105.9,106.6,105);setC(H1,31,105.9,104.6,106.2,104.4);
  for(let i=32;i<46;i++){const v=104.4-(i-31)*0.62+Math.sin(i)*0.5;setC(H1,i,H1.c[i-1],v,Math.max(v,H1.c[i-1])+0.35,Math.min(v,H1.c[i-1])-0.4)}
  R1=pth([[0,100],[5,103.5],[10,100],[15,103.6],[20,99.8],[25,103.5],[30,100.2],[35,103.4],[40,100.5],[44,103]],5,0.6,46);capR(R1,0,45,RL);
  setC(R1,45,R1.c[44],103.4,105.6,R1.c[44]-0.3);
  T1=pth([[0,99],[6,102.5],[11,100],[17,103],[22,100.6],[24,103.4]],9,0.6,46);capR(T1,0,25,RL);
  setC(T1,25,T1.c[24],105.8,106.1,T1.c[24]-0.2);
  {const pts=[[26,106.6],[29,107.6],[33,104.4],[35,104.7],[40,108.5],[45,110.5]];const tmp=pth([[0,0],[45,0]],13,0.4,46);let k=0;
   for(let i=26;i<46;i++){while(k<pts.length-2&&i>pts[k+1][0])k++;const [i0,v0]=pts[k],[i1,v1]=pts[k+1];const v=lerp(v0,v1,cl((i-i0)/(i1-i0)))+tmp.c[i];const o=T1.c[i-1];setC(T1,i,o,v,Math.max(o,v)+0.35,Math.max(RL+0.15,Math.min(o,v)-0.35))}}
  M1=pth([[0,100],[8,102],[14,100.5],[20,102.4],[26,101],[30,102.2]],17,0.4,46);capR(M1,0,31,103);
  setC(M1,31,M1.c[30],103.8,104.1,M1.c[30]-0.2);for(let i=32;i<46;i++){const v=103.8-(i-31)*0.45+Math.sin(i*1.3)*0.35;setC(M1,i,M1.c[i-1],v,Math.max(v,M1.c[i-1])+0.3,Math.min(v,M1.c[i-1])-0.3)}},
 hits:()=>[W(0,1),W(1,5),W(5,6),S(7),S(10),S(13),W(16,3),W(18,6),S(19),W(21,3),S(22)],
 fl:()=>[[W(1,5),"#E0465A",.35],[S(7),"#E0465A",.3],[S(22),"#E0465A",.3]],
 hook(t){const D=H1,bT=W(0,1),a1=W(1,5);const k=t<bT?prog(t,0,bT,31):31+prog(t,bT+0.2,a1,15);
  const C=chart(D,k,{a:0,b:46,H:600,y0:180});let h=`<line x1="0" x2="900" y1="${C.Y(RL)}" y2="${C.Y(RL)}" stroke="${RED}" stroke-width="5" stroke-dasharray="14 10"/>`+txt(10,C.Y(RL)-14,"RESISTANCE",RED,36,"start");
  h+=C.svg;
  if(t>=bT&&C.last>=29){h+=ring(C.X(29),C.Y(105.8),bT,t,GOLD,140,0.6,10)+popc(C.X(29)-20,C.Y(106.6)-70,"PECAH! BUY?",GOLD,"#0F1B33",46,bT,t)}
  if(t>=a1-0.4)h+=popc(640,C.Y(100)+40,"JATUH BALIK",RED,"#fff",48,a1-0.4,t);
  if(t>=a1)h+=burst(C.head[0],C.head[1],a1,t,22,RED,320,9,1);return h},
 steps:[
  (t,a,b)=>{const Y=v=>860-(v-30)*12;let h="";const lv=62,x1=280,x2=620;
   h+=`<line x1="0" x2="900" y1="${Y(lv)}" y2="${Y(lv)}" stroke="${RED}" stroke-width="6" stroke-dasharray="16 10" opacity="${ease((t-a)/0.3)}"/>`+txt(10,Y(lv)-16,"LEVEL",RED,40,"start",ease((t-a)/0.3));
   // candle sah: tutup lepas level
   const g=ease((t-a-0.2)/Math.max(0.3,W(5,5)-a-0.2));if(t>=a+0.2)h+=bigC(x2,46,lerp(46,72,g),lerp(47,75,g),43,Y,150,GOLD);
   if(t>=W(5,5))h+=popc(x2,Y(80),"TUTUP LEPAS",GOLD,"#0F1B33",46,W(5,5),t)+tick(x2+120,Y(72),W(5,6),t);
   // ekor je tembus
   if(t>=S(6)){const q=ease((t-S(6))/0.6);h+=bigC(x1,46,lerp(46,57,q),lerp(47,70,q),43,Y,150,GOLD);if(t>=W(6,1))h+=popc(x1,Y(76),"EKOR JE",CY,"#0F1B33",46,W(6,1),t)}
   if(t>=S(7))h+=cross(x1,Y(52),70,S(7),t)+popc(450,790,"BELUM BREAKOUT",RED,"#fff",58,S(7),t);
   return h},
  (t,a,b)=>{const Y=v=>860-(v-30)*12;let h="";const x1=270,x2=630;
   if(t>=a+0.1){const g=ease((t-a-0.1)/Math.max(0.3,S(10)-a));h+=bigC(x1,40,lerp(40,74,g),lerp(41,75,g),39,Y,170,GOLD)}
   if(t>=S(10))h+=popc(x1,Y(82),"BADAN BESAR",GOLD,"#0F1B33",46,S(10),t)+(t>=S(11)?popc(x1,790,"ADA TENAGA",GOLD,"#0F1B33",46,S(11),t):"")+(t>=S(11)?ring(x1,Y(57),S(11),t,GOLD,200,0.6,12):"");
   if(t>=S(12)){const g=ease((t-S(12))/0.7);const hi=lerp(50,80,g),c=g<0.6?lerp(46,70,g/0.6):lerp(70,50,(g-0.6)/0.4);h+=bigC(x2,46,c,hi,44,Y,130,c>=46?GOLD:RED)}
   if(t>=W(12,2))h+=popc(x2,Y(86),"EKOR PANJANG",CY,"#0F1B33",42,W(12,2),t);
   if(t>=S(13)){const q=ease((t-S(13))/0.3);h+=arrow(x2+120,Y(76),1,140,RED,q,10)+popc(x2,790,"DITOLAK",RED,"#fff",46,S(13),t)}
   return h},
  (t,a,b)=>{const D=R1,a1=E(16),k=prog(t,a,a1,46);const C=chart(D,k,{a:0,b:46,H:600,y0:200});const y=C.Y(RL);let h="";
   h+=band(C.Y(RL),C.Y(99.5),MUTE,ease((t-a)/0.4),0.08)+`<line x1="0" x2="900" y1="${y}" y2="${y}" stroke="${RED}" stroke-width="5" stroke-dasharray="14 10"/>`;
   if(t>=W(15,5))h+=popc(240,C.Y(99.5)+70,"RANGE LAMA",MUTE,"#0F1B33",44,W(15,5),t);
   if(t>=W(16,3)){for(let i=0;i<9;i++){const tt=W(16,3)+i*0.06;if(t<tt)continue;const q=back((t-tt)/0.2);h+=`<circle cx="${120+i*80}" cy="${y-40}" r="${16*q}" fill="${CY}" opacity=".9"/>`}h+=popc(450,y-110,"ORDER RAMAI DI SINI",CY,"#0F1B33",44,W(16,3),t)}
   h+=C.svg;
   if(C.last>=45&&t>=a1-0.1)h+=ring(C.X(45),C.Y(105.6),a1-0.1,t,RED,140,0.6,10)+popc(C.X(45)-130,C.Y(106)-60,"SAPU & BALIK",RED,"#fff",42,a1-0.1,t);
   h+=popc(450,60,"BREAKOUT PALSU",RED,"#fff",58,W(15,1),t);return h},
  (t,a,b)=>{const D=T1,a1=E(19),k=prog(t,a,a1,46);const C=chart(D,k,{a:0,b:46,H:620,y0:180});const y=C.Y(RL);let h="";
   h+=`<line x1="0" x2="900" y1="${y}" y2="${y}" stroke="${GOLD}" stroke-width="5" stroke-dasharray="14 10"/>`+C.svg;
   const bt=tAt(25,C,a,a1);if(t>=bt)h+=popc(C.X(25)-40,C.Y(106.4)-80,"TUTUP LEPAS",GOLD,"#0F1B33",40,bt,t);
   const rt=Math.max(W(18,6),tAt(33,C,a,a1));if(t>=rt)h+=ring(C.X(33),y,rt,t,CY,140,0.6,10)+popc(C.X(33),y+100,"UJI BALIK",CY,"#0F1B33",46,rt,t);
   if(t>=S(19))h+=popc(C.X(36),y+190,"BERTAHAN",GOLD,"#0F1B33",52,S(19),t)+tick(C.X(36)+190,y+190,S(19)+0.2,t);
   h+=popc(450,60,"RETEST LEVEL",GOLD,"#0F1B33",58,W(18,4),t);return h},
  (t,a,b)=>{let h="";const D=pth([[0,112],[45,98]],21,0.8,46),k=prog(t,a,a+1.2,46);const C=chart(D,k,{a:0,b:46,H:300,y0:110});
   h+=`<rect x="0" y="90" width="900" height="340" rx="20" fill="rgba(5,8,15,.5)" stroke="rgba(255,255,255,.15)" stroke-width="2"/>`+C.svg+txt(20,150,"H4",INK,56,"start");
   if(t>=a+0.6)h+=popc(700,150,"TREND TURUN",RED,"#fff",40,a+0.6,t);
   const tm=W(21,3);const k2=prog(t,a+0.8,Math.max(a+1.6,tm),46);const C2=chart(M1,k2,{a:0,b:46,H:300,y0:520});
   h+=`<rect x="0" y="500" width="900" height="340" rx="20" fill="rgba(5,8,15,.5)" stroke="rgba(255,255,255,.15)" stroke-width="2"/>`+`<line x1="0" x2="900" y1="${C2.Y(103)}" y2="${C2.Y(103)}" stroke="${GOLD}" stroke-width="4" stroke-dasharray="12 8"/>`+C2.svg+txt(20,560,"M5",INK,56,"start");
   if(t>=tm)h+=popc(260,790,"BREAKOUT NAIK?",GOLD,"#0F1B33",40,tm,t)+(t<S(22)?popc(450,470,"LAWAN ARAH",RED,"#fff",52,tm,t):"");
   if(t>=S(22))h+=popc(450,470,"PELUANG PALSU TINGGI",RED,"#fff",52,S(22),t);
   return h}
 ]};
