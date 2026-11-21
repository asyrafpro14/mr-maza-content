// VIDEO 6: DOUBLE TOP & DOUBLE BOTTOM
// siri harga dari titik kawalan [indeks, harga] + hingar kecil
function path(pts,seed,z=0.45,n){n=n||pts[pts.length-1][0]+1;const c=[];let k=0;for(let i=0;i<n;i++){while(k<pts.length-2&&i>pts[k+1][0])k++;const [i0,v0]=pts[k],[i1,v1]=pts[k+1];const p=cl((i-i0)/((i1-i0)||1));c.push(lerp(v0,v1,p)+(rnd(i*7.31+seed)-0.5)*2*z)}return ohlc(c,seed)}
function mirror(D,m=200){return{c:D.c.map(v=>m-v),o:D.o.map(v=>m-v),h:D.l.map(v=>m-v),l:D.h.map(v=>m-v),n:D.n}}
function hmax(D,a,b){let j=a;for(let i=a;i<=b;i++)if(D.h[i]>D.h[j])j=i;return j}
function lmin(D,a,b){let j=a;for(let i=a;i<=b;i++)if(D.l[i]<D.l[j])j=i;return j}
function hline(C,v,col,lab,q=1,w=5,dash="",glow=false,x0=0){const y=C.Y(v);return `<line x1="${x0}" x2="${x0+(900-x0)*q}" y1="${y}" y2="${y}" stroke="${col}" stroke-width="${w}" ${dash?`stroke-dasharray="${dash}"`:""} ${glow?'filter="url(#gw)"':''}/>`+(lab&&q>0.6?txt(892,y-14,lab,col,40,"end"):"")}
let H6,A6,B6,C6,D6,E6,F6;
const V={stamp:"AWAL!",title:"DOUBLE<br>TOP",sub:"Cara betul baca",pill:"DOUBLE TOP CARA BETUL",
 cheat:["Double top = 2 puncak hampir sama tinggi + 1 lembah (neckline)","Neckline belum pecah? Itu belum double top, cuma range","Puncak kedua gagal sampai puncak pertama = pembeli lemah","Lepas neckline pecah, harga selalu datang retest neckline","Paling bermakna dekat resistance TF besar. Double bottom = terbalik"],
 groups:[{p:[0,1],until:2},{p:[2]}],red:[[0,4],[0,5],[1,4],[2,3]],
 stampT:()=>W(2,3),
 init(){
  H6=path([[0,96],[16,118],[18,120],[23,112],[28,120],[32,114.5],[45,134]],3,0.9,46);
  A6=path([[0,100],[13,118],[14,120],[22,111],[30,119.8],[37,112],[45,104]],5,0.8,46);
  B6=path([[0,100],[12,118],[13,120],[19,111],[25,119.5],[30,112],[35,118.5],[40,111.8],[45,116]],7,0.7,46);
  C6=path([[0,100],[13,118],[14,120],[22,111],[30,116.8],[37,112],[45,105]],9,0.75,46);
  D6=path([[0,104],[10,119],[11,120.5],[17,112],[23,120],[29,113],[32,108],[36,112.4],[39,109],[45,100]],11,0.7,46);
  E6=path([[0,80],[24,112],[28,118],[31,113],[35,118],[39,112],[45,106]],13,0.8,46)},
 hits:()=>[W(0,5),W(1,4),W(2,3),W(6,4),W(7,2),S(8),W(10,3),W(11,2),S(12),W(14,3),S(15),W(17,2),W(18,4),W(20,7),W(21,1),S(22)],
 fl:()=>[[W(1,4),"#E0465A",.35],[W(17,2),"#E0465A",.3],[S(22),"#E7CE7C",.3]],
 hook(t){const D=H6,sT=W(0,5),uT=W(1,4);const k=t<sT?prog(t,0,sT,30):30+prog(t,sT+0.2,uT,16);
  const C=chart(D,k,{a:0,b:46,H:640,y0:140});let h="";const p1=hmax(D,12,20),p2=hmax(D,25,30);
  if(t>=W(0,3)){h+=dot(C.X(p1),C.Y(D.h[p1])-20,GOLD,W(0,3),t,10)+dot(C.X(p2),C.Y(D.h[p2])-20,GOLD,W(0,4),t,10)}
  h+=C.svg;
  if(t>=sT){const ey=C.Y(D.c[29]);h+=`<line x1="${C.X(29)}" x2="900" y1="${ey}" y2="${ey}" stroke="${RED}" stroke-width="4" stroke-dasharray="12 8"/>`+popc(C.X(29)-40,ey+80,"SELL",RED,"#fff",60,sT,t)}
  if(t>=uT){h+=burst(C.head[0],C.head[1],uT,t,24,RED,360,10,1)+arrow(840,C.Y(D.c[36]),-1,90,GOLD,ease((t-uT)/0.3),9)+popc(600,60,"TERUS NAIK",GOLD,"#0F1B33",56,uT,t)}
  return h},
 steps:[
  (t,a,b)=>{const D=A6,k=prog(t,a,E(6),37);const C=chart(D,k,{a:0,b:46,H:700,y0:120});let h="";const p1=hmax(D,10,17),p2=hmax(D,26,33),v=lmin(D,18,26);const nk=D.l[v];
   if(t>=S(8))h+=hline(C,nk,GOLD,"NECKLINE",ease((t-S(8))/0.4),6,"",true);
   h+=C.svg;
   [[p1,W(6,4)],[p2,W(6,4)+0.25]].forEach(([i,t0])=>{if(t>=t0)h+=ring(C.X(i),C.Y(D.h[i]),t0,t,GOLD,110,0.6,9)+dot(C.X(i),C.Y(D.h[i])-22,GOLD,t0,t,11)});
   if(t>=W(6,6)){const y=Math.min(C.Y(D.h[p1]),C.Y(D.h[p2]))-22;h+=seg2(C.X(p1),y,C.X(p2),y,GOLD,W(6,6),t,5)+popc(450,40,"HAMPIR SAMA TINGGI",GOLD,"#0F1B33",50,W(6,6),t)}
   if(t>=W(7,2))h+=dot(C.X(v),C.Y(nk)+22,CY,W(7,2),t,11)+popc(C.X(v),C.Y(nk)+100,"LEMBAH",CY,"#0F1B33",46,W(7,2),t);
   return h},
  (t,a,b)=>{const D=B6,k=prog(t,a,S(12)+0.6,46);const top=120.4,nk=111.2;const C=chart(D,k,{a:0,b:46,H:700,y0:120,extra:[nk-3,top+2]});let h="";
   if(t>=S(12))h+=band(C.Y(top),C.Y(nk),MUTE,ease((t-S(12))/0.4),0.14);
   h+=hline(C,nk,GOLD,"NECKLINE",1,5,"",t>=W(10,1)&&t<W(10,1)+1.2)+hline(C,top,RED,"",1,3,"10 10")+C.svg;
   if(t>=W(10,3))h+=popc(200,C.Y(nk)+80,"BELUM PECAH",GOLD,"#0F1B33",46,W(10,3),t);
   if(t>=W(11,2)){h+=popc(450,60,"DOUBLE TOP",RED,"#fff",60,W(11,2),t)+cross(450,60,85,W(11,3),t)}
   if(t>=S(12))h+=popc(450,C.Y((top+nk)/2),"CUMA RANGE",INK,"#0F1B33",64,W(12,2),t);
   return h},
  (t,a,b)=>{const D=C6,k=prog(t,a,E(14),34);const C=chart(D,k,{a:0,b:46,H:700,y0:120});let h="";const p1=hmax(D,10,17),p2=hmax(D,26,33);
   h+=C.svg;h+=dot(C.X(p1),C.Y(D.h[p1])-20,GOLD,S(14),t,11);
   if(t>=W(14,1)){h+=hline(C,D.h[p1],GOLD,"PUNCAK 1",1,3,"10 10",false,C.X(p1))}
   if(t>=W(14,3)){const y1=C.Y(D.h[p1]),y2=C.Y(D.h[p2]);h+=dot(C.X(p2),y2-20,RED,W(14,3),t,11)+`<g opacity="${ease((t-W(14,3))/0.3)}">${arrow(C.X(p2)+60,y1+6,1,Math.max(8,y2-y1-30),RED,1,6)}</g>`+popc(C.X(p2),y2-110,"GAGAL",RED,"#fff",56,W(14,3),t)}
   if(t>=S(15)){const q=1-0.75*ease((t-S(15)-0.2)/0.9);h+=`<g transform="translate(450 820) scale(${2-back((t-S(15))/0.25)})"><rect x="-300" y="-50" width="600" height="100" rx="18" fill="rgba(5,8,15,.88)" stroke="${GOLD}" stroke-width="4"/><rect x="-282" y="-32" width="${250*q}" height="64" rx="10" fill="${q>0.5?GOLD:RED}"/>${txt(130,20,"PEMBELI",RED,54)}</g>`}
   return h},
  (t,a,b)=>{const D=D6,a1=E(18),k=prog(t,a,a1,46);const C=chart(D,k,{a:0,b:46,H:700,y0:120});let h="";const v=lmin(D,14,20),nk=D.l[v];
   h+=hline(C,nk,GOLD,"NECKLINE",1,5,"",false)+C.svg;
   let bi=30;for(let i=26;i<40;i++)if(D.c[i]<nk-0.5){bi=i;break}const bt=Math.max(tAt(bi,C,a,a1),W(17,2));
   if(t>=bt)h+=ring(C.X(bi),C.Y(nk),bt,t,RED,200,0.6,14)+burst(C.X(bi),C.Y(nk),bt,t,20,RED,300,9,0.9)+popc(C.X(bi)-120,C.Y(nk)+110,"PECAH",RED,"#fff",50,bt,t);
   const ri=hmax(D,34,38),rt=Math.max(tAt(ri,C,a,a1),W(18,4));
   if(t>=rt)h+=ring(C.X(ri),C.Y(nk),rt,t,GOLD,150,0.6,12)+arrow(C.X(ri),C.Y(nk)-130,1,70,GOLD,ease((t-rt)/0.3),8)+popc(Math.min(760,C.X(ri)+40),C.Y(nk)-190,"RETEST",GOLD,"#0F1B33",56,rt,t);
   return h},
  (t,a,b)=>{const flip=t>=S(22);const D=flip?mirror(E6,224):E6;const a0=flip?S(22):a,a1=flip?E(23):E(21);const k=prog(t,a0,a1,46);
   const C=chart(D,k,{a:0,b:46,H:700,y0:120});let h="";const zt=W(20,7),zq=t>=zt?ease((t-zt)/0.4):0;
   const zv=flip?224-118:118;if(zq>0){const y=C.Y(zv);h+=band(y-40,y+40,flip?CY:RED,zq,0.2)+(flip?txt(10,y+80,"SUPPORT TF BESAR",CY,38,"start",zq):txt(890,y-56,"RESISTANCE TF BESAR",RED,38,"end",zq))}
   h+=C.svg;
   if(!flip&&t>=W(21,1)){h+=seg2(C.X(1),C.Y(D.l[1]),C.X(24),C.Y(D.l[24]),GOLD,W(21,1),t,6,0.6)+popc(260,C.Y(D.c[14])+150,"TREND NAIK PANJANG",GOLD,"#0F1B33",44,W(21,2),t)}
   if(flip){h+=popc(450,40,"DOUBLE BOTTOM",CY,"#0F1B33",60,S(22)+0.1,t)+popc(450,140,"SAMA, CUMA TERBALIK",INK,"#0F1B33",50,S(23),t)}
   else if(t>=W(20,1))h+=popc(450,40,"DOUBLE TOP",RED,"#fff",60,W(20,1),t);
   return h}
 ]};
