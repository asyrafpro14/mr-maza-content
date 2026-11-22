// VIDEO 23: TRADING PLAN BERTULIS (silibus Hari 3, mindset)
function ck(x,y,t0,t,col=GOLD,s=1){if(t<t0)return"";const q=back((t-t0)/0.3)*s;return `<g transform="translate(${x} ${y}) scale(${q})"><circle r="30" fill="${col}"/><path d="M-14 0 L-4 11 L16 -12" stroke="#0F1B33" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`}
function xk(x,y,t0,t){if(t<t0)return"";const q=back((t-t0)/0.3);return `<g transform="translate(${x} ${y}) scale(${q})"><circle r="30" fill="${RED}"/><path d="M-11 -11 L11 11 M11 -11 L-11 11" stroke="#fff" stroke-width="7" stroke-linecap="round"/></g>`}
function row(x,y,w,s,col,q,size=46){return `<g opacity="${q}"><rect x="${x}" y="${y-50}" width="${w}" height="84" rx="20" fill="rgba(5,8,15,.85)" stroke="${col}" stroke-width="4"/>${txt(x+100,y+8,s,INK,size,"start")}</g>`}
const ST=["RSI","MACD","SNR","FIBO","EMA","SMC","BOLLINGER","ICT","PIVOT","STOCH"];
const V={stamp:"TIADA PLAN!",title:"TRADING<br>PLAN",sub:"5 benda wajib dalam",pill:"TRADING PLAN BERTULIS",cta:true,q:"KOMEN: YA / TAK",
 msgRe:/^Plan yang tak/,m1:"PLAN",m2:"TAK DITULIS",m3:"Cuma",m4:"ANGAN-ANGAN",
 msgTimes:()=>[S(iMsg),W(iMsg,2),W(iMsg,4),W(iMsg,5)],
 cheat:["Pasaran & waktu: pair, sesi, bila tak trade","Syarat masuk bertulis. Satu tak cukup, tak masuk","Risiko: peratus kecil, jangan ubah ikut emosi","Pelan keluar ditetapkan sebelum masuk","Jurnal setiap trade, semak setiap minggu"],
 groups:[{p:[0,1],until:2},{p:[2]}],red:[[0,1],[1,3],[2,6],[2,7]],
 stampT:()=>W(2,7),
 init(){},
 hits:()=>[W(0,1),W(1,3),W(2,7),W(7,0),S(8),S(9),S(11),W(12,1),S(13),S(14),S(16),S(17),S(18),S(20),S(21),S(22),S(23),S(25),S(26),S(27)],
 fl:()=>[[W(1,3),"#E0465A",.3],[W(2,7),"#E0465A",.35],[S(14),"#E0465A",.3],[S(23),"#E7CE7C",.3]],
 hook(t){let h="";const sc=t>=S(2)?ease((t-S(2))/0.5):0;
  ST.forEach((s,i)=>{const a=i/ST.length*6.283+t*0.7,r=300+40*Math.sin(t*1.3+i),x=450+Math.cos(a)*r*(1+sc*1.6),y=330+Math.sin(a)*r*0.55*(1+sc*1.6);
   const t0=i*0.06;if(t<t0)return;h+=`<g opacity="${(1-sc)*cl((t-t0)/0.15)}">`+chip(x,y,s,i%3===0?GOLD:i%3===1?CY:INK,"#0F1B33",40,1,Math.sin(t*2+i)*8)+`</g>`});
  if(t>=W(0,1)&&t<S(2))h+=popc(450,330,"10 STRATEGI",GOLD,"#0F1B33",64,W(0,1),t);
  // ekuiti tak konsisten
  if(t>=S(1)){const pts=[];const n=Math.floor(cl((t-S(1))/Math.max(0.4,S(2)-S(1)))*24);let v=700;for(let i=0;i<=n;i++){v=700+90*Math.sin(i*1.7)+60*Math.sin(i*0.9+1)-i*3;pts.push(`${60+i*32},${v}`)}
   if(pts.length>1)h+=`<polyline points="${pts.join(" ")}" fill="none" stroke="${RED}" stroke-width="8" stroke-linejoin="round" opacity="${1-sc}"/>`;h+=txt(60,600,"EKUITI",MUTE,36,"start",1-sc)}
  if(t>=W(1,3)&&t<S(2))h+=popc(640,840,"TAK KONSISTEN",RED,"#fff",50,W(1,3),t);
  if(t>=S(2)){const q=back((t-S(2))/0.4);h+=`<g transform="translate(450 330) scale(${q})"><rect x="-170" y="-200" width="340" height="400" rx="20" fill="#F4F1E8"/><rect x="-170" y="-200" width="340" height="70" rx="20" fill="${GOLD}"/>${txt(0,-150,"PLAN","#0F1B33",48)}${[0,1,2,3].map(k=>`<line x1="-130" x2="130" y1="${-80+k*70}" y2="${-80+k*70}" stroke="#0F1B33" stroke-opacity=".15" stroke-width="4"/>`).join("")}${txt(0,90,"KOSONG",RED,64)}</g>`}
  return h},
 steps:[
  (t,a,b)=>{let h="";h+=popc(450,30,"PASARAN & WAKTU",GOLD,"#0F1B33",56,S(6),t);
   if(t>=W(7,0))h+=popc(450,170,"PAIR: XAUUSD",INK,"#0F1B33",60,W(7,0),t);
   if(t>=S(8)){const segs=[["ASIA",0,300,MUTE],["LONDON",300,600,CY],["NEW YORK",600,900,GOLD]];const q=ease((t-S(8))/0.5);
    segs.forEach(([s,x0,x1,col],i)=>{h+=`<g opacity="${q}"><rect x="${x0+6}" y="330" width="${x1-x0-12}" height="110" rx="18" fill="${col}" fill-opacity="${i===0?.15:.35}" stroke="${col}" stroke-width="4"/>${txt((x0+x1)/2,400,s,INK,42)}</g>`});
    h+=txt(450,300,"SESI KAU (CONTOH)",MUTE,34,"middle",q);if(t>=W(8,1))h+=`<rect x="306" y="322" width="588" height="126" rx="22" fill="none" stroke="${GOLD}" stroke-width="7" filter="url(#gw)" opacity="${ease((t-W(8,1))/0.3)}"/>`}
   if(t>=S(9)){const q=ease((t-S(9))/0.4);h+=`<g opacity="${q}"><rect x="90" y="560" width="720" height="210" rx="24" fill="rgba(224,70,90,.15)" stroke="${RED}" stroke-width="5"/>${txt(450,640,"BILA TAK TRADE",RED,56)}${txt(450,720,"contoh: masa berita besar, bila penat","#fff",36)}</g>`}
   return h},
  (t,a,b)=>{let h=popc(450,30,"SYARAT MASUK",GOLD,"#0F1B33",56,S(11),t);
   const R=[["SYARAT 1: ARAH",W(12,1),1],["SYARAT 2: ZON",W(12,2),1],["SYARAT 3: PENGESAHAN",S(13),0]];
   R.forEach(([s,t0,ok],i)=>{if(t<t0)return;const y=200+i*140;h+=row(100,y,700,s,ok?GOLD:RED,ease((t-t0)/0.3),42)+(ok?ck(150,y-8,t0+0.15,t):xk(150,y-8,W(13,2),t))});
   if(t>=S(12)&&t<W(12,1))h+=popc(450,330,"TULIS SETIAP SYARAT",INK,"#0F1B33",50,S(12),t);
   if(t>=S(14)){const q=back((t-S(14))/0.3);h+=`<g transform="translate(450 720) rotate(-5) scale(${q})"><rect x="-260" y="-80" width="520" height="150" rx="26" fill="rgba(5,8,15,.85)" stroke="${RED}" stroke-width="12"/>${txt(0,30,"TAK MASUK",RED,100)}</g>`}
   return h},
  (t,a,b)=>{let h=popc(450,30,"RISIKO SETIAP TRADE",GOLD,"#0F1B33",56,S(16),t);
   const cx=450,cy=330,r=200;const q=ease((t-S(16))/0.5);const f=0.06*ease((t-S(17))/0.6);
   if(t>=S(16)){h+=`<g opacity="${q}"><circle cx="${cx}" cy="${cy}" r="${r}" fill="rgba(255,255,255,.08)" stroke="${MUTE}" stroke-width="4"/>`;
    if(f>0){const a1=-Math.PI/2,a2=a1+f*6.283;h+=`<path d="M${cx} ${cy} L${cx+r*Math.cos(a1)} ${cy+r*Math.sin(a1)} A${r} ${r} 0 0 1 ${cx+r*Math.cos(a2)} ${cy+r*Math.sin(a2)} Z" fill="${RED}" filter="url(#gw)"/>`}
    h+=txt(cx,cy+20,"AKAUN",INK,64)+`</g>`}
   if(t>=W(17,1))h+=popc(700,140,"% KECIL",RED,"#fff",54,W(17,1),t);
   if(t>=S(18)){const q2=back((t-S(18))/0.35);h+=`<g transform="translate(450 690) scale(${q2})"><rect x="-56" y="-20" width="112" height="90" rx="14" fill="${GOLD}"/><path d="M-34 -20 V-50 A34 34 0 0 1 34 -50 V-20" fill="none" stroke="${GOLD}" stroke-width="14"/><circle cx="0" cy="20" r="12" fill="#0F1B33"/></g>`+popc(450,850,"JANGAN UBAH BILA EMOSI",INK,"#0F1B33",48,W(18,2),t)}
   return h},
  (t,a,b)=>{let h=popc(450,30,"PELAN KELUAR",GOLD,"#0F1B33",56,S(20),t);
   const yE=440,yT=200,yS=640;if(t>=S(20)){const q=ease((t-S(20))/0.4);h+=`<line x1="60" x2="${lerp(60,840,q)}" y1="${yE}" y2="${yE}" stroke="${INK}" stroke-width="5" stroke-dasharray="14 10"/>`+txt(840,yE-16,"MASUK",INK,40,"end",q)}
   if(t>=S(21)){const q=ease((t-S(21))/0.4);h+=`<rect x="60" y="${yS-6}" width="${780*q}" height="12" rx="6" fill="${RED}"/>`+txt(840,yS+60,"DI MANA KAU SALAH",RED,44,"end",q)+arrow(200,yE+20,1,(yS-yE-60),RED,q,8)}
   if(t>=S(22)){const q=ease((t-S(22))/0.4);h+=`<rect x="60" y="${yT-6}" width="${780*q}" height="12" rx="6" fill="${GOLD}"/>`+txt(840,yT-24,"SASARAN",GOLD,44,"end",q)+arrow(320,yE-20,-1,(yE-yT-60),GOLD,q,8)}
   if(t>=S(23))h+=popc(450,800,"DITETAPKAN SEBELUM MASUK",GOLD,"#0F1B33",48,W(23,1),t);return h},
  (t,a,b)=>{let h=popc(450,30,"JURNAL",GOLD,"#0F1B33",60,S(25),t);
   const q=ease((t-S(25))/0.4);if(t>=S(25)){h+=`<g opacity="${q}" transform="rotate(-2 450 380)"><rect x="110" y="100" width="680" height="440" rx="24" fill="#F4F1E8"/><rect x="110" y="100" width="680" height="80" rx="24" fill="${GOLD}"/>${txt(450,158,"JURNAL TRADE","#0F1B33",48)}`;
    const L=["#1  Arah ikut plan","#2  Masuk tanpa syarat","#3  Keluar ikut plan"];L.forEach((s,i)=>{const t0=S(26)+i*0.3;if(t<t0)return;h+=`<text x="150" y="${250+i*95}" font-family="Poppins" font-weight="600" font-size="40" fill="${i===1?RED:"#0F1B33"}" opacity="${cl((t-t0)/0.25)}">${s}</text><line x1="150" x2="750" y1="${272+i*95}" y2="${272+i*95}" stroke="#0F1B33" stroke-opacity=".15" stroke-width="3"/>`});h+=`</g>`}
   if(t>=S(27)){const D=["I","S","R","K","J","S","A"];D.forEach((d,i)=>{const x=135+i*105,t0=S(27)+i*0.06;if(t<t0)return;const last=i===6;h+=`<g opacity="${ease((t-t0)/0.2)}"><rect x="${x-44}" y="620" width="88" height="100" rx="16" fill="${last?GOLD:"rgba(255,255,255,.08)"}" stroke="${last?GOLD:MUTE}" stroke-width="3"/>${txt(x,688,d,last?"#0F1B33":INK,48)}</g>`});
    h+=popc(765,800,"SEMAK",GOLD,"#0F1B33",50,W(27,1),t)+txt(300,815,"SETIAP MINGGU",INK,46,"middle",ease((t-W(27,1))/0.3))}
   return h}
 ]};
