// VIDEO 9: ATR (Wilder 14, RMA)
function wave(n,f,seed,z=0.5){const c=[];for(let i=0;i<n;i++)c.push(f(i)+(rnd(i*7.31+seed)-0.5)*2*z);return ohlc(c,seed)}
function atrW(D,n=14){const tr=D.c.map((c,i)=>i?Math.max(D.h[i]-D.l[i],Math.abs(D.h[i]-D.c[i-1]),Math.abs(D.l[i]-D.c[i-1])):D.h[i]-D.l[i]);
  const r=[];let a=null;for(let i=0;i<tr.length;i++){if(i<n-1){r.push(null);continue}a=i===n-1?tr.slice(0,n).reduce((x,y)=>x+y)/n:(a*(n-1)+tr[i])/n;r.push(a)}return{tr,r}}
let H9,A9,B9,C9;const SLV={};
const V={stamp:"VOLATILITY?",title:"ATR",pill:"ATR CARA BETUL",
 cheat:["ATR = purata julat sebenar, biasanya 14 candle","ATR bukan arah. Ia cuma ukur berapa ganas market","ATR naik = market liar. ATR turun = market senyap","Gold: ATR selalu tinggi masa sesi London & New York","ATR tinggi, ramai kurangkan lot supaya risiko kekal sama"],
 groups:[{p:[0,1],until:2},{p:[2]}],red:[[0,5],[2,3]],
 stampT:()=>W(2,3),
 init(){
  H9=wave(46,i=>100+0.32*i+1.6*Math.sin(i/2.2),3,0.9);
  let lo=1e9;for(let i=18;i<28;i++)lo=Math.min(lo,H9.l[i]);SLV.v=lo-0.6;H9.l[29]=SLV.v-1.4;H9.c[29]=Math.max(H9.c[29],H9.o[29]+0.3);H9.h[29]=Math.max(H9.h[29],H9.c[29]+0.2);H9.o[30]=H9.c[29];
  A9=wave(80,i=>100+4*Math.sin(i/6)+1.5*Math.sin(i/2.1),5,1.1);A9.a=atrW(A9).r;
  B9=wave(80,i=>i<50?100+0.45*(i-30)+1.2*Math.sin(i/2):109-0.45*(i-50)+1.2*Math.sin(i/2),9,1.0);B9.a=atrW(B9).r;
  C9=seg([[34,0,.35],[8,0.05,.35],[18,0,2.4],[20,0,.3]],13);C9.a=atrW(C9).r},
 hits:()=>[W(0,5),W(1,4),S(7),W(8,3),S(10),S(12),S(13),S(15),S(17),W(21,3),W(21,5),W(24,6)],
 fl:()=>[[W(0,5),"#E0465A",.35],[S(15),"#E0465A",.25],[W(24,6),"#E7CE7C",.3]],
 hook(t){const D=H9,a1=W(1,6),k=prog(t,0,a1,46);const C=chart(D,k,{a:0,b:46,H:620,y0:100});let h="";const y=C.Y(SLV.v);
  h+=`<line x1="0" x2="900" y1="${y}" y2="${y}" stroke="${RED}" stroke-width="5" stroke-dasharray="14 10"/>`+txt(892,y+48,"SL KETAT",RED,40,"end");
  h+=C.svg;const ht=tAt(29,C,0,a1);
  if(t>=ht){h+=ring(C.X(29),y,ht,t,RED,160,0.6,12)+burst(C.X(29),y,ht,t,20,RED,300,9,0.9)+popc(C.X(29),y+120,"KENA SENTUH",RED,"#fff",54,ht,t)}
  if(t>=W(1,4)){const q=ease((t-W(1,4))/0.4);h+=`<g opacity="${q}">${arrow(780,C.Y(D.c[45])+120,-1,140,GOLD,q,10)}</g>`+popc(600,30,"HARGA TERUS NAIK",GOLD,"#0F1B33",50,W(1,4),t)}return h},
 steps:[
  (t,a,b)=>{const D=A9,k=prog(t,a,E(10),46);const C=chart(D,k,{a:34,b:80,H:420,y0:40});const O=osc(C,k,{y0:520,H:320,lines:[{arr:D.a,col:CY,w:6,glow:true}],title:"ATR 14"});
   let h=C.svg+O.svg;h+=popc(450,20,"AVERAGE TRUE RANGE",CY,"#0F1B33",50,S(7),t)+popc(450,480,"WILDER, 1978",GOLD,"#0F1B33",48,W(8,3),t);
   if(t>=S(10)){const q=ease((t-S(10))/0.4),x0=C.X(Math.max(34,C.last-13))-C.cw/2,x1=C.X(Math.min(C.last,79))+C.cw/2;h+=`<rect x="${x0}" y="40" width="${(x1-x0)*q}" height="420" fill="${GOLD}" opacity=".12" stroke="${GOLD}" stroke-width="3"/>`+popc((x0+x1)/2,250,"14 CANDLE",GOLD,"#0F1B33",52,S(10)+0.2,t)}return h},
  (t,a,b)=>{const D=B9,k=prog(t,a,E(13),46);const C=chart(D,k,{a:34,b:80,H:420,y0:40});const O=osc(C,k,{y0:520,H:320,lines:[{arr:D.a,col:CY,w:6,glow:true}],title:"ATR"});
   let h=C.svg+O.svg;if(t>=S(12)){h+=`<g opacity="${ease((t-S(12))/0.3)}">${arrow(120,300,-1,120,MUTE,1,8)}${arrow(220,180,1,120,MUTE,1,8)}</g>`+popc(450,90,"BUKAN ARAH",RED,"#fff",62,S(12),t)+cross(170,240,90,S(12)+0.3,t)}
   if(t>=S(13))h+=popc(450,480,"UKUR BERAPA GANAS",CY,"#0F1B33",54,S(13),t);return h},
  (t,a,b)=>{const D=C9,k=prog(t,a,E(18),46);const C=chart(D,k,{a:34,b:80,H:420,y0:40});const O=osc(C,k,{y0:520,H:320,lines:[{arr:D.a,col:CY,w:6,glow:true}],title:"ATR"});
   let h="";const xv0=C.X(42)-C.cw/2,xv1=C.X(59)+C.cw/2;
   if(t>=S(15)){const q=ease((t-S(15))/0.4);h+=`<rect x="${xv0}" y="40" width="${(xv1-xv0)*q}" height="800" fill="${RED}" opacity=".12"/>`}
   if(t>=S(17)){const q=ease((t-S(17))/0.4);h+=`<rect x="${xv1}" y="40" width="${(900-xv1)*q}" height="800" fill="${CY}" opacity=".10"/>`}
   h+=C.svg+O.svg;h+=popc((xv0+xv1)/2,500,"ATR NAIK",RED,"#fff",46,S(15),t)+popc((xv0+xv1)/2,30,"LIAR",RED,"#fff",60,W(16,2),t)+popc(Math.min(800,(xv1+900)/2),500,"ATR TURUN",CY,"#0F1B33",46,S(17),t)+popc(Math.min(800,(xv1+900)/2),30,"SENYAP",CY,"#0F1B33",60,W(18,2),t);return h},
  (t,a,b)=>{let h="";const vals=[3,3,2,2,2,3,3,4,5,6,8,8,7,7,6,8,10,11,9,7,5,4,3,3];const base=760,bw=900/24;
   h+=`<line x1="0" x2="900" y1="${base}" y2="${base}" stroke="${MUTE}" stroke-width="3"/>`;
   vals.forEach((v,i)=>{const t0=a+0.2+i*0.04;if(t<t0)return;const q=ease((t-t0)/0.35);const ht=v*52*q;const lon=i>=9&&i<=13,ny=i>=15&&i<=19;
    const col=ny&&t>=W(21,5)?GOLD:lon&&t>=W(21,3)?GOLD:"rgba(127,211,255,.55)";h+=`<rect x="${i*bw+4}" y="${base-ht}" width="${bw-8}" height="${ht}" rx="5" fill="${col}"/>`});
   h+=txt(170,base+60,"ASIA",MUTE,40)+txt(430,base+60,"LONDON",t>=W(21,3)?GOLD:MUTE,40)+txt(660,base+60,"NEW YORK",t>=W(21,5)?GOLD:MUTE,40)+txt(10,base+110,"ILUSTRASI, WAKTU MALAYSIA",MUTE,28,"start");
   h+=popc(450,40,"ATR GOLD IKUT SESI",CY,"#0F1B33",54,S(20),t);
   if(t>=W(21,3))h+=ring(430,base-380,W(21,3),t,GOLD,140,0.6,10);if(t>=W(21,5))h+=ring(660,base-560,W(21,5),t,GOLD,140,0.6,10);return h},
  (t,a,b)=>{let h="";const row=(y,lab,rw,lw,col,t0)=>{if(t<t0)return"";const q=ease((t-t0)/0.4);
    return txt(0,y-20,lab,col,46,"start",q)+`<rect x="0" y="${y}" width="${rw*q}" height="60" rx="12" fill="${col}" opacity=".85"/>`+txt(10,y+110,"JULAT",MUTE,32,"start",q)+
     `<rect x="560" y="${y}" width="${lw*q}" height="${lw*0.5}" rx="12" fill="${GOLD}" opacity=".9"/>`+txt(560,y+lw*0.5+50,"SAIZ LOT",MUTE,32,"start",q)};
   h+=row(110,"ATR RENDAH",220,320,CY,a+0.2)+row(470,"ATR TINGGI",500,140,RED,S(23));
   if(t>=W(24,2))h+=`<g opacity="${ease((t-W(24,2))/0.3)}">${arrow(830,330,1,90,GOLD,1,8)}</g>`;
   h+=popc(450,800,"RISIKO KEKAL SAMA",GOLD,"#0F1B33",64,W(24,6),t);return h}
 ]};
