// ===== KISAH ED SEYKOTA =====
let UP,UP2;
function monitor(x,y,s,inner){return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-260" y="-180" width="520" height="340" rx="24" fill="#05080f" stroke="#2b3550" stroke-width="10"/><rect x="-40" y="160" width="80" height="60" fill="#2b3550"/><rect x="-140" y="215" width="280" height="22" rx="8" fill="#2b3550"/>${inner||""}</g>`}
function card(x,y,s,t0,t){if(t<t0)return"";const q=back(cl((t-t0)/0.35));let g=`<g transform="translate(${x} ${y}) scale(${s*q}) rotate(-4)"><path d="M-300 -150 H270 L300 -120 V150 H-300 Z" fill="#efe3c2" stroke="#b9a777" stroke-width="5"/>`;
  for(let c=0;c<22;c++)for(let r=0;r<6;r++)if(rnd(c*7+r)>0.62)g+=`<rect x="${-270+c*25}" y="${-120+r*42}" width="12" height="26" fill="#0F1B33"/>`;return g+`</g>`}
function door(x,y,q){return `<g transform="translate(${x} ${y})"><rect x="-130" y="-260" width="260" height="440" fill="#05080f" stroke="${GOLD}" stroke-width="10"/><g transform="skewY(${-10*q}) scale(${1-0.55*q} 1)"><rect x="-130" y="-260" width="260" height="440" fill="#6a4a2e"/><circle cx="90" cy="-30" r="14" fill="${GOLD}"/></g></g>`}
const V={
 init(){UP=path(-200,120,200,-110,8,0.05,S(1),18,3);UP2=path(90,1350,990,700,12,S(10),E(12),35,6)},
 dark:()=>[[S(3),S(6)],[S(13),S(16)]],rain:()=>[[S(13),S(16)]],
 povGroup:t=>t<S(2)?[0,1]:t<S(3)?[2]:[3,4,5],povRed:[[1,6],[1,7],[2,2],[5,1]],
 hits:()=>[S(1),W(1,4),S(2),S(3),S(5),S(7),S(8),S(9),S(10),S(11),S(12),S(13),S(14),S(15),S(16),S(17),S(18),W(18,9),S(20),S(21),W(23,0),S(24),S(25),S(26),S(28)],
 fl:()=>[[W(1,4),"#E0465A",.35],[S(5),"#E0465A",.3],[S(13),"#E0465A",.3],[S(15),"#E0465A",.3],[W(18,9),"#E7CE7C",.4],[W(23,0),"#FFFFFF",.3],[S(26),"#E7CE7C",.35]],
 scenes:[
 {id:"pov",from:0,draw(t){let h="";
   if(t<S(3)){let inner="";const pts=UP.map(([x,y,tt])=>[x,y,tt]);inner+=curve(pts,t,GOLD,8);if(t>=W(0,2))inner+=check(190,-130,W(0,2),t);
     const ov=t>=W(1,4)?ease(cl((t-W(1,4))/0.4)):0;h+=monitor(540,900,1.5,inner);
     if(t>=S(1)){h+=`<g opacity="${cl((t-S(1))/0.3)}">${person(830,1430,2.2,RED)}</g>`+box(540,1560,640,120,"UBAH IKUT RASA",RED,"#fff",72,W(1,4),t)+xmark(540,880,230,W(1,5),t)}
     if(t>=S(2)){h=door(540,950,ease(cl((t-S(2))/0.6)))+`<g transform="translate(${lerp(300,540,ease(cl((t-S(2))/0.9)))} 0)">${person(0,1180,2.2,GOLD)}</g>`+pop(540,1500,"DIA PILIH KELUAR",GOLD,110,W(2,1),t)}return h}
   const q=back(cl((t-S(3))/0.4));h+=`<g transform="translate(540 980) scale(${q})"><rect x="-320" y="-300" width="640" height="560" rx="28" fill="#f4efe0"/><rect x="-320" y="-300" width="640" height="100" rx="28" fill="${GOLD}"/>${T(0,-230,"PLAN","#0F1B33",64)}`;
   for(let i=0;i<4;i++)h+=`<rect x="-250" y="${-150+i*95}" width="${380+rnd(i)*100}" height="26" rx="10" fill="#c9c2ad"/>`;h+=`</g>`;
   if(t>=S(4))h+=candles(260,1300,10,56,[[0,40],[40,20],[20,70],[70,50],[50,110],[110,90],[90,150],[150,130],[130,190],[190,240]],()=>RED,(t-S(4))/0.06);
   if(t>=S(5)){h+=xmark(540,980,260,W(5,1),t)+pop(540,1620,"LANGGAR JUGA?",RED,120,S(5),t)}return h}},
 {id:"g1",from:6,draw(t,a){let h="";if(t<S(7))return fadeUp(540,900,"DENGAR KISAH NI DULU","#fff",90,a,t);
   h+=pop(540,440,"AWAL 1970-AN",GOLD,130,S(7),t);
   if(t>=S(8)&&t<S(9)){const q=back(cl((t-S(8))/0.35));h+=`<g transform="translate(540 820) scale(${q})"><path d="M-200 0 L0 -90 L200 0 L0 90 Z" fill="#0F1B33" stroke="${GOLD}" stroke-width="8"/><rect x="-110" y="40" width="220" height="90" fill="#0F1B33" stroke="${GOLD}" stroke-width="8"/><line x1="160" y1="0" x2="160" y2="120" stroke="${GOLD}" stroke-width="8"/></g>`+pop(540,1100,"GRADUAN MIT",'#fff',110,W(8,1),t)+fadeUp(540,1300,"antara sistem trading",MUTE,56,W(8,4),t,"Pop")+fadeUp(540,1400,"BERKOMPUTER TERAWAL",GOLD,96,W(8,7),t)}
   if(t>=S(9)){h+=card(540,880,1.4,S(9),t)+pop(540,1250,"KAD TEBUK",GOLD,140,W(9,1),t)}return h}},
 {id:"g2",from:10,draw(t,a){let h=`<line x1="80" x2="1000" y1="1350" y2="1350" stroke="${MUTE}" stroke-width="2" stroke-dasharray="10 10"/>`+curve(UP2,t,GOLD,10);
   h+=box(540,460,700,120,"IKUT TREND",GOLD,"#0F1B33",80,a,t)+box(540,610,700,120,"POTONG LOSS",RED,"#fff",80,S(11),t)+box(540,760,700,120,"BIAR UNTUNG JALAN",GOLD,"#0F1B33",80,S(12),t);return h}},
 {id:"g3",from:13,draw(t,a){let h=`<g opacity="${cl((t-a)/0.3)}">${person(540,900,2.6,RED)}</g>`+pop(540,1150,"CAMPUR TANGAN",RED,120,W(13,2),t);
   if(t>=S(14)){h=box(320,700,420,140,"SISTEM",GOLD,"#0F1B33",80,S(14),t)+box(760,700,420,140,"PENDAPAT",RED,"#fff",80,W(14,4),t);
     if(t>=W(14,4))h+=`<g opacity="${cl((t-W(14,4))/0.3)}">${T(540,960,"ubah keputusan sistem","#fff",56,"middle",1,"Pop")}</g>`+xmark(320,700,110,W(14,4)+0.2,t)}
   if(t>=S(15))h+=pop(540,1300,"DIA TAK SETUJU",GOLD,120,S(15),t);return h}},
 {id:"g4",from:16,draw(t,a){const q=ease(cl((t-a)/0.6));let h=door(540,850,q)+`<g transform="translate(${lerp(540,820,ease(cl((t-a)/1)))} 0)">${person(0,1080,2,GOLD)}</g>`+pop(540,1300,"DIA KELUAR",GOLD,120,a,t);
   if(t>=S(17))h+=box(540,1500,800,140,"URUS AKAUN SENDIRI","#2b3550","#fff",80,S(17),t);return h}},
 {id:"g5",from:18,draw(t,a){let h=T(540,480,"DILAPORKAN",MUTE,76,"middle",cl((t-a)/0.2));
   h+=pop(540,700,"$5,000",'#fff',150,W(18,4),t);if(t>=W(18,6))h+=`<g opacity="${cl((t-W(18,6))/0.2)}">${T(540,840,"KE",MUTE,70)}</g>`;
   if(t>=W(18,8)){const v=count(5000,15000000,W(18,8),W(18,11),t);h+=T(540,1060,v>=1e6?"$"+(v/1e6).toFixed(0)+" JUTA+":"$"+Math.round(v).toLocaleString("en-US"),GOLD,170)+burst(540,1000,W(18,11),t,36,GOLD,560,11,1.1)}
   if(t>=S(19))h+=box(540,1320,720,130,"LEBIH SEDEKAD","#2b3550","#fff",84,S(19),t);return h}},
 {id:"g6",from:20,draw(t,a){const q=back(cl((t-a)/0.4));let h=`<g transform="translate(540 900) scale(${q}) rotate(-6)"><rect x="-200" y="-270" width="400" height="540" rx="14" fill="#0F1B33" stroke="${GOLD}" stroke-width="10"/><rect x="-200" y="-270" width="40" height="540" fill="${GOLD}"/>${T(20,-40,"MARKET",GOLD,80)}${T(20,50,"WIZARDS",GOLD,80)}${T(20,200,"Jack D. Schwager","#fff",30,"middle",1,"Pop")}</g>`;
   h+=fadeUp(540,470,"ANTARA TRADER TERBAIK",'#fff',86,W(20,4),t)+fadeUp(540,1300,"JACK SCHWAGER",MUTE,70,a,t);
   if(t>=S(21))h+=box(540,1450,720,130,"BUKU MARKET WIZARDS",GOLD,"#0F1B33",76,W(21,2),t);return h}},
 {id:"nm",from:22},
 {id:"les",from:24,draw(t,a){let h=fadeUp(540,450,"PESAN DIA",MUTE,90,a,t);
   if(t>=S(25))h+=check(250,710,S(25),t)+`<g opacity="${cl((t-S(25))/0.2)}">${T(320,740,"PERATURAN SENANG","#fff",86,"start")}</g>`;
   if(t>=S(26))h+=fadeUp(540,1000,"YANG SUSAH",RED,120,S(26),t);
   if(t>=S(27))h+=box(540,1250,820,190,"IKUT PERATURAN",GOLD,"#0F1B33",120,S(27),t);return h}},
 {id:"fin",from:28}
 ]};
