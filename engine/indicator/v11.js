// VIDEO 11: PIN BAR
function wave(n,f,seed,z=0.5){const c=[];for(let i=0;i<n;i++)c.push(f(i)+(rnd(i*7.31+seed)-0.5)*2*z);return ohlc(c,seed)}
// jadikan candle i pin bar: dir=1 ekor bawah (tolak naik), dir=-1 ekor atas
function pin(D,i,dir,len){const o=D.o[i];const c=o+dir*0.35;D.c[i]=c;D.o[i+1]=c;
  if(dir>0){D.h[i]=c+0.15;D.l[i]=Math.min(o,c)-len}else{D.l[i]=c-0.15;D.h[i]=Math.max(o,c)+len}}
let H11,Z11,T11;const ZN={};
const V={stamp:"PALSU!",title:"PIN BAR",sub:"Cara betul baca",pill:"PIN BAR CARA BETUL",
 cheat:["Badan kecil, ekor sekurang-kurangnya 2x badan","Ekor panjang = harga ditolak kuat dari kawasan tu","Mesti muncul di zon SNR, bukan tengah chart","Pin bar ikut arah trend besar lebih dipercayai","H4 & Daily lebih bermakna dari M5"],
 groups:[{p:[0,1,2],until:3},{p:[3]}],red:[[0,2],[0,3],[2,3],[3,5],[3,6]],
 stampT:()=>W(3,5),
 init(){
  H11=wave(46,i=>112-0.3*i+1.4*Math.sin(i/2.3),3,0.5);pin(H11,24,1,3.2);for(let i=25;i<46;i++){H11.c[i]-=1.2*(i-24)/21*3;H11.o[i]=H11.c[i-1];H11.h[i]=Math.max(H11.o[i],H11.c[i])+0.3;H11.l[i]=Math.min(H11.o[i],H11.c[i])-0.3}
  Z11=wave(46,i=>104+4.2*Math.sin(i/3.4),7,0.5);ZN.v=1e9;for(let i=0;i<46;i++)ZN.v=Math.min(ZN.v,Z11.l[i]);pin(Z11,23,1,1.4);pin(Z11,37,1,2.6);
  {let lo=1e9;Z11.l[37]=Math.min(Z11.l[37],ZN.v-0.3)}
  T11=wave(46,i=>100+0.42*i+2.2*Math.sin(i/2.6),9,0.4);pin(T11,15,1,2.4);pin(T11,30,-1,2.4)},
 hits:()=>[W(0,2),S(1),W(2,3),W(3,5),W(7,3),W(7,6),W(8,3),W(10,4),W(12,5),W(13,4),W(15,3),W(15,11),S(18)],
 fl:()=>[[W(2,3),"#E0465A",.35],[W(3,5),"#E0465A",.35],[W(13,4),"#E7CE7C",.3]],
 hook(t){const D=H11,a1=W(2,3),k=prog(t,0,a1,46);const C=chart(D,k,{a:0,b:46,H:640,y0:100});let h=C.svg;const pt=tAt(24,C,0,a1),x=C.X(24);
  if(t>=Math.max(pt,W(0,2)))h+=ring(x,C.Y(D.l[24]),Math.max(pt,W(0,2)),t,GOLD,120,0.6,10)+popc(x,C.Y(D.l[24])+80,"EKOR PANJANG",GOLD,"#0F1B33",44,Math.max(pt,W(0,2)),t);
  if(t>=S(1))h+=popc(x,C.Y(D.h[24])-120,"ENTRY?",CY,"#0F1B33",50,S(1),t);
  if(t>=W(2,3))h+=burst(C.head[0],C.head[1],W(2,3),t,22,RED,320,9,1)+popc(720,C.head[1]+120,"SAMBUNG JATUH",RED,"#fff",48,W(2,3),t);return h},
 steps:[
  (t,a,b)=>{let h="";const cx=330,yH=180,yO=230,yC=300,yL=760;const q=ease((t-a)/0.4);
   h+=`<g opacity="${q}"><line x1="${cx}" x2="${cx}" y1="${yH}" y2="${yL}" stroke="${GOLD}" stroke-width="10" stroke-linecap="round"/><rect x="${cx-70}" y="${yO}" width="140" height="${yC-yO}" rx="10" fill="${GOLD}"/></g>`;
   h+=popc(640,(yO+yC)/2+10,"BADAN KECIL",GOLD,"#0F1B33",50,W(7,3),t)+popc(640,560,"EKOR PANJANG",CY,"#0F1B33",50,W(7,6),t);
   if(t>=S(8)){const p=ease((t-S(8))/0.4),bx=cx-150;h+=`<g opacity="${p}"><line x1="${bx}" x2="${bx}" y1="${yO}" y2="${yC}" stroke="${GOLD}" stroke-width="6"/><line x1="${bx-20}" x2="${bx+20}" y1="${yO}" y2="${yO}" stroke="${GOLD}" stroke-width="6"/><line x1="${bx-20}" x2="${bx+20}" y1="${yC}" y2="${yC}" stroke="${GOLD}" stroke-width="6"/>${txt(bx-30,(yO+yC)/2+16,"1x",GOLD,48,"end")}</g>`;
    const wy=yC+(yL-yC)*p;h+=`<line x1="${bx}" x2="${bx}" y1="${yC+10}" y2="${wy}" stroke="${CY}" stroke-width="6"/><line x1="${bx-20}" x2="${bx+20}" y1="${wy}" y2="${wy}" stroke="${CY}" stroke-width="6"/>`+txt(bx-30,(yC+yL)/2,"2x+",CY,56,"end",p)}
   h+=popc(450,40,"EKOR MIN 2x BADAN",GOLD,"#0F1B33",56,W(8,3),t);return h},
  (t,a,b)=>{let h="";const cx=450,yO=260,zone=640;const t1=a+0.3,t2=W(10,3);const p1=ease((t-t1)/Math.max(0.3,t2-t1)),p2=ease((t-t2)/0.8);
   const yPrice=t<t2?lerp(yO,zone+40,p1):lerp(zone+40,yO-60,p2),yLow=t<t2?yPrice:zone+40;
   h+=band(zone,zone+90,CY,ease((t-a)/0.4),0.15)+txt(890,zone+140,"KAWASAN",CY,40,"end",ease((t-a)/0.4));
   if(t>=t1){h+=`<line x1="${cx}" x2="${cx}" y1="${Math.min(yO,yPrice)-10}" y2="${yLow}" stroke="${t<t2?RED:GOLD}" stroke-width="10"/><rect x="${cx-60}" y="${Math.min(yO,yPrice)}" width="120" height="${Math.max(4,Math.abs(yPrice-yO))}" rx="8" fill="${yPrice>yO?RED:GOLD}"/>`}
   if(t>=t2){const q=ease((t-t2)/0.3);h+=`<g opacity="${q}">${arrow(cx+160,zone+60,-1,240,GOLD,q,10)}${arrow(cx-160,zone+60,-1,240,GOLD,q,10)}</g>`+ring(cx,zone+40,t2,t,GOLD,200,0.6,12)}
   h+=popc(450,40,"HARGA DITOLAK KUAT",GOLD,"#0F1B33",58,W(10,4),t);return h},
  (t,a,b)=>{const D=Z11,a1=E(13),k=prog(t,a,a1,46);const C=chart(D,k,{a:0,b:46,H:680,y0:120,extra:[ZN.v-1]});let h="";
   const zq=t>=S(13)?ease((t-S(13))/0.4):0;if(zq>0)h+=band(C.Y(ZN.v+0.9),C.Y(ZN.v-0.6),CY,zq,0.2)+txt(10,C.Y(ZN.v-0.6)+50,"ZON SUPPORT",CY,40,"start",zq);
   h+=C.svg;const m=23,z=37;const mt=Math.max(tAt(m,C,a,a1),W(12,2));if(t>=mt)h+=ring(C.X(m),C.Y(D.l[m]),mt,t,RED,110,0.5,10)+cross(C.X(m),C.Y(D.l[m])+10,50,W(12,5),t)+popc(C.X(m)+30,C.Y(D.h[m])-80,"TENGAH CHART",RED,"#fff",44,mt,t);
   const zt=Math.max(tAt(z,C,a,a1),W(13,4));if(t>=zt)h+=ring(C.X(z),C.Y(D.l[z]),zt,t,GOLD,160,0.6,12)+`<circle cx="${C.X(z)}" cy="${C.Y(D.l[z])}" r="50" fill="none" stroke="${GOLD}" stroke-width="6" filter="url(#gw)"/>`+popc(C.X(z),C.Y(D.h[z])-110,"DI ZON SNR",GOLD,"#0F1B33",52,zt,t);return h},
  (t,a,b)=>{const D=T11,a1=W(15,10),k=prog(t,a,a1,46);const C=chart(D,k,{a:0,b:46,H:680,y0:120});let h="";
   if(t>=a+0.2){const q=ease((t-a-0.2)/0.6);h+=`<line x1="40" y1="${C.Y(100)+40}" x2="${lerp(40,860,q)}" y2="${lerp(C.Y(100)+40,C.Y(118)+40,q)}" stroke="${GOLD}" stroke-width="8" opacity=".35" stroke-linecap="round"/>`+txt(860,C.Y(118)-20,"TREND BESAR NAIK",GOLD,38,"end",q)}
   h+=C.svg;const g=15,r=30;const gt=Math.max(tAt(g,C,a,a1),W(15,3));if(t>=gt)h+=ring(C.X(g),C.Y(D.l[g]),gt,t,GOLD,140,0.6,12)+popc(C.X(g)+40,C.Y(D.l[g])+90,"IKUT TREND",GOLD,"#0F1B33",50,gt,t);
   const rt=Math.max(tAt(r,C,a,a1),W(15,11));if(t>=rt)h+=ring(C.X(r),C.Y(D.h[r]),rt,t,RED,140,0.6,12)+popc(C.X(r),C.Y(D.h[r])-80,"LAWAN TREND",RED,"#fff",50,rt,t);
   h+=popc(450,40,"LEBIH DIPERCAYAI",GOLD,"#0F1B33",54,W(15,8),t);return h},
  (t,a,b)=>{let h="";const rows=[["DAILY",1.0,GOLD],["H4",0.85,GOLD],["M5",0.25,RED]];
   rows.forEach(([s,v,col],i)=>{const y=150+i*230,t0=S(17)+i*0.15;if(t<a)return;const q=ease((t-t0)/0.6);
    h+=txt(0,y+60,s,t>=S(18)?col:INK,72,"start",ease((t-a-i*0.1)/0.3));
    h+=`<rect x="250" y="${y}" width="620" height="80" rx="16" fill="rgba(255,255,255,.08)"/><rect x="250" y="${y}" width="${620*v*q}" height="80" rx="16" fill="${t>=S(18)?col:CY}" opacity=".9"/>`});
   h+=popc(450,40,"KEKUATAN PIN BAR",CY,"#0F1B33",52,S(17),t);
   if(t>=S(18))h+=popc(450,790,"TF BESAR LEBIH KUAT",GOLD,"#0F1B33",58,W(18,5),t)+popc(560,670,"LEMAH",RED,"#fff",44,W(18,7),t);return h}
 ]};
