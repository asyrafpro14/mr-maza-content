// ===== KISAH GEORGE SOROS =====
let CR,PD;
function bank(x,y,s,crack,col="#cfd6e4"){let g=`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-230 -120 L0 -230 L230 -120 Z" fill="${col}"/><rect x="-240" y="-120" width="480" height="30" fill="${col}"/>`;
  for(let i=0;i<5;i++)g+=`<rect x="${-200+i*92}" y="-80" width="44" height="220" fill="${col}"/>`;g+=`<rect x="-250" y="140" width="500" height="40" fill="${col}"/>`;
  if(crack>0)g+=`<path d="M10 -225 L-20 -120 L30 -20 L-15 60 L25 180" fill="none" stroke="${RED}" stroke-width="12" stroke-dasharray="700" stroke-dashoffset="${700*(1-crack)}" stroke-linecap="round"/>`;return g+`</g>`}
function pie(x,y,r,frac,col){const a=frac*6.283,x1=x+r*Math.sin(a),y1=y-r*Math.cos(a);return `<circle cx="${x}" cy="${y}" r="${r}" fill="#24304a"/>`+(frac>0?`<path d="M${x} ${y} L${x} ${y-r} A${r} ${r} 0 ${frac>0.5?1:0} 1 ${x1} ${y1} Z" fill="${col}"/>`:"")}
const V={
 init(){CR=path(90,760,990,1350,12,S(6),E(6),55,4);PD=path(90,760,990,1300,10,S(15),E(16),40,8)},
 dark:()=>[[0,S(1)],[S(5),S(10)]],rain:()=>[[S(7),S(10)]],
 povGroup:t=>t<S(1)?[0]:t<S(3)?[1,2]:[3],povRed:[[0,0],[0,1],[0,2],[2,3],[2,4],[3,2]],
 hits:()=>[W(0,1),S(1),W(2,2),S(3),S(5),S(6),S(7),S(8),S(9),S(10),S(11),S(12),S(13),S(14),S(15),S(16),S(17),W(19,0),S(20),S(22),S(23)],
 fl:()=>[[W(0,1),"#E0465A",.35],[W(2,2),"#E7CE7C",.3],[S(6),"#E0465A",.3],[S(8),"#E0465A",.3],[S(10),"#E7CE7C",.3],[S(16),"#E7CE7C",.35],[S(17),"#E7CE7C",.4],[W(19,0),"#FFFFFF",.3]],
 scenes:[
 {id:"pov",from:0,draw(t){let h="";
   if(t<S(1)){const k=cl((t-0.05)/(E(0)-0.1));let c="";for(let i=0;i<14;i++){if(i/14>k)break;const o=640+i*38+(i>8?(i-8)*45:0),cc=o+(i%3===1?-30:70),col=i%3===1?GOLD:RED;c+=`<line x1="${120+i*62+22}" x2="${120+i*62+22}" y1="${Math.min(o,cc)-25}" y2="${Math.max(o,cc)+25}" stroke="${col}" stroke-width="5"/><rect x="${120+i*62}" y="${Math.min(o,cc)}" width="44" height="${Math.abs(cc-o)}" rx="4" fill="${col}"/>`}
     h+=c+pop(540,1560,"-$800 JUTA",RED,170,W(0,4),t);return h}
   if(t<S(3)){h+=fadeUp(300,820,"1987",RED,140,S(1),t)+fadeUp(780,820,"1992",GOLD,140,W(1,1),t);
     if(t>=W(1,1))h+=`<line x1="420" x2="${lerp(420,640,ease(cl((t-W(1,1))/0.3)))}" y1="770" y2="770" stroke="#fff" stroke-width="10" stroke-linecap="round"/>`;
     if(t>=S(2)){const q=back(cl((t-S(2))/0.35));h+=`<g opacity="${q}">`+bank(540,1180,q,cl((t-W(2,2))/0.5))+`</g>`+pop(540,1520,"BANK OF ENGLAND",GOLD,100,W(2,3),t)}return h}
   h+=person(540,1150,3,"#56607a")+`<rect x="330" y="1290" width="420" height="24" rx="10" fill="#2b3550"/>`+pop(540,1500,"NAK BERHENTI?",RED,120,W(3,5),t);return h}},
 {id:"g1",from:4,draw(t,a){let h="";if(t<S(5))return fadeUp(540,900,"DENGAR KISAH NI DULU","#fff",90,a,t);
   h+=pop(540,430,"OKTOBER 1987",RED,130,S(5),t);
   h+=`<line x1="80" x2="1000" y1="760" y2="760" stroke="${MUTE}" stroke-width="2" stroke-dasharray="10 10"/>`+(t>=S(6)?curve(CR,t,RED,12):"");
   if(t>=S(6))h+=pop(540,1550,"CRASH",RED,200,W(6,3),t);return h}},
 {id:"g2",from:7,draw(t,a){let h="";h+=person(540,800,2.4,"#56607a")+box(540,1060,760,120,"SILAP MASA KELUAR",RED,"#fff",72,W(7,3),t);
   if(t>=S(8)){const v=Math.round(count(0,800,S(8),E(8),t));h=T(540,560,"HILANG",MUTE,80)+T(540,800,"-$"+v+" JUTA",RED,170)+burst(540,740,E(8),t,24,RED,420,9,1)}
   if(t>=S(9)){h+=pie(540,1200,190,count(0,1/3,S(9),S(9)+0.8,t),RED)+fadeUp(540,1500,"HAMPIR 1/3 NILAI DANA","#fff",80,W(9,1),t)}return h}},
 {id:"g3",from:10,draw(t,a){let h="";
   if(t<S(11)){h+=pop(540,800,"MARKET",GOLD,170,a,t)+xmark(540,740,200,W(10,2),t)+fadeUp(540,1050,"DIA TAK SALAHKAN",'#fff',100,a,t);return h}
   if(t<S(12)){const L=["TRADE","URUS DANA","PASUKAN","MESYUARAT"];L.forEach((s,i)=>{const y=650+i*170,sh=Math.sin(t*9+i)*10;h+=box(540+sh,y,560,120,s,"#2b3550","#fff",64,S(11)+i*0.15,t)});
     h+=fadeUp(540,1450,"TAK BOLEH SEMUA SERENTAK",RED,84,W(11,5),t);return h}
   h+=pop(540,560,"UNDUR",GOLD,150,S(12),t)+fadeUp(540,680,"dari urusan harian","#fff",56,W(12,1),t,"Pop");
   if(t>=S(13)){for(let i=0;i<5;i++){const x=180+i*180;h+=`<g opacity="${cl((t-S(13)-i*0.1)/0.3)}">${person(x,1150,1.6,i===2?GOLD:"#7f8bb0")}</g>`}h+=box(540,1450,640,150,"BINA PASUKAN",GOLD,"#0F1B33",100,W(13,1),t)}return h}},
 {id:"g4",from:14,draw(t,a){let h=pop(540,430,"SEPTEMBER 1992",GOLD,120,a,t);
   h+=`<line x1="80" x2="1000" y1="760" y2="760" stroke="${MUTE}" stroke-width="2" stroke-dasharray="10 10"/>`;
   if(t>=S(15)){h+=curve(PD,t,RED,10)+pop(860,640,"£",RED,180,S(15),t)+box(540,1500,700,140,"JUAL POUND BRITISH",RED,"#fff",76,W(15,3),t)}
   if(t>=S(16)){h=pop(540,430,"16 SEP 1992",GOLD,120,S(16),t)+`<g transform="translate(540 900) scale(${back(cl((t-S(16))/0.4))})"><circle r="230" fill="none" stroke="#5b7bd6" stroke-width="10"/>`;for(let i=0;i<12;i++){const an=i*0.5236;h+=`<circle cx="${180*Math.cos(an)}" cy="${180*Math.sin(an)}" r="16" fill="${GOLD}"/>`}h+=`</g>`;
     const q=ease(cl((t-W(16,2))/0.8));h+=`<g transform="translate(${540+q*360} ${900+q*80})">`+T(0,30,"UK",RED,130)+`</g>`+fadeUp(540,1300,"KELUAR DARI ERM","#fff",100,W(16,3),t)+fadeUp(540,1420,"sistem kadar tukaran Eropah",MUTE,48,W(16,5),t,"Pop")}return h}},
 {id:"g5",from:17,draw(t,a){let h=T(540,560,"DILAPORKAN UNTUNG",MUTE,76)+pop(540,900,"~$1 BILION",GOLD,190,W(17,4),t)+bill(540,lerp(1500,1300,ease(cl((t-a)/1.2))),1.3,Math.sin(t*3)*6,"$")+burst(540,840,W(17,7),t,40,GOLD,600,12,1.2);
   h+=fadeUp(540,1100,"sekitar, ikut laporan media","#fff",48,W(17,3),t,"Pop");return h}},
 {id:"nm",from:18},
 {id:"les",from:20,draw(t,a){let h="";if(t<S(21)){h+=pop(540,720,"LOSS BESAR",RED,150,a,t)+fadeUp(540,960,"TAK TAMATKAN DIA","#fff",110,W(20,2),t);return h}
   h+=fadeUp(540,600,"YANG SELAMATKAN DIA",MUTE,80,S(21),t)+box(540,850,760,170,"TERIMA SILAP",GOLD,"#0F1B33",110,S(22),t)+box(540,1100,760,170,"UBAH CARA",GOLD,"#0F1B33",110,W(22,3),t);return h}},
 {id:"fin",from:23}
 ]};
