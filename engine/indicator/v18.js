// VIDEO 18: PENGESAHAN DI SNR
function pth(pts,seed,z=0.45,n){n=n||pts[pts.length-1][0]+1;const c=[];let k=0;for(let i=0;i<n;i++){while(k<pts.length-2&&i>pts[k+1][0])k++;const [i0,v0]=pts[k],[i1,v1]=pts[k+1];const p=cl((i-i0)/((i1-i0)||1));c.push(lerp(v0,v1,p)+(rnd(i*7.31+seed)-0.5)*2*z)}return ohlc(c,seed)}
function setC(D,i,o,c,h,l){D.o[i]=o;D.c[i]=c;D.h[i]=h;D.l[i]=l;if(i+1<D.n)D.o[i+1]=c}
function bigC(x,o,c,hi,lo,Y,w,col,op=1){const top=Y(Math.max(o,c)),bot=Y(Math.min(o,c));return `<g opacity="${op}"><line x1="${x}" x2="${x}" y1="${Y(hi)}" y2="${Y(lo)}" stroke="${col}" stroke-width="10" stroke-linecap="round"/><rect x="${x-w/2}" y="${top}" width="${w}" height="${Math.max(6,bot-top)}" rx="10" fill="${col}"/></g>`}
function tick(x,y,t0,t){if(t<t0)return"";const q=back((t-t0)/0.3);return `<g transform="translate(${x} ${y}) scale(${q})"><circle r="40" fill="${GOLD}"/><path d="M-18 0 L-5 14 L20 -16" stroke="#0F1B33" stroke-width="9" fill="none" stroke-linecap="round"/></g>`}
const SUP=100;let H3,D3,Z3;
const V={stamp:"KENA SAPU!",title:"SNR",sub:"Cara betul guna",pill:"PENGESAHAN DI SNR",cta:true,q:"KOMEN: YA / TAK",
 msgRe:/^Level bukan/,m1:"LEVEL",m3:"Pengesahan candle",m4:"BAGI CERITA",msgTimes:()=>[S(18),W(18,1),S(19),W(19,3)],
 cheat:["Level cuma tempat, bukan sebab untuk masuk","Tunggu harga sampai, tengok reaksi candle","Reaksi kuat: ekor panjang ditolak atau tutup balik dalam zon","Tunggu candle tutup. Belum tutup boleh tukar cerita","Level TF besar lebih bermakna dari level M5"],
 groups:[{p:[0],until:1},{p:[1]}],red:[[0,1],[0,3],[1,4]],
 stampT:()=>W(1,4),
 init(){
  H3=pth([[0,110],[6,106],[9,107.5],[16,103],[19,104.2],[25,100.4]],3,0.6,46);
  setC(H3,26,H3.c[25],100.6,101.1,100.2);setC(H3,27,100.6,99.8,100.9,99.6);setC(H3,28,99.8,98.6,100,98.2);setC(H3,29,98.6,97.6,98.8,97.3);
  for(let i=30;i<46;i++){const v=97.6+(i-29)*0.75+Math.sin(i*1.1)*0.5;setC(H3,i,H3.c[i-1],v,Math.max(v,H3.c[i-1])+0.35,Math.min(v,H3.c[i-1])-0.35)}
  D3=pth([[0,112],[8,107],[11,108.5],[20,103],[23,104],[30,101]],7,0.6,46);setC(D3,31,D3.c[30],100.9,101.4,98.9);
  for(let i=32;i<46;i++){const v=101+(i-31)*0.6+Math.sin(i)*0.4;setC(D3,i,D3.c[i-1],v,Math.max(v,D3.c[i-1])+0.3,Math.max(SUP+0.2,Math.min(v,D3.c[i-1])-0.3))}
  Z3=pth([[0,104],[10,110],[18,102],[26,109],[34,101.5],[45,107]],11,0.6,46)},
 hits:()=>[W(0,2),W(0,3),W(1,4),S(6),S(9),S(11),S(12),S(14),W(15,5),W(17,5),W(17,11)],
 fl:()=>[[W(1,4),"#E0465A",.35],[W(15,5),"#E0465A",.3]],
 hook(t){const D=H3,bT=W(0,2),sT=W(1,4);const k=t<bT?prog(t,0,bT,27):27+prog(t,bT+0.2,sT,19);
  const C=chart(D,k,{a:0,b:46,H:560,y0:220});const y=C.Y(SUP);let h=band(y-10,y+10,CY,1,0.25)+txt(10,y+50,"SUPPORT",CY,38,"start")+C.svg;
  if(t>=bT&&C.last>=26)h+=popc(C.X(26),C.Y(101.1)-70,"BUY!",GOLD,"#0F1B33",52,bT,t)+ring(C.X(26),y,bT,t,GOLD,120,0.6,10);
  if(C.last>=29&&t>=W(1,2)){const tt=W(1,2);h+=ring(C.X(29),C.Y(97.3),tt,t,RED,140,0.6,10)+popc(C.X(29)+60,C.Y(97.3)+80,"SL DISAPU",RED,"#fff",44,tt,t)}
  if(t>=sT)h+=popc(700,C.Y(108)-40,"BARU NAIK",GOLD,"#0F1B33",44,sT,t);return h},
 steps:[
  (t,a,b)=>{const D=Z3,k=prog(t,a,a+1.2,46);const C=chart(D,k,{a:0,b:46,H:600,y0:160,extra:[100.5]});let h="";const y1=C.Y(102.3),y2=C.Y(100.8);
   h+=band(y1,y2,CY,ease((t-a)/0.4),0.2)+C.svg+popc(450,40,"LEVEL = TEMPAT",CY,"#0F1B33",58,W(5,1),t);
   if(t>=S(6)){h+=popc(450,150,"BUY SEBAB SENTUH?",GOLD,"#0F1B33",44,S(6),t)+cross(450,150,60,W(6,2),t)+popc(450,800,"BUKAN SEBAB MASUK",RED,"#fff",54,W(6,2),t)}
   return h},
  (t,a,b)=>{const D=D3,a1=Math.max(a+1.5,W(9,3)),k=prog(t,a,a1,33);const C=chart(D,k,{a:0,b:46,H:600,y0:160,extra:[98.5]});let h="";const y=C.Y(SUP);
   h+=band(C.Y(101),C.Y(99.4),CY,1,0.2)+txt(10,C.Y(99.4)+48,"ZON",CY,40,"start")+C.svg;
   h+=popc(450,40,"TUNGGU HARGA SAMPAI",GOLD,"#0F1B33",54,a+0.1,t);
   if(t>=W(9,3)&&C.last>=31){const x=C.X(31);h+=`<circle cx="${x}" cy="${C.Y(100)}" r="70" fill="none" stroke="${GOLD}" stroke-width="6" filter="url(#gw)"/>`+ring(x,C.Y(100),W(9,3),t,GOLD,140,0.6,10)+popc(x+40,C.Y(98.9)+100,"TENGOK REAKSI",GOLD,"#0F1B33",46,W(9,3),t)}
   return h},
  (t,a,b)=>{const Y=v=>840-(v-20)*11;let h="";const zt=Y(50),zb=Y(42),x1=250,x2=640;
   h+=band(zt,zb,CY,ease((t-a)/0.4),0.2)+txt(10,zb+46,"ZON",CY,40,"start",ease((t-a)/0.4));
   if(t>=a+0.2){const g=ease((t-a-0.2)/0.8);const lo=lerp(56,36,Math.min(1,g/0.5)),c=g<0.5?lerp(58,52,g/0.5):lerp(52,62,(g-0.5)/0.5);h+=bigC(x1,58,c,64,lo,Y,120,c>=58?GOLD:RED)}
   if(t>=W(11,2))h+=popc(x1,Y(70)-20,"EKOR PANJANG",GOLD,"#0F1B33",42,W(11,2),t)+arrow(x1-110,Y(36),-1,110,GOLD,ease((t-W(11,2))/0.3),8);
   if(t>=S(12)){const q=ease((t-S(12))/0.4);h+=bigC(x2-70,48,34,49,32,Y,90,RED,q);
    if(t>=W(12,2)){const g=ease((t-W(12,2))/0.6);h+=bigC(x2+70,34,lerp(34,47,g),lerp(35,49,g),33,Y,110,GOLD)}
    if(t>=W(12,4))h+=popc(x2,Y(58),"TUTUP BALIK DALAM ZON",GOLD,"#0F1B33",38,W(12,4),t)}
   h+=popc(450,40,"REAKSI KUAT",GOLD,"#0F1B33",58,a,t);return h},
  (t,a,b)=>{const Y=v=>840-(v-20)*11;let h="";const x=450,zt=Y(50),zb=Y(42);
   h+=band(zt,zb,CY,1,0.2)+txt(10,zb+46,"ZON",CY,40,"start");
   const ts=a+0.1,tu=W(15,4),te=W(15,6);let c,lo;if(t<tu){const g=ease((t-ts)/(tu-ts));lo=lerp(58,38,Math.min(1,g*1.6));c=g<0.5?lerp(58,46,g*2):lerp(46,57,(g-0.5)*2)}else{const g=ease((t-tu)/0.9);lo=lerp(38,30,g);c=lerp(57,32,g)}
   h+=bigC(x,58,c,60,Math.min(lo,c-1),Y,160,c>=58?GOLD:RED);
   const tm=cl((t-ts)/((te+0.8)-ts));h+=`<rect x="150" y="130" width="600" height="34" rx="17" fill="rgba(5,8,15,.8)" stroke="${MUTE}" stroke-width="3"/><rect x="156" y="136" width="${588*tm}" height="22" rx="11" fill="${tm<1?CY:RED}"/>`+txt(450,210,tm<1?"CANDLE BELUM TUTUP":"CANDLE TUTUP",tm<1?CY:RED,40);
   h+=popc(450,40,"TUNGGU CANDLE TUTUP",GOLD,"#0F1B33",54,a,t);
   if(t>=W(15,5))h+=popc(450,800,"CERITA BERTUKAR",RED,"#fff",56,W(15,5),t);
   return h},
  (t,a,b)=>{let h="";const A=pth([[0,100],[10,112],[20,103],[30,113],[40,102.5],[45,106]],23,1.2,46),k=prog(t,a,a+1.2,46);const C=chart(A,k,{a:0,b:46,H:290,y0:110});
   h+=`<rect x="0" y="90" width="900" height="330" rx="20" fill="rgba(5,8,15,.5)" stroke="rgba(255,255,255,.15)" stroke-width="2"/>`+band(C.Y(104),C.Y(101.5),GOLD,1,0.22)+C.svg+txt(20,150,"H4",INK,56,"start");
   if(t>=W(17,5))h+=popc(650,150,"LEBIH BERMAKNA",GOLD,"#0F1B33",40,W(17,5),t)+tick(840,150,W(17,5)+0.15,t);
   if(t>=W(17,7)){const B=pth([[0,100],[45,101]],29,0.9,46),k2=prog(t,W(17,7),W(17,7)+1,46);const C2=chart(B,k2,{a:0,b:46,H:290,y0:500});
    h+=`<rect x="0" y="480" width="900" height="330" rx="20" fill="rgba(5,8,15,.5)" stroke="rgba(255,255,255,.15)" stroke-width="2"/>`+C2.svg+txt(20,540,"M5",INK,56,"start");
    for(let i=0;i<7;i++){const tt=W(17,9)+i*0.08;if(t<tt)continue;const yy=520+((i*53)%260)+20;h+=`<line x1="80" x2="${lerp(80,880,ease((t-tt)/0.2))}" y1="${yy}" y2="${yy}" stroke="${MUTE}" stroke-width="3" stroke-dasharray="10 8"/>`}
    if(t>=W(17,11))h+=popc(600,540,"LUKIS SENDIRI",RED,"#fff",40,W(17,11),t)+cross(840,540,30,W(17,11)+0.15,t)}
   return h}
 ]};
