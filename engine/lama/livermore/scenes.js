// ===== KISAH JESSE LIVERMORE =====
const GW=`<defs><filter id="gw" filterUnits="userSpaceOnUse" x="-300" y="-300" width="1600" height="2400"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>`;
const money=v=>"$"+Math.round(v).toLocaleString("en-US");
let GR=[],SEP=[];
function crashSeries(n,seed,start,drift,z){const c=[];let v=start;for(let i=0;i<n;i++){v+=drift(i)+(rnd(i*5.3+seed)-0.5)*2*z;c.push(v)}return c}
function candles(c,x0,w,Y,k,colUp=GOLD,colDn=RED){let g="";const cw=w/c.length;for(let i=0;i<Math.min(k,c.length);i++){const o=i?c[i-1]:c[0],cc=c[i],x=x0+(i+0.5)*cw;const hi=Math.max(o,cc)+0.6,lo=Math.min(o,cc)-0.6;
  g+=`<line x1="${x}" x2="${x}" y1="${Y(hi)}" y2="${Y(lo)}" stroke="${cc>=o?colUp:colDn}" stroke-width="3"/><rect x="${x-cw*0.32}" y="${Math.min(Y(o),Y(cc))}" width="${cw*0.64}" height="${Math.max(2,Math.abs(Y(o)-Y(cc)))}" fill="${cc>=o?colUp:colDn}" rx="2"/>`}return g}
let CR1,CR7,CR29;
function build(tl){TL=tl;P=tl.p;
  let dh="";for(let i=0;i<46;i++){const s=2+rnd(i)*5;dh+=`<i style="width:${s}px;height:${s}px"></i>`}$("dust").innerHTML=dh;
  // grain tiles
  for(let k=0;k<6;k++){const cv=document.createElement("canvas");cv.width=cv.height=256;const x=cv.getContext("2d"),im=x.createImageData(256,256);for(let i=0;i<im.data.length;i+=4){const v=rnd(i*0.37+k*999)*255;im.data[i]=im.data[i+1]=im.data[i+2]=v;im.data[i+3]=255}x.putImageData(im,0,0);GR.push(cv.toDataURL())}
  CR1=crashSeries(40,3,100,i=>i<8?0.2:-1.1,2.6);CR7=crashSeries(36,7,100,i=>i<6?0.1:-1.3,2.6);CR29=crashSeries(46,29,120,i=>i<10?0.5:-1.7,2.8);
  HITS=[W(0,2),W(0,5),S(1),W(2,1),S(3),W(3,3),S(4),S(6),W(7,4),W(7,6),S(9),W(10,2),S(11),S(12),S(13),S(14),W(15,6),S(16),S(17),W(17,1),S(18),S(19),S(20),S(21),S(22),S(23)];
  FL=[[W(2,1),"#E0465A",.5],[W(3,3),"#E7CE7C",.35],[W(10,2),"#E7CE7C",.35],[S(11),"#E0465A",.3],[S(13),"#E0465A",.3],[W(15,6),"#E7CE7C",.4],[W(17,1),"#E0465A",.5],[S(18),"#FFFFFF",.3],[S(22),"#E7CE7C",.35]];
  CUTS=[S(3),S(4),S(7),S(9),S(11),S(14),S(16),S(18),S(21),S(23)];
  return tl.total}
function stamp(id,t0,t){const e=$(id);show(e,t0,t,"pop");glitch(e.firstElementChild,t,[t0,t0+0.45])}
function shatter(cx,cy,t0,t,n=26,col="#fff"){if(t<t0||t>t0+1.4)return"";const d=t-t0;let g="";for(let i=0;i<n;i++){const a=rnd(i+3)*6.283,sp=200+rnd(i+7)*700,x=cx+Math.cos(a)*sp*d,y=cy+Math.sin(a)*sp*d+500*d*d,s=10+rnd(i+11)*34,r=d*400*(rnd(i)-0.5);
  g+=`<polygon points="0,${-s} ${s*0.8},${s*0.6} ${-s*0.7},${s*0.4}" fill="${col}" opacity="${0.75*(1-d/1.4)}" transform="translate(${x} ${y}) rotate(${r})"/>`}return g}
function yearRoll(id,from,to,t0,t1,t){const p=ease(cl((t-t0)/(t1-t0)));$(id).textContent=String(Math.round(lerp(from,to,p)))}
function render(t){
  $("prog").firstElementChild.style.width=cl(t/TL.total)*100+"%";
  $("floor").style.backgroundPosition=`0 ${t*90}px`;
  document.querySelectorAll("#dust i").forEach((d,i)=>{const sp=10+rnd(i+5)*30;const x=(rnd(i)*1080+Math.sin(t*0.5+i)*30)%1080,y=((rnd(i+9)*1920-t*sp)%1920+1920)%1920;d.style.transform=`translate(${x}px,${y}px)`;d.style.opacity=0.25+0.5*rnd(i+2)*(0.6+0.4*Math.sin(t*2+i))});
  let punch=0,shake=0;HITS.forEach(h=>{const d=t-h;if(d>=0&&d<0.35){punch=Math.max(punch,(1-d/0.35)*0.06);shake=Math.max(shake,(1-d/0.28)*16)}});
  [W(2,1),W(17,1)].forEach(h=>{const d=t-h;if(d>=0&&d<0.6)shake=Math.max(shake,(1-d/0.6)*34)});
  let blur=0,whip=0;CUTS.forEach(c=>{const d=t-c;if(Math.abs(d)<0.14){const q=1-Math.abs(d)/0.14;blur=Math.max(blur,q*16);whip=d<0?-q*160:q*160}});
  const cam=$("cam");cam.style.transform=`translate(${shake*Math.sin(t*90)+whip}px,${shake*Math.cos(t*77)}px) scale(${1+punch+0.012*Math.sin(t*0.7)})`;cam.style.filter=blur>0.5?`blur(${blur}px)`:"none";
  let fo=0,fc="#E0465A";FL.forEach(([a,c,g])=>{const d=t-a;if(d>=0&&d<0.4&&(1-d/0.4)*g>fo){fo=(1-d/0.4)*g;fc=c}});$("flash").style.opacity=fo;$("flash").style.background=fc;
  let bh="";CUTS.forEach(c=>{const d=t-c;if(d>-0.15&&d<0.25){const p=(d+0.15)/0.4;const x=lerp(-600,1700,ease(p));bh+=`<polygon points="${x},0 ${x+140},0 ${x-560},1920 ${x-700},1920" fill="${GOLD}" opacity="${0.55*(1-Math.abs(p-0.5)*2)}"/>`}});$("bars").innerHTML=bh;
  // grain + sepia untuk era lama
  const g=$("grain");g.style.backgroundImage=`url(${GR[Math.floor(t*24)%6]})`;const old=t>=S(4)-0.1&&t<S(14)-0.1;g.style.opacity=old?0.11:0.06;
  $("world").style.filter=old?"sepia(.55) saturate(.8) contrast(1.05)":(t>=W(17,1)&&t<S(18)?"saturate(.3)":"none");
  $("lifesvg").innerHTML="";
  // ===== HOOK =====
  if(scene("hook",0,S(3)-0.02,t)){show("h1",0,t,"pop");const hc=$("hc");show(hc,0.05,t,"pop");
    const up=ease(cl((t-0.1)/(E(0)-0.1))),crash=W(2,1);let v=t<crash?1e8*up:1e8*(1-ease(cl((t-crash)/0.5)));hc.textContent=money(v);hc.className=t<crash?"c A shine":"c A";hc.style.color=t<crash?"":"var(--red)";if(t<crash)shine(hc,t,0.9);
    show("h2",W(0,5),t);const h5=$("h5");show(h5,S(1),t,"pop");glitch(h5,t,[S(1)]);
    let h=GW;const k=prog2(t,0,E(0),40);const Y=v=>10+(104-v)*8.5;h+=`<g opacity="${t<S(1)?0.9:0.35}">`+candles(CR1,0,900,Y,k)+`</g>`;
    if(t>=S(1)&&t<crash){for(let i=0;i<12;i++){const ph=((t-S(1))*3+i/12)%1;h+=`<rect x="${120+i*55}" y="${60+ph*260}" width="40" height="54" rx="6" fill="#fff" opacity="${0.5*(1-ph)}"/>`}}
    h+=shatter(450,-250,crash,t,34);$("hsvg").innerHTML=h;stamp("hst",crash,t);}
  // ===== TAJUK =====
  if(scene("ttl",S(3)-0.02,S(4)-0.02,t)){show("t0",S(3),t,"pop");$("t0").querySelector(".sw").style.left=`${lerp(-30,130,cl((t-S(3))/0.8))}%`;
    const t1=$("t1");show(t1,W(3,2),t,"fly");shine(t1,t,1.2);glitch(t1,t,[W(3,3)]);t1.style.letterSpacing=`${lerp(40,0,ease(cl((t-W(3,2))/0.8)))}px`;show("t2",W(3,3)+0.2,t);show("t3",W(3,3)+0.4,t,"pop");}
  // ===== 1891 UMUR 14 =====
  if(scene("a1",S(4)-0.02,S(7)-0.02,t)){show("a1y",S(4),t,"pop");const aa=$("a1a");show(aa,W(4,1),t,"pop");glitch(aa,t,[W(4,1)]);let h=GW;
    // papan harga
    const q=ease(cl((t-S(5))/0.4));h+=`<g opacity="${q}"><rect x="0" y="0" width="900" height="460" rx="18" fill="#141a14" stroke="#6b5a33" stroke-width="14"/>`;
    const tick=["RAIL","SUGAR","STEEL","COPPER","GAS","TOBACCO"];tick.forEach((s,i)=>{const r=Math.floor(i/2),c=i%2,x=40+c*430,y=90+r*130;const at=S(5)+0.3+i*0.22;if(t<at)return;const p=cl((t-at)/0.35);
      h+=`<text x="${x}" y="${y}" font-family="Anton" font-size="52" fill="#e8e4d4" opacity=".9">${s}</text>`;const num=(40+rnd(i)*120).toFixed(2);const shown=num.slice(0,Math.ceil(num.length*p));h+=`<text x="${x+380}" y="${y}" font-family="Anton" font-size="52" fill="${rnd(i+4)>0.5?"#9fe0a0":"#f0a0a0"}" text-anchor="end">${shown}</text>`;
      if(p<1)h+=`<circle cx="${x+380-(num.length-shown.length)*24}" cy="${y-20}" r="10" fill="#fff" filter="url(#gw)"/>`});h+=`</g>`;
    if(t>=S(5))h+=`<text x="450" y="520" font-family="Pop" font-weight="600" font-size="40" fill="${INK}" text-anchor="middle" opacity="${q}">Budak tulis harga di PaineWebber</text>`;
    if(t>=S(6)){const s=2-back((t-S(6))/0.3);h+=`<g transform="translate(450 640) scale(${s})"><circle cx="-250" cy="0" r="62" fill="${GOLD}"/>${txt(-250,24,"$","#0F1B33",80)}${txt(40,30,"$5 / MINGGU",GOLD,96)}</g>`}
    $("a1svg").innerHTML=h;}
  // ===== BUCKET SHOP =====
  if(scene("a2",S(7)-0.02,S(9)-0.02,t)){show("a2y",S(7),t,"pop");show("a2a",W(7,2),t,"pop");show("a2b",W(7,3),t);let h=GW;
    for(let i=0;i<3;i++){const x=150+i*300,y=230;const at=S(7)+0.2+i*0.15;if(t<at)continue;const p=back(cl((t-at)/0.3));
      h+=`<g transform="translate(${x} ${y}) scale(${p})"><rect x="-120" y="-150" width="240" height="300" rx="10" fill="#2a2016" stroke="#8a6d3b" stroke-width="8"/><rect x="-100" y="-125" width="200" height="60" fill="#8a6d3b"/>${txt(0,-82,"SHOP",INK,40)}<rect x="-70" y="-40" width="140" height="190" fill="#1a130c" stroke="#6b5a33" stroke-width="5"/><circle cx="45" cy="60" r="8" fill="${GOLD}"/></g>`;
      const st=W(7,6)+i*0.25;if(t>=st){const s=2.4-1.4*back(cl((t-st)/0.25));h+=`<g transform="translate(${x} ${y+10}) rotate(-14) scale(${s})" opacity="${cl((t-st)/0.08)}"><rect x="-125" y="-42" width="250" height="84" rx="10" fill="none" stroke="${RED}" stroke-width="8"/>${txt(0,22,"DIHALAU",RED,58)}</g>`+ring(x,y,st,t,RED,160,0.5,10)}}
    if(t>=S(8)){const n=Math.min(9,Math.floor((t-S(8))/0.12)+1);for(let i=0;i<n;i++){const x=110+(i%9)*85;h+=`<g transform="translate(${x} 560) scale(${back(cl((t-S(8)-i*0.12)/0.2))})"><circle r="34" fill="${GOLD}"/><path d="M-15 0 L-4 12 L17 -12" stroke="#0F1B33" stroke-width="8" fill="none" stroke-linecap="round"/></g>`}
      h+=txt(450,690,"ASYIK MENANG",GOLD,90,"middle",ease(cl((t-W(8,1))/0.3)))}
    $("a2svg").innerHTML=h;}
  // ===== 1907 =====
  if(scene("a3",S(9)-0.02,S(11)-0.02,t)){const y=$("a3y");show(y,S(9),t,"pop");yearRoll("a3y",1895,1907,S(9),E(9),t);shine(y,t,0.9);let h=GW;
    const Y=v=>20+(104-v)*9,k=prog2(t,S(9),E(10),36);h+=candles(CR7,0,900,Y,k);
    h+=`<g transform="translate(140 50) rotate(-6)" opacity="${ease(cl((t-W(9,1))/0.3))}"><rect x="-110" y="-36" width="220" height="70" rx="8" fill="${RED}"/>${txt(0,18,"PANIC 1907","#fff",44)}</g>`;
    if(t>=S(10)){const v=1e6*ease(cl((t-S(10))/(W(10,4)-S(10))));h+=txt(450,620,money(v),GOLD,130,"middle",1);if(t>=W(10,4))h+=popc2(450,730,"DALAM SEHARI",GOLD,"#0F1B33",64,W(10,4),t)+burst(450,600,W(10,2),t,30,GOLD,420,10,1)}
    $("a3svg").innerHTML=h;}
  // ===== JATUH BANGUN =====
  if(scene("a4",S(11)-0.02,S(14)-0.02,t)){show("a4a",S(11),t,"pop");let h=GW;
    const pts=[[0,700,S(11)-0.3],[200,260,S(11)+0.1],[330,800,W(11,2)],[520,330,W(12,1)],[650,820,W(13,0)]];
    let d="",head=pts[0];for(let i=0;i<pts.length;i++){const [x,y,tt]=pts[i];if(i===0){d=`M${x} ${y}`;continue}const [px,py,pt]=pts[i-1];if(t>=tt){d+=` L${x} ${y}`;head=[x,y]}else{if(t>pt){const p=ease((t-pt)/(tt-pt));head=[lerp(px,x,p),lerp(py,y,p)];d+=` L${head[0]} ${head[1]}`}break}}
    h+=`<line x1="0" x2="960" y1="820" y2="820" stroke="${MUTE}" stroke-width="2" stroke-dasharray="8 10"/>`+txt(950,860,"$0",MUTE,36,"end");
    h+=`<path d="${d}" fill="none" stroke="${GOLD}" stroke-width="12" stroke-linejoin="round" filter="url(#gw)"/><circle cx="${head[0]}" cy="${head[1]}" r="18" fill="#fff" filter="url(#gw)"/>`;
    [[330,800,W(11,2),"BANKRAP 1908"],[650,820,W(13,0),"BANKRAP 1915"]].forEach(([x,y,t0,s])=>{if(t>=t0)h+=ring(x,y,t0,t,RED,200,0.6,14)+shatter(x,y,t0,t,18,RED)+`<g transform="translate(${x} ${y-110}) rotate(-6) scale(${2-back(cl((t-t0)/0.25))})"><rect x="-180" y="-40" width="360" height="80" rx="12" fill="${RED}"/>${txt(0,20,s,"#fff",50)}</g>`});
    if(t>=W(12,1))h+=`<g transform="translate(520 230) scale(${2-back(cl((t-W(12,1))/0.25))})"><rect x="-170" y="-40" width="340" height="80" rx="12" fill="${GOLD}"/>${txt(0,20,"BANGUN BALIK","#0F1B33",50)}</g>`;
    $("a4svg").innerHTML=h;}
  // ===== 1929 =====
  if(scene("a5",S(14)-0.02,S(16)-0.02,t)){const y=$("a5y");show(y,S(14),t,"pop");yearRoll("a5y",1915,1929,S(14),E(14),t);shine(y,t,0.9);let h=GW;
    h+=`<g transform="translate(450 40)" opacity="${ease(cl((t-W(14,2))/0.3))}"><rect x="-420" y="-40" width="840" height="84" fill="#e8e4d4"/>${txt(0,26,"WALL STREET CRASH!","#111",62)}</g>`;
    const Y=v=>110+(132-v)*5.6,k=prog2(t,S(14)+0.3,W(15,6),46);h+=candles(CR29,0,900,Y,k);
    if(t>=W(15,1)){const q=ease(cl((t-W(15,1))/0.4));h+=`<g opacity="${q}">${arrowD(800,140,1,240*q,RED)}</g>`+popc2(680,150,"SHORT",RED,"#fff",60,W(15,1),t)}
    if(t>=W(15,5)){const v=1e8*ease(cl((t-W(15,5))/(E(15)-W(15,5)+0.2)));h+=`<rect x="0" y="560" width="900" height="170" rx="20" fill="rgba(5,8,15,.85)" stroke="${GOLD}" stroke-width="5"/>`+txt(450,690,money(v),GOLD,120,"middle",1)}
    if(t>=W(15,6))h+=burst(450,640,W(15,6),t,40,GOLD,520,12,1.2)+ring(450,640,W(15,6),t,GOLD,400,0.8,16);
    $("a5svg").innerHTML=h;}
  // ===== 1934 =====
  if(scene("a6",S(16)-0.02,S(18)-0.02,t)){const y=$("a6y");show(y,S(16),t,"pop");yearRoll("a6y",1929,1934,S(16),E(16),t);const c=$("a6c");show(c,S(16),t,"pop");const cr=W(17,1);
    const v=t<cr?1e8:1e8*(1-ease(cl((t-cr)/0.6)));c.textContent=money(v);c.className=t<cr?"c A shine":"c A";c.style.color=t<cr?"":"var(--red)";if(t<cr)shine(c,t,0.9);
    let h=GW+shatter(450,-60,cr,t,40);$("a6svg").innerHTML=h;stamp("a6st",cr,t);}
  // ===== KENAPA =====
  if(scene("why",S(18)-0.02,S(21)-0.02,t)){const w0=$("w0");show(w0,S(18),t,"pop");glitch(w0,t,[S(18),S(18)+0.3]);let h=GW;
    if(t>=S(19)){const q=ease(cl((t-S(19))/0.25)),nd=lerp(-80,75,ease(cl((t-S(19)-0.2)/0.6)))+Math.sin(t*40)*3*(t>S(19)+0.8?1:0);
      h+=`<g transform="translate(240 230) scale(${q})"><path d="M-170 0 A170 170 0 0 1 170 0" fill="none" stroke="${GOLD}" stroke-width="30"/><path d="M60 -159 A170 170 0 0 1 170 0" fill="none" stroke="${RED}" stroke-width="30" filter="url(#gw)"/><line x1="0" y1="0" x2="${150*Math.sin(nd*Math.PI/180)}" y2="${-150*Math.cos(nd*Math.PI/180)}" stroke="#fff" stroke-width="12" stroke-linecap="round"/><circle r="22" fill="#fff"/>${txt(0,90,"LEVERAGE",INK,64)}${txt(0,160,"MELAMPAU",RED,64)}</g>`}
    if(t>=S(20)){const q=ease(cl((t-S(20))/0.25));let d="M0 0";const sp=(t-S(20));for(let i=0;i<=60;i++){const x=i*6;const ph=(i/60*3+sp*2)%1;const y=ph>0.42&&ph<0.5?-120*Math.sin((ph-0.42)/0.08*Math.PI):ph>0.5&&ph<0.56?60*Math.sin((ph-0.5)/0.06*Math.PI):0;d+=` L${x} ${y}`}
      h+=`<g transform="translate(500 230) scale(${q})"><path d="${d}" fill="none" stroke="${RED}" stroke-width="8" filter="url(#gw)"/>${txt(180,160,"EMOSI",RED,90)}</g>`}
    $("wsvg").innerHTML=h;}
  // ===== PENGAJARAN =====
  if(scene("les",S(21)-0.02,S(23)-0.02,t)){show("l0",S(21),t,"pop");const l1=$("l1");show(l1,S(22),t,"pop");shine(l1,t,0.8);glitch(l1,t,[S(22)]);show("l2",W(22,1),t,"pop");}
  // ===== OUTRO =====
  if(scene("fin",S(23)-0.02,99,t)){show("f0",S(23),t,"pop");$("f0").querySelector(".sw").style.left=`${lerp(-30,130,((t-S(23))*0.7)%1.4)}%`;show("f1",S(23)+0.2,t,"pop");const sg=$("sig");show(sg,W(23,1),t,"pop");shine(sg.firstElementChild,t,0.8);show("disc",W(23,1)+0.4,t);}
  // CAPTION
  let html="";for(const i of [5,6,7,8,9,10,11,12,13,14,15,16,17]){const ph=P[i];if(t<ph.start||t>=ph.end+0.15)continue;const ws=ph.words;let ci=0;ws.forEach((w,j)=>{if(t>=w[1])ci=j});const c0=Math.floor(ci/3)*3;
    for(let j=c0;j<Math.min(ws.length,c0+3);j++){if(t<ws[j][1])break;const s=back((t-ws[j][1])/0.18);html+=`<span class="${j===ci?"on":""}" style="transform:scale(${1.35-0.35*s})">${ws[j][0].replace(/[,?]/g,"").replace(/\.$/,"")}</span>`}}
  $("cap").innerHTML=html;
}
function prog2(t,a,b,n){return n*cl((t-a)/(b-a))}
function popc2(x,y,s,col,fg,size,t0,t){if(t<t0)return"";const w=s.length*size*0.5+60,sc=2-back((t-t0)/0.25);return `<g transform="translate(${x} ${y}) scale(${sc})"><rect x="${-w/2}" y="${-size*0.75}" width="${w}" height="${size*1.3}" rx="${size*0.3}" fill="${col}"/>${txt(0,size*0.3,s,fg,size)}</g>`}
function arrowD(x,y,dir,len,col){const e=y+dir*len;return `<line x1="${x}" y1="${y}" x2="${x}" y2="${e}" stroke="${col}" stroke-width="14" stroke-linecap="round"/><path d="M${x-30} ${e} L${x} ${e+dir*40} L${x+30} ${e} Z" fill="${col}"/>`}
window.build=build;window.render=render;
