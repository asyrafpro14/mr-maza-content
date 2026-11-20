// VIDEO 1: RSI
function wave(n,f,seed,z=0.5){const c=[];for(let i=0;i<n;i++)c.push(f(i)+(rnd(i*7.31+seed)-0.5)*2*z);return ohlc(c,seed)}
let H1,A1,B1,C1,U1,D1,E1;
const V={stamp:"KENA TIPU!",title:"RSI",pill:"RSI CARA BETUL",
 cheat:["RSI ukur kekuatan pergerakan, skala 0 hingga 100","Trend kuat: RSI boleh duduk atas 70 lama. Bukan signal sell","Divergence: harga high baru, RSI high lebih rendah = trend lemah","Uptrend: RSI berpatah sekitar 40. Downtrend: sekitar 60","Divergence bermakna bila dekat zon SNR timeframe besar"],
 groups:[{p:[0,1],until:2},{p:[2]}],red:[[1,2],[2,4],[2,5]],
 stampT:()=>W(2,5),
 init(){
  H1=wave(82,i=>100+(i>34?0.95*(i-34):0)+2.2*Math.sin(i/2.3),3,1.1);H1.r=rsi(H1.c);
  A1=wave(80,i=>100+6*Math.sin(i/5)+2.5*Math.sin(i/2.1),5,1.2);A1.r=rsi(A1.c);
  B1=wave(80,i=>100+(i>30?1.0*(i-30):0)+2.4*Math.sin(i/2.2),9,1.1);B1.r=rsi(B1.c);
  C1=seg([[34,0,.5],[12,1.7,.5],[8,-1.3,.5],[18,0.78,.45],[6,-1.2,.5]],13);C1.r=rsi(C1.c);
  U1=wave(82,i=>100+0.6*i+4.5*Math.sin(i/2.6),21,0.5);U1.r=rsi(U1.c);
  D1=wave(82,i=>160-0.6*i-4.5*Math.sin(i/2.6),23,0.5);D1.r=rsi(D1.c);
  E1=seg([[34,0,.5],[10,1.3,.5],[10,-1.3,.5],[12,1.1,.45],[8,0.25,.4],[6,-1.4,.5]],31);E1.r=rsi(E1.c)},
 hits:()=>[W(0,3),W(1,2),W(2,5),S(10),S(11),S(14),S(15),S(16),S(19),S(21),W(23,7)],
 fl:()=>[[W(2,5),"#E0465A",.45],[S(15),"#E0465A",.25],[W(23,7),"#E7CE7C",.3]],
 hook(t){const D=H1,sellT=W(1,2),sT=W(2,5);const si=D.n-46+26;
  const k=t<sellT?prog(t,0,sellT,si-(D.n-46)+1):si-(D.n-46)+1+prog(t,sellT+0.15,sT,D.n-si-1);
  const C=chart(D,k,{H:470});const O=osc(C,k,{y0:540,H:300,range:[0,100],lines:[{arr:D.r,col:PU,w:6,glow:true}],zones:[[70,100,RED,0.18],[0,30,GOLD,0.12]],levels:[{v:70,label:"70",col:RED},{v:30,label:"30",col:GOLD}],title:"RSI 14"});
  let h=C.svg+O.svg;const tx=C.X(si);
  if(t>=W(0,3))h+=ring(tx,O.Y(D.r[si]),W(0,3),t,RED,120,0.6,10)+dot(tx,O.Y(D.r[si]),RED,W(0,3),t);
  if(t>=sellT){const ey=C.Y(D.c[si]);h+=`<line x1="${tx}" x2="900" y1="${ey}" y2="${ey}" stroke="${RED}" stroke-width="4" stroke-dasharray="12 8"/>`+popc(tx-20,ey+80,"SELL",RED,"#fff",62,sellT,t);
    if(t>sellT+0.4){const pp=Math.max(0,Math.round((ey-C.head[1])*1.6));h+=chip(730,40,`-${pp} PIPS`,"rgba(224,70,90,.25)",RED,56)}}
  if(t>=sT)h+=burst(C.head[0],C.head[1],sT,t,24,RED,360,10,1);return h},
 steps:[
  (t,a,b)=>{const D=A1,k=prog(t,a,S(7),46);const C=chart(D,k,{H:420});const O=osc(C,k,{y0:500,H:340,range:[0,100],lines:[{arr:D.r,col:PU,w:6,glow:true}],levels:[{v:50,col:MUTE}],title:"RSI"});
   let h=C.svg+O.svg;if(t>=W(6,1))h+=popc(450,30,"KEKUATAN PERGERAKAN",GOLD,"#0F1B33",52,W(6,1),t);
   h+=popc(80,O.Y(0)-20,"0",CY,"#0F1B33",56,W(7,1),t)+popc(80,O.Y(100)+44,"100",CY,"#0F1B33",56,W(7,3),t);
   if(t>=W(7,3)){const q=ease((t-W(7,3))/0.5);h+=`<rect x="140" y="${O.Y(100)}" width="14" height="${(O.Y(0)-O.Y(100))*q}" rx="7" fill="${CY}" filter="url(#gw)"/>`}return h},
  (t,a,b)=>{const D=B1,k=prog(t,a,E(10),46);const C=chart(D,k,{H:450});const O=osc(C,k,{y0:530,H:310,range:[0,100],lines:[{arr:D.r,col:PU,w:6,glow:true}],zones:[[70,100,RED,0.2]],levels:[{v:70,label:"70",col:RED,w:3}],title:"RSI"});
   let h=C.svg+O.svg;if(t>=S(10)){for(let i=C.a;i<=Math.min(C.last,C.b-1);i++){if(D.r[i]>70)h+=`<circle cx="${C.X(i)}" cy="${O.Y(D.r[i])}" r="7" fill="${GOLD}"/>`}h+=popc(240,O.Y(88),"DUDUK ATAS 70",GOLD,"#0F1B33",44,S(10)+0.6,t)}
   if(t>=S(11)){h+=popc(450,40,"OVERBOUGHT",RED,"#fff",60,S(11),t)+cross(450,40,170,W(11,1)+0.1,t)+arrow(C.head[0]-40,C.head[1]+70,-1,60,GOLD,ease((t-S(11))/0.3))}return h},
  (t,a,b)=>{const D=C1,k=prog(t,a,S(15)-0.2,D.n-(D.n-46));const C=chart(D,k,{H:450,a:D.n-46});const O=osc(C,k,{y0:530,H:310,range:[0,100],lines:[{arr:D.r,col:PU,w:6}],levels:[{v:70,label:"70",col:RED}],title:"RSI"});
   let h=C.svg+O.svg;let p1=36,p2=58;for(let i=36;i<48;i++)if(D.h[i]>D.h[p1])p1=i;for(let i=58;i<74;i++)if(D.h[i]>D.h[p2])p2=i;
   h+=seg2(C.X(p1),C.Y(D.h[p1])-14,C.X(p2),C.Y(D.h[p2])-14,GOLD,S(14),t)+(t>=S(14)?txt(C.X(p2)-10,C.Y(D.h[p2])-40,"HIGH BARU",GOLD,40,"end",ease((t-S(14))/0.3)):"");
   let r1=p1,r2=p2;for(let i=p1-2;i<=p1+2;i++)if(D.r[i]>D.r[r1])r1=i;for(let i=p2-2;i<=p2+2;i++)if(D.r[i]>D.r[r2])r2=i;
   h+=seg2(C.X(r1),O.Y(D.r[r1]),C.X(r2),O.Y(D.r[r2]),RED,S(15)+0.3,t)+(t>=S(15)+0.3?dot(C.X(r1),O.Y(D.r[r1]),RED,S(15)+0.3,t,9)+dot(C.X(r2),O.Y(D.r[r2]),RED,S(15)+0.6,t,9)+txt(C.X(r2)-10,O.Y(D.r[r2])-24,"HIGH RENDAH",RED,38,"end"):"");
   if(t>=S(16)){const q=1-0.7*ease((t-S(16)-0.2)/0.8);h+=`<g transform="translate(250 40) scale(${2-back((t-S(16))/0.25)})"><rect x="-200" y="-44" width="400" height="88" rx="16" fill="rgba(5,8,15,.85)" stroke="${GOLD}" stroke-width="4"/><rect x="-182" y="-28" width="${150*q}" height="56" rx="8" fill="${q>0.5?GOLD:RED}"/>${txt(70,18,"LEMAH",RED,52)}</g>`}return h},
  (t,a,b)=>{const up=t<S(20);const D=up?U1:D1,a0=up?a:S(20),a1=up?E(19):E(21);const k=prog(t,a0,a1,46);const lv=up?40:60;
   const C=chart(D,k,{H:430});const O=osc(C,k,{y0:510,H:330,range:[0,100],lines:[{arr:D.r,col:PU,w:6}],zones:[[up?30:50,up?50:70,up?GOLD:RED,0.16]],levels:[{v:lv,label:String(lv),col:up?GOLD:RED,w:4,glow:true,size:40}],title:up?"UPTREND":"DOWNTREND",titleCol:up?GOLD:RED});
   let h=C.svg+O.svg;const pk=peaks(D.r,C.a,C.b,3,up);pk.forEach(i=>{if(i>C.last)return;if(Math.abs(D.r[i]-lv)>14)return;const at=tAt(i,C,a0,a1);h+=dot(C.X(i),O.Y(D.r[i]),up?GOLD:RED,at,t,10)});
   h+=popc(450,30,up?"RSI BERPATAH ~40":"RSI BERPATAH ~60",up?GOLD:RED,up?"#0F1B33":"#fff",54,up?W(19,3):W(21,1),t);return h},
  (t,a,b)=>{const D=E1,k=prog(t,a,E(23)-0.4,46);const C=chart(D,k,{H:450,a:D.n-46});const O=osc(C,k,{y0:530,H:310,range:[0,100],lines:[{arr:D.r,col:PU,w:6}],levels:[{v:70,label:"70",col:RED}],title:"RSI"});
   let p1=C.a,p2=C.a+22;for(let i=C.a;i<C.a+20;i++)if(D.h[i]>D.h[p1])p1=i;for(let i=C.a+22;i<C.b;i++)if(D.h[i]>D.h[p2])p2=i;
   const zt=W(23,7),zq=t>=zt?ease((t-zt)/0.4):0;let h="";if(zq>0){const y=C.Y(D.h[p2]);h+=band(y-30,y+50,RED,zq,0.2)+txt(890,y-44,"ZON SNR TF BESAR",RED,36,"end",zq)}
   h+=C.svg+O.svg;
   if(t>=Math.max(W(23,0)+0.3,tAt(p2,C,a,E(23)-0.4)+0.2)){let r1=p1,r2=p2;for(let i=p1-2;i<=p1+2;i++)if(D.r[i]>D.r[r1])r1=i;for(let i=p2-2;i<=p2+2;i++)if(D.r[i]>D.r[r2])r2=i;const t0=Math.max(W(23,0)+0.3,tAt(p2,C,a,E(23)-0.4)+0.2);
    h+=seg2(C.X(p1),C.Y(D.h[p1])-12,C.X(p2),C.Y(D.h[p2])-12,GOLD,t0,t,6)+seg2(C.X(r1),O.Y(D.r[r1]),C.X(r2),O.Y(D.r[r2]),RED,t0+0.2,t,6)}
   if(zq>0)h+=ring(C.X(p2),C.Y(D.h[p2]),zt+0.3,t,GOLD,140,0.6,10)+popc(450,30,"DIVERGENCE + ZON",GOLD,"#0F1B33",56,zt+0.4,t);return h}
 ]};
