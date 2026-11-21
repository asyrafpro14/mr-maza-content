// ===== KISAH PAUL TUDOR JONES =====
let FALLP,EQ;
const V={
 init(){FALLP=path(90,780,990,1250,14,S(6),E(8),45,3)},
 dark:()=>[[0,S(11)]],rain:()=>[[S(9),S(11)]],
 povGroup:t=>t<S(2)?[0,1]:[2],povRed:[[0,1],[1,2],[2,2]],
 hits:()=>[W(0,1),S(1),W(1,2),S(2),S(5),S(6),S(7),S(8),S(9),S(10),S(11),S(12),S(13),S(14),S(16),S(18),S(20),W(21,2),S(22),W(24,0),S(25),S(26)],
 fl:()=>[[W(1,2),"#E0465A",.35],[S(9),"#E0465A",.3],[S(11),"#E7CE7C",.3],[W(21,2),"#E0465A",.35],[S(22),"#E7CE7C",.45],[W(24,0),"#FFFFFF",.3]],
 scenes:[
 {id:"pov",from:0,draw(t){let h="";const px=290,lift=t<S(2)?0:ease(cl((t-S(2))/0.8)),py=560+lift*700,dim=t<S(1)?1:lerp(1,0.35,cl((t-S(1))/0.6));
   h+=`<g transform="translate(${px} ${py})" opacity="${1-lift*0.9}"><rect x="0" y="0" width="500" height="960" rx="60" fill="#05080f" stroke="#2b3550" stroke-width="10"/><rect x="22" y="22" width="456" height="916" rx="44" fill="#0b1324" opacity="${dim}"/>`;
   const bal=Math.max(0,1000*(1-ease(cl((t-W(0,1))/(W(1,2)-W(0,1))))));h+=`<g opacity="${dim}">${T(250,130,"BALANCE",MUTE,30,"middle",1,"Pop")}${T(250,220,bal.toFixed(2),bal<200?RED:"#fff",96)}${T(250,270,"USD",MUTE,28,"middle",1,"Pop")}`;
   const k=cl((t-0.1)/(W(1,2)-0.1));for(let i=0;i<8;i++){if(i/8>k)break;const o=i<7?330-i*4:300,c=i<7?320-i*4:700;h+=`<rect x="${70+i*48}" y="${Math.min(o,c)}" width="30" height="${Math.max(4,Math.abs(c-o)*(i<7?1:ease(cl((t-W(0,2))/0.6))))}" fill="${i<7?GOLD:RED}" rx="3"/>`}
   if(t>=W(1,2)){const q=back(cl((t-W(1,2))/0.35));h+=`<g transform="translate(250 ${lerp(900,800,q)})"><rect x="-220" y="-50" width="440" height="100" rx="22" fill="${RED}"/>${T(0,14,"STOP OUT",'#fff',52)}</g>`}
   h+=`</g></g>`;if(t>=S(2)){h+=shatter(px+250,py+420,S(2),t,22,"#cfd8ea");const q=ease(cl((t-S(2)-0.2)/0.6));h+=`<g opacity="${q}">${person(540,1150,3.2,"#1a2234")}${T(540,800,"?",RED,260)}</g>`}return h}},
 {id:"g1",from:3,draw(t,a){let h=fadeUp(540,420,"DENGAR KISAH NI DULU","#fff",80,a,t);
   if(t>=S(4)){h=pop(540,420,"HUJUNG 1970-AN",MUTE,96,S(4),t)}
   h+=`<g opacity="${cl((t-a)/0.5)}"><path d="M300 1150 L780 1150 L760 1180 L320 1180 Z" fill="#1a2234"/>${person(540,1100,2.6,"#0a0f1a")}<path d="M500 560 L580 560 L860 1300 L220 1300 Z" fill="url(#lamp)"/></g>`;
   if(t>=S(5)){const n=Math.min(9,Math.floor((t-S(5))/0.2)+1);for(let i=0;i<n;i++){const x=220+(i%3)*320,y=600+Math.floor(i/3)*150,q=back(cl((t-S(5)-i*0.2)/0.3));h+=`<g transform="translate(${x} ${y}) scale(${q}) rotate(${(rnd(i)-0.5)*8})"><rect x="-130" y="-55" width="260" height="110" rx="10" fill="#f1ead2" stroke="#b9a670" stroke-width="4"/>${T(0,-8,"KONTRAK","#5a4a1a",34)}${T(0,34,"COTTON","#0F1B33",40)}</g>`}
    h+=box(540,1450,760,130,"RATUSAN KONTRAK COTTON",GOLD,"#0F1B33",66,W(5,4),t)}return h}},
 {id:"g2",from:6,draw(t,a){let h=`<line x1="80" x2="1000" y1="1250" y2="1250" stroke="${MUTE}" stroke-width="2" stroke-dasharray="10 10"/>`+curve(FALLP,t,RED,10);
   h+=pop(540,420,"HARGA LAWAN DIA",RED,110,a,t);
   if(t>=S(7)){h+=`<g transform="translate(540 640)">${T(0,0,"TAK CUT","#fff",130,"middle",cl((t-S(7))/0.15))}</g>`+xmark(540,595,130,S(7)+0.2,t)}
   if(t>=S(8)){h+=box(540,1450,700,140,"+ TAMBAH LAGI",RED,"#fff",90,S(8),t);for(let i=0;i<4;i++){if(t<S(8)+0.2+i*0.15)continue;h+=`<rect x="${760}" y="${1200-i*40}" width="180" height="32" rx="6" fill="#f1ead2" stroke="#b9a670" stroke-width="3"/>`}}
   return h}},
 {id:"g3",from:9,draw(t,a){let h="";const q=ease(cl((t-W(9,2))/(E(9)-W(9,2))));const lvl=lerp(1,0.33,q);
   h+=T(540,380,"EKUITI AKAUN",MUTE,64,"middle",cl((t-a)/0.3));h+=`<rect x="390" y="450" width="300" height="700" rx="24" fill="none" stroke="#fff" stroke-width="8" opacity=".8"/><rect x="404" y="${464+672*(1-lvl)}" width="272" height="${672*lvl}" rx="16" fill="${lvl>0.5?GOLD:RED}" filter="url(#gw)"/>`;
   if(t>=W(9,2))h+=T(540,1300,"-60% HINGGA -70%",RED,110,"middle",cl((t-W(9,2))/0.2));
   if(t>=S(10)){h=`<rect x="0" y="0" width="1080" height="1920" fill="#000" opacity="${0.55*cl((t-S(10))/0.4)}"/><ellipse cx="540" cy="1000" rx="420" ry="420" fill="url(#spot)"/>`+person(540,1150,3.4,"#1a2234")+fadeUp(540,560,"FIKIR NAK","#fff",120,S(10),t)+fadeUp(540,700,"BERHENTI.",RED,150,W(10,4),t)}
   return h}},
 {id:"g4",from:11,draw(t,a){let h="";if(t<S(12)){h+=pop(540,700,"TAPI DIA",MUTE,100,a,t)+pop(540,880,"TAK LARI.",GOLD,190,W(11,2),t)+(t>=W(11,2)?ring(540,820,W(11,2),t,GOLD,400,0.8,14):"");return h}
   const q=back(cl((t-S(12))/0.4));h+=`<g transform="translate(540 980) scale(${q})"><rect x="-400" y="-560" width="800" height="1060" rx="24" fill="#f4efe0"/><rect x="-400" y="-560" width="800" height="120" rx="24" fill="${GOLD}"/>${T(0,-475,"PERATURAN BARU","#0F1B33",72)}</g>`;
   const items=[[S(13),"JANGAN PURATA LOSS"],[S(14),"GELISAH? KELUAR."],[S(16),"RISIKO DULU,"],[S(17),"BARU FIKIR UNTUNG"]];
   items.forEach(([t0,s],i)=>{if(t<t0)return;const y=640+i*180;h+=check(240,y-20,t0,t,"#2e6a4a")+`<g opacity="${cl((t-t0)/0.2)}">${T(300,y,s,"#0F1B33",64,"start")}</g>`});return h}},
 {id:"g5",from:18,draw(t,a){let h="";const yr=Math.round(count(1979,1980,a,E(18),t));h+=T(540,560,String(yr),GOLD,220);
   const q=ease(cl((t-S(19))/0.9));if(t>=S(19)){h+=`<g transform="translate(540 1350)"><rect x="-260" y="${-520*q}" width="520" height="${520*q}" fill="#1a2a4e" stroke="${GOLD}" stroke-width="6"/>`;for(let r=0;r<6;r++)for(let c=0;c<4;c++){const y=-60-r*80;if(-y>520*q)continue;h+=`<rect x="${-210+c*115}" y="${y-30}" width="70" height="44" fill="${rnd(r*4+c+Math.floor(t*2))>0.4?GOLD:"#0b1324"}" opacity=".85"/>`}h+=`</g>`+fadeUp(540,1480,"TUBUH FIRMA SENDIRI","#fff",84,W(19,1),t)}return h}},
 {id:"g6",from:20,draw(t,a){let h="";if(t<S(22)){h+=T(540,520,"1987",RED,220,"middle",cl((t-a)/0.2));const k=cl((t-W(21,1))/0.8);let d="M90 950";for(let i=0;i<=30;i++){const p=i/30;if(p>k&&t>=W(21,1))break;if(t<W(21,1)&&i>12)break;d+=` L${90+i*30} ${p<0.55?950-p*250+Math.sin(i*1.7)*20:812+(p-0.55)*1200}`}h+=`<path d="${d}" fill="none" stroke="${RED}" stroke-width="10" filter="url(#gw)"/>`;
     if(t>=W(21,1))h+=pop(540,1450,"MARKET CRASH",RED,130,W(21,2),t)+shatter(540,1300,W(21,2),t,24,RED);return h}
   const v=Math.round(count(0,125,S(22),W(22,7),t));h+=T(540,560,"1987",GOLD,140,"middle",.5)+T(540,1000,"+"+v+"%",GOLD,300)+T(540,1120,"DANA DIA","#fff",64);
   let d="M90 1500";const k=ease(cl((t-S(22))/1.2));for(let i=0;i<=40;i++){const p=i/40;if(p>k)break;d+=` L${90+i*22.5} ${1500-Math.pow(p,2.2)*300-Math.sin(i)*8}`}h+=`<path d="${d}" fill="none" stroke="${GOLD}" stroke-width="10" filter="url(#gw)"/>`+burst(540,950,S(22),t,30,GOLD,500,10,1);return h}},
 {id:"nm",from:23},
 {id:"les",from:25,draw(t,a){let h=fadeUp(540,560,"LOSS BESAR KAU HARI NI","#fff",96,a,t);h+=pop(540,760,"BOLEH JADI",MUTE,90,W(25,5),t);
   h+=box(540,1000,860,200,"PERMULAAN",GOLD,"#0F1B33",130,W(25,7),t)+fadeUp(540,1260,"PERATURAN KAU",GOLD,110,W(25,8),t);return h}},
 {id:"fin",from:26}
 ]};
