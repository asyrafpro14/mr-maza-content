// VIDEO 8: ENGULFING
function path(pts,seed,z=0.45,n){n=n||pts[pts.length-1][0]+1;const c=[];let k=0;for(let i=0;i<n;i++){while(k<pts.length-2&&i>pts[k+1][0])k++;const [i0,v0]=pts[k],[i1,v1]=pts[k+1];const p=cl((i-i0)/((i1-i0)||1));c.push(lerp(v0,v1,p)+(rnd(i*7.31+seed)-0.5)*2*z)}return ohlc(c,seed)}
// paksa candle j-1 dan j jadi engulfing tepat (badan j telan penuh badan j-1)
function engulf(D,j,bull,base,s=1){const sm=0.9*s,bg=2.6*s;if(bull){D.o[j-1]=base+sm;D.c[j-1]=base;D.h[j-1]=base+sm+0.3;D.l[j-1]=base-0.4;D.o[j]=base-0.25;D.c[j]=base+bg;D.h[j]=base+bg+0.25;D.l[j]=base-0.55}
 else{D.o[j-1]=base-sm;D.c[j-1]=base;D.h[j-1]=base+0.4;D.l[j-1]=base-sm-0.3;D.o[j]=base+0.25;D.c[j]=base-bg;D.h[j]=base+0.55;D.l[j]=base-bg-0.25}
 if(j+1<D.n)D.o[j+1]=D.c[j]}
function shift(D,from,dv){for(let i=from;i<D.n;i++){D.o[i]+=dv;D.c[i]+=dv;D.h[i]+=dv;D.l[i]+=dv}}
// candle besar close-up
function bigC(x,o,c,hi,lo,Y,w,col,op=1,outline=false){const top=Y(Math.max(o,c)),bot=Y(Math.min(o,c));return `<g opacity="${op}"><line x1="${x}" x2="${x}" y1="${Y(hi)}" y2="${Y(lo)}" stroke="${col}" stroke-width="10" stroke-linecap="round"/><rect x="${x-w/2}" y="${top}" width="${w}" height="${Math.max(6,bot-top)}" rx="10" fill="${outline?'none':col}" stroke="${col}" stroke-width="${outline?6:0}" ${outline?'stroke-dasharray="14 10"':''}/></g>`}
let H8,R8,Z8;
const V={stamp:"LOKASI?",title:"ENGULFING",sub:"Cara betul baca",pill:"ENGULFING CARA BETUL",
 cheat:["Bullish engulfing: badan candle naik telan penuh badan candle turun","Bearish engulfing: badan candle turun telan penuh candle naik","Engulfing di tengah range tak ada makna. Lokasi &gt; bentuk","Paling kuat di zon SNR, lepas harga tolak zon tu","Tunggu candle tutup. Belum tutup = belum wujud"],
 groups:[{p:[0,1,2],until:3},{p:[3]}],red:[[0,1],[2,2],[2,3],[2,4],[3,4]],
 stampT:()=>W(3,4),
 init(){
  H8=path([[0,104],[8,98],[14,103],[20,98.5],[24,100.2]],3,1.0,46);engulf(H8,24,true,99.6,1);
  {const t=path([[0,0],[21,0]],5,0.9,22);for(let i=25;i<46;i++){const v=100.5+Math.sin(i/1.3)*1.4+(t.c[i-25]||0);H8.c[i]=v;H8.o[i]=H8.c[i-1];H8.h[i]=Math.max(v,H8.o[i])+0.4;H8.l[i]=Math.min(v,H8.o[i])-0.4}H8.o[25]=H8.c[24]}
  R8=path([[0,100],[6,106],[12,100.5],[18,106],[23,101],[27,103]],7,0.9,46);engulf(R8,27,true,102.6,1);{for(let i=28;i<46;i++){const v=104.3+Math.sin(i/1.2)*1.5+(rnd(i*3.1)-0.5)*1.4;R8.c[i]=v;R8.o[i]=R8.c[i-1];R8.h[i]=Math.max(v,R8.o[i])+0.4;R8.l[i]=Math.min(v,R8.o[i])-0.4}}
  Z8=path([[0,118],[8,112],[11,114],[20,101.5],[22,100.3],[24,101]],9,0.9,46);engulf(Z8,24,true,100.6,1.2);
  {for(let i=25;i<46;i++){const v=Z8.c[24]+(i-24)*0.75+Math.sin(i/1.6)*0.9;Z8.c[i]=v;Z8.o[i]=Z8.c[i-1];Z8.h[i]=Math.max(v,Z8.o[i])+0.5;Z8.l[i]=Math.min(v,Z8.o[i])-0.45}}
  Z8.l[21]=98.4;Z8.l[22]=98.2;Z8.l[23]=98.6},
 hits:()=>[W(0,1),W(1,1),W(2,4),W(3,4),W(7,7),W(7,8),W(10,2),W(12,6),S(13),W(15,6),W(16,2),W(18,2),W(19,3),W(20,1)],
 fl:()=>[[W(2,4),"#E0465A",.3],[W(7,7),"#E7CE7C",.3],[W(10,2),"#E0465A",.3],[W(20,1),"#E0465A",.3]],
 hook(t){const D=H8,eT=W(0,1),fT=W(2,4);const k=t<eT?prog(t,0,eT,25):25+prog(t,eT+0.1,fT,21);
  const C=chart(D,k,{a:0,b:46,H:560,y0:200});let h="";
  if(t>=W(1,1))h+=`<line x1="${C.X(24)}" x2="900" y1="${C.Y(D.c[24])}" y2="${C.Y(D.c[24])}" stroke="${GOLD}" stroke-width="4" stroke-dasharray="12 8"/>`;
  h+=C.svg;
  if(t>=eT-0.1&&C.last>=24){const x=C.X(24),y=C.Y(D.h[24]);h+=`<rect x="${x-C.cw*1.7}" y="${y-20}" width="${C.cw*3}" height="${C.Y(D.l[23])-y+40}" rx="14" fill="none" stroke="${GOLD}" stroke-width="5" filter="url(#gw)"/>`+ring(x,y,eT,t,GOLD,120,0.6,10)+popc(x,y-80,"ENGULFING!",GOLD,"#0F1B33",50,eT,t)}
  if(t>=W(1,1))h+=popc(C.X(24)+40,C.Y(D.c[24])+150,"BUY",GOLD,"#0F1B33",58,W(1,1),t);
  if(t>=fT){h+=popc(600,40,"TAK BERGERAK",RED,"#fff",56,fT,t)+burst(C.head[0],C.head[1],fT,t,18,RED,300,9,0.9)}
  return h},
 steps:[
  (t,a,b)=>{const Y=v=>870-(v-30)*12.5;let h="";const x1=290,x2=600;const q1=ease((t-a)/0.4);
   h+=bigC(x1,64,46,70,38,Y,140,RED,q1)+txt(x1,862,"TURUN",RED,46,"middle",q1);
   const t2=W(7,4);if(t>=t2){const g=ease((t-t2)/0.7);const c=lerp(42,74,g);h+=bigC(x2,42,c,lerp(44,80,g),36,Y,170,GOLD)+txt(x2,862,"NAIK",GOLD,46)}
   if(t>=W(7,6)){const q=ease((t-W(7,6))/0.4);h+=`<g opacity="${q}"><line x1="${x1+80}" x2="${x2-95}" y1="${Y(64)}" y2="${Y(64)}" stroke="${INK}" stroke-width="3" stroke-dasharray="8 8"/><line x1="${x1+80}" x2="${x2-95}" y1="${Y(46)}" y2="${Y(46)}" stroke="${INK}" stroke-width="3" stroke-dasharray="8 8"/></g>`+bigC(x2,64,46,64,46,Y,140,RED,q*0.9,true)}
   if(t>=W(7,7))h+=popc(450,60,"TELAN PENUH",GOLD,"#0F1B33",66,W(7,7),t)+ring(x2,Y(55),W(7,7),t,GOLD,220,0.6,12);
   h+=popc(450,170,"BULLISH ENGULFING",GOLD,"#0F1B33",48,W(7,0),t);return h},
  (t,a,b)=>{const Y=v=>870-(v-30)*12.5;let h="";const x1=290,x2=600;const q1=ease((t-a)/0.4);
   h+=bigC(x1,46,64,70,38,Y,140,GOLD,q1)+txt(x1,862,"NAIK",GOLD,46,"middle",q1);
   const t2=W(10,0);if(t>=t2){const g=ease((t-t2)/0.7);const c=lerp(68,36,g);h+=bigC(x2,68,c,74,lerp(64,35,g),Y,170,RED)+txt(x2,862,"TURUN",RED,46)}
   if(t>=W(10,2)){const q=ease((t-W(10,2))/0.4);h+=bigC(x2,64,46,64,46,Y,140,GOLD,q*0.9,true)+popc(450,60,"TELAN",RED,"#fff",66,W(10,2),t)+ring(x2,Y(55),W(10,2),t,RED,220,0.6,12)}
   h+=popc(450,170,"BEARISH ENGULFING",RED,"#fff",48,W(9,0),t);return h},
  (t,a,b)=>{const D=R8,a1=W(12,3),k=prog(t,a,a1,40);const C=chart(D,k,{a:0,b:46,H:600,y0:170});let h="";
   h+=band(C.Y(106.5),C.Y(100),MUTE,1,0.08)+txt(10,C.Y(106.5)-14,"RANGE",MUTE,38,"start")+C.svg;
   const x=C.X(27),y=C.Y(D.h[27]);if(t>=W(12,0))h+=`<rect x="${x-C.cw*1.7}" y="${y-20}" width="${C.cw*3}" height="${C.Y(D.l[26])-y+40}" rx="14" fill="none" stroke="${GOLD}" stroke-width="5"/>`+popc(x,y-70,"ENGULFING",GOLD,"#0F1B33",42,W(12,0),t);
   if(t>=W(12,2))h+=popc(x,C.Y(103)+20,"TENGAH RANGE",RED,"#fff",44,W(12,2),t);
   if(t>=W(12,6))h+=popc(450,40,"TAK ADA MAKNA",RED,"#fff",58,W(12,6),t)+cross(x,C.Y(D.c[27]),70,W(12,6),t);
   if(t>=S(13))h+=popc(450,820,"LOKASI > BENTUK",GOLD,"#0F1B33",64,S(13),t);
   return h},
  (t,a,b)=>{const D=Z8,a1=E(16),k=prog(t,a,a1,40);const C=chart(D,k,{a:0,b:46,H:620,y0:170,extra:[96]});let h="";const zt=W(15,6),zq=t>=zt?ease((t-zt)/0.4):0;
   if(zq>0)h+=band(C.Y(101.6),C.Y(98),CY,zq,0.2)+txt(10,C.Y(98)+48,"ZON SUPPORT",CY,40,"start",zq);
   h+=C.svg;
   const ti=Math.max(W(16,2),tAt(22,C,a,a1));if(t>=ti)h+=arrow(C.X(22),C.Y(D.l[22])+110,-1,60,CY,ease((t-ti)/0.3),8)+popc(C.X(22)-60,C.Y(D.l[22])+170,"TOLAK",CY,"#0F1B33",44,ti,t);
   const et=Math.max(W(16,2)+0.3,tAt(24,C,a,a1));if(t>=et){const x=C.X(24),y=C.Y(D.h[24]);h+=`<rect x="${x-C.cw*1.7}" y="${y-20}" width="${C.cw*3}" height="${C.Y(D.l[23])-y+40}" rx="14" fill="none" stroke="${GOLD}" stroke-width="5" filter="url(#gw)"/>`+ring(x,y,et,t,GOLD,140,0.6,10)}
   h+=popc(450,40,"ZON + ENGULFING",GOLD,"#0F1B33",58,W(15,1),t);return h},
  (t,a,b)=>{const Y=v=>880-(v-34)*11;let h="";const x1=300,x2=600;
   h+=bigC(x1,64,46,70,40,Y,140,RED)+txt(x1,862,"TURUN",RED,46);
   // candle hidup: mula nampak engulfing, kemudian jatuh balik sebelum tutup
   const ts=a+0.2,tu=W(19,2),te=W(20,0);let c;if(t<tu)c=lerp(44,74,ease((t-ts)/(tu-ts)));else c=lerp(74,52,ease((t-tu)/0.9));const hi=t<tu?Math.max(44,c)+3:76;
   if(t>=ts)h+=bigC(x2,44,Math.max(44.5,c),hi,40,Y,170,GOLD);
   const tm=cl((t-ts)/((te+0.6)-ts));h+=`<rect x="150" y="40" width="600" height="34" rx="17" fill="rgba(5,8,15,.8)" stroke="${MUTE}" stroke-width="3"/><rect x="156" y="46" width="${588*tm}" height="22" rx="11" fill="${tm<1?CY:GOLD}"/>`+txt(450,120,tm<1?"CANDLE BELUM TUTUP":"CANDLE TUTUP",tm<1?CY:GOLD,40);
   if(t>=W(18,2))h+=popc(450,200,"TUNGGU TUTUP",GOLD,"#0F1B33",52,W(18,2),t);
   if(t>=W(19,3))h+=popc(x2+150,Y(60),"BELUM TUTUP",RED,"#fff",44,W(19,3),t);
   if(t>=te)h+=cross(x2,Y(60),90,W(20,1),t)+popc(450,300,"BELUM WUJUD",RED,"#fff",62,W(20,1),t);
   return h}
 ]};
