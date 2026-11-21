// VIDEO 15: REVENGE TRADING (mindset/risk)
function wave(n,f,seed,z=0.5){const c=[];for(let i=0;i<n;i++)c.push(f(i)+(rnd(i*7.31+seed)-0.5)*2*z);return ohlc(c,seed)}
let H15;
function card(x,y,w,h,col,q=1,fill="rgba(5,8,15,.85)"){return `<g opacity="${q}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" fill="${fill}" stroke="${col}" stroke-width="5"/></g>`}
function eqBar(y,v,col,lab){return `<rect x="60" y="${y}" width="780" height="70" rx="16" fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.2)" stroke-width="3"/><rect x="66" y="${y+6}" width="${Math.max(0,768*v)}" height="58" rx="12" fill="${col}"/>`+txt(450,y+50,lab,"#fff",40)}
const V={bg:{dir:"bg",fps:24,n:121},chapters:true,sub:"Cara berhenti",stamp:"MARAH!",title:"REVENGE<br>TRADE",pill:"BERHENTI REVENGE TRADE",
 msgRe:/^Trading ni permainan/,m1:"DISIPLIN",m2:"BUKAN DENDAM",m3:"Pendidikan sahaja",m4:"JAGA DISIPLIN",
 msgTimes:()=>[W(iMsg,3),S(iMsg+1),S(iMsg+2),W(iMsg+1,3)],
 cheat:["Dua loss berturut-turut: tutup chart, rehat","Jangan besarkan lot untuk cover loss","Tetapkan had rugi harian. Sampai had, berhenti","Tulis emosi dalam jurnal setiap kali kena SL","Satu loss cuma satu trade. Jaga trade seterusnya"],
 groups:[{p:[0,1],until:2},{p:[2,3]}],red:[[0,1],[1,2],[1,4],[3,1]],
 stampT:()=>W(3,1),
 init(){H15=wave(46,i=>i<14?110+1.2*Math.sin(i/1.5):i<20?110-(i-13)*1.6:i<26?100+0.9*(i-20)*0.6:i<34?103-(i-26)*1.5:91-(i-34)*0.9,5,0.5)},
 hits:()=>[W(0,1),W(1,2),W(3,1),W(7,1),S(8),W(12,3),W(13,6),S(16),S(17),S(21),S(24),S(25)],
 fl:()=>[[W(3,1),"#E0465A",.4],[W(13,6),"#E0465A",.3],[S(17),"#E7CE7C",.25]],
 hook(t){let h="";
  h+=popc(250,400,"KENA SL",RED,"#fff",60,W(0,1),t,-4)+popc(640,480,"ENTRY BALIK",GOLD,"#0F1B33",56,W(1,2),t,3)+popc(300,570,"SL LAGI",RED,"#fff",60,S(2),t,-3);
  const steps=[[0,1],[W(0,1),0.8],[S(2),0.55],[W(3,1),0.2]];let v=1;steps.forEach(([a,x])=>{if(t>=a)v=x});
  h+=eqBar(680,v,v<0.3?RED:v<0.7?"#C9862F":GOLD,"EKUITI "+Math.round(v*100)+"%");
  if(t>=W(3,1))h+=burst(66+768*0.2,715,W(3,1),t,24,RED,360,10,1);return h},
 steps:[
  (t,a,b)=>{let h="";[["TRADE 1",W(7,1)],["TRADE 2",W(7,2)]].forEach(([s,t0],i)=>{if(t<t0)return;const q=ease((t-t0)/0.3),y=60+i*170;
    h+=`<g transform="translate(${(1-q)*-300} 0)" opacity="${q}">`+card(90,y,720,130,RED)+txt(150,y+85,s,INK,56,"start")+txt(770,y+85,"LOSS",RED,62,"end")+`</g>`});
   if(t>=S(8)){const q=ease((t-S(8))/0.5);h+=`<rect x="0" y="0" width="900" height="880" fill="#000" opacity="${0.7*q}"/>`;
    const lid=lerp(-75,0,q);h+=`<g transform="translate(450 520)"><rect x="-200" y="40" width="400" height="24" rx="8" fill="${MUTE}"/><g transform="translate(0 40) rotate(${lid})"><rect x="-190" y="-230" width="380" height="230" rx="16" fill="#1B2A4A" stroke="${MUTE}" stroke-width="8"/></g></g>`;
    h+=popc(450,720,"TUTUP CHART",GOLD,"#0F1B33",64,S(8),t)}
   if(t>=S(9)){h+=popc(450,830,"REHAT. MINUM AIR",INK,"#0F1B33",50,S(9),t)}return h},
  (t,a,b)=>{let h="";const lots=["0.01","0.02","0.04","0.08"],T0=[W(12,1),W(12,2),W(12,3),W(12,4)];
   lots.forEach((l,i)=>{if(t<T0[i])return;const q=back((t-T0[i])/0.3),hh=48*Math.pow(2,i)*0.85*q,x=150+i*190;h+=`<rect x="${x-55}" y="${480-hh}" width="110" height="${hh}" rx="10" fill="${i>1?RED:GOLD}"/>`+txt(x,520+40,l,INK,40)});
   h+=txt(450,620,"SAIZ LOT",MUTE,36);
   if(t>=W(12,6))h+=cross(450,300,200,W(12,6),t);
   if(t>=S(13)){const q=ease((t-S(13))/1.2);h+=eqBar(700,1-0.97*q,q>0.6?RED:GOLD,"AKAUN "+Math.round((1-0.97*q)*100)+"%")}
   h+=popc(450,40,"JANGAN BESARKAN LOT",RED,"#fff",54,W(12,0),t);
   if(t>=W(13,6))h+=popc(450,840,"BLOW AKAUN",RED,"#fff",60,W(13,6),t);return h},
  (t,a,b)=>{let h="";const cx=450,cy=480,r=300;const lim=0.78;const p=cl((t-S(15))/(S(16)-S(15)))*lim;
   const arc=(f0,f1,col,w)=>{const a0=Math.PI*(1-f0),a1=Math.PI*(1-f1);return `<path d="M${cx+r*Math.cos(a0)} ${cy-r*Math.sin(a0)} A${r} ${r} 0 0 1 ${cx+r*Math.cos(a1)} ${cy-r*Math.sin(a1)}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`};
   h+=arc(0,1,"rgba(255,255,255,.12)",50)+arc(lim,1,RED,50);if(p>0.005)h+=arc(0,p,GOLD,50);
   const an=Math.PI*(1-p);h+=`<line x1="${cx}" y1="${cy}" x2="${cx+(r-70)*Math.cos(an)}" y2="${cy-(r-70)*Math.sin(an)}" stroke="#fff" stroke-width="12" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="22" fill="#fff"/>`;
   h+=txt(cx,cy+90,"RUGI HARI NI",MUTE,40)+txt(cx+r*Math.cos(Math.PI*0.22)+20,cy-r*Math.sin(Math.PI*0.22)-60,"HAD",RED,48);
   h+=popc(450,40,"HAD RUGI HARIAN",GOLD,"#0F1B33",56,W(15,1),t);
   if(t>=S(17))h+=ring(cx+(r-70)*Math.cos(an),cy-(r-70)*Math.sin(an),S(17),t,RED,160,0.6,12)+popc(450,700,"BERHENTI",RED,"#fff",80,S(17),t);
   if(t>=S(18))h+=popc(450,830,"MARKET ADA ESOK",GOLD,"#0F1B33",54,S(18),t);return h},
  (t,a,b)=>{let h="";const q=ease((t-a)/0.4);h+=`<g opacity="${q}" transform="rotate(-3 450 420)"><rect x="110" y="80" width="680" height="700" rx="24" fill="#F4F1E8"/><rect x="110" y="80" width="680" height="100" rx="24" fill="${GOLD}"/>`+txt(450,150,"JURNAL TRADE","#0F1B33",56);
   const L=[["Kena SL. Rasa:",W(20,3)],["Marah, nak cover cepat",W(20,6)],["Kena SL lagi. Rasa:",W(20,8)],["Panik, tambah lot",W(20,9)]];
   L.forEach(([s,t0],i)=>{if(t<t0)return;const o=cl((t-t0)/0.25);h+=`<text x="160" y="${270+i*110}" font-family="Poppins" font-weight="600" font-size="40" fill="${i%2?RED:"#0F1B33"}" opacity="${o}">${s}</text><line x1="160" x2="740" y1="${290+i*110}" y2="${290+i*110}" stroke="#0F1B33" stroke-opacity=".15" stroke-width="3"/>`});
   if(t>=S(21)){const q2=ease((t-S(21))/0.4);h+=`<rect x="140" y="215" width="${620*q2}" height="420" rx="16" fill="none" stroke="${RED}" stroke-width="8"/>`}h+=`</g>`;if(t>=S(21)){h+=""+popc(450,840,"CORAK EMOSI KAU",RED,"#fff",56,W(21,3),t)}return h},
  (t,a,b)=>{let h="";const xs=[150,450,750],y=380;
   xs.forEach((x,i)=>{const t0=i===0?S(24):i===1?W(24,3):S(25);if(t<t0)return;const q=back((t-t0)/0.3);
    const col=i===0?RED:i===1?MUTE:RED;h+=`<g transform="translate(${x} ${y}) scale(${q})"><rect x="-120" y="-110" width="240" height="220" rx="24" fill="rgba(5,8,15,.85)" stroke="${col}" stroke-width="${i===2?10:5}" ${i===2?'filter="url(#gw)"':''}/>`+txt(0,-20,"TRADE "+(i+1),INK,44)+txt(0,60,i===0?"LOSS":i===1?"OK":"?",col,64)+`</g>`;
    if(i>0)h+=arrow(x-150,y,0,0,MUTE)+`<line x1="${x-180}" x2="${x-130}" y1="${y}" y2="${y}" stroke="${MUTE}" stroke-width="8"/>`});
   h+=popc(450,90,"1 LOSS = 1 TRADE",GOLD,"#0F1B33",64,W(24,1),t);
   if(t>=S(25))h+=ring(750,y,S(25),t,RED,200,0.7,14)+popc(750,600,"BAHAYA",RED,"#fff",64,W(25,1),t)+popc(450,760,"TRADE LEPAS TU",INK,"#0F1B33",52,W(25,3),t);return h}
 ]};
