// garis harga ikut titik bermasa
function poly(pts,t){let d="",head=pts[0];for(let i=0;i<pts.length;i++){const [x,y,tt]=pts[i];if(i===0){d="M"+x+" "+y;continue}const [px,py,pt]=pts[i-1];
  if(t>=tt){d+=` L${x} ${y}`;head=[x,y]}else{if(t>pt){const p=(t-pt)/(tt-pt);head=[lerp(px,x,p),lerp(py,y,p)];d+=` L${head[0]} ${head[1]}`}break}}return{d,head}}
const GW=`<defs><filter id="gw" filterUnits="userSpaceOnUse" x="-300" y="-300" width="1500" height="1500"><feGaussianBlur stdDeviation="7" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter><linearGradient id="zg" x1="0" x2="1"><stop offset="0" stop-color="${GOLD}" stop-opacity=".1"/><stop offset=".5" stop-color="${GOLD}" stop-opacity=".55"/><stop offset="1" stop-color="${GOLD}" stop-opacity=".1"/></linearGradient></defs>`;
function line(path,col,w=8,glow=false){return `<path d="${path.d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round" ${glow?'filter="url(#gw)"':''}/><circle cx="${path.head[0]}" cy="${path.head[1]}" r="13" fill="${col}" filter="url(#gw)"/>`}
let HP=[],S2P=[],S3P=[],S4P=[],PIER=[];
function build(tl){TL=tl;P=tl.p;
  let dh="";for(let i=0;i<46;i++){const s=2+rnd(i)*5;dh+=`<i style="width:${s}px;height:${s}px"></i>`}$("dust").innerHTML=dh;
  // hook: harga tembus garisan nipis 3 kali
  PIER=[0.45,1.05,1.65];
  HP=[[20,200,0],[120,320,0.35],[170,360,PIER[0]],[220,260,0.75],[300,330,PIER[1]-0.1],[340,380,PIER[1]],[400,250,1.35],[480,320,PIER[2]-0.1],[520,400,PIER[2]],[600,300,2.0],[700,420,2.6],[800,330,3.2],[880,440,4.0]];
  // langkah 2: zon, harga berpatah pada kedalaman berbeza
  const z0=W(10,0);S2P=[[20,150,S(9)],[140,300,S(9)+0.6],[200,250,S(9)+0.9],[290,425,z0],[350,250,z0+0.5],[430,465,z0+0.9],[500,280,z0+1.3],[580,445,z0+1.7],[650,260,z0+2.1],[760,400,z0+2.5],[880,180,E(10)]];
  // langkah 3: tiga sentuhan
  const a=S(13),b=E(13);S3P=[[20,200,S(12)],[150,330,lerp(a,b,0)],[210,560,lerp(a,b,.18)],[280,330,lerp(a,b,.36)],[380,560,lerp(a,b,.54)],[450,320,lerp(a,b,.72)],[560,560,lerp(a,b,.9)],[680,250,S(14)+0.2],[880,150,E(14)]];
  // langkah 4: support pecah, retest dari bawah
  S4P=[[20,200,S(16)-0.2],[150,380,S(16)+0.2],[230,300,S(16)+0.5],[330,600,W(16,2)+0.1],[420,640,S(17)],[520,482,W(17,3)],[600,600,E(17)],[720,700,S(18)+0.2]];
  HITS=[PIER[0],PIER[1],PIER[2],W(1,6),S(2),W(3,4),S(4),S(5),S(6),W(6,2),W(7,4),S(8),W(9,1),S(11),S(15),W(16,2),W(17,3),W(19,5),W(19,7),S(20),S(21)];
  FL=[[PIER[0],"#E0465A",.25],[PIER[1],"#E0465A",.3],[PIER[2],"#E0465A",.35],[W(1,6),"#E0465A",.4],[W(9,1),"#E7CE7C",.35],[W(16,2),"#E0465A",.35],[W(19,5)+0.3,"#FFFFFF",.5]];
  CUTS=[S(2),S(4),S(8),S(11),S(15),S(19),S(20)];
  return tl.total}
function header(id,t0,t){const e=$(id);show(e,t0,t,"pop");shine(e,t,0.9);glitch(e,t,[t0])}
function tf(x,y,lab,sub,s,op,col=GOLD,jit=0,sq=""){return `<g transform="translate(${x+jit} ${y}) scale(${s})" opacity="${op}"><rect x="-130" y="-150" width="260" height="300" rx="26" fill="rgba(15,27,51,.92)" stroke="${col}" stroke-width="6"/>${txt(0,-80,lab,col,56)}${sq}${txt(0,120,sub,MUTE,28)}</g>`}
function render(t){
  $("prog").firstElementChild.style.width=cl(t/TL.total)*100+"%";
  $("floor").style.backgroundPosition=`0 ${t*90}px`;
  document.querySelectorAll("#dust i").forEach((d,i)=>{const sp=10+rnd(i+5)*30;const x=(rnd(i)*1080+Math.sin(t*0.5+i)*30)%1080,y=((rnd(i+9)*1920-t*sp)%1920+1920)%1920;d.style.transform=`translate(${x}px,${y}px)`;d.style.opacity=0.25+0.5*rnd(i+2)*(0.6+0.4*Math.sin(t*2+i))});
  let punch=0,shake=0;HITS.forEach(h=>{const d=t-h;if(d>=0&&d<0.35){punch=Math.max(punch,(1-d/0.35)*0.06);shake=Math.max(shake,(1-d/0.28)*16)}});
  let blur=0,whip=0;CUTS.forEach(c=>{const d=t-c;if(Math.abs(d)<0.14){const q=1-Math.abs(d)/0.14;blur=Math.max(blur,q*16);whip=d<0?-q*160:q*160}});
  const cam=$("cam");cam.style.transform=`translate(${shake*Math.sin(t*90)+whip}px,${shake*Math.cos(t*77)}px) scale(${1+punch+0.01*Math.sin(t*0.7)})`;cam.style.filter=blur>0.5?`blur(${blur}px)`:"none";
  let fo=0,fc="#E0465A";FL.forEach(([a,c,g])=>{const d=t-a;if(d>=0&&d<0.4&&(1-d/0.4)*g>fo){fo=(1-d/0.4)*g;fc=c}});$("flash").style.opacity=fo;$("flash").style.background=fc;
  let bh="";CUTS.forEach(c=>{const d=t-c;if(d>-0.15&&d<0.25){const p=(d+0.15)/0.4;const x=lerp(-600,1700,ease(p));bh+=`<polygon points="${x},0 ${x+140},0 ${x-560},1920 ${x-700},1920" fill="${GOLD}" opacity="${0.55*(1-Math.abs(p-0.5)*2)}"/>`}});$("bars").innerHTML=bh;
  // HOOK
  if(scene("hook",0,S(2)-0.02,t)){
    const ws=[...P[0].words];$("hw").innerHTML=ws.map(([w,a],k)=>{if(t<a)return"";const s=back((t-a)/0.2);const red=k>=3;return (k?" ":"")+`<span class="word ${red?'r':''}" style="transform:scale(${1.6-0.6*s});opacity:${cl((t-a)/0.06)}">${w}</span>`}).join("");
    let h=GW;const lv=330;h+=`<line x1="0" x2="900" y1="${lv}" y2="${lv}" stroke="${INK}" stroke-width="3" opacity=".8"/>`+txt(890,lv-12,"SUPPORT?",INK,36,"end",.8);
    const pl=poly(HP,t);h+=line(pl,INK,8);
    PIER.forEach((p,k)=>{const x=[170,340,520][k];h+=ring(x,lv,p,t,RED,180,0.6,12)+burst(x,lv,p,t,14,RED,260,8,0.7)});
    // label M5 di sudut, dipangkah pada 'chart'
    const mc=W(1,4);if(t>=S(1)){const s=back((t-S(1))/0.25);h+=`<g transform="translate(110 70) scale(${2-s})"><rect x="-80" y="-44" width="160" height="88" rx="18" fill="rgba(224,70,90,.2)" stroke="${RED}" stroke-width="5"/>${txt(0,22,"M5",RED,60)}</g>`;
      if(t>=mc){const q=ease((t-mc)/0.25);h+=`<line x1="40" y1="20" x2="${lerp(40,180,q)}" y2="${lerp(20,120,q)}" stroke="#fff" stroke-width="10" stroke-linecap="round"/><line x1="180" y1="20" x2="${lerp(180,40,q)}" y2="${lerp(20,120,q)}" stroke="#fff" stroke-width="10" stroke-linecap="round"/>`}}
    $("hsvg").innerHTML=h;const st=$("hst");show(st,W(1,6),t,"pop");glitch(st.firstElementChild,t,[W(1,6)]);}
  // SAVE
  if(scene("sv",S(2)-0.02,S(4)-0.02,t)){show("sv1",S(2),t,"pop");$("sv1").querySelector(".sw").style.left=`${lerp(-30,130,cl((t-S(2)-0.2)/0.6))}%`;
    show("sv2",S(3),t,"pop");const s3=$("sv3");show(s3,W(3,4),t,"fly");shine(s3,t,0.8);}
  // LANGKAH 1: timeframe
  if(scene("s1",S(4)-0.02,S(8)-0.02,t)){header("n1",S(4),t);let h=GW;
    const big=[["MONTHLY",S(5),210],["WEEKLY",S(6),540],["DAILY",W(6,2),870]];
    const fade=ease((t-W(7,0))/0.4);
    big.forEach(([l,a,x],k)=>{if(t<a)return;const p=ease((t-a)/0.45);const s=lerp(2.6,1,p)*(1-0.22*fade);const y=lerp(640,560,fade);
      const sq=`<path d="M-100 40 L-50 -10 L0 20 L60 -40 L100 -20" fill="none" stroke="${GOLD}" stroke-width="7" stroke-linejoin="round"/>`;
      h+=`<g opacity="${cl((t-a)/0.12)}" ${p<1?`style="filter:blur(${(1-p)*10}px)"`:''}>${tf(x,y,l,"TANDA SINI",s,1,GOLD,0,sq)}</g>`+ring(x,y,a+0.4,t,GOLD,200,0.6,10)});
    const smalls=[["M15",210],["M5",540],["M1",870]],sa=W(7,0),kill=W(7,5);
    smalls.forEach(([l,x],k)=>{const a=sa+k*0.12;if(t<a)return;const y=1040,op=t<kill?cl((t-a)/0.15):0;
      let sq="";if(op){let d="M-110 0";for(let i=1;i<=22;i++)d+=` L${-110+i*10} ${(rnd(i+Math.floor(t*20)+k*31)-0.5)*90}`;sq=`<path d="${d}" fill="none" stroke="${RED}" stroke-width="4"/>`}
      const jit=(rnd(Math.floor(t*30)+k)-0.5)*14;h+=tf(x,y,l,"BISING",0.85,op,RED,jit,sq);
      if(t>=kill)h+=burst(x,y,kill+k*0.05,t,18,RED,320,9,0.9);});
    if(t>=kill-0.1&&t<kill+0.6){const q=ease((t-kill+0.1)/0.3);h+=`<g opacity="${1-cl((t-kill-0.3)/0.3)}"><line x1="80" y1="${1040-120}" x2="${lerp(80,1000,q)}" y2="${lerp(920,1160,q)}" stroke="#fff" stroke-width="12" stroke-linecap="round"/></g>`}
    $("s1svg").innerHTML=h;}
  // LANGKAH 2: zon bukan garisan
  if(scene("s2",S(8)-0.02,S(11)-0.02,t)){header("n2",S(8),t);let h=GW;
    const zm=eio((t-W(9,1))/0.5),lv=420;const top=lerp(lv,lv-50,zm),bot=lerp(lv+2,lv+60,zm);
    h+=`<rect x="0" y="${top}" width="900" height="${bot-top}" fill="url(#zg)" stroke="${zm>0.5?GOLD:INK}" stroke-width="${lerp(3,5,zm)}" opacity="${0.6+0.4*Math.sin(t*6)*zm}"/>`;
    h+=txt(890,top-14,zm>0.5?"ZON":"GARISAN",zm>0.5?GOLD:INK,44,"end",1);
    if(t>=W(9,3)&&zm<1)h+=`<line x1="0" x2="900" y1="${lv}" y2="${lv}" stroke="${RED}" stroke-width="4" stroke-dasharray="10 8" opacity="${1-zm}"/>`;
    const pl=poly(S2P,t);h+=line(pl,INK,8);
    [[290,425],[430,465],[580,445]].forEach(([x,y],k)=>{const a=S2P[3+k*2][2];h+=ring(x,y,a,t,GOLD,120,0.5,10);if(t>=a)h+=`<circle cx="${x}" cy="${y}" r="10" fill="${GOLD}" filter="url(#gw)"/>`});
    if(t>=W(10,4))h+=txt(450,720,"BERPATAH DALAM ZON",GOLD,64,"middle",ease((t-W(10,4))/0.3));
    $("s2svg").innerHTML=h;}
  // LANGKAH 3: sentuhan berulang
  if(scene("s3",S(11)-0.02,S(15)-0.02,t)){header("n3",S(11),t);let h=GW;const lv=560;
    h+=`<rect x="0" y="${lv-20}" width="900" height="50" fill="url(#zg)"/><line x1="0" x2="900" y1="${lv}" y2="${lv}" stroke="${GOLD}" stroke-width="5" filter="url(#gw)"/>`;
    const pl=poly(S3P,t);h+=line(pl,INK,8);
    [210,380,560].forEach((x,k)=>{const a=S3P[2+k*2][2];if(t<a)return;const s=back((t-a)/0.25);h+=ring(x,lv,a,t,GOLD,160,0.6,12)+`<g transform="translate(${x} ${lv+110}) scale(${2-s})"><circle r="46" fill="${GOLD}"/>${txt(0,22,String(k+1),"#0F1B33",64)}</g>`});
    if(t>=S(14))h+=`<g transform="translate(450 110) scale(${2-back((t-S(14))/0.25)})">${txt(0,0,"LEVEL KUAT",GOLD,110)}</g>`;
    $("s3svg").innerHTML=h;}
  // LANGKAH 4: support pecah jadi resistance
  if(scene("s4",S(15)-0.02,S(19)-0.02,t)){header("n4",S(15),t);let h=GW;const lv=470;const br=W(16,2)+0.05,flip=W(17,3);
    const col=t>=flip?RED:GOLD;const lab=t>=flip?"RESISTANCE":"SUPPORT";
    h+=`<line x1="0" x2="900" y1="${lv}" y2="${lv}" stroke="${col}" stroke-width="7" filter="url(#gw)"/>`;
    const ls=t>=flip?2-back((t-flip)/0.25):1;h+=`<g transform="translate(880 ${lv-20}) scale(${ls})">${txt(0,0,lab,col,52,"end")}</g>`;
    const pl=poly(S4P,t);h+=line(pl,t>=br?RED:INK,8);
    h+=ring(290,lv,br,t,RED,220,0.6,14)+burst(290,lv,br,t,22,RED,340,9,0.9);
    if(t>=br&&t<br+1.2)h+=txt(290,lv+120,"PECAH!",RED,80,"middle",1-cl((t-br-0.8)/0.4));
    if(t>=W(17,3)+0.2){const q=ease((t-W(17,3)-0.2)/0.4);h+=`<line x1="520" y1="${lv+30}" x2="520" y2="${lv+30+140*q}" stroke="${RED}" stroke-width="12" stroke-linecap="round"/><path d="M490 ${lv+30+140*q} L520 ${lv+80+140*q} L550 ${lv+30+140*q} Z" fill="${RED}"/>`+txt(690,lv+130,"RETEST",RED,56,"middle",q)}
    if(t>=S(18)){const s=back((t-S(18))/0.25);h+=`<g transform="translate(450 760) scale(${2-s})"><rect x="-330" y="-62" width="660" height="100" rx="20" fill="rgba(5,8,15,.8)" stroke="${GOLD}" stroke-width="5"/>${txt(0,8,"SEBALIKNYA PUN SAMA",GOLD,60)}</g>`}
    $("s4svg").innerHTML=h;}
  // JUNAM KE H4/H1
  if(scene("dv",S(19)-0.02,S(20)-0.02,t)){let h=GW;const z=eio((t-S(19))/0.6);
    h+=`<g transform="translate(450 470) scale(${lerp(0.4,1,z)}) translate(-450 -470)"><rect x="0" y="380" width="900" height="180" fill="url(#zg)" stroke="${GOLD}" stroke-width="5"/>${txt(20,370,"ZON DAILY",GOLD,44,"start")}</g>`;
    [["H4",W(19,5),280],["H1",W(19,7),620]].forEach(([l,a,x])=>{if(t<a)return;const s=back((t-a)/0.25);h+=`<g transform="translate(${x} 200) scale(${2-s})"><rect x="-110" y="-70" width="220" height="140" rx="26" fill="${GOLD}"/>${txt(0,40,l,"#0F1B33",110)}</g>`+ring(x,200,a,t,GOLD,220,0.6,12)});
    const sa=W(19,9);if(t>=sa){let x=120,y=420;for(let i=0;i<8;i++){const a=sa+i*0.1;if(t<a)break;const up=i>=6;const o=y,c=up?y-70:y+30;h+=`<rect x="${x}" y="${Math.min(o,c)}" width="44" height="${Math.abs(c-o)}" rx="6" fill="${up?GOLD:RED}"/><line x1="${x+22}" x2="${x+22}" y1="${Math.min(o,c)-14}" y2="${Math.max(o,c)+14}" stroke="${up?GOLD:RED}" stroke-width="5"/>`;x+=90;y=up?c:c-6}
      h+=txt(450,760,"CARI SETUP DI ZON",GOLD,84,"middle",ease((t-sa-0.5)/0.3))}
    $("dvsvg").innerHTML=h;}
  // OUTRO
  if(scene("fin",S(20)-0.02,99,t)){show("o0",S(20),t,"pop");$("o0").querySelector(".sw").style.left=`${lerp(-30,130,((t-S(20))*0.7)%1.4)}%`;
    for(let i=0;i<5;i++)show("st"+i,S(20)+0.15+i*0.12,t);const sg=$("sig");show(sg,S(21),t,"pop");shine(sg.firstElementChild,t,0.8);}
  // CAPTION
  let html="";
  for(let i=5;i<=19;i++){if([8,11,15].includes(i))continue;const ph=P[i];if(t<ph.start||t>=ph.end+0.15)continue;
    const ws=ph.words;let ci=0;ws.forEach((w,j)=>{if(t>=w[1])ci=j});const c0=Math.floor(ci/3)*3;
    for(let j=c0;j<Math.min(ws.length,c0+3);j++){if(t<ws[j][1])break;const s=back((t-ws[j][1])/0.18);
      html+=`<span class="${j===ci?"on":""}" style="transform:scale(${1.35-0.35*s})">${ws[j][0].replace(/[,?.]/g,"")}</span>`}}
  $("cap").innerHTML=html;
}
window.build=build;window.render=render;
