// VIDEO 21: ARAH GOLD DARI FUNDAMENTAL
function wv6(n,f,seed,z=0.5){const c=[];for(let i=0;i<n;i++)c.push(f(i)+(rnd(i*7.31+seed)-0.5)*2*z);return ohlc(c,seed)}
// siri ilustrasi (bukan data sebenar): dolar random walk, gold = songsang + hingar
let G6,USD6=[],GLD6=[];
function line6(arr,x0,x1,y0,H,col,p,w=7,mn,mx){if(mn==null){mn=Math.min(...arr);mx=Math.max(...arr)}const n=arr.length,m=Math.max(2,Math.floor(n*cl(p)));let pts="";for(let i=0;i<m;i++){pts+=`${(x0+(x1-x0)*i/(n-1)).toFixed(1)},${(y0+H-(arr[i]-mn)/(mx-mn)*H).toFixed(1)} `}
  const lx=x0+(x1-x0)*(m-1)/(n-1),ly=y0+H-(arr[m-1]-mn)/(mx-mn)*H;return{svg:`<polyline points="${pts}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round" filter="url(#gw)"/><circle cx="${lx}" cy="${ly}" r="${w*1.6}" fill="#fff"/>`,lx,ly}}
function coin6(x,y,s,q=1){return `<g transform="translate(${x} ${y}) scale(${s})" opacity="${q}"><circle r="60" fill="${GOLD}" stroke="#a58a3a" stroke-width="8"/><circle r="42" fill="none" stroke="#a58a3a" stroke-width="5"/>${txt(0,18,"AU","#0F1B33",50)}</g>`}
function card6(x,y,w,h,col,q=1){return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" fill="rgba(5,8,15,.8)" stroke="${col}" stroke-width="5" opacity="${q}"/>`}
const V={stamp:"ARAH?",title:"ARAH<br>GOLD",sub:"Cara betul baca",pill:"ARAH GOLD DARI FUNDAMENTAL",
 cta:true,q:"KOMEN: BERITA / CHART",msgRe:/^Fundamental bagi arah/,m1:"FUNDAMENTAL",m2:"BAGI ARAH",m3:"Chart bagi",m4:"MASA",
 msgTimes:()=>[S(iMsg),W(iMsg,1),S(iMsg+1),W(iMsg+1,2)],
 cheat:["Dolar kuat, gold biasanya tertekan","Pasaran jangka Fed turun kadar, gold biasanya disokong","Real yield naik, gold kurang menarik (tiada faedah)","Dunia takut, duit lari ke gold (tempat selamat)","Semak kalendar: NFP, CPI, keputusan Fed"],
 groups:[{p:[0,1,2],until:3},{p:[3]}],red:[[1,2],[2,1],[3,6]],
 stampT:()=>W(3,6),
 init(){G6=wv6(46,i=>100+2.2*Math.sin(i/3.1)+0.6*Math.sin(i/1.3),5,0.5);
  let d=100;for(let i=0;i<40;i++){d+=(rnd(i*3.7+2)-0.5)*1.6+(i<20?0.25:-0.05);USD6.push(d);GLD6.push(200-d+(rnd(i*5.1)-0.5)*1.2)}},
 hits:()=>[W(0,1),W(1,2),W(2,1),W(3,6),W(7,3),S(8),S(9),S(11),W(12,4),S(13),S(15),S(17),W(18,2),S(20),S(21),S(22),W(24,1),S(25),W(26,0),W(26,2),W(26,6)],
 fl:()=>[[W(3,6),"#E0465A",.35],[S(9),"#E0465A",.25],[S(21),"#E0465A",.25],[W(26,6),"#E7CE7C",.3]],
 hook(t){const D=G6,k=14+prog(t,0,W(3,6),32);const C=chart(D,k,{a:0,b:46,H:460,y0:170});let h=C.svg;
  if(t>=W(0,1))h+=popc(450,100,"CHART SAMA",INK,"#0F1B33",50,W(0,1),t);
  if(t>=W(1,2)){const q=back((t-W(1,2))/0.3);h+=`<g transform="translate(200 720) scale(${q})"><circle cx="0" cy="-40" r="34" fill="${GOLD}"/><path d="M-50 60 Q-52 -10 0 -12 Q52 -10 50 60 Z" fill="${GOLD}"/></g>`+popc(200,810,"BUY",GOLD,"#0F1B33",56,W(1,2),t)}
  if(t>=W(2,1)){const q=back((t-W(2,1))/0.3);h+=`<g transform="translate(700 720) scale(${q})"><circle cx="0" cy="-40" r="34" fill="${RED}"/><path d="M-50 60 Q-52 -10 0 -12 Q52 -10 50 60 Z" fill="${RED}"/></g>`+popc(700,810,"SELL",RED,"#fff",56,W(2,1),t)}
  if(t>=S(3))h+=txt(450,760,"VS",MUTE,80,"middle",ease((t-S(3))/0.3));
  return h},
 steps:[
  (t,a,b)=>{let h=card6(20,120,860,560,MUTE,ease((t-a)/0.3));const p=prog(t,a+0.2,S(9),1);
   const u=line6(USD6,60,840,180,460,CY,p,7),g=line6(GLD6,60,840,180,460,GOLD,p,7);h+=u.svg+g.svg;
   h+=txt(70,230,"USD",CY,46,"start",ease((t-a)/0.3))+txt(70,630,"GOLD",GOLD,46,"start",ease((t-a)/0.3));
   if(t>=W(7,3))h+=popc(450,60,"BERTENTANGAN",GOLD,"#0F1B33",56,W(7,3),t);
   if(t>=S(8))h+=arrow(780,u.ly+30,-1,70,CY,ease((t-S(8))/0.3),10)+popc(620,760,"DOLAR KUAT",CY,"#0F1B33",48,S(8),t);
   if(t>=S(9))h+=arrow(780,g.ly-30,1,70,RED,ease((t-S(9))/0.3),10)+popc(620,840,"GOLD TERTEKAN",RED,"#fff",48,S(9),t);
   if(t>=W(9,1))h+=txt(160,800,"*selalunya",MUTE,34,"middle",ease((t-W(9,1))/0.3));
   return h},
  (t,a,b)=>{let h="";h+=popc(450,60,"KADAR FAEDAH FED",GOLD,"#0F1B33",56,a,t);
   const st=[5,5,4.5,4.5,4,3.5],x0=80,w=110;h+=card6(20,130,520,520,MUTE,ease((t-a)/0.3));
   st.forEach((v,i)=>{const t0=S(12)+i*0.18;if(t<t0)return;const q=ease((t-t0)/0.3),hh=v*80*q,dash=i>=3;h+=`<rect x="${x0+i*75}" y="${620-hh}" width="56" height="${hh}" rx="8" fill="${dash?"none":CY}" stroke="${CY}" stroke-width="4" ${dash?'stroke-dasharray="10 6"':''}/>`});
   if(t>=S(12))h+=txt(280,200,"JANGKAAN TURUN",CY,40,"middle",ease((t-W(12,3))/0.3));
   if(t>=S(13)){const q=ease((t-S(13))/0.6);h+=card6(570,130,310,520,GOLD,q)+coin6(725,500-160*q,1.1,q)+arrow(725,620,-1,120*q,GOLD,1,10)+popc(725,730,"GOLD DISOKONG",GOLD,"#0F1B33",48,W(13,1),t)}
   h+=txt(450,830,"*biasanya, bukan selalu",MUTE,32,"middle",ease((t-S(13))/0.3));
   return h},
  (t,a,b)=>{let h="";const q=ease((t-a)/0.3);
   h+=card6(20,110,860,200,GOLD,q)+txt(450,190,"REAL YIELD",GOLD,70,"middle",q)+txt(450,265,"= hasil bon - inflasi",INK,44,"middle",t>=S(16)?ease((t-S(16))/0.3):0);
   if(t>=S(17)){const p=ease((t-S(17))/0.4);h+=card6(40,360,380,360,CY,p)+txt(230,430,"YIELD",CY,54,"middle",p)+arrow(230,690,-1,200*p,CY,1,14)+popc(230,780,"NAIK",CY,"#0F1B33",52,S(17),t)}
   if(t>=W(18,0)){const p=ease((t-W(18,0))/0.4);h+=card6(480,360,380,360,RED,p)+coin6(670,500,1,p)+txt(670,640,"0% FAEDAH",INK,44,"middle",p)}
   if(t>=W(18,2))h+=popc(670,780,"KURANG MENARIK",RED,"#fff",46,W(18,2),t);
   return h},
  (t,a,b)=>{let h="";const q=ease((t-a)/0.3);
   // meter sentimen
   const cx=450,cy=420,R=260;h+=`<g opacity="${q}"><path d="M${cx-R} ${cy} A${R} ${R} 0 0 1 ${cx+R} ${cy}" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="40"/><path d="M${cx-R} ${cy} A${R} ${R} 0 0 1 ${cx} ${cy-R}" fill="none" stroke="${GOLD}" stroke-width="40" opacity=".5"/><path d="M${cx} ${cy-R} A${R} ${R} 0 0 1 ${cx+R} ${cy}" fill="none" stroke="${RED}" stroke-width="40" opacity=".6"/></g>`+txt(cx-R,cy+60,"YAKIN",GOLD,40,"middle",q)+txt(cx+R,cy+60,"TAKUT",RED,40,"middle",q);
   const ang=t<S(21)?-150:lerp(-150,-25,ease((t-S(21))/0.6));const rad=ang*Math.PI/180;h+=`<line x1="${cx}" y1="${cy}" x2="${cx+Math.cos(rad)*220}" y2="${cy+Math.sin(rad)*220}" stroke="#fff" stroke-width="12" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="22" fill="#fff"/>`;
   h+=popc(450,60,"SENTIMEN",GOLD,"#0F1B33",58,S(20),t);
   if(t>=S(22)){const p=ease((t-S(22))/0.4);h+=`<g transform="translate(450 660)" opacity="${p}"><path d="M0 -110 L110 -70 L110 20 Q110 100 0 140 Q-110 100 -110 20 L-110 -70 Z" fill="rgba(231,206,124,.18)" stroke="${GOLD}" stroke-width="8"/></g>`+coin6(450,670,0.9,p);
    for(let i=0;i<5;i++){const t0=S(22)+0.2+i*0.18;if(t<t0)continue;const f=cl((t-t0)/0.7),x=lerp(i<3?60:840,450,ease(f)),y=lerp(500+i*40,670,ease(f));h+=`<g opacity="${1-f*0.8}">`+txt(x,y,"$",GOLD,54)+`</g>`}
    h+=popc(740,720,"TEMPAT SELAMAT",GOLD,"#0F1B33",52,W(22,5),t)}
   return h},
  (t,a,b)=>{let h="";h+=popc(450,60,"KALENDAR BERITA",GOLD,"#0F1B33",56,W(24,1),t);
   const ev=[["NFP","Data pekerjaan AS",S(25)],["CPI","Data inflasi AS",W(26,0)],["FED","Keputusan kadar",W(26,2)]];
   ev.forEach(([s,d,t0],i)=>{if(t<t0)return;const q=back((t-t0)/0.3),y=140+i*150;h+=`<g transform="translate(450 ${y+60}) scale(${q})"><rect x="-420" y="-60" width="840" height="120" rx="22" fill="rgba(5,8,15,.85)" stroke="${RED}" stroke-width="5"/><rect x="-420" y="-60" width="200" height="120" rx="22" fill="${RED}"/>${txt(-320,22,s,"#fff",62)}${txt(-180,18,d,INK,44,"start")}<circle cx="370" cy="0" r="16" fill="${RED}"/></g>`});
   if(t>=W(26,6)){const p=prog(t,W(26,6),W(26,6)+1.2,1);let pts="",x=40,y=700;for(let i=0;i<=30*p;i++){x=40+i*27;y=700+(i===12?-110:i===13?100:i>13?60-(i-13)*6:Math.sin(i)*14);pts+=`${x},${y} `}h+=`<polyline points="${pts}" fill="none" stroke="${GOLD}" stroke-width="6" stroke-linejoin="round" filter="url(#gw)"/>`+popc(450,830,"TUKAR ARAH DALAM MINIT",RED,"#fff",46,W(26,6),t)}
   return h}
 ]};
