// ===== enjin chart + Bollinger Band sebenar (SMA20 ± 2SD) =====
const CY="#7FD3FF";
const GW=`<defs><filter id="gw" filterUnits="userSpaceOnUse" x="-300" y="-300" width="1500" height="1500"><feGaussianBlur stdDeviation="7" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>`;
function mkSeries(n,f,seed){const c=[];let v=100;for(let i=0;i<n;i++){v=f(i,v,(rnd(i*7.3+seed)-0.5));c.push(v)}
  const o=[],h=[],l=[];for(let i=0;i<n;i++){const op=i?c[i-1]:c[0];o.push(op);const w=Math.abs(c[i]-op);h.push(Math.max(op,c[i])+(0.15+rnd(i+seed*3))*Math.max(0.6,w*0.5));l.push(Math.min(op,c[i])-(0.15+rnd(i*2+seed))*Math.max(0.6,w*0.5))}
  const mid=[],up=[],lo=[];for(let i=0;i<n;i++){if(i<19){mid.push(null);up.push(null);lo.push(null);continue}
    const s=c.slice(i-19,i+1),m=s.reduce((a,b)=>a+b)/20,sd=Math.sqrt(s.reduce((a,b)=>a+(b-m)*(b-m),0)/20);mid.push(m);up.push(m+2*sd);lo.push(m-2*sd)}
  return{c,o,h,l,mid,up,lo,n}}
// vis: indeks mula; k: berapa candle kelihatan (pecahan); H: tinggi; opt: bands(0..1), mid(0..1 lukis)
function chart(S,k,t,opt={}){const a=opt.a??20,b=opt.b??S.n,H=opt.H??700,Wd=900,cw=Wd/(b-a);
  let mn=1e9,mx=-1e9;for(let i=a;i<b;i++){mn=Math.min(mn,S.l[i],S.lo[i]??1e9);mx=Math.max(mx,S.h[i],S.up[i]??-1e9)}
  const pad=(mx-mn)*0.08;mn-=pad;mx+=pad;const Y=v=>H-(v-mn)/(mx-mn)*H,X=i=>(i-a+0.5)*cw;
  const kk=Math.min(k,b-a),full=Math.floor(kk),fr=kk-full,last=a+full;let g="";
  const bs=opt.bands??1,ms=opt.mid??1;
  const pts=(arr,mul)=>{let p=[];for(let i=a;i<Math.min(b,last+1);i++){if(arr[i]==null)continue;const m=S.mid[i];const v=m+(arr[i]-m)*mul;p.push([X(i),Y(v)])}return p};
  if(bs>0){const U=pts(S.up,bs),L=pts(S.lo,bs);if(U.length>1){g+=`<polygon points="${U.map(p=>p.join(",")).join(" ")} ${L.reverse().map(p=>p.join(",")).join(" ")}" fill="${CY}" opacity="${0.09*cl(bs)}"/>`;
    const Ud=U.map(p=>p.join(",")).join(" "),Ld=pts(S.lo,bs).map(p=>p.join(",")).join(" ");
    g+=`<polyline points="${Ud}" fill="none" stroke="${opt.upCol||CY}" stroke-width="${opt.upW||5}" ${opt.upGlow?'filter="url(#gw)"':''} stroke-linejoin="round"/><polyline points="${Ld}" fill="none" stroke="${CY}" stroke-width="5" stroke-linejoin="round"/>`}}
  if(ms>0){const M=pts(S.mid,1);const nM=Math.max(2,Math.floor(M.length*ms));const Md=M.slice(0,nM).map(p=>p.join(",")).join(" ");
    g+=`<polyline points="${Md}" fill="none" stroke="${opt.midCol||INK}" stroke-width="${opt.midW||4}" stroke-dasharray="14 10" stroke-linejoin="round" ${opt.midGlow?'filter="url(#gw)"':''}/>`}
  for(let i=a;i<=Math.min(last,b-1);i++){const live=i===last;if(live&&fr<=0)break;const o=S.o[i],c=live?lerp(o,S.c[i],fr):S.c[i];
    const hi=live?lerp(Math.max(o,c),S.h[i],fr):S.h[i],lo=live?lerp(Math.min(o,c),S.l[i],fr):S.l[i];const up=c>=o,col=up?GOLD:RED,x=X(i);
    g+=`<line x1="${x}" x2="${x}" y1="${Y(hi)}" y2="${Y(lo)}" stroke="${col}" stroke-width="3"/><rect x="${x-cw*0.32}" y="${Math.min(Y(o),Y(c))}" width="${cw*0.64}" height="${Math.max(2,Math.abs(Y(o)-Y(c)))}" rx="2" fill="${col}"/>`}
  const hx=last<b?X(Math.min(last,b-1)):X(b-1),hc=last<b?lerp(S.o[last],S.c[last],fr):S.c[b-1];
  return{svg:g,X,Y,head:[hx,Y(hc)],last,cw}}
function tilt(el,t,base=0){el.style.transform=`perspective(1800px) rotateX(${8+2*Math.sin(t*0.6)}deg) rotateY(${-6*Math.sin(t*0.35+base)}deg)`}
function prog(t,a,b,n){return n*cl((t-a)/(b-a))}
let HS,S1,S2,S3,S4,S5,SELLI,SQ0,SQ1;
function build(tl){TL=tl;P=tl.p;
  let dh="";for(let i=0;i<46;i++){const s=2+rnd(i)*5;dh+=`<i style="width:${s}px;height:${s}px"></i>`}$("dust").innerHTML=dh;
  // hook: trend naik kuat, tunggang band atas
  HS=mkSeries(66,(i,v,r)=>i<20?v+r*1.2:v+0.9+r*1.4,3);SELLI=20+30;
  S1=mkSeries(64,(i,v,r)=>100+6*Math.sin(i/6)+3*Math.sin(i/2.3+1)+r*2,5);
  // squeeze: julat biasa > julat ketat > breakout
  SQ0=20+14;SQ1=20+30;S2=mkSeries(64,(i,v,r)=>i<SQ0?100+5*Math.sin(i/2.5)+r*3:i<SQ1?100+r*0.8+0.4*Math.sin(i):v+2.2+r*1.2,11);
  S3=mkSeries(62,(i,v,r)=>i<20?100+r:v+1.3+r*1.0,17);
  S4=mkSeries(64,(i,v,r)=>100+0.7*i+5*Math.sin(i/2.6)+r*1.2,23);
  S5=mkSeries(64,(i,v,r)=>100+8*Math.sin(i/3.4)+r*1.6,29);
  HITS=[W(0,1),W(1,2),W(2,4),S(3),W(4,4),S(5),S(9),S(11),S(13),S(14),S(17),W(18,2),S(19),S(23),W(25,3),W(26,1),S(27),S(28)];
  FL=[[W(2,4),"#E0465A",.45],[S(11),"#7FD3FF",.25],[S(13),"#E7CE7C",.35],[W(18,2),"#E0465A",.3],[W(26,1),"#E0465A",.35],[S(28),"#E7CE7C",.25]];
  CUTS=[S(3),S(5),S(9),S(14),S(19),S(23),S(26),S(28)];
  return tl.total}
function header(id,t0,t){const e=$(id);show(e,t0,t,"pop");shine(e,t,0.9);glitch(e,t,[t0])}
function chip(x,y,s,col,fg,size,sc=1){const w=s.length*size*0.5+60;return `<g transform="translate(${x} ${y}) scale(${sc})"><rect x="${-w/2}" y="${-size*0.75}" width="${w}" height="${size*1.3}" rx="${size*0.3}" fill="${col}"/>${txt(0,size*0.3,s,fg,size)}</g>`}
function arrow(x,y,dir,len,col,q){const e=y+dir*len*q;return `<line x1="${x}" y1="${y}" x2="${x}" y2="${e}" stroke="${col}" stroke-width="10" stroke-linecap="round"/><path d="M${x-22} ${e} L${x} ${e+dir*30} L${x+22} ${e} Z" fill="${col}"/>`}
function render(t){
  $("prog").firstElementChild.style.width=cl(t/TL.total)*100+"%";
  $("floor").style.backgroundPosition=`0 ${t*90}px`;
  document.querySelectorAll("#dust i").forEach((d,i)=>{const sp=10+rnd(i+5)*30;const x=(rnd(i)*1080+Math.sin(t*0.5+i)*30)%1080,y=((rnd(i+9)*1920-t*sp)%1920+1920)%1920;d.style.transform=`translate(${x}px,${y}px)`;d.style.opacity=0.25+0.5*rnd(i+2)*(0.6+0.4*Math.sin(t*2+i))});
  let punch=0,shake=0;HITS.forEach(h=>{const d=t-h;if(d>=0&&d<0.35){punch=Math.max(punch,(1-d/0.35)*0.06);shake=Math.max(shake,(1-d/0.28)*16)}});
  let blur=0,whip=0;CUTS.forEach(c=>{const d=t-c;if(Math.abs(d)<0.14){const q=1-Math.abs(d)/0.14;blur=Math.max(blur,q*16);whip=d<0?-q*160:q*160}});
  const cam=$("cam");cam.style.transform=`translate(${shake*Math.sin(t*90)+whip}px,${shake*Math.cos(t*77)}px) scale(${1+punch+0.01*Math.sin(t*0.7)})`;cam.style.filter=blur>0.5?`blur(${blur}px)`:"none";
  let fo=0,fc="#E0465A";FL.forEach(([a,c,g])=>{const d=t-a;if(d>=0&&d<0.4&&(1-d/0.4)*g>fo){fo=(1-d/0.4)*g;fc=c}});$("flash").style.opacity=fo;$("flash").style.background=fc;
  let bh="";CUTS.forEach(c=>{const d=t-c;if(d>-0.15&&d<0.25){const p=(d+0.15)/0.4;const x=lerp(-600,1700,ease(p));bh+=`<polygon points="${x},0 ${x+140},0 ${x-560},1920 ${x-700},1920" fill="${GOLD}" opacity="${0.55*(1-Math.abs(p-0.5)*2)}"/>`}});$("bars").innerHTML=bh;
  document.querySelectorAll(".ch").forEach((e,k)=>tilt(e,t,k));
  // ===== HOOK =====
  if(scene("hook",0,S(3)-0.02,t)){
    const grp=t<S(2)?[0,1]:[2];let wh="";grp.forEach(pi=>P[pi].words.forEach(([w,a],k)=>{if(t<a)return;const s=back((t-a)/0.2);const red=(pi===1&&k===2)||(pi===2&&k>=3);wh+=(wh?" ":"")+`<span class="word ${red?'r':''}" style="transform:scale(${1.6-0.6*s});opacity:${cl((t-a)/0.06)}">${w}</span>`}));$("hw").innerHTML=wh;
    const sellT=W(1,2),burnT=W(2,4);const k=t<sellT?prog(t,0,sellT,SELLI-20+1):SELLI-20+1+prog(t,sellT+0.15,burnT,HS.n-SELLI-1);
    const C=chart(HS,k,t,{H:700,upGlow:true,upCol:CY});let h=GW+C.svg;
    const ti=W(0,1)+0.2,tx=C.X(SELLI),ty=C.Y(HS.up[SELLI]);
    if(t>=ti)h+=ring(tx,ty,ti,t,CY,140,0.6,10);
    if(t>=sellT){const ey=C.Y(HS.c[SELLI]);h+=`<line x1="${tx}" x2="900" y1="${ey}" y2="${ey}" stroke="${RED}" stroke-width="4" stroke-dasharray="12 8"/>`;
      const press=t<sellT+0.12?0.85:back((t-sellT-0.12)/0.2)*0.15+0.85;h+=chip(tx-40,ey+90,"SELL",RED,"#fff",64,t<sellT+0.3?(2-back((t-sellT)/0.25))*press/0.85*0.85+0.15:1);
      const pips=Math.max(0,Math.round((C.head[1]<ey?(ey-C.head[1]):0)*1.9));if(t>sellT+0.4)h+=chip(720,60,`-${pips} PIPS`,"rgba(224,70,90,.25)",RED,58)}
    if(t>=burnT){h+=burst(C.head[0],C.head[1],burnT,t,26,RED,380,10,1);h+=`<rect x="-90" y="-60" width="1080" height="820" fill="${RED}" opacity="${0.18*cl((t-burnT)/0.2)}"/>`}
    $("hsvg").innerHTML=h;const st=$("hst");show(st,burnT,t,"pop");glitch(st.firstElementChild,t,[burnT,burnT+0.5]);}
  // ===== SAVE =====
  if(scene("sv",S(3)-0.02,S(5)-0.02,t)){show("sv1",S(3),t,"pop");$("sv1").querySelector(".sw").style.left=`${lerp(-30,130,cl((t-S(3)-0.2)/0.6))}%`;
    show("sv2",S(4),t,"pop");const s3=$("sv3");show(s3,W(4,4),t,"fly");shine(s3,t,0.8);
    // logo band kecil beralun
    let h="";if(t>=W(4,4)){const q=ease((t-W(4,4))/0.5);let u="",m="",l="";for(let i=0;i<=60;i++){const x=i*15,y=130+30*Math.sin(i/6+t*2),w=40+25*Math.sin(i/9+t);if(x>900*q)break;u+=`${x},${y-w} `;m+=`${x},${y} `;l+=`${x},${y+w} `}
      h=`<polyline points="${u}" fill="none" stroke="${CY}" stroke-width="5"/><polyline points="${m}" fill="none" stroke="${INK}" stroke-width="4" stroke-dasharray="12 9"/><polyline points="${l}" fill="none" stroke="${CY}" stroke-width="5"/>`}$("svsvg").innerHTML=h;}
  // ===== 01 SETTING =====
  if(scene("s1",S(5)-0.02,S(9)-0.02,t)){header("n1",S(5),t);
    const k=prog(t,S(5),W(6,0)+0.3,S1.n-20),mid=cl((t-W(6,0))/1.4),bs=t<S(7)?0:back((t-S(7))/0.6);
    const C=chart(S1,k,t,{H:640,bands:bs,mid:t<W(6,0)?0:mid,midGlow:true,midW:6});let h=GW+C.svg;const lx=C.X(S1.n-1);
    if(t>=W(6,3))h+=chip(160,40,"MA 20",INK,"#0F1B33",56,2-back((t-W(6,3))/0.25));
    if(t>=S(8)){const s=2-back((t-S(8))/0.25);h+=chip(780,C.Y(S1.up[S1.n-1])-60,"+2 SD",CY,"#0F1B33",48,s)+chip(780,C.Y(S1.lo[S1.n-1])+70,"-2 SD",CY,"#0F1B33",48,s)}
    if(t>=W(8,1)){const s=2-back((t-W(8,1))/0.3);h+=`<g transform="translate(450 735) scale(${s})"><rect x="-430" y="-62" width="860" height="124" rx="22" fill="rgba(5,8,15,.85)" stroke="${GOLD}" stroke-width="4"/>${txt(0,-8,"BAND = MA 20 ± 2 SD",GOLD,52)}${txt(0,44,"SETTING DEFAULT MT4 / MT5",MUTE,30)}</g>`}
    $("s1svg").innerHTML=h;}
  // ===== 02 SQUEEZE =====
  if(scene("s2",S(9)-0.02,S(14)-0.02,t)){header("n2",S(9),t);
    const kS=SQ1-20,k=t<S(13)?prog(t,S(9),W(10,2)+0.2,kS):kS+prog(t,S(13),E(13),S2.n-SQ1);
    const C=chart(S2,k,t,{H:640});let h=GW+C.svg;
    if(t>=W(10,2)){const q=ease((t-W(10,2))/0.4);const xa=C.X(SQ0+6),xb=C.X(SQ1-1),yu=C.Y(S2.up[SQ1-1]),yl=C.Y(S2.lo[SQ1-1]);
      h+=`<rect x="${xa}" y="${yu-10}" width="${xb-xa}" height="${yl-yu+20}" fill="none" stroke="${GOLD}" stroke-width="4" stroke-dasharray="10 8" opacity="${q}"/>`;
      const cx=(xa+xb)/2;h+=arrow(cx,yu-150,1,90*q,GOLD,1)+arrow(cx,yl+150,-1,90*q,GOLD,1)}
    if(t>=S(11)){const cx=(C.X(SQ0+6)+C.X(SQ1-1))/2;h+=`<g transform="translate(${cx} 80) scale(${2-back((t-S(11))/0.25)})"><rect x="-200" y="-60" width="400" height="104" rx="22" fill="${CY}"/>${txt(0,22,"SQUEEZE","#0F1B33",76)}</g>`+ring(cx,C.Y(S2.mid[SQ1-1]),S(11),t,CY,220,0.6,12)}
    if(t>=S(12)&&t<S(13)+0.3){const q=cl((t-S(12))/(S(13)-S(12)));const cx=(C.X(SQ0+6)+C.X(SQ1-1))/2,cy=C.Y(S2.mid[SQ1-1]);
      for(let r=0;r<3;r++){const ph=((t*1.8+r/3)%1);h+=`<circle cx="${cx}" cy="${cy}" r="${200*(1-ph)}" fill="none" stroke="${GOLD}" stroke-width="${3+5*ph}" opacity="${ph*0.8}"/>`}
      h+=`<rect x="250" y="720" width="400" height="34" rx="17" fill="rgba(255,255,255,.1)"/><rect x="250" y="720" width="${400*q}" height="34" rx="17" fill="${GOLD}" filter="url(#gw)"/>`+txt(450,700,"KUMPUL TENAGA",GOLD,44)}
    if(t>=S(13)){h+=burst(C.X(SQ1),C.Y(S2.c[SQ1-1]),S(13),t,30,GOLD,420,11,1);if(t>=W(13,1))h+=chip(450,720,"PERGERAKAN BESAR",GOLD,"#0F1B33",58,2-back((t-W(13,1))/0.25))}
    $("s2svg").innerHTML=h;}
  // ===== 03 BAND WALK =====
  if(scene("s3",S(14)-0.02,S(19)-0.02,t)){header("n3",S(14),t);
    const k=prog(t,S(14)+0.2,E(16),S3.n-20);const glow=t>=S(16);const C=chart(S3,k,t,{H:640,upGlow:glow,upCol:glow?GOLD:CY,upW:glow?8:5});let h=GW+C.svg;
    if(glow)for(let i=20;i<=Math.min(C.last,S3.n-1);i++){if(S3.h[i]>=S3.up[i]-0.4){const a=S(16)+(i-20)/(S3.n-20)*(E(16)-S(16));h+=`<circle cx="${C.X(i)}" cy="${C.Y(S3.up[i])}" r="9" fill="${GOLD}" filter="url(#gw)" opacity="${cl((t-a)/0.1)}"/>`}}
    if(t>=S(17))h+=`<g transform="translate(280 120) rotate(-8) scale(${2-back((t-S(17))/0.25)})"><rect x="-230" y="-66" width="460" height="112" rx="22" fill="${GOLD}"/>${txt(0,26,"BAND WALK","#0F1B33",86)}</g>`;
    if(t>=S(18)){const sc=2-back((t-S(18))/0.25);h+=chip(640,720,"SIGNAL SELL",RED,"#fff",60,sc);
      if(t>=W(18,2)){const q=ease((t-W(18,2))/0.2);h+=`<line x1="430" y1="660" x2="${lerp(430,850,q)}" y2="${lerp(660,780,q)}" stroke="#fff" stroke-width="12" stroke-linecap="round"/><line x1="850" y1="660" x2="${lerp(850,430,q)}" y2="${lerp(660,780,q)}" stroke="#fff" stroke-width="12" stroke-linecap="round"/>`}}
    $("s3svg").innerHTML=h;}
  // ===== 04 PULLBACK KE TENGAH =====
  if(scene("s4",S(19)-0.02,S(23)-0.02,t)){header("n4",S(19),t);
    const a0=S(20),a1=E(21);const k=prog(t,a0,a1,S4.n-20);const C=chart(S4,k,t,{H:640,midGlow:true,midCol:GOLD,midW:6});let h=GW+C.svg;
    let lastTouch=-9;for(let i=22;i<S4.n-1;i++){if(i>C.last)break;if(S4.l[i]<=S4.mid[i]+1.5&&S4.l[i]<=Math.min(S4.l[i-1],S4.l[i-2],S4.l[i+1],S4.l[i+2]??1e9)&&i-lastTouch>4){lastTouch=i;
        const at=a0+(i+1-20)/(S4.n-20)*(a1-a0),x=C.X(i),y=C.Y(S4.mid[i]);if(t<at)continue;h+=ring(x,y,at,t,GOLD,120,0.5,10);
        const q=ease((t-at)/0.3);h+=`<g opacity="${q}"><path d="M${x} ${y+30} l22 22 l-22 22 l-22 -22 Z" fill="${GOLD}"/>${t>=S(22)?txt(x,y+125,"ENTRY",GOLD,40):""}</g>`}}
    if(t>=S(22))h+=chip(450,60,"ENTRY IKUT TREND",GOLD,"#0F1B33",64,2-back((t-S(22))/0.25));
    $("s4svg").innerHTML=h;}
  // ===== 05 SIDEWAYS + ZON =====
  if(scene("s5",S(23)-0.02,S(26)-0.02,t)){header("n5",S(23),t);
    const a0=S(24),a1=E(25)-0.3;const k=prog(t,a0,a1,S5.n-20);const C=chart(S5,k,t,{H:640});let h=GW;
    const zt=W(25,3);let zq=t>=zt?ease((t-zt)/0.4):0;let hi=-1e9,lo=1e9;for(let i=20;i<S5.n;i++){hi=Math.max(hi,S5.h[i]);lo=Math.min(lo,S5.l[i])}
    if(zq>0){const y1=C.Y(hi),y2=C.Y(lo);h+=`<rect x="0" y="${y1-24}" width="${900*zq}" height="70" fill="${RED}" opacity=".22" stroke="${RED}" stroke-width="3"/><rect x="0" y="${y2-46}" width="${900*zq}" height="70" fill="${GOLD}" opacity=".22" stroke="${GOLD}" stroke-width="3"/>`+txt(890,y1-140,"RESISTANCE TF BESAR",RED,38,"end",zq)+txt(890,y2+170,"SUPPORT TF BESAR",GOLD,38,"end",zq)}
    h+=C.svg;
    if(zq>0){let lt=-9;for(let i=21;i<S5.n-1;i++){if(i>C.last)break;const top=S5.h[i]>=hi-3.5&&S5.h[i]>=S5.h[i-1]&&S5.h[i]>=S5.h[i+1],bot=S5.l[i]<=lo+3.5&&S5.l[i]<=S5.l[i-1]&&S5.l[i]<=S5.l[i+1];
        if(!top&&!bot)continue;if(i-lt<4)continue;lt=i;const at=Math.max(zt+0.3,a0+(i+1-20)/(S5.n-20)*(a1-a0));if(t<at)continue;const x=C.X(i),y=top?C.Y(S5.h[i])-30:C.Y(S5.l[i])+30;
        h+=ring(x,y,at,t,top?RED:GOLD,110,0.5,9)+`<g opacity="${ease((t-at)/0.25)}">`+(top?arrow(x,y-110,1,40,RED,1):arrow(x,y+110,-1,40,GOLD,1))+`</g>`}}
    if(t>=W(24,6))h+=chip(170,-30,"SIDEWAYS",CY,"#0F1B33",64,2-back((t-W(24,6))/0.25));
    $("s5svg").innerHTML=h;}
  // ===== MESEJ =====
  if(scene("msg",S(26)-0.02,S(28)-0.02,t)){show("m1",S(26),t,"pop");glitch($("m1"),t,[S(26)]);const m2=$("m2");show(m2,W(26,1),t,"pop");glitch(m2.firstElementChild,t,[W(26,1)]);
    show("m3",S(27),t);const m4=$("m4");show(m4,W(27,5),t,"fly");shine(m4,t,0.8);}
  // ===== OUTRO =====
  if(scene("fin",S(28)-0.02,99,t)){show("o0",S(28),t,"pop");$("o0").querySelector(".sw").style.left=`${lerp(-30,130,((t-S(28))*0.7)%1.4)}%`;
    for(let i=0;i<5;i++)show("st"+i,S(28)+0.15+i*0.12,t);const sg=$("sig");show(sg,S(29),t,"pop");shine(sg.firstElementChild,t,0.8);show("disc",S(29)+0.3,t);}
  // ===== CAPTION =====
  let html="";
  for(const i of [6,7,8,10,11,12,13,15,16,17,18,20,21,22,24,25]){const ph=P[i];if(t<ph.start||t>=ph.end+0.15)continue;
    const ws=ph.words;let ci=0;ws.forEach((w,j)=>{if(t>=w[1])ci=j});const c0=Math.floor(ci/3)*3;
    for(let j=c0;j<Math.min(ws.length,c0+3);j++){if(t<ws[j][1])break;const s=back((t-ws[j][1])/0.18);
      html+=`<span class="${j===ci?"on":""}" style="transform:scale(${1.35-0.35*s})">${ws[j][0].replace(/[,?]/g,"").replace(/\.$/,"")}</span>`}}
  $("cap").innerHTML=html;
}
window.build=build;window.render=render;
