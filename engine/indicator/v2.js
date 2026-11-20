// VIDEO 2: EMA 50 & 200
function wave(n,f,seed,z=0.5){const c=[];for(let i=0;i<n;i++)c.push(f(i)+(rnd(i*7.31+seed)-0.5)*2*z);return ohlc(c,seed)}
function emas(D){D.e50=ema(D.c,50);D.e200=ema(D.c,200);return D}
let H2,A2,B2,C2,D2,E2,CI2;
const L200=(D,o={})=>({arr:D.e200,col:RED,w:8,glow:true,...o}),L50=(D,o={})=>({arr:D.e50,col:CY,w:6,...o});
const V={stamp:"KENA SL!",title:"EMA",pill:"EMA 50 & 200 CARA BETUL",
 cheat:["EMA 200 = penapis trend. Atas fokus buy, bawah fokus sell","EMA 50 = support & resistance bergerak dalam trend","Golden cross & death cross lambat. Separuh pergerakan dah lepas","Harga berselirat keliling EMA = sideways. Tunggu","Entry terbaik: pullback ke EMA, dekat zon SNR"],
 groups:[{p:[0,1],until:2},{p:[2]}],red:[[1,2],[2,2],[2,3]],
 stampT:()=>W(2,3),
 init(){
  H2=emas(seg([[200,0.12,.7],[30,-0.6,.7],[12,0.55,.6],[20,-0.9,.7]],4));
  A2=emas(seg([[204,0,.7],[22,-0.45,.7],[24,0.85,.7]],6));
  B2=emas(wave(260,i=>100+0.16*i+4.2*Math.sin(i/3.3),8,0.8));
  C2=emas(seg([[200,-0.03,.7],[70,0.75,.7]],12));CI2=200;for(let i=201;i<C2.n;i++){if(C2.e50[i]>C2.e200[i]&&C2.e50[i-1]<=C2.e200[i-1]){CI2=i;break}}
  D2=emas(wave(260,i=>100+2.2*Math.sin(i/2.4)+1.5*Math.sin(i/7),14,1.3));
  E2=emas(wave(260,i=>100+0.45*i+3*Math.sin(i/3.2)-(i>238?Math.min(i-238,8)*1.4:0)+(i>246?(i-246)*2.2:0),18,0.8))},
 hits:()=>[W(0,1),W(1,3),W(2,3),W(6,0),W(8,1),W(10,1),W(12,3),W(15,1),S(16),S(19),S(20),W(23,2)],
 fl:()=>[[W(2,3),"#E0465A",.45],[W(15,1),"#E7CE7C",.25]],
 hook(t){const D=H2,b=D.n,a=b-50,bi=242,buyT=W(0,1),sT=W(2,3);
  const k=t<buyT+0.1?prog(t,0,buyT,bi-a+1):bi-a+1+prog(t,buyT+0.2,sT,b-bi-1);
  const C=chart(D,k,{a,b,H:640,y0:40,lines:[L200(D,{p:t<W(1,3)?0:1})]});let h=C.svg;const ex=C.X(bi),ey=C.Y(D.c[bi]),sl=D.c[bi]-3.5;
  if(t>=W(1,3))h+=popc(150,C.Y(D.e200[a+4])-40,"EMA 200",RED,"#fff",48,W(1,3),t);
  if(t>=buyT){h+=`<line x1="${ex}" x2="900" y1="${ey}" y2="${ey}" stroke="${GOLD}" stroke-width="4" stroke-dasharray="12 8"/><line x1="${ex}" x2="900" y1="${C.Y(sl)}" y2="${C.Y(sl)}" stroke="${RED}" stroke-width="4" stroke-dasharray="6 6"/>`+popc(ex-30,ey-70,"BUY",GOLD,"#0F1B33",60,buyT,t);
    if(t>=W(1,0))h+=txt(890,C.Y(sl)-12,"SL",RED,40,"end")}
  if(t>=sT)h+=burst(C.head[0],C.Y(sl),sT,t,26,RED,380,10,1)+ring(C.head[0],C.Y(sl),sT,t,RED,200,0.6,14);return h},
 steps:[
  (t,a,b)=>{const D=A2,k=prog(t,a,W(6,4),46);const C=chart(D,k,{H:700,y0:60,lines:[L200(D)]});const ev=D.e200[D.n-23],y=C.Y(ev);let h="";
   if(t>=S(7)){const q=ease((t-S(7))/0.4);h+=`<rect x="0" y="${60}" width="${900*q}" height="${y-60}" fill="${GOLD}" opacity=".1"/>`}
   if(t>=S(9)){const q=ease((t-S(9))/0.4);h+=`<rect x="0" y="${y}" width="${900*q}" height="${760-y}" fill="${RED}" opacity=".12"/>`}
   h+=C.svg+popc(160,y-40,"EMA 200",RED,"#fff",46,W(6,1),t)+popc(450,y-260,"FOKUS BUY",GOLD,"#0F1B33",70,W(8,1),t)+popc(450,y+230,"FOKUS SELL",RED,"#fff",70,W(10,1),t);
   if(t>=W(6,4))h+=popc(450,800,"PENAPIS TREND",INK,"#0F1B33",50,W(6,4),t);return h},
  (t,a,b)=>{const D=B2,k=prog(t,a,E(12),46);const C=chart(D,k,{H:720,y0:60,lines:[L50(D,{glow:true,w:7})]});let h=C.svg;
   const lows=peaks(D.l,C.a,C.b,2,true);lows.forEach(i=>{if(i>C.last||D.l[i]>D.e50[i]+1.2)return;const at=tAt(i,C,a,E(12));h+=dot(C.X(i),C.Y(D.e50[i]),GOLD,at,t,11)+(t>=at?arrow(C.X(i),C.Y(D.l[i])+90,-1,30,GOLD,ease((t-at)/0.3),7):"")});
   h+=popc(130,C.Y(D.e50[C.a+3])+60,"EMA 50",CY,"#0F1B33",46,W(12,1),t)+popc(450,30,"SUPPORT BERGERAK",GOLD,"#0F1B33",58,W(12,6),t);return h},
  (t,a,b)=>{const D=C2,bb=Math.min(D.n,CI2+10),aa=bb-58,k=prog(t,a,S(15)+0.4,58);const C=chart(D,k,{a:aa,b:bb,H:700,y0:80,lines:[L200(D,{w:6,glow:false}),L50(D)]});let h=C.svg;
   const cx=C.X(CI2),cy=C.Y(D.e50[CI2]);if(t>=W(15,1)){h+=dot(cx,cy,GOLD,W(15,1),t,16)+ring(cx,cy,W(15,1),t,GOLD,220,0.7,14)+popc(cx-120,cy+110,"GOLDEN CROSS",GOLD,"#0F1B33",44,W(15,1),t)}
   if(t>=S(16)){const x0=C.X(200),y0=C.Y(D.c[200]),y1=C.Y(D.c[CI2]);const q=ease((t-S(16))/0.4);h+=`<line x1="${x0-30}" x2="${x0-30}" y1="${y0}" y2="${lerp(y0,y1,q)}" stroke="${RED}" stroke-width="8"/><line x1="${x0-50}" x2="${x0-10}" y1="${y0}" y2="${y0}" stroke="${RED}" stroke-width="8"/><line x1="${x0-50}" x2="${x0-10}" y1="${y1}" y2="${y1}" stroke="${RED}" stroke-width="8" opacity="${q}"/>`+popc(330,60,"DAH LEPAS!",RED,"#fff",64,W(16,2),t,-4)}
   if(t>=S(14)&&t<S(16))h+=popc(450,30,"LAMBAT",RED,"#fff",60,W(14,5),t);return h},
  (t,a,b)=>{const D=D2,k=prog(t,a,E(18),46);const C=chart(D,k,{H:700,y0:80,lines:[L200(D,{w:6,glow:false}),L50(D)]});let h=C.svg;
   if(t>=S(19)){const q=ease((t-S(19))/0.5);let d="M0 400";for(let i=0;i<=40;i++)d+=` L${i*22.5} ${400+Math.sin(i*1.7+t*6)*90*(rnd(i)+0.3)}`;h+=`<path d="${d}" fill="none" stroke="${RED}" stroke-width="4" opacity="${0.6*q}"/>`+popc(450,40,"SIDEWAYS",CY,"#0F1B33",64,S(19),t)}
   if(t>=S(20)){const s=2-back((t-S(20))/0.25);h+=`<g transform="translate(450 820) scale(${s})"><rect x="-230" y="-70" width="460" height="130" rx="30" fill="${GOLD}"/><rect x="-170" y="-40" width="22" height="70" rx="6" fill="#0F1B33"/><rect x="-130" y="-40" width="22" height="70" rx="6" fill="#0F1B33"/>${txt(50,28,"TUNGGU","#0F1B33",84)}</g>`}return h},
  (t,a,b)=>{const D=E2,a1=W(22,5),k=prog(t,a,a1,46);let lo=246;for(let i=240;i<252;i++)if(D.l[i]<D.l[lo])lo=i;
   const C0=chart(D,46,{H:700,y0:80,lines:[L50(D,{glow:true})]});const zt=W(23,2);let h="";if(t>=zt){const q=ease((t-zt)/0.4),y=C0.Y(D.l[lo]);h+=band(y-40,y+30,GOLD,q,0.22)+txt(890,y+70,"ZON SNR",GOLD,40,"end",q)}
   const C=chart(D,k,{H:700,y0:80,lines:[L50(D,{glow:true})]});h+=C.svg;const at=tAt(lo,C,a,a1);
   if(t>=Math.max(at,W(22,3))){const x=C.X(lo),y=C.Y(D.l[lo])+40;h+=`<path d="M${x} ${y} l26 26 l-26 26 l-26 -26 Z" fill="${GOLD}" filter="url(#gw)"/>`+ring(x,y,Math.max(at,W(22,3)),t,GOLD,140,0.6,10)+popc(x,y+120,"ENTRY",GOLD,"#0F1B33",50,Math.max(at,W(22,3))+0.1,t)}
   h+=popc(450,30,"PULLBACK KE EMA",CY,"#0F1B33",56,W(22,4),t);return h}
 ]};
