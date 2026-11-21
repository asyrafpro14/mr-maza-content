// VIDEO 7: HEAD AND SHOULDERS
function path(pts,seed,z=0.45,n){n=n||pts[pts.length-1][0]+1;const c=[];let k=0;for(let i=0;i<n;i++){while(k<pts.length-2&&i>pts[k+1][0])k++;const [i0,v0]=pts[k],[i1,v1]=pts[k+1];const p=cl((i-i0)/((i1-i0)||1));c.push(lerp(v0,v1,p)+(rnd(i*7.31+seed)-0.5)*2*z)}return ohlc(c,seed)}
function mirror(D,m=200){return{c:D.c.map(v=>m-v),o:D.o.map(v=>m-v),h:D.l.map(v=>m-v),l:D.h.map(v=>m-v),n:D.n}}
function hmax(D,a,b){let j=a;for(let i=a;i<=b;i++)if(D.h[i]>D.h[j])j=i;return j}
function lmin(D,a,b){let j=a;for(let i=a;i<=b;i++)if(D.l[i]<D.l[j])j=i;return j}
function hline(C,v,col,lab,q=1,w=5,dash="",glow=false,x0=0){const y=C.Y(v);return `<line x1="${x0}" x2="${x0+(900-x0)*q}" y1="${y}" y2="${y}" stroke="${col}" stroke-width="${w}" ${dash?`stroke-dasharray="${dash}"`:""} ${glow?'filter="url(#gw)"':''}/>`+(lab&&q>0.6?txt(892,y-14,lab,col,40,"end"):"")}
// neckline condong: garis melalui 2 lembah, dipanjangkan ke kanan
function nline(C,D,v1,v2,col,q=1,w=6){const x1=C.X(v1),y1=C.Y(D.l[v1]),x2=C.X(v2),y2=C.Y(D.l[v2]);const m=(y2-y1)/(x2-x1);const xe=lerp(x1,900,q);return `<line x1="${x1-60}" y1="${y1-60*m}" x2="${xe}" y2="${y1+(xe-x1)*m}" stroke="${col}" stroke-width="${w}" filter="url(#gw)"/>`}
function nAt(C,D,v1,v2,i){return lerp(D.l[v1],D.l[v2],(i-v1)/(v2-v1))}
let H7,A7,B7,D7,E7;
const V={stamp:"KENA SL!",title:"HEAD &amp;<br>SHOULDERS",sub:"Cara betul baca",pill:"HEAD & SHOULDERS",
 cheat:["3 puncak: bahu kiri, kepala paling tinggi, bahu kanan lebih rendah","Bahu kanan gagal buat high baru = uptrend makin penat","Neckline = sambung 2 lembah. Sah bila candle TUTUP bawah neckline","Lepas pecah, harga selalu retest neckline dari bawah","Inverse H&amp;S = terbalik, selalu muncul di hujung downtrend"],
 groups:[{p:[0,1,2],until:3},{p:[3,4]}],red:[[0,2],[0,3],[0,4],[2,2],[2,3],[4,1]],
 stampT:()=>W(2,3),
 init(){
  H7=path([[0,100],[8,112],[10,114],[14,108],[19,121],[24,108.5],[28,113.5],[30,112],[33,110],[38,119],[45,124]],3,0.8,46);
  A7=path([[0,96],[10,113],[12,115],[17,108],[23,122],[29,108.6],[34,115],[40,106],[45,103]],5,0.75,46);
  B7=path([[0,92],[6,102],[9,98],[14,110],[17,105],[22,118],[27,110],[32,114.5],[37,107],[45,100]],7,0.7,46);
  D7=path([[0,100],[7,113],[10,108],[16,121],[21,108.6],[26,114],[31,107.5],[34,104],[38,108.2],[41,104],[45,99]],9,0.7,46);
  E7=path([[0,130],[8,118],[11,121],[15,112],[20,108],[25,119],[29,99],[34,119.5],[38,112],[45,124]],11,0.75,46)},
 hits:()=>[W(0,4),W(1,1),W(2,3),W(8,3),S(9),S(10),W(11,2),W(13,5),W(14,5),W(16,2),S(17),W(18,6),W(20,1),W(21,2),W(23,3),W(24,4)],
 fl:()=>[[W(2,3),"#E0465A",.4],[W(18,6),"#E7CE7C",.3],[W(23,0),"#7FD3FF",.25]],
 hook(t){const D=H7,sT=W(1,1),uT=W(2,3);const k=t<sT?prog(t,0,sT,30):30+prog(t,sT+0.1,uT,16);
  const C=chart(D,k,{a:0,b:46,H:620,y0:160});let h=C.svg;const ls=hmax(D,6,12),hd=hmax(D,16,22),rs=hmax(D,26,30);
  [[ls,"BAHU"],[hd,"KEPALA"],[rs,"BAHU"]].forEach(([i,s],q)=>{const t0=W(0,2)+q*0.25;if(t>=t0&&C.last>=i)h+=popc(C.X(i),C.Y(D.h[i])-50,s,INK,"#0F1B33",34,t0,t)});
  if(t>=sT){const ey=C.Y(D.c[30]),sl=C.Y(D.h[hd])+40;h+=`<line x1="${C.X(30)}" x2="900" y1="${ey}" y2="${ey}" stroke="${RED}" stroke-width="4" stroke-dasharray="12 8"/>`+popc(C.X(30)+10,ey+80,"SELL",RED,"#fff",58,sT,t)+`<line x1="${C.X(30)}" x2="900" y1="${C.Y(117)}" y2="${C.Y(117)}" stroke="${RED}" stroke-width="5"/>`+txt(892,C.Y(117)-14,"SL",RED,40,"end")}
  if(t>=uT){h+=burst(C.X(37),C.Y(117),uT,t,26,RED,380,10,1)+ring(C.X(37),C.Y(117),uT,t,RED,200,0.6,14)}
  return h},
 steps:[
  (t,a,b)=>{const D=A7,k=prog(t,a,E(8),46);const C=chart(D,k,{a:0,b:46,H:600,y0:240});let h=C.svg;const ls=hmax(D,8,14),hd=hmax(D,19,26),rs=hmax(D,31,37);
   if(t>=W(8,2))h+=popc(450,40,"3 PUNCAK",GOLD,"#0F1B33",58,W(8,2),t);
   [[ls,S(9),"BAHU KIRI",CY],[hd,S(10),"KEPALA",GOLD],[rs,W(11,1),"BAHU KANAN",CY]].forEach(([i,t0,s,col])=>{if(t>=t0)h+=dot(C.X(i),C.Y(D.h[i])-20,col,t0,t,12)+popc(C.X(i),C.Y(D.h[i])-80,s,col,"#0F1B33",i===hd?46:40,t0,t)});
   if(t>=W(11,4)){h+=hline(C,D.h[hd],GOLD,"",1,3,"10 10",false,C.X(hd))+`<g opacity="${ease((t-W(11,4))/0.3)}">${arrow(C.X(rs)+70,C.Y(D.h[hd])+8,1,C.Y(D.h[rs])-C.Y(D.h[hd])-26,RED,1,6)}</g>`+popc(Math.min(760,C.X(rs)+60),C.Y(D.h[rs])+120,"LEBIH RENDAH",RED,"#fff",42,W(11,4),t)}
   return h},
  (t,a,b)=>{const D=B7,a1=E(13),k=prog(t,a,a1,46);const C=chart(D,k,{a:0,b:46,H:560,y0:100});let h=C.svg;
   const hs=[hmax(D,4,8),hmax(D,12,16),hmax(D,20,25),hmax(D,30,34)];
   hs.forEach((i,q)=>{const at=Math.max(tAt(i,C,a,a1),a+0.2);if(t<at)return;const fail=q===3;h+=dot(C.X(i),C.Y(D.h[i])-20,fail?RED:GOLD,at,t,11)+(fail?"":txt(C.X(i),C.Y(D.h[i])-48,"HH",GOLD,38,"middle",ease((t-at)/0.3)))});
   if(t>=W(13,3)){const p=hs[2],f=hs[3];h+=hline(C,D.h[p],GOLD,"",1,3,"10 10",false,C.X(p))+popc(C.X(f),C.Y(D.h[f])-90,"HIGH BARU?",RED,"#fff",42,W(13,3),t)+cross(C.X(f),C.Y(D.h[f])-90,60,W(13,6),t)}
   if(t>=S(14)){const q=1-0.75*ease((t-S(14)-0.2)/0.9);h+=`<g transform="translate(450 800) scale(${2-back((t-S(14))/0.25)})"><rect x="-300" y="-46" width="600" height="92" rx="18" fill="rgba(5,8,15,.88)" stroke="${GOLD}" stroke-width="4"/><rect x="-282" y="-30" width="${250*q}" height="60" rx="10" fill="${q>0.5?GOLD:RED}"/>${txt(130,18,"UPTREND",RED,50)}</g>`}
   if(t>=W(14,5))h+=popc(450,705,"MAKIN PENAT",RED,"#fff",54,W(14,5),t);
   return h},
  (t,a,b)=>{const D=A7,a1=E(18),k=t<S(18)?prog(t,a,S(18),35):35+prog(t,S(18),W(18,6),6);const C=chart(D,k,{a:0,b:46,H:680,y0:150});let h="";const v1=lmin(D,14,20),v2=lmin(D,26,32);
   if(t>=W(16,2))h+=nline(C,D,v1,v2,GOLD,ease((t-W(16,2))/0.5),6);
   h+=C.svg;
   [[v1,W(16,1)],[v2,W(16,1)+0.2]].forEach(([i,t0])=>{if(t>=t0)h+=dot(C.X(i),C.Y(D.l[i])+20,CY,t0,t,12)});
   if(t>=S(17))h+=popc(220,C.Y(D.l[v1])+110,"NECKLINE",GOLD,"#0F1B33",50,S(17),t);
   let bi=36;for(let i=34;i<44;i++)if(D.c[i]<nAt(C,D,v1,v2,i)-0.4){bi=i;break}
   const bt=W(18,5);if(t>=bt&&C.last>=bi)h+=ring(C.X(bi),C.Y(D.c[bi]),bt,t,GOLD,160,0.6,12)+popc(Math.min(640,C.X(bi)),C.Y(D.c[bi])+120,"TUTUP BAWAH = SAH",GOLD,"#0F1B33",44,bt,t);
   return h},
  (t,a,b)=>{const D=D7,a1=E(21),k=prog(t,a,a1,46);const C=chart(D,k,{a:0,b:46,H:680,y0:150});let h="";const v1=lmin(D,8,13),v2=lmin(D,19,24);const nk=(D.l[v1]+D.l[v2])/2;
   h+=hline(C,nk,GOLD,"NECKLINE",1,5)+C.svg;
   let bi=30;for(let i=26;i<36;i++)if(D.c[i]<nk-0.6){bi=i;break}const bt=Math.max(tAt(bi,C,a,a1),W(20,1));
   if(t>=bt)h+=ring(C.X(bi),C.Y(nk),bt,t,RED,200,0.6,14)+burst(C.X(bi),C.Y(nk),bt,t,20,RED,300,9,0.9)+popc(C.X(bi)-110,C.Y(nk)+120,"PECAH",RED,"#fff",50,bt,t);
   const ri=hmax(D,36,40),rt=Math.max(tAt(ri,C,a,a1),W(21,2));
   if(t>=rt)h+=ring(C.X(ri),C.Y(nk),rt,t,GOLD,150,0.6,12)+arrow(C.X(ri),C.Y(nk)+150,-1,80,GOLD,ease((t-rt)/0.3),8)+popc(Math.min(640,C.X(ri)),C.Y(nk)+230,"RETEST DARI BAWAH",GOLD,"#0F1B33",44,rt,t);
   return h},
  (t,a,b)=>{const D=E7,a1=E(24),k=prog(t,a,a1,46);const C=chart(D,k,{a:0,b:46,H:560,y0:170});let h="";const ls=lmin(D,17,23),hd=lmin(D,26,32),rs=lmin(D,35,40);
   const v1=hmax(D,22,27),v2=hmax(D,31,36);
   if(t>=W(23,5)){const x1=C.X(v1),y1=C.Y(D.h[v1]),x2=C.X(v2),y2=C.Y(D.h[v2]);const m=(y2-y1)/(x2-x1);h+=`<line x1="${x1-80}" y1="${y1-80*m}" x2="900" y2="${y1+(900-x1)*m}" stroke="${GOLD}" stroke-width="5" opacity="${ease((t-W(23,5))/0.4)}"/>`}
   if(t>=W(24,3)){const q=ease((t-W(24,3))/0.5);h+=`<line x1="${C.X(0)}" y1="${C.Y(D.h[0])-20}" x2="${lerp(C.X(0),C.X(19),q)}" y2="${lerp(C.Y(D.h[0]),C.Y(D.h[19]),q)-20}" stroke="${RED}" stroke-width="7" stroke-linecap="round" filter="url(#gw)"/>`}
   h+=C.svg;
   [[ls,"BAHU",CY],[hd,"KEPALA",GOLD],[rs,"BAHU",CY]].forEach(([i,s,col],q)=>{const t0=Math.max(tAt(i,C,a,a1),W(23,1)+q*0.2);if(t>=t0)h+=dot(C.X(i),C.Y(D.l[i])+20,col,t0,t,11)+popc(C.X(i),C.Y(D.l[i])+70,s,col,"#0F1B33",38,t0,t)});
   h+=popc(450,40,"INVERSE H&amp;S",CY,"#0F1B33",58,W(23,0),t);
   if(t>=W(24,3))h+=popc(240,C.Y(D.h[6])-80,"HUJUNG DOWNTREND",RED,"#fff",40,W(24,3),t);
   return h}
 ]};
