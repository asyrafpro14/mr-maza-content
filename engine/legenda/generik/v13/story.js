// ===== KISAH RICHARD DENNIS =====
let UPP,DNP;
const V={
 init(){UPP=path(90,1300,990,640,14,S(6),E(9),40,5);DNP=path(90,700,990,1250,12,S(17),E(18),45,9)},
 dark:()=>[[0,S(2)],[S(17),S(19)]],rain:()=>[[S(17),S(19)]],
 povGroup:t=>t<S(1)?[0]:[1],povRed:[[0,0],[0,2],[1,7]],
 hits:()=>[W(0,2),W(1,7),S(2),W(3,4),S(4),S(5),S(6),S(7),S(8),W(9,3),S(10),S(11),S(12),S(13),S(14),S(15),S(16),S(17),S(18),W(20,0),S(21),S(22),W(23,0),S(24)],
 fl:()=>[[W(0,2),"#E0465A",.3],[S(5),"#E0465A",.25],[W(9,3),"#E7CE7C",.4],[S(15),"#E7CE7C",.35],[S(17),"#E0465A",.3],[W(20,0),"#FFFFFF",.3],[W(23,0),"#E7CE7C",.35]],
 scenes:[
 {id:"pov",from:0,draw(t){let h="";
   if(t<S(1)){const q=back(cl((t-W(0,1))/0.4));h+=`<g transform="translate(540 1000) scale(${q})"><rect x="-260" y="-170" width="520" height="340" rx="40" fill="#3a2a1a" stroke="#1a120a" stroke-width="8"/><rect x="-260" y="-170" width="520" height="110" rx="40" fill="#4a3826"/><circle cx="170" cy="0" r="30" fill="${GOLD}"/></g>`;
     for(let i=0;i<2;i++)if(t>=W(0,2)+i*0.2)h+=`<ellipse cx="${500+i*80}" cy="${1250-i*10}" rx="60" ry="16" fill="${GOLD}" stroke="#a58a3a" stroke-width="4"/>`;return h}
   // orang kaya vs kau
   for(let i=0;i<3;i++){const x=260+i*280;const q=ease(cl((t-S(1)-i*0.15)/0.4));h+=`<g opacity="${q}">`;for(let k=0;k<6;k++)h+=`<rect x="${x-70}" y="${960-k*36}" width="140" height="30" rx="4" fill="#cfe0c4" stroke="#7a9a6a" stroke-width="3"/>`;h+=person(x,1150,1.8,"#56607a")+`</g>`}
   if(t>=W(1,5)){h+=person(540,1500,1.3,RED)+T(540,1640,"KAU?",RED,70)}return h}},
 {id:"g1",from:2,draw(t,a){let h="";if(t<S(3))return fadeUp(540,900,"DENGAR KISAH NI DULU","#fff",90,a,t);
   h+=pop(540,420,"CHICAGO",MUTE,110,S(3),t)+fadeUp(540,520,"pinjam dari keluarga","#fff",54,W(3,2),t,"Pop");
   let v=1600;
   const st=t>=S(5);h+=T(540,820,"$"+v.toLocaleString("en-US"),st?RED:GOLD,220,"middle",cl((t-W(3,4))/0.2));
   if(t>=S(4)){const q=back(cl((t-S(4))/0.35));h+=`<g transform="translate(540 1140) scale(${q})"><rect x="-70" y="-120" width="140" height="130" rx="14" fill="#6a4a2e"/><rect x="-90" y="10" width="180" height="40" rx="10" fill="#7a5a3e"/><rect x="-80" y="50" width="16" height="110" fill="#4a321e"/><rect x="64" y="50" width="16" height="110" fill="#4a321e"/></g>`+fadeUp(540,1400,"-$1,200 UNTUK KERUSI BURSA","#fff",62,W(4,2),t)}
   if(t>=S(5)){h=pop(540,420,"TINGGAL",MUTE,110,S(5),t)+T(540,820,"$400",RED,260);const fl=cl((t-S(5))/1.0);h+=bill(540,lerp(1000,1200,ease(fl)),1.2,Math.sin(t*3)*10*(1-fl),"$400")+fadeUp(540,1480,"UNTUK TRADE","#fff",90,W(5,4),t)}
   return h}},
 {id:"g2",from:6,draw(t,a){let h=`<line x1="80" x2="1000" y1="1320" y2="1320" stroke="${MUTE}" stroke-width="2" stroke-dasharray="10 10"/>`+curve(UPP,t,GOLD,10);
   h+=pop(540,420,"IKUT TREND",GOLD,120,a,t);if(t>=S(7))h+=box(540,560,720,120,"POTONG LOSS CEPAT",RED,"#fff",70,S(7),t);
   if(t>=S(8)){h=`<line x1="80" x2="1000" y1="1320" y2="1320" stroke="${MUTE}" stroke-width="2" stroke-dasharray="10 10"/>`+curve(UPP,t,GOLD,10);const age=Math.round(count(20,26,S(8),E(8),t));h+=T(540,440,"SEBELUM UMUR",MUTE,70)+T(540,620,String(age),GOLD,200)}
   if(t>=S(9)){const v=Math.round(count(400,1000000,S(9),E(9),t));h+=box(540,1480,860,170,"$"+v.toLocaleString("en-US"),GOLD,"#0F1B33",110,S(9),t)+burst(540,1480,W(9,3),t,30,GOLD,500,10,1)+fadeUp(540,1650,"JUTAWAN","#fff",90,W(9,3),t)}
   return h}},
 {id:"g3",from:10,draw(t,a){let h=fadeUp(540,420,"SATU PERTARUHAN",GOLD,110,a,t);
   h+=`<g opacity="${cl((t-a)/0.4)}">${person(330,1000,2.2,"#56607a")}${person(750,1000,2.2,"#56607a")}<line x1="540" y1="820" x2="540" y2="1100" stroke="${GOLD}" stroke-width="6"/><line x1="380" y1="${820+20*Math.sin(t*2)}" x2="700" y2="${820-20*Math.sin(t*2)}" stroke="${GOLD}" stroke-width="8"/></g>`;
   if(t>=S(11)){h+=T(540,1300,"TRADER BUKAN DILAHIRKAN","#fff",76,"middle",cl((t-S(11))/0.2))+(t>=W(11,2)?`<line x1="140" x2="${lerp(140,940,ease(cl((t-W(11,2))/0.3)))}" y1="1275" y2="1275" stroke="${RED}" stroke-width="12" stroke-linecap="round"/>`:"")}
   if(t>=S(12))h+=box(540,1500,800,150,"BOLEH DILATIH",GOLD,"#0F1B33",100,W(12,1),t);return h}},
 {id:"g4",from:13,draw(t,a){let h="";
   if(t<S(15)){const n=Math.min(23,Math.floor((t-a)/((E(13)-a)/23))+1);for(let i=0;i<n;i++){const r=Math.floor(i/6),c=i%6,x=165+c*150,y=560+r*200;h+=person(x,y,1.05,i<n?GOLD:"#333",1)}
     h+=pop(540,1420,"23 ORANG BIASA","#fff",110,W(13,3),t);if(t>=S(14))h+=box(540,1600,600,130,"2 MINGGU",GOLD,"#0F1B33",90,W(14,1),t);return h}
   if(t<S(16)){const q=back(cl((t-S(15))/0.4));h+=`<g transform="translate(540 900) scale(${q})"><ellipse cx="0" cy="0" rx="260" ry="170" fill="#2e6a4a" stroke="#1d4a32" stroke-width="10"/><path d="M-130 -80 L0 -140 L130 -80 L130 60 L0 120 L-130 60 Z" fill="none" stroke="#5fae7f" stroke-width="10"/><ellipse cx="320" cy="-10" rx="80" ry="56" fill="#2e6a4a"/><ellipse cx="-170" cy="150" rx="50" ry="30" fill="#2e6a4a"/><ellipse cx="170" cy="150" rx="50" ry="30" fill="#2e6a4a"/></g>`+pop(540,1300,"TURTLE TRADERS",GOLD,130,W(15,4),t);return h}
   const v=count(0,175,S(16),W(16,8),t);h+=T(540,560,"DILAPORKAN UNTUNG",MUTE,70)+T(540,950,"$"+Math.round(v)+" JUTA",GOLD,200)+burst(540,880,W(16,8),t,40,GOLD,600,12,1.2)+fadeUp(540,1120,"keuntungan agregat Turtle Traders","#fff",48,W(16,2),t,"Pop");return h}},
 {id:"g5",from:17,draw(t,a){let h=fadeUp(540,420,"TAPI DIA SENDIRI PUN","#fff",86,a,t)+pop(540,560,"PERNAH RUGI BESAR",RED,110,W(17,5),t);
   h+=`<line x1="80" x2="1000" y1="1250" y2="1250" stroke="${MUTE}" stroke-width="2" stroke-dasharray="10 10"/>`+curve(DNP,t,RED,10);
   if(t>=S(18))h+=pop(540,1450,"1987 & 1988",RED,130,W(18,2),t);return h}},
 {id:"nm",from:19},
 {id:"les",from:21,draw(t,a){let h="";if(t<S(22)){h+=pop(540,800,"MODAL",GOLD,200,a,t)+xmark(540,730,260,W(21,1),t)+fadeUp(540,1050,"BUKAN PENENTU.",RED,110,W(21,1),t);return h}
   h+=fadeUp(540,620,"DISIPLIN","#fff",160,S(22),t)+fadeUp(540,760,"IKUT PERATURAN",GOLD,110,W(22,1),t)+box(540,1050,800,190,"ITU PENENTU.",GOLD,"#0F1B33",130,S(23),t);return h}},
 {id:"fin",from:24}
 ]};
