// VIDEO 24: WIN RATE vs RISK REWARD (risk)
function ck(x,y,t0,t,col=GOLD,s=1){if(t<t0)return"";const q=back((t-t0)/0.3)*s;return `<g transform="translate(${x} ${y}) scale(${q})"><circle r="30" fill="${col}"/><path d="M-14 0 L-4 11 L16 -12" stroke="#0F1B33" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`}
// contoh: 10 trade, 7 menang x RM10, 3 kalah x RM30 (urutan rawak tetap)
const SEQ=[1,1,0,1,1,0,1,1,0,1],WIN=10,LOSS=30;let EQ;
const BE=rr=>1/(1+rr); // win rate minimum untuk pulang modal
const V={stamp:"TURUN!",title:"WIN RATE<br>VS RR",sub:"Cara betul faham",pill:"WIN RATE VS RISK REWARD",cta:true,q:"KOMEN: WIN RATE KAU",
 msgRe:/^bukan win rate je/,m1:"BUKAN",m2:"WIN RATE JE",m3:"Catat juga",m4:"RISK REWARD",
 msgTimes:()=>[S(iMsg),W(iMsg,1),W(iMsg,2),W(iMsg,3)],
 cheat:["Win rate kira berapa KALI menang, bukan berapa BANYAK","7 menang x RM10 = +70, 3 kalah x RM30 = -90","Punca: untung ditutup awal, loss dibiar panjang","RR 1:2, pulang modal perlu menang ~33%","Jurnal: catat win rate DAN saiz menang kalah"],
 groups:[{p:[0,1,2]}],red:[[1,1],[1,2],[1,3]],
 stampT:()=>W(1,3),
 init(){EQ=[0];SEQ.forEach(w=>EQ.push(EQ[EQ.length-1]+(w?WIN:-LOSS)))},
 hits:()=>[W(0,2),W(1,3),S(6),W(7,3),S(11),S(13),S(14),S(16),S(17),S(20),S(21),S(23),W(24,7),S(26),W(27,0)],
 fl:()=>[[W(1,3),"#E0465A",.35],[S(17),"#E0465A",.35],[W(24,7),"#E7CE7C",.3]],
 hook(t){let h="";const cx=450,cy=300,r=230;const p=0.7*ease(t/Math.max(0.4,W(0,3)));
  const arc=(f0,f1,col,w)=>{const a0=Math.PI*(1-f0),a1=Math.PI*(1-f1);return `<path d="M${cx+r*Math.cos(a0)} ${cy-r*Math.sin(a0)} A${r} ${r} 0 0 1 ${cx+r*Math.cos(a1)} ${cy-r*Math.sin(a1)}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`};
  h+=arc(0,1,"rgba(255,255,255,.12)",44);if(p>0.005)h+=arc(0,p,GOLD,44);
  h+=txt(cx,cy-20,Math.round(p*100)+"%",GOLD,140)+txt(cx,cy+50,"WIN RATE",INK,48);
  // ekuiti jatuh walau banyak menang
  if(t>=S(1)){const q=cl((t-S(1))/Math.max(0.5,W(1,3)-S(1)));const n=Math.floor(q*SEQ.length);const X=i=>90+i*72,Y=v=>520-v*3.2;let pts=[];for(let i=0;i<=n;i++)pts.push(`${X(i)},${Y(EQ[i])}`);
   h+=`<line x1="80" x2="840" y1="${Y(0)}" y2="${Y(0)}" stroke="${MUTE}" stroke-width="2" stroke-dasharray="10 8"/>`+txt(80,Y(0)-14,"MODAL",MUTE,32,"start");
   if(pts.length>1)h+=`<polyline points="${pts.join(" ")}" fill="none" stroke="${RED}" stroke-width="9" stroke-linejoin="round" filter="url(#gw)"/>`;
   for(let i=1;i<=n;i++)h+=`<circle cx="${X(i)}" cy="${Y(EQ[i])}" r="9" fill="${SEQ[i-1]?GOLD:RED}"/>`;
   if(t>=W(1,3))h+=burst(X(n),Y(EQ[n]),W(1,3),t,22,RED,300,9,1)+popc(640,Y(EQ[n])+90,"AKAUN -RM20",RED,"#fff",48,W(1,3),t)}
  return h},
 steps:[
  (t,a,b)=>{let h=popc(450,30,"WIN RATE = BERAPA KALI",GOLD,"#0F1B33",50,S(6),t);
   SEQ.forEach((w,i)=>{const t0=S(6)+0.12*i;if(t<t0)return;const x=135+(i%5)*157,y=230+Math.floor(i/5)*170,q=back((t-t0)/0.3);
    h+=`<g transform="translate(${x} ${y}) scale(${q})"><circle r="62" fill="${w?GOLD:RED}" fill-opacity=".2" stroke="${w?GOLD:RED}" stroke-width="6"/>${txt(0,22,w?"W":"L",w?GOLD:RED,64)}</g>`});
   if(t>=W(6,6))h+=popc(450,530,"7 / 10 = 70%",GOLD,"#0F1B33",64,W(6,6),t);
   if(t>=S(7))h+=`<g opacity="${ease((t-S(7))/0.3)}"><rect x="140" y="610" width="620" height="190" rx="26" fill="rgba(5,8,15,.85)" stroke="${RED}" stroke-width="5"/>${txt(450,690,"BERAPA BANYAK?",RED,72)}${txt(450,765,"win rate tak kira ni","#fff",40)}</g>`;
   return h},
  (t,a,b)=>{let h=popc(450,30,"CONTOH: 10 TRADE",INK,"#0F1B33",52,S(9),t);const base=640,u=3.9;
   // menang
   for(let i=0;i<7;i++){const t0=S(11)+i*0.12;if(t<t0)continue;const q=ease((t-t0)/0.25);h+=`<rect x="130" y="${base-(i+1)*WIN*u}" width="260" height="${WIN*u*q-4}" rx="6" fill="${GOLD}"/>`}
   if(t>=S(11))h+=txt(260,base+60,"MENANG 7",GOLD,48);
   if(t>=S(12))h+=popc(260,base-7*WIN*u-150,"RM10 SETIAP SATU",GOLD,"#0F1B33",34,S(12),t);
   if(t>=S(13))h+=popc(260,base-7*WIN*u-60,"+RM70",GOLD,"#0F1B33",60,S(13),t);
   for(let i=0;i<3;i++){const t0=S(14)+i*0.15;if(t<t0)continue;const q=ease((t-t0)/0.3);h+=`<rect x="510" y="${base-(i+1)*LOSS*u}" width="260" height="${LOSS*u*q-4}" rx="6" fill="${RED}"/>`}
   if(t>=S(14))h+=txt(640,base+60,"KALAH 3",RED,48);
   if(t>=S(15))h+=popc(640,base-3*LOSS*u-150,"RM30 SETIAP SATU",RED,"#fff",34,S(15),t);
   if(t>=S(16))h+=popc(640,base-3*LOSS*u-60,"-RM90",RED,"#fff",60,S(16),t);
   if(t>=S(17)){const net=7*WIN-3*LOSS;h+=`<g opacity="${ease((t-S(17))/0.3)}"><rect x="140" y="730" width="620" height="120" rx="24" fill="rgba(224,70,90,.2)" stroke="${RED}" stroke-width="6"/>${txt(450,812,"BERSIH: -RM"+Math.abs(net),RED,76)}</g>`+burst(450,790,S(17),t,26,RED,360,9,1)}
   return h},
  (t,a,b)=>{let h=popc(450,30,"PUNCA BIASA",RED,"#fff",60,S(19),t);
   if(t>=S(20)){const q=ease((t-S(20))/0.6);h+=txt(90,220,"UNTUNG",GOLD,52,"start")+`<rect x="90" y="250" width="${200*q}" height="90" rx="16" fill="${GOLD}"/>`+txt(310,310,"TUTUP CEPAT",INK,44,"start",q)+popc(640,400,"SEBAB TAKUT",GOLD,"#0F1B33",40,W(20,3),t)}
   if(t>=S(21)){const q=ease((t-S(21))/1.0);h+=txt(90,520,"LOSS",RED,52,"start")+`<rect x="90" y="550" width="${720*q}" height="90" rx="16" fill="${RED}"/>`+txt(110,612,"BIAR PANJANG","#fff",44,"start",q)+popc(640,710,"SEBAB HARAP",RED,"#fff",40,W(21,3),t)}
   return h},
  (t,a,b)=>{let h=popc(450,30,"WIN RATE MINIMUM",GOLD,"#0F1B33",54,S(23),t);
   const rr=[1,2,3],x0=140,base=640,H=900;
   if(t>=S(23))h+=`<line x1="80" x2="840" y1="${base}" y2="${base}" stroke="${MUTE}" stroke-width="3"/>`;
   rr.forEach((r,i)=>{const t0=S(23)+0.2+i*0.25;if(t<t0)return;const v=BE(r),q=ease((t-t0)/0.4),x=x0+i*240,hl=r===2&&t>=W(24,7);
    h+=`<rect x="${x}" y="${base-v*H*q}" width="170" height="${v*H*q}" rx="12" fill="${hl?GOLD:"rgba(255,255,255,.18)"}" stroke="${r===2?GOLD:MUTE}" stroke-width="4" ${hl?'filter="url(#gw)"':''}/>`+txt(x+85,base-v*H*q-20,Math.round(v*100)+"%",hl?GOLD:INK,56)+txt(x+85,base+60,"RR 1:"+r,r===2?GOLD:INK,46)});
   if(t>=W(24,7))h+=ring(x0+240+85,base-BE(2)*H,W(24,7),t,GOLD,160,0.6,12)+popc(450,780,"MENANG ~1/3 PULANG MODAL",GOLD,"#0F1B33",44,W(24,7),t);
   if(t>=W(24,2))h+=txt(840,150,"= 1 / (1 + RR)",MUTE,40,"end",ease((t-W(24,2))/0.3));
   return h},
  (t,a,b)=>{let h=popc(450,30,"CATAT DALAM JURNAL",GOLD,"#0F1B33",54,S(26),t);
   const cols=[["WIN RATE","70%",W(26,1)],["PURATA MENANG","RM10",W(26,2)],["PURATA KALAH","RM30",W(26,3)]];
   cols.forEach(([s,v,t0],i)=>{if(t<t0)return;const y=190+i*170,q=ease((t-t0)/0.3);h+=`<g opacity="${q}"><rect x="110" y="${y-60}" width="680" height="140" rx="24" fill="rgba(5,8,15,.85)" stroke="${i?CY:GOLD}" stroke-width="5"/>${txt(220,y+25,s,INK,46,"start")}${txt(760,y+28,v,i===2?RED:GOLD,64,"end")}</g>`+ck(160,y+10,t0+0.1,t,i?CY:GOLD)});
   return h}
 ]};
