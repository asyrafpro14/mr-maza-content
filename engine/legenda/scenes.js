// ===== KISAH MARK MINERVINI (emosi) =====
const GW=`<defs><filter id="gw" filterUnits="userSpaceOnUse" x="-500" y="-500" width="2200" height="3000"><feGaussianBlur stdDeviation="9" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<radialGradient id="lamp" cx="50%" cy="0%" r="100%"><stop offset="0" stop-color="#FFE7A8" stop-opacity=".55"/><stop offset=".6" stop-color="#FFE7A8" stop-opacity=".06"/><stop offset="1" stop-color="#FFE7A8" stop-opacity="0"/></radialGradient>
<radialGradient id="spot" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>`;
const money=v=>"$"+Math.round(v).toLocaleString("en-US");
let GR=[];
function T(x,y,s,col,size,anchor="middle",op=1,font="Anton"){return `<text x="${x}" y="${y}" font-family="${font}" font-size="${size}" fill="${col}" text-anchor="${anchor}" opacity="${op}" ${font==="Pop"?'font-weight="600"':''}>${s}</text>`}
function pop(x,y,s,col,size,t0,t,font="Anton"){if(t<t0)return"";const sc=back(cl((t-t0)/0.3));return `<g transform="translate(${x} ${y}) scale(${lerp(1.8,1,sc)})" opacity="${cl((t-t0)/0.12)}">${T(0,0,s,col,size,"middle",1,font)}</g>`}
function fadeUp(x,y,s,col,size,t0,t,font="Anton"){if(t<t0)return"";const q=ease(cl((t-t0)/0.6));return T(x,y+40*(1-q),s,col,size,"middle",q,font)}
function person(x,y,s,col,op){return `<g transform="translate(${x} ${y}) scale(${s})" opacity="${op}"><circle cx="0" cy="-70" r="26" fill="${col}"/><path d="M-38 40 Q-40 -30 0 -36 Q40 -30 38 40 Z" fill="${col}"/></g>`}
function shatter(cx,cy,t0,t,n=26,col="#fff"){if(t<t0||t>t0+1.4)return"";const d=t-t0;let g="";for(let i=0;i<n;i++){const a=rnd(i+3)*6.283,sp=150+rnd(i+7)*600,x=cx+Math.cos(a)*sp*d,y=cy+Math.sin(a)*sp*d+500*d*d,s=8+rnd(i+11)*26,r=d*400*(rnd(i)-0.5);
  g+=`<polygon points="0,${-s} ${s*0.8},${s*0.6} ${-s*0.7},${s*0.4}" fill="${col}" opacity="${0.75*(1-d/1.4)}" transform="translate(${x} ${y}) rotate(${r})"/>`}return g}
function curve(pts,t,col,w=10){let d="",head=pts[0];for(let i=0;i<pts.length;i++){const [x,y,tt]=pts[i];if(i===0){d=`M${x} ${y}`;continue}const [px,py,pt]=pts[i-1];if(t>=tt){d+=` L${x} ${y}`;head=[x,y]}else{if(t>pt){const p=(t-pt)/(tt-pt);head=[lerp(px,x,p),lerp(py,y,p)];d+=` L${head[0]} ${head[1]}`}break}}
  return `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round" filter="url(#gw)"/><circle cx="${head[0]}" cy="${head[1]}" r="${w*1.6}" fill="#fff" filter="url(#gw)"/>`}
let FALLP,RISEP,WINP;
function build(tl){TL=tl;P=tl.p;
  let dh="";for(let i=0;i<46;i++){const s=2+rnd(i)*5;dh+=`<i style="width:${s}px;height:${s}px"></i>`}$("dust").innerHTML=dh;
  for(let k=0;k<6;k++){const cv=document.createElement("canvas");cv.width=cv.height=256;const x=cv.getContext("2d"),im=x.createImageData(256,256);for(let i=0;i<im.data.length;i+=4){const v=rnd(i*0.37+k*999)*255;im.data[i]=im.data[i+1]=im.data[i+2]=v;im.data[i+3]=255}x.putImageData(im,0,0);GR.push(cv.toDataURL())}
  // garisan jatuh 6 tahun
  const a=S(11),b=E(13);FALLP=[];let y=760;for(let i=0;i<=12;i++){const x=90+i*75;y=i===0?760:(i%2?y+70+rnd(i)*40:y-30-rnd(i+3)*30);FALLP.push([x,Math.min(1320,y),lerp(a,b,i/12)])}FALLP[12][1]=1320;
  const r0=S(18),r1=E(20);RISEP=[];y=1300;for(let i=0;i<=10;i++){const x=90+i*90;y=i===0?1300:(i%3===2?y+35:y-55-rnd(i)*25);RISEP.push([x,y,lerp(r0,r1,i/10)])}
  HITS=[W(0,2),S(1),S(2),S(3),S(4),W(5,4),W(7,0),S(11),S(12),S(13),S(15),S(16),S(18),S(19),S(20),S(21),W(22,3),S(23),W(25,0),W(26,4),S(27),W(29,1),W(30,2),S(32)];
  FL=[[W(0,2),"#E0465A",.3],[S(12),"#E0465A",.25],[S(15),"#E7CE7C",.3],[W(22,3),"#E7CE7C",.45],[S(23),"#E7CE7C",.35],[W(25,0),"#FFFFFF",.35],[S(27),"#E7CE7C",.25]];
  CUTS=[S(3),S(6),S(10),S(14),S(16),S(21),S(24),S(26),S(31)];
  return tl.total}
function render(t){
  $("prog").firstElementChild.style.width=cl(t/TL.total)*100+"%";
  $("floor").style.backgroundPosition=`0 ${t*60}px`;
  document.querySelectorAll("#dust i").forEach((d,i)=>{const sp=10+rnd(i+5)*30;const x=(rnd(i)*1080+Math.sin(t*0.5+i)*30)%1080,y=((rnd(i+9)*1920-t*sp)%1920+1920)%1920;d.style.transform=`translate(${x}px,${y}px)`;d.style.opacity=0.25+0.5*rnd(i+2)*(0.6+0.4*Math.sin(t*2+i))});
  let punch=0,shake=0;HITS.forEach(h=>{const d=t-h;if(d>=0&&d<0.35){punch=Math.max(punch,(1-d/0.35)*0.045);shake=Math.max(shake,(1-d/0.28)*10)}});
  let blur=0,whip=0;CUTS.forEach(c=>{const d=t-c;if(Math.abs(d)<0.16){const q=1-Math.abs(d)/0.16;blur=Math.max(blur,q*18)}});
  // kamera perlahan 'dolly' untuk rasa sinematik
  const dolly=1+0.04*((t%8)/8);const cam=$("cam");cam.style.transform=`translate(${shake*Math.sin(t*90)}px,${shake*Math.cos(t*77)}px) scale(${dolly+punch})`;cam.style.filter=blur>0.5?`blur(${blur}px)`:"none";
  let fo=0,fc="#E0465A";FL.forEach(([a,c,g])=>{const d=t-a;if(d>=0&&d<0.5&&(1-d/0.5)*g>fo){fo=(1-d/0.5)*g;fc=c}});$("flash").style.opacity=fo;$("flash").style.background=fc;
  $("bars").innerHTML="";
  // grading: sejuk & kelabu masa jatuh, panas bila bangkit
  const warm=cl((t-S(16))/(S(21)-S(16)));const dark=t<S(16);$("world").style.filter=dark?`saturate(.35) brightness(.92) hue-rotate(-8deg)`:`saturate(${lerp(.5,1.15,warm)}) brightness(${lerp(.95,1.05,warm)})`;
  const g=$("grain");g.style.backgroundImage=`url(${GR[Math.floor(t*24)%6]})`;g.style.opacity=dark?0.12:0.06;
  // hujan
  let rh="";if(t<S(16)){const ro=t<S(14)?0.35:0.35*(1-cl((t-S(14))/1.5));for(let i=0;i<70;i++){const sp=1400+rnd(i)*800,x=(rnd(i+1)*1200-60+t*120)%1140-30,y=((rnd(i+2)*1920+t*sp)%2100)-100;rh+=`<line x1="${x}" y1="${y}" x2="${x-14}" y2="${y+60}" stroke="#9fb8d8" stroke-width="2" opacity="${ro*(0.4+rnd(i+3)*0.6)}"/>`}}$("rain").innerHTML=rh;
  // ===== POV: blow akaun =====
  if(scene("pov",0,S(3)-0.02,t)){
    const grp=t<S(2)?[0,1]:[2];let wh="";grp.forEach(pi=>P[pi].words.forEach(([w,a],k)=>{if(t<a)return;const s=back((t-a)/0.22);const red=(pi===0&&k===2)||(pi===1&&k===3);wh+=(wh?" ":"")+`<span class="word ${red?'r':''}" style="transform:scale(${1.5-0.5*s});opacity:${cl((t-a)/0.08)}">${w}</span>`}));$("pw").innerHTML=wh;
    let h=GW;const lift=t<S(2)?0:ease(cl((t-S(2))/0.8));const px=290,py=560+lift*700,dim=t<S(1)?1:lerp(1,0.35,cl((t-S(1))/0.6));
    h+=`<g transform="translate(${px} ${py})" opacity="${1-lift*0.9}"><rect x="0" y="0" width="500" height="960" rx="60" fill="#05080f" stroke="#2b3550" stroke-width="10"/><rect x="22" y="22" width="456" height="916" rx="44" fill="#0b1324" opacity="${dim}"/>`;
    const bal=Math.max(0,1000*(1-ease(cl((t-0.2)/(W(0,4)-0.2)))));const red=bal<200;
    h+=`<g opacity="${dim}">${T(250,130,"BALANCE",MUTE,30,"middle",1,"Pop")}${T(250,220,bal.toFixed(2),red?RED:"#fff",96)}${T(250,270,"USD",MUTE,28,"middle",1,"Pop")}`;
    let c="";let v=0;for(let i=0;i<24;i++){const k=(t-0.2)/(W(0,4)-0.2)*24;if(i>k)break;const o=v,nv=v+(i<3?6:-14+rnd(i)*8);v=nv;const x=50+i*17,y0=380-o*1.0,y1=380-nv*1.0;c+=`<rect x="${x}" y="${Math.min(y0,y1)}" width="11" height="${Math.max(3,Math.abs(y1-y0))}" fill="${nv>=o?GOLD:RED}"/>`}h+=c;
    if(t>=W(0,4)){const q=back(cl((t-W(0,4))/0.35));h+=`<g transform="translate(250 ${lerp(900,760,q)})"><rect x="-220" y="-50" width="440" height="100" rx="22" fill="${RED}"/>${T(0,14,"STOP OUT",'#fff',52)}</g>`}
    h+=`</g>`;if(t>=S(1))h+=`<g opacity="${cl((t-S(1))/0.2)}"><path d="M140 380 L230 470 L210 560 L320 640 M230 470 L360 430 M210 560 L110 640" stroke="#fff" stroke-width="4" fill="none" opacity=".7"/></g>`;h+=`</g>`;
    if(t>=S(1))h+=shatter(px+200,py+420,S(1),t,22,"#cfd8ea");
    $("psvg").innerHTML=h;}
  // ===== MISKIN =====
  if(scene("kid",S(3)-0.02,S(6)-0.02,t)){let h=GW;const sw=Math.sin(t*1.6)*6;
    h+=`<g transform="rotate(${sw} 540 300)"><line x1="540" y1="300" x2="540" y2="560" stroke="#555" stroke-width="4"/><path d="M490 560 L590 560 L570 610 L510 610 Z" fill="#333"/><circle cx="540" cy="616" r="14" fill="#FFE7A8" filter="url(#gw)"/><path d="M500 610 L580 610 L900 1500 L180 1500 Z" fill="url(#lamp)"/></g>`;
    h+=person(540,1360,3.2,"#0a0f1a",1)+`<rect x="300" y="1440" width="480" height="20" rx="10" fill="#1a2234"/>`;
    h+=pop(540,800,"KELUARGA MISKIN","#fff",110,W(3,3),t);
    if(t>=S(4)){h+=pop(540,940,"TAK ADA MODAL BESAR",RED,80,S(4),t)}
    if(t>=S(5)){const n=Math.min(5,Math.floor((t-S(5))/0.18)+1);for(let i=0;i<n;i++)h+=`<ellipse cx="540" cy="${1150-i*18}" rx="70" ry="18" fill="${GOLD}" stroke="#a58a3a" stroke-width="4"/>`;h+=fadeUp(540,1250,"BEBERAPA RIBU DOLAR",GOLD,64,W(5,4),t)}
    $("ksvg").innerHTML=h;}
  // ===== TRADE PERTAMA =====
  if(scene("fst",S(6)-0.02,S(10)-0.02,t)){let h=GW;const q=ease(cl((t-S(6))/0.9));
    h+=T(540,420,"SAHAM PERTAMA",MUTE,70,"middle",cl((t-S(6))/0.3));h+=`<line x1="540" x2="540" y1="${1100}" y2="${1100-560*q}" stroke="${GOLD}" stroke-width="8"/><rect x="480" y="${1080-460*q}" width="120" height="${460*q}" rx="10" fill="${GOLD}" filter="url(#gw)"/>`;
    h+=pop(540,1240,"+ UNTUNG",GOLD,120,S(7),t);
    if(t>=S(8)){const s=back(cl((t-S(8))/0.35));h+=`<g transform="translate(540 1500) scale(${s})"><ellipse cx="0" cy="0" rx="380" ry="120" fill="#fff"/><circle cx="-200" cy="150" r="26" fill="#fff"/><circle cx="-250" cy="200" r="14" fill="#fff"/>${T(0,24,t>=W(9,0)?"SENANGNYA TRADING!":"...","#0F1B33",70)}</g>`}
    $("fsvg").innerHTML=h;}
  // ===== 6 TAHUN RUGI =====
  if(scene("fall",S(10)-0.02,S(14)-0.02,t)){let h=GW;
    if(t>=W(11,0)){const s=back(cl((t-W(11,0))/0.35));h+=`<g transform="translate(540 470) scale(${lerp(2.2,1,s)})" opacity="${cl((t-W(11,0))/0.1)}">${T(0,0,"6 TAHUN","#fff",190)}</g>`}
    const yr=1983+Math.min(6,Math.floor(cl((t-S(11))/(E(11)-S(11)+0.6))*7));if(t>=S(11)&&t<S(12))h+=T(540,600,String(yr)+"  ·  RUGI",RED,70);
    h+=`<line x1="80" x2="1000" y1="1320" y2="1320" stroke="${MUTE}" stroke-width="2" stroke-dasharray="10 10"/>`+T(1000,1370,"$0",MUTE,40,"end");
    if(t>=S(11))h+=curve(FALLP,t,RED,10);
    if(t>=S(12))h+=pop(540,1480,"DUIT HABIS.",RED,110,S(12),t);
    if(t>=S(13)){h=GW+`<rect x="0" y="0" width="1080" height="1920" fill="#000" opacity="${0.6*cl((t-S(13))/0.4)}"/><ellipse cx="540" cy="1000" rx="420" ry="420" fill="url(#spot)"/>`;const fl=cl((t-S(13))/1.2);const by=lerp(500,960,ease(fl)),rot=Math.sin(t*3)*12*(1-fl);
      h+=`<g transform="translate(540 ${by}) rotate(${rot})"><rect x="-190" y="-85" width="380" height="170" rx="10" fill="#cfe0c4" stroke="#7a9a6a" stroke-width="6"/><circle cx="0" cy="0" r="55" fill="none" stroke="#7a9a6a" stroke-width="5"/>${T(0,24,"$500","#3d5a30",64)}</g>`+fadeUp(540,1260,"TINGGAL $500","#fff",110,W(13,1),t)}
    $("lsvg").innerHTML=h;}
  // ===== PILIHAN =====
  if(scene("cho",S(14)-0.02,S(16)-0.02,t)){let h=GW;h+=fadeUp(540,500,"RAMAI ORANG AKAN BERHENTI.","#fff",76,S(14),t);
    for(let i=0;i<15;i++){const r=Math.floor(i/5),c=i%5,x=220+c*160,y=820+r*230;const keep=i===7;const ft=S(14)+0.4+rnd(i+20)*(S(15)-S(14)-0.4);const op=keep?1:1-cl((t-ft)/0.4);
      h+=person(x,y,1.3,keep&&t>=S(15)?GOLD:"#56607a",op);if(keep&&t>=S(15))h+=`<circle cx="${x}" cy="${y-30}" r="${120+10*Math.sin(t*4)}" fill="${GOLD}" opacity=".12" filter="url(#gw)"/>`+ring(x,y-30,S(15),t,GOLD,240,0.8,10)}
    if(t>=S(15))h+=pop(540,1600,"DIA TAK.",GOLD,170,S(15),t);
    $("csvg").innerHTML=h;}
  // ===== BINA SEMULA =====
  if(scene("reb",S(16)-0.02,S(21)-0.02,t)){let h=GW;
    if(t<S(18)){const n=Math.min(6,Math.floor(cl((t-W(17,2))/0.9)*6));const titles=["CHART","RISK","SETUP","MINDSET","SYSTEM","JOURNAL"];
      h+=fadeUp(540,470,"$500 TERAKHIR",GOLD,110,S(16),t)+fadeUp(540,560,"untuk buku & kursus","#fff",54,S(16)+0.3,t,"Pop");
      for(let i=0;i<n;i++){const q=back(cl((t-W(17,2)-i*0.15)/0.3));h+=`<g transform="translate(540 ${1380-i*95}) scale(${q})"><rect x="-260" y="-42" width="520" height="84" rx="8" fill="${["#7a2e3a","#2e4a7a","#2e6a4a","#7a5a2e","#4a2e7a","#2e6a6a"][i]}" stroke="#000" stroke-opacity=".3" stroke-width="4"/>${T(0,18,titles[i],"#fff",48)}</g>`}}
    else{h+=`<line x1="80" x2="1000" y1="1320" y2="1320" stroke="${MUTE}" stroke-width="2" stroke-dasharray="10 10"/>`+curve(RISEP,t,GOLD,10);
      const items=[[S(18),"BELAJAR DARI SETIAP LOSS"],[S(19),"BINA SISTEM"],[S(20),"JAGA RISIKO"]];items.forEach(([t0,s],i)=>{if(t<t0)return;const q=back(cl((t-t0)/0.3));h+=`<g transform="translate(540 ${430+i*130}) scale(${q})"><rect x="-400" y="-55" width="800" height="100" rx="24" fill="rgba(5,8,15,.8)" stroke="${GOLD}" stroke-width="4"/><circle cx="-340" cy="-5" r="30" fill="${GOLD}"/><path d="M-355 -5 L-343 8 L-322 -18" stroke="#0F1B33" stroke-width="7" fill="none" stroke-linecap="round"/>${T(30,14,s,"#fff",50)}</g>`})}
    $("rsvg").innerHTML=h;}
  // ===== JUARA =====
  if(scene("win",S(21)-0.02,S(24)-0.02,t)){let h=GW;const yr=Math.round(lerp(1989,1997,ease(cl((t-S(21))/(E(21)-S(21))))));h+=`<g opacity="${t<W(22,3)?1:0.4}">${T(540,560,String(yr),GOLD,220)}</g>`;
    const ct=W(22,3);if(t>=ct){const s=back(cl((t-ct)/0.45));h+=`<g transform="translate(540 1000) scale(${s})"><path d="M-160 -220 L160 -220 L140 -40 Q120 60 0 80 Q-120 60 -140 -40 Z" fill="${GOLD}" filter="url(#gw)"/><path d="M-160 -190 Q-260 -190 -240 -100 Q-220 -30 -140 -40" fill="none" stroke="${GOLD}" stroke-width="22"/><path d="M160 -190 Q260 -190 240 -100 Q220 -30 140 -40" fill="none" stroke="${GOLD}" stroke-width="22"/><rect x="-30" y="80" width="60" height="90" fill="${GOLD}"/><rect x="-120" y="170" width="240" height="50" rx="8" fill="${GOLD}"/>${T(0,-100,"1","#0F1B33",120)}</g>`+burst(540,900,ct,t,50,GOLD,600,12,1.4)+ring(540,900,ct,t,GOLD,500,0.9,16);
      h+=fadeUp(540,1400,"JUARA US INVESTING","#fff",84,ct+0.1,t)+fadeUp(540,1490,"CHAMPIONSHIP",GOLD,84,ct+0.25,t)}
    if(t>=S(23)){h=GW+T(540,560,"1997",GOLD,140,"middle",.5);const v=155*ease(cl((t-S(23))/(E(23)-S(23))));h+=T(540,1000,"+"+Math.round(v)+"%",GOLD,300)+T(540,1120,"RETURN SETAHUN","#fff",64);
      let d="M90 1500";for(let i=0;i<=40;i++){const x=90+i*22.5,p=i/40;if(p>ease(cl((t-S(23))/1.2)))break;d+=` L${x} ${1500-Math.pow(p,2.4)*300-Math.sin(i)*8}`}h+=`<path d="${d}" fill="none" stroke="${GOLD}" stroke-width="10" filter="url(#gw)"/>`+burst(540,950,S(23),t,30,GOLD,500,10,1)}
    $("wsvg").innerHTML=h;}
  // ===== NAMA =====
  if(scene("nm",S(24)-0.02,S(26)-0.02,t)){show("n0",S(24),t);const n1=$("n1");show(n1,W(25,0),t,"pop");shine(n1,t,1.0);n1.style.letterSpacing=`${lerp(30,0,ease(cl((t-W(25,0))/0.9)))}px`;show("n2",W(25,1)+0.3,t);}
  // ===== PENGAJARAN =====
  if(scene("les",S(26)-0.02,S(31)-0.02,t)){let h=GW;
    if(t<S(28)){h+=fadeUp(540,620,"LOSS KAU HARI NI","#fff",110,S(26),t);if(t>=W(26,4))h+=pop(540,780,"BUKAN PENAMAT.",RED,120,W(26,4),t);
      if(t>=S(27)){const s=back(cl((t-S(27))/0.35));h+=`<g transform="translate(540 1050) scale(${s})"><rect x="-430" y="-90" width="860" height="180" rx="40" fill="${GOLD}"/>${T(0,40,"YURAN BELAJAR","#0F1B33",120)}</g>`}}
    else{h+=fadeUp(540,520,"SOALNYA...","#fff",110,S(28),t);
      if(t>=S(29)){const s=back(cl((t-S(29))/0.35));h+=`<g transform="translate(540 850) scale(${s})"><rect x="-380" y="-100" width="760" height="200" rx="40" fill="${GOLD}" filter="url(#gw)"/>${T(0,45,"BELAJAR","#0F1B33",140)}</g>`}
      if(t>=S(30)){const s=back(cl((t-S(30))/0.35)),rot=((t-S(30))*240)%360;h+=`<g transform="translate(540 1200) scale(${s})"><rect x="-380" y="-100" width="760" height="200" rx="40" fill="none" stroke="${RED}" stroke-width="10"/>${T(40,45,"ULANG",RED,140)}<g transform="translate(-230 0) rotate(${rot})"><path d="M0 -55 A55 55 0 1 1 -50 22" fill="none" stroke="${RED}" stroke-width="14"/><path d="M-70 10 L-50 40 L-26 12 Z" fill="${RED}"/></g></g>`+T(540,1420,"?","#fff",160,"middle",cl((t-W(30,2))/0.3))}}
    $("esvg").innerHTML=h;}
  // ===== OUTRO =====
  if(scene("fin",S(31)-0.02,99,t)){const f1=$("f1");show(f1,S(32),t,"pop");show("sig",S(31),t,"pop");shine($("sig").firstElementChild,t,0.8);show("disc",S(31)+0.6,t);}
  // CAPTION (bahagian cerita)
  let html="";for(const i of [3,5,6,10,11,16,17]){const ph=P[i];if(t<ph.start||t>=ph.end+0.15)continue;const ws=ph.words;let ci=0;ws.forEach((w,j)=>{if(t>=w[1])ci=j});const c0=Math.floor(ci/3)*3;
    for(let j=c0;j<Math.min(ws.length,c0+3);j++){if(t<ws[j][1])break;const s=back((t-ws[j][1])/0.18);html+=`<span class="${j===ci?"on":""}" style="transform:scale(${1.35-0.35*s})">${ws[j][0].replace(/[,?]/g,"").replace(/\.$/,"")}</span>`}}
  $("cap").innerHTML=html;
}
window.build=build;window.render=render;
