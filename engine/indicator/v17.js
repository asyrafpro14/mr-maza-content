// VIDEO 17: STORYLINE OHLC
function pth(pts,seed,z=0.45,n){n=n||pts[pts.length-1][0]+1;const c=[];let k=0;for(let i=0;i<n;i++){while(k<pts.length-2&&i>pts[k+1][0])k++;const [i0,v0]=pts[k],[i1,v1]=pts[k+1];const p=cl((i-i0)/((i1-i0)||1));c.push(lerp(v0,v1,p)+(rnd(i*7.31+seed)-0.5)*2*z)}return ohlc(c,seed)}
function bigC(x,o,c,hi,lo,Y,w,col,op=1){const top=Y(Math.max(o,c)),bot=Y(Math.min(o,c));return `<g opacity="${op}"><line x1="${x}" x2="${x}" y1="${Y(hi)}" y2="${Y(lo)}" stroke="${col}" stroke-width="10" stroke-linecap="round"/><rect x="${x-w/2}" y="${top}" width="${w}" height="${Math.max(6,bot-top)}" rx="10" fill="${col}"/></g>`}
// garis label dari candle ke teks
function lab(x1,y1,x2,s,col,t0,t,size=48,anchor="start"){if(t<t0)return"";const q=ease((t-t0)/0.3);return `<g opacity="${q}"><line x1="${x1}" x2="${lerp(x1,x2,q)}" y1="${y1}" y2="${y1}" stroke="${col}" stroke-width="4" stroke-dasharray="10 8"/><circle cx="${x1}" cy="${y1}" r="10" fill="${col}"/></g>`+popc(x2+(anchor==="start"?90:-90),y1,s,col,"#0F1B33",size,t0,t)}
let H2;
const V={stamp:"CERITA?",title:"OHLC",sub:"Cara betul baca",pill:"STORYLINE OHLC",cta:true,q:"KOMEN: H1 / H4",
 msgRe:/^Candle bukan/,m1:"CANDLE",m3:"Ayat dalam",m4:"STORY CHART",msgTimes:()=>[S(28),W(28,1),S(29),W(29,3)],
 cheat:["Setiap candle = Open, High, Low, Close","Open ke Close: siapa menang, pembeli atau penjual","High &amp; Low: sejauh mana harga diuji","Tutup dekat High = pembeli kawal. Dekat Low = penjual kawal","Satu candle satu ayat. Beberapa candle = satu cerita"],
 groups:[{p:[0],until:1},{p:[1]}],red:[[0,4],[0,6],[1,8]],
 stampT:()=>W(1,8),
 init(){H2=pth([[0,100],[8,106],[14,102],[22,108],[28,104],[36,110],[45,106]],4,1.1,46)},
 hits:()=>[W(0,4),W(0,6),W(1,8),S(6),S(7),S(8),S(9),S(10),W(13,0),W(13,2),S(17),S(21),S(23),W(27,3)],
 fl:()=>[[W(1,8),"#E0465A",.3],[S(10),"#E7CE7C",.3]],
 hook(t){const D=H2,k=prog(t,0,W(0,6),46);const C=chart(D,k,{a:0,b:46,H:600,y0:260});let h=C.svg;
  if(t>=W(0,4)){let up=0,dn=0;for(let i=0;i<=Math.min(C.last,45);i++){if(D.c[i]>=D.o[i])up++;else dn++}h+=popc(220,190,"NAIK "+up,GOLD,"#0F1B33",50,W(0,4),t)}
  if(t>=W(0,6))h+=popc(680,190,"TURUN?",RED,"#fff",50,W(0,6),t);
  if(t>=S(1)){const q=ease((t-S(1))/0.4);for(let i=6;i<46;i+=8){const x=C.X(i),y=C.Y(D.h[i])-40;h+=txt(x,y,"?",CY,70,"middle",q*(0.5+0.5*Math.sin(t*6+i)))}}
  return h},
 steps:[
  (t,a,b)=>{const Y=v=>860-(v-20)*11;let h="";const x=450,o=40,c=72,hi=86,lo=28;const g=ease((t-a)/Math.max(0.4,S(6)-a));
   h+=bigC(x,o,lerp(o,c,g),lerp(o+1,hi,g),lerp(o-1,lo,g),Y,170,GOLD);
   h+=lab(x-90,Y(o),260,"OPEN",CY,S(6),t,48,"end")+lab(x,Y(hi),640,"HIGH",GOLD,S(7),t)+lab(x,Y(lo),640,"LOW",RED,S(8),t)+lab(x-90,Y(c),260,"CLOSE",GOLD,S(9),t,48,"end");
   h+=t<S(10)?popc(450,40,"4 HARGA",GOLD,"#0F1B33",58,W(5,3),t):"";
   if(t>=S(10))h+=popc(450,40,"O · H · L · C",GOLD,"#0F1B33",62,S(10),t)+ring(x,Y(56),S(10),t,GOLD,240,0.6,12);
   return h},
  (t,a,b)=>{const Y=v=>860-(v-20)*11;let h="";const x1=260,x2=640;const g1=ease((t-a)/0.6);
   h+=bigC(x1,36,lerp(36,74,g1),lerp(37,78,g1),33,Y,160,GOLD);
   if(t>=a+0.2)h+=arrow(x1-140,Y(36),-1,(Y(36)-Y(74))*ease((t-a-0.2)/0.5),GOLD,1,8)+txt(x1-140,Y(36)+50,"O",CY,44)+(t>=a+0.7?txt(x1-140,Y(74)-50,"C",GOLD,44):"");
   if(t>=W(12,1)){const g2=ease((t-W(12,1))/0.6);h+=bigC(x2,74,lerp(74,38,g2),77,lerp(73,34,g2),Y,160,RED)+arrow(x2+140,Y(74),1,(Y(38)-Y(74))*g2,RED,1,8)+txt(x2+140,Y(74)-30,"O",CY,44)+(g2>0.95?txt(x2+140,Y(38)+70,"C",RED,44):"")}
   h+=popc(450,40,"OPEN KE CLOSE",CY,"#0F1B33",58,a,t);
   if(t>=W(13,0))h+=popc(x1,790,"PEMBELI MENANG",GOLD,"#0F1B33",42,W(13,0),t);
   if(t>=W(13,2))h+=popc(x2,790,"PENJUAL MENANG",RED,"#fff",42,W(13,2),t);
   return h},
  (t,a,b)=>{const Y=v=>860-(v-20)*11;let h="";const x=360,o=44,c=50,hi=88,lo=38;const g=ease((t-a)/0.9);
   const cc=g<0.6?lerp(o,82,g/0.6):lerp(82,c,(g-0.6)/0.4);h+=bigC(x,o,cc,lerp(o+1,hi,Math.min(1,g/0.6)),lerp(o-1,lo,g),Y,150,GOLD);
   if(t>=W(15,3)){const q=ease((t-W(15,3))/0.4);const bx=x+170;h+=`<g opacity="${q}"><line x1="${bx}" x2="${bx}" y1="${Y(hi)}" y2="${Y(lo)}" stroke="${CY}" stroke-width="6"/><line x1="${bx-20}" x2="${bx+20}" y1="${Y(hi)}" y2="${Y(hi)}" stroke="${CY}" stroke-width="6"/><line x1="${bx-20}" x2="${bx+20}" y1="${Y(lo)}" y2="${Y(lo)}" stroke="${CY}" stroke-width="6"/></g>`+popc(bx+170,Y(63),"JULAT DIUJI",CY,"#0F1B33",44,W(15,3),t)}
   if(t>=S(16)){h+=`<rect x="${x-50}" y="${Y(hi)-14}" width="100" height="${Y(c)-Y(hi)+10}" rx="20" fill="none" stroke="${RED}" stroke-width="6" filter="url(#gw)" opacity="${ease((t-S(16))/0.3)}"/>`+popc(x-190,Y(60),"EKOR ATAS",RED,"#fff",44,S(16),t)}
   if(t>=S(17))h+=arrow(x-180,Y(88),1,120,RED,ease((t-S(17))/0.3),10)+popc(450,40,"DITOLAK DARI ATAS",RED,"#fff",56,S(17),t);
   return h},
  (t,a,b)=>{const Y=v=>860-(v-20)*11;let h="";const x1=260,x2=640;
   const g1=ease((t-a)/0.6);h+=bigC(x1,36,lerp(36,78,g1),lerp(37,80,g1),33,Y,150,GOLD);
   const g2=ease((t-W(19,1))/0.6);if(t>=W(19,1))h+=bigC(x2,74,lerp(74,32,g2),80,lerp(73,30,g2),Y,150,RED);
   h+=popc(450,40,"TENGOK DI MANA TUTUP",GOLD,"#0F1B33",52,W(19,1),t);
   if(t>=S(20)){h+=`<line x1="${x1-110}" x2="${x1+110}" y1="${Y(78)}" y2="${Y(78)}" stroke="${GOLD}" stroke-width="6" filter="url(#gw)"/>`+txt(x1,Y(80)-30,"TUTUP DEKAT HIGH",GOLD,40)}
   if(t>=S(21))h+=popc(x1,790,"PEMBELI KAWAL",GOLD,"#0F1B33",42,S(21),t);
   if(t>=S(22)){h+=`<line x1="${x2-110}" x2="${x2+110}" y1="${Y(32)}" y2="${Y(32)}" stroke="${RED}" stroke-width="6" filter="url(#gw)"/>`+txt(x2,Y(82)-30,"TUTUP DEKAT LOW",RED,40)}
   if(t>=S(23))h+=popc(x2,790,"PENJUAL KAWAL",RED,"#fff",42,S(23),t);
   return h},
  (t,a,b)=>{const Y=v=>760-(v-20)*9;let h="";
   const cs=[[80,48,82,44,RED,"JUAL KUAT"],[48,46,52,42,MUTE,"RAGU"],[46,52,54,28,GOLD,"TOLAK BAWAH"],[52,80,82,50,GOLD,"BELI MASUK"]];
   cs.forEach(([o,c,hi,lo,col,s],i)=>{const x=135+i*210,t0=i===0?a+0.1:S(26)+(i-1)*0.35;if(t<t0)return;const g=ease((t-t0)/0.4);
    h+=bigC(x,o,lerp(o,c,g),hi,lerp(Math.min(o,c),lo,g),Y,110,col===MUTE?INK:col,1);if(t>=t0+0.3)h+=txt(x,Y(20)+20,s,col===MUTE?INK:col,34,"middle",ease((t-t0-0.3)/0.3))});
   h+=t<S(27)?popc(450,40,"1 CANDLE = 1 AYAT",CY,"#0F1B33",56,W(25,1),t):"";
   if(t>=S(27)){const q=ease((t-S(27))/0.5);h+=`<path d="M60 ${Y(88)} Q450 ${Y(96)} 840 ${Y(88)}" fill="none" stroke="${GOLD}" stroke-width="6" stroke-dasharray="${q*900} 2000"/>`+popc(450,40,"SATU CERITA: PENJUAL LEMAH",GOLD,"#0F1B33",48,W(27,2),t)}
   return h}
 ]};
