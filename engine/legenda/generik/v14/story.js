// ===== KISAH MARK DOUGLAS =====
let DNP;
const V={
 init(){DNP=path(90,640,990,1250,12,S(8),E(10),55,7)},
 dark:()=>[[0,S(11)]],rain:()=>[[S(8),S(11)]],
 povGroup:t=>t<S(2)?[0,1]:[2,3],povRed:[[3,1]],
 hits:()=>[S(0),S(1),W(3,1),S(4),S(5),S(6),S(7),S(9),S(10),S(11),S(12),S(13),S(14),S(15),S(16),S(17),S(18),S(20),W(22,0),S(23),S(24),S(25),S(26),S(27)],
 fl:()=>[[W(3,1),"#E0465A",.35],[S(9),"#E0465A",.3],[S(11),"#E7CE7C",.3],[S(14),"#E0465A",.25],[S(18),"#E7CE7C",.35],[W(22,0),"#FFFFFF",.3],[S(24),"#E7CE7C",.4]],
 scenes:[
 {id:"pov",from:0,draw(t){let h="";const q=back(cl((t-S(0))/0.4));
   h+=`<g transform="translate(540 1050) scale(${q})"><rect x="-360" y="-380" width="720" height="760" rx="28" fill="#f4efe0"/><rect x="-360" y="-380" width="720" height="110" rx="28" fill="${GOLD}"/>${T(0,-305,"PLAN TRADING","#0F1B33",64)}</g>`;
   [[S(0),"STRATEGI"],[S(1),"PLAN"],[W(1,3),"RISIKO"]].forEach(([t0,s],i)=>{const y=880+i*150;h+=check(290,y-20,t0,t,"#2e6a4a")+`<g opacity="${cl((t-t0)/0.2)}">${T(350,y,s,"#0F1B33",72,"start")}</g>`});
   if(t>=W(3,1)){for(let i=0;i<3;i++){const t0=W(3,1)+i*0.12;if(t>=t0)h+=`<line x1="250" x2="${lerp(250,830,ease(cl((t-t0)/0.25)))}" y1="${838+i*150}" y2="${838+i*150}" stroke="${RED}" stroke-width="14" stroke-linecap="round"/>`}h+=pop(540,1560,"LANGGAR JUGA?",RED,120,W(3,1),t)}return h}},
 {id:"g1",from:4,draw(t,a){let h="";if(t<S(5))return fadeUp(540,900,"DENGAR KISAH NI DULU","#fff",90,a,t);
   h+=pop(540,560,"1981",GOLD,220,S(5),t);
   if(t<S(7)){if(t>=S(6)){const q=back(cl((t-S(6))/0.35));h+=`<g transform="translate(540 1050) scale(${q})"><rect x="-180" y="-110" width="360" height="240" rx="24" fill="#3a2a1a"/><rect x="-60" y="-160" width="120" height="60" rx="14" fill="none" stroke="#3a2a1a" stroke-width="20"/><rect x="-180" y="-10" width="360" height="12" fill="#2a1a0a"/></g>`+fadeUp(540,1330,"KERJAYA INSURANS","#fff",86,W(6,3),t)+fadeUp(540,1430,"YANG SELESA",GOLD,86,W(6,6),t)}return h}
   const p=ease(cl((t-S(7))/1.2));h+=`<g transform="translate(${lerp(300,560,p)} 1200)">${person(0,0,2.4,"#56607a")}</g><g transform="translate(780 1000)"><rect x="-150" y="-110" width="300" height="200" rx="14" fill="#0b1324" stroke="${GOLD}" stroke-width="6"/>${candles(-120,-60,8,30,[[60,40],[40,20],[20,50],[50,30],[30,10],[10,30],[30,0],[0,-20]],(i,o,c)=>c<o?GOLD:RED)}</g>`+pop(540,1450,"TRADE SEPENUH MASA",GOLD,96,S(7),t);return h}},
 {id:"g2",from:8,draw(t,a){let h=fadeUp(540,420,"AWAL-AWAL","#fff",100,a,t)+`<line x1="80" x2="1000" y1="1250" y2="1250" stroke="${MUTE}" stroke-width="2" stroke-dasharray="10 10"/>`+curve(DNP,t,RED,10);
   if(t>=S(9))h+=pop(540,560,"RUGI BESAR",RED,130,S(9),t);
   if(t>=S(10)){for(let i=0;i<3;i++)h+=xmark(300+i*240,1450,70,S(10)+i*0.2,t,RED,16);h+=fadeUp(540,1640,"BERULANG KALI","#fff",90,W(10,1),t)}return h}},
 {id:"g3",from:11,draw(t,a){let h="";
   if(t<S(12)){h+=fadeUp(540,600,"DIA TAK SALAHKAN","#fff",96,a,t)+pop(540,800,"MARKET",RED,200,W(11,3),t)+xmark(540,730,200,W(11,4),t,"#fff",14);return h}
   if(t<S(13)){const q=ease(cl((t-S(12))/0.6));h+=`<g opacity="${q}"><rect x="290" y="600" width="500" height="800" rx="250" fill="none" stroke="${MUTE}" stroke-width="10"/><ellipse cx="540" cy="1000" rx="230" ry="380" fill="url(#spot)"/>${person(540,1150,2.8,"#56607a")}</g>`+pop(540,1550,"TANYA DIRI SENDIRI",GOLD,100,W(12,1),t);return h}
   h+=fadeUp(540,620,"KENAPA AKU TAHU","#fff",100,S(13),t)+fadeUp(540,760,"APA YANG BETUL,",GOLD,110,W(13,4),t);
   if(t>=S(14))h+=fadeUp(540,980,"TAPI BUAT","#fff",100,S(14),t)+pop(540,1150,"APA YANG SALAH?",RED,120,W(14,2),t);return h}},
 {id:"g4",from:15,draw(t,a){let h="";
   if(t<S(16)){const q=ease(cl((t-a)/0.5));h+=`<g opacity="${q}"><circle cx="540" cy="900" r="260" fill="#1a2a4e" stroke="${GOLD}" stroke-width="8"/>`;for(let i=0;i<14;i++){const x=540+Math.cos(i*2.3)*rnd(i)*190,y=900+Math.sin(i*1.7)*rnd(i+3)*190;const on=t>a+i*0.08;h+=`<circle cx="${x}" cy="${y}" r="${on?12:6}" fill="${on?GOLD:"#334"}" ${on?'filter="url(#gw)"':''}/>`;if(i&&on){const px=540+Math.cos((i-1)*2.3)*rnd(i-1)*190,py=900+Math.sin((i-1)*1.7)*rnd(i+2)*190;h+=`<line x1="${px}" y1="${py}" x2="${x}" y2="${y}" stroke="${GOLD}" stroke-width="3" opacity=".6"/>`}}h+=`</g>`+pop(540,1300,"KAJI MINDA TRADER",GOLD,100,W(15,1),t);return h}
   h+=pop(540,560,"1982",GOLD,220,S(16),t);
   if(t>=S(17)){for(let i=0;i<6;i++){const x=240+(i%3)*300,y=1250+Math.floor(i/3)*200;h+=`<g opacity="${cl((t-S(17)-i*0.1)/0.3)}">${person(x,y,1.3,"#56607a")}</g>`}h+=`<g opacity="${cl((t-S(17))/0.3)}"><rect x="240" y="740" width="600" height="300" rx="14" fill="#13261c" stroke="#6a5a3a" stroke-width="10"/>${T(540,910,"PSIKOLOGI","#e8f0e0",90)}</g>`+fadeUp(540,1700,"MULA MENGAJAR","#fff",86,W(17,2),t)}return h}},
 {id:"g5",from:18,draw(t,a){let h=fadeUp(540,420,"BUKU DIA","#fff",100,a,t);
   const bk=[[S(19),"THE DISCIPLINED","TRADER","#2e4a7a",-1],[W(19,4),"TRADING","IN THE ZONE","#7a2e3a",1]];
   bk.forEach(([t0,l1,l2,col,s],i)=>{if(t<t0)return;const q=back(cl((t-t0)/0.4));h+=`<g transform="translate(${540+s*200} 950) scale(${q}) rotate(${s*4})"><rect x="-170" y="-260" width="340" height="520" rx="10" fill="${col}" stroke="#000" stroke-opacity=".3" stroke-width="6"/><rect x="-170" y="-260" width="26" height="520" fill="#000" opacity=".25"/>${T(10,-40,l1,"#fff",l1.length>10?44:56)}${T(10,30,l2,GOLD,56)}</g>`});
   if(t>=S(20)){h+=pop(540,1450,"DIBACA SELURUH DUNIA",GOLD,96,S(20),t);for(let i=0;i<18;i++){const x=120+rnd(i)*840,y=1560+rnd(i+4)*200;{const t0=S(20)+0.3+i*0.06;if(t>=t0)h+=`<circle cx="${x}" cy="${y}" r="${7*Math.min(1,back((t-t0)/0.2))}" fill="${GOLD}" filter="url(#gw)"/>`}}}return h}},
 {id:"nm",from:21},
 {id:"les",from:23,draw(t,a){let h="";
   if(t<S(25)){h+=fadeUp(540,540,"PESAN DIA","#fff",90,a,t)+fadeUp(540,720,"SETIAP TRADE",GOLD,140,S(24),t);
     if(t>=W(24,2)){const sp=(t-W(24,2))*5;const fx=Math.abs(Math.cos(sp));h+=`<g transform="translate(540 1050)"><ellipse cx="0" cy="0" rx="${150*fx+6}" ry="150" fill="${Math.cos(sp)>0?GOLD:RED}" stroke="#a58a3a" stroke-width="6"/></g>`+pop(540,1360,"CUMA SATU KEBARANGKALIAN","#fff",80,W(24,3),t)}return h}
   h+=fadeUp(540,620,"BILA KAU TERIMA TU",GOLD,100,S(25),t);if(t>=S(26))h+=fadeUp(540,860,"KAU BERHENTI","#fff",110,S(26),t)+box(540,1100,900,190,"BERGADUH DENGAN MARKET",RED,"#fff",80,W(26,2),t);return h}},
 {id:"fin",from:27}
 ]};
