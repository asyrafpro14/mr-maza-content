// ===== enjin generik siri indicator =====
const CY="#7FD3FF",PU="#C59BFF";
const GW=`<defs><filter id="gw" filterUnits="userSpaceOnUse" x="-300" y="-300" width="1500" height="1500"><feGaussianBlur stdDeviation="7" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>`;
// siri harga dari segmen [panjang, drift, noise]
function seg(list,seed,start=100){const c=[];let v=start,i=0;list.forEach(([n,d,z])=>{for(let j=0;j<n;j++){v+=d+(rnd(i*7.31+seed)-0.5)*2*z;c.push(v);i++}});return ohlc(c,seed)}
function ohlc(c,seed){const n=c.length,o=[],h=[],l=[];for(let i=0;i<n;i++){const op=i?c[i-1]:c[0];o.push(op);const w=Math.abs(c[i]-op),wk=Math.max(0.35,w*0.45);h.push(Math.max(op,c[i])+(0.1+rnd(i+seed*3))*wk);l.push(Math.min(op,c[i])-(0.1+rnd(i*2+seed))*wk)}return{c,o,h,l,n}}
function sma(a,n){return a.map((_,i)=>i<n-1||a[i]==null?null:a.slice(i-n+1,i+1).reduce((x,y)=>x+y)/n)}
function ema(a,n){const k=2/(n+1);let e=null;return a.map(v=>{if(v==null)return null;e=e==null?v:v*k+e*(1-k);return e})}
function rsi(c,n=14){const r=[null];let ag=0,al=0;for(let i=1;i<c.length;i++){const d=c[i]-c[i-1],g=Math.max(d,0),l=Math.max(-d,0);
  if(i<=n){ag+=g/n;al+=l/n;r.push(i<n?null:100-100/(1+ag/(al||1e-9)))}else{ag=(ag*(n-1)+g)/n;al=(al*(n-1)+l)/n;r.push(100-100/(1+ag/(al||1e-9)))}}return r}
function macd(c,f=12,s=26,g=9){const a=ema(c,f),b=ema(c,s),m=a.map((v,i)=>v-b[i]),sg=ema(m,g);return{m,sg,h:m.map((v,i)=>v-sg[i]),fast:a,slow:b}}
function stoch(D,n=14,sk=3,sd=3){const raw=D.c.map((v,i)=>{if(i<n-1)return null;let hh=-1e9,ll=1e9;for(let j=i-n+1;j<=i;j++){hh=Math.max(hh,D.h[j]);ll=Math.min(ll,D.l[j])}return (v-ll)/(hh-ll||1)*100});
  const k=sma(raw,sk),d=sma(k,sd);return{k,d,raw}}
function prog(t,a,b,n){return n*cl((t-a)/(b-a))}
// panel harga
function chart(D,k,opt={}){const b=opt.b??D.n,a=opt.a??b-46,H=opt.H??500,y0=opt.y0??0,Wd=900,cw=Wd/(b-a);const L=opt.lines||[];
  let mn=1e9,mx=-1e9;for(let i=a;i<b;i++){mn=Math.min(mn,D.l[i]);mx=Math.max(mx,D.h[i]);if(opt.fit!==false)L.forEach(q=>{const v=q.arr[i];if(v!=null&&!q.nofit){mn=Math.min(mn,v);mx=Math.max(mx,v)}});(opt.extra||[]).forEach(v=>{mn=Math.min(mn,v);mx=Math.max(mx,v)})}
  const pad=(mx-mn)*0.07;mn-=pad;mx+=pad;const Y=v=>y0+H-(v-mn)/(mx-mn)*H,X=i=>(i-a+0.5)*cw;
  const kk=Math.min(Math.max(k,0),b-a),full=Math.floor(kk),fr=kk-full,last=a+full;let g="";
  const upto=opt.linesFull?b-1:Math.min(b-1,last);
  L.forEach(q=>{let p=[];for(let i=a;i<=upto;i++){if(q.arr[i]==null)continue;p.push(`${X(i).toFixed(1)},${Y(q.arr[i]).toFixed(1)}`)}const n=Math.max(0,Math.floor(p.length*(q.p??1)));if(n>1)
    g+=`<polyline points="${p.slice(0,n).join(" ")}" fill="none" stroke="${q.col}" stroke-width="${q.w||5}" ${q.dash?`stroke-dasharray="${q.dash}"`:""} stroke-linejoin="round" stroke-linecap="round" ${q.glow?'filter="url(#gw)"':''} opacity="${q.op??1}"/>`});
  if(!opt.noCandles)for(let i=a;i<=Math.min(last,b-1);i++){const live=i===last;if(live&&fr<=0)break;const o=D.o[i],c=live?lerp(o,D.c[i],fr):D.c[i];
    const hi=live?lerp(Math.max(o,c),D.h[i],fr):D.h[i],lo=live?lerp(Math.min(o,c),D.l[i],fr):D.l[i];const col=c>=o?GOLD:RED,x=X(i);
    g+=`<line x1="${x}" x2="${x}" y1="${Y(hi)}" y2="${Y(lo)}" stroke="${col}" stroke-width="3"/><rect x="${x-cw*0.32}" y="${Math.min(Y(o),Y(c))}" width="${cw*0.64}" height="${Math.max(2,Math.abs(Y(o)-Y(c)))}" rx="2" fill="${col}"/>`}
  const li=Math.min(last,b-1),hc=last<b?lerp(D.o[last],D.c[last],fr):D.c[b-1];
  return{svg:g,X,Y,last,cw,a,b,head:[X(li),Y(hc)],mn,mx}}
// panel oscillator (kongsi X dengan chart)
function osc(C,k,opt){const H=opt.H??260,y0=opt.y0??600,[mn,mx]=opt.range||auto(opt,C);const Y=v=>y0+H-(v-mn)/(mx-mn)*H;let g="";
  g+=`<rect x="0" y="${y0}" width="900" height="${H}" rx="14" fill="rgba(5,8,15,.55)" stroke="rgba(255,255,255,.12)" stroke-width="2"/>`;
  (opt.zones||[]).forEach(z=>{g+=`<rect x="0" y="${Y(z[1])}" width="900" height="${Y(z[0])-Y(z[1])}" fill="${z[2]}" opacity="${z[3]??0.14}"/>`});
  (opt.levels||[]).forEach(l=>{g+=`<line x1="0" x2="900" y1="${Y(l.v)}" y2="${Y(l.v)}" stroke="${l.col||MUTE}" stroke-width="${l.w||2}" stroke-dasharray="${l.dash||'8 8'}" ${l.glow?'filter="url(#gw)"':''}/>`+(l.label?txt(892,Y(l.v)-8,l.label,l.col||MUTE,l.size||30,"end"):"")});
  const last=Math.min(C.last,C.b-1),upto=opt.full?C.b-1:last;
  if(opt.hist){const hw=C.cw*0.6;for(let i=C.a;i<=upto;i++){const v=opt.hist[i];if(v==null)continue;const y=Y(v),z=Y(0);const col=opt.histCol?opt.histCol(i,v):(v>=0?GOLD:RED);g+=`<rect x="${C.X(i)-hw/2}" y="${Math.min(y,z)}" width="${hw}" height="${Math.max(1,Math.abs(y-z))}" fill="${col}" opacity="${opt.histOp??0.75}"/>`}}
  (opt.lines||[]).forEach(q=>{let p=[];for(let i=C.a;i<=upto;i++){if(q.arr[i]==null)continue;p.push(`${C.X(i).toFixed(1)},${Y(cl(q.arr[i],mn,mx)).toFixed(1)}`)}if(p.length>1)
    g+=`<polyline points="${p.join(" ")}" fill="none" stroke="${q.col}" stroke-width="${q.w||5}" ${q.dash?`stroke-dasharray="${q.dash}"`:""} stroke-linejoin="round" ${q.glow?'filter="url(#gw)"':''}/>`});
  if(opt.title)g+=txt(16,y0+42,opt.title,opt.titleCol||INK,34,"start");
  return{svg:g,Y}}
function auto(opt,C){let mn=1e9,mx=-1e9;[...(opt.lines||[]).map(q=>q.arr),opt.hist].forEach(a=>{if(!a)return;for(let i=C.a;i<C.b;i++){if(a[i]==null)continue;mn=Math.min(mn,a[i]);mx=Math.max(mx,a[i])}});const p=(mx-mn)*0.12;return[mn-p,mx+p]}
// komponen grafik
function chip(x,y,s,col,fg,size,sc=1,rot=0){const w=s.length*size*0.5+60;return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${sc})"><rect x="${-w/2}" y="${-size*0.75}" width="${w}" height="${size*1.3}" rx="${size*0.3}" fill="${col}"/>${txt(0,size*0.3,s,fg,size)}</g>`}
function popc(x,y,s,col,fg,size,t0,t,rot=0){return t<t0?"":chip(x,y,s,col,fg,size,2-back((t-t0)/0.25),rot)}
function arrow(x,y,dir,len,col,q=1,w=10){const e=y+dir*len*q;return `<line x1="${x}" y1="${y}" x2="${x}" y2="${e}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/><path d="M${x-w*2.2} ${e} L${x} ${e+dir*w*3} L${x+w*2.2} ${e} Z" fill="${col}"/>`}
function cross(x,y,r,t0,t){if(t<t0)return"";const q=ease((t-t0)/0.2);return `<line x1="${x-r}" y1="${y-r}" x2="${lerp(x-r,x+r,q)}" y2="${lerp(y-r,y+r,q)}" stroke="#fff" stroke-width="12" stroke-linecap="round"/><line x1="${x+r}" y1="${y-r}" x2="${lerp(x+r,x-r,q)}" y2="${lerp(y-r,y+r,q)}" stroke="#fff" stroke-width="12" stroke-linecap="round"/>`}
function seg2(x1,y1,x2,y2,col,t0,t,w=7,dur=0.35){if(t<t0)return"";const q=ease((t-t0)/dur);return `<line x1="${x1}" y1="${y1}" x2="${lerp(x1,x2,q)}" y2="${lerp(y1,y2,q)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round" filter="url(#gw)"/>`}
function dot(x,y,col,t0,t,r=11){return t<t0?"":`<circle cx="${x}" cy="${y}" r="${r*Math.min(1,back((t-t0)/0.2))}" fill="${col}" filter="url(#gw)"/>`+ring(x,y,t0,t,col,90,0.5,8)}
function band(y1,y2,col,q,op=0.2){return `<rect x="0" y="${Math.min(y1,y2)}" width="${900*q}" height="${Math.abs(y2-y1)}" fill="${col}" opacity="${op}" stroke="${col}" stroke-width="3"/>`}
// lokasi turning point
function peaks(arr,a,b,w=3,lo=false){const r=[];for(let i=a+w;i<b-w;i++){let ok=true;for(let j=i-w;j<=i+w;j++){if(j===i||arr[j]==null)continue;if(lo?arr[j]<arr[i]:arr[j]>arr[i]){ok=false;break}}if(ok&&arr[i]!=null)r.push(i)}return r}
function tAt(i,C,a0,a1){return a0+(i+1-C.a)/(C.b-C.a)*(a1-a0)}

// ===== rangka video =====
let NI,iSave,iMsg,iFin,X0,MT;
function build(tl){TL=tl;P=tl.p;
  let dh="";for(let i=0;i<46;i++){const s=2+rnd(i)*5;dh+=`<i style="width:${s}px;height:${s}px"></i>`}$("dust").innerHTML=dh;
  iSave=P.findIndex(p=>/^Save video/.test(p.text));NI=["Satu.","Dua.","Tiga.","Empat.","Lima."].map(s=>P.findIndex(p=>p.text===s));
  iMsg=P.findIndex(p=>(V.msgRe||/^(Indicator|Pattern) bukan/).test(p.text));iFin=P.findIndex(p=>p.text==="Save,");
  $("hst").firstElementChild.innerHTML=V.stamp;$("sv3").innerHTML=V.title;if(V.sub)$("sv2").textContent=V.sub;$("o0pt").textContent=V.pill;$("m1").textContent=V.m1||P[iMsg].text.split(" ")[0].toUpperCase();if(V.m2)$("m2").firstElementChild.innerHTML=V.m2;if(V.m3)$("m3").innerHTML=V.m3;if(V.m4)$("m4").innerHTML=V.m4;
  $("steps").innerHTML=V.cheat.map((s,i)=>`<div class="step" id="st${i}"><b>${i+1}</b><span>${s}</span></div>`).join("");
  MT=V.msgTimes?V.msgTimes():[S(iMsg),W(iMsg,1),S(iMsg+1),W(iMsg+1,5)];
  if(V.bg&&!$("bgv")){const h=$("hook");h.insertAdjacentHTML("afterbegin",`<img id="bgv" style="position:absolute;left:0;top:0;width:1080px;height:1920px;object-fit:cover;transform-origin:50% 40%"><div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(5,8,15,.82) 0%,rgba(5,8,15,.15) 30%,rgba(5,8,15,.1) 60%,rgba(5,8,15,.85) 100%)"></div>`)}
  if(V.chapters&&!$("chap")){let f="";NI.forEach((ni,k)=>{const x=S(ni)/tl.total*900;f+=`<g transform="translate(${x} 0)"><path d="M0 -10 V-46 L30 -36 L0 -26" fill="#E0465A" stroke="#E0465A" stroke-width="4"/><text x="0" y="40" fill="#9AA6BF" font-family="Pop" font-weight="700" font-size="24" text-anchor="middle" id="chl${k}">0${k+1}</text></g>`});
    document.body.insertAdjacentHTML("beforeend",`<svg id="chap" viewBox="-20 -60 940 120" style="position:absolute;left:70px;top:1700px;width:940px;height:120px;overflow:visible"><line x1="0" x2="900" y1="0" y2="0" stroke="rgba(154,166,191,.35)" stroke-width="6" stroke-linecap="round"/><line id="chp" x1="0" x2="0" y1="0" y2="0" stroke="#E7CE7C" stroke-width="6" stroke-linecap="round"/>${f}<circle id="chd" r="14" cy="0" fill="#fff"/></svg>`)}
  V.init();const ti=P[iSave+1].words.length-1;
  HITS=[...V.hits(),S(iSave),W(iSave+1,ti),...NI.map(S),MT[0],MT[1],S(iFin)];
  CUTS=[S(iSave),...NI.map(S),S(iMsg),S(iFin)];
  FL=[...V.fl(),[MT[1],"#E0465A",.35],[S(iFin),"#E7CE7C",.25]];
  return tl.total}
function header(id,t0,t){const e=$(id);show(e,t0,t,"pop");shine(e,t,0.9);glitch(e,t,[t0])}
function render(t){let PR=null;
  if(V.bg&&$("bgv")){const fr=Math.min(V.bg.n,1+Math.floor(t*V.bg.fps)),src=`${V.bg.dir}/b${String(fr).padStart(4,"0")}.jpg`,im=$("bgv");if(im.dataset.s!==src){im.dataset.s=src;im.src=src;PR=im.decode().catch(()=>{})}im.style.transform=`scale(${1.04+0.05*cl(t/S(iSave))})`}
  if(V.chapters&&$("chap")){const x=cl(t/TL.total)*900;$("chd").setAttribute("cx",x);$("chp").setAttribute("x2",x);NI.forEach((ni,k)=>{$("chl"+k).setAttribute("fill",t>=S(ni)?"#E7CE7C":"#9AA6BF")});$("chap").style.opacity=t<S(iFin)-0.1?1:0}
  $("prog").firstElementChild.style.width=cl(t/TL.total)*100+"%";
  $("floor").style.backgroundPosition=`0 ${t*90}px`;
  document.querySelectorAll("#dust i").forEach((d,i)=>{const sp=10+rnd(i+5)*30;const x=(rnd(i)*1080+Math.sin(t*0.5+i)*30)%1080,y=((rnd(i+9)*1920-t*sp)%1920+1920)%1920;d.style.transform=`translate(${x}px,${y}px)`;d.style.opacity=0.25+0.5*rnd(i+2)*(0.6+0.4*Math.sin(t*2+i))});
  let punch=0,shake=0;HITS.forEach(h=>{const d=t-h;if(d>=0&&d<0.35){punch=Math.max(punch,(1-d/0.35)*0.06);shake=Math.max(shake,(1-d/0.28)*16)}});
  let blur=0,whip=0;CUTS.forEach(c=>{const d=t-c;if(Math.abs(d)<0.14){const q=1-Math.abs(d)/0.14;blur=Math.max(blur,q*16);whip=d<0?-q*160:q*160}});
  const cam=$("cam");cam.style.transform=`translate(${shake*Math.sin(t*90)+whip}px,${shake*Math.cos(t*77)}px) scale(${1+punch+0.01*Math.sin(t*0.7)})`;cam.style.filter=blur>0.5?`blur(${blur}px)`:"none";
  let fo=0,fc="#E0465A";FL.forEach(([a,c,g])=>{const d=t-a;if(d>=0&&d<0.4&&(1-d/0.4)*g>fo){fo=(1-d/0.4)*g;fc=c}});$("flash").style.opacity=fo;$("flash").style.background=fc;
  let bh="";CUTS.forEach(c=>{const d=t-c;if(d>-0.15&&d<0.25){const p=(d+0.15)/0.4;const x=lerp(-600,1700,ease(p));bh+=`<polygon points="${x},0 ${x+140},0 ${x-560},1920 ${x-700},1920" fill="${GOLD}" opacity="${0.55*(1-Math.abs(p-0.5)*2)}"/>`}});$("bars").innerHTML=bh;
  document.querySelectorAll(".ch").forEach((e,k)=>{e.style.transform=`perspective(1800px) rotateX(${7+2*Math.sin(t*0.6)}deg) rotateY(${-5*Math.sin(t*0.35+k)}deg)`});
  // HOOK
  if(scene("hook",0,S(iSave)-0.02,t)){
    const grp=V.groups.find(g=>t<(g.until==null?1e9:S(g.until)))||V.groups[V.groups.length-1];let wh="";
    grp.p.forEach(pi=>P[pi].words.forEach(([w,a],k)=>{if(t<a)return;const s=back((t-a)/0.2);const red=V.red.some(([x,y])=>x===pi&&y===k);wh+=(wh?" ":"")+`<span class="word ${red?'r':''}" style="transform:scale(${1.6-0.6*s});opacity:${cl((t-a)/0.06)}">${w}</span>`}));$("hw").innerHTML=wh;
    $("hsvg").innerHTML=GW+V.hook(t);const st=$("hst"),stT=V.stampT();show(st,stT,t,"pop");glitch(st.firstElementChild,t,[stT,stT+0.5]);}
  // SAVE
  if(scene("sv",S(iSave)-0.02,S(NI[0])-0.02,t)){show("sv1",S(iSave),t,"pop");$("sv1").querySelector(".sw").style.left=`${lerp(-30,130,cl((t-S(iSave)-0.2)/0.6))}%`;
    show("sv2",S(iSave+1),t,"pop");const s3=$("sv3"),tt=W(iSave+1,P[iSave+1].words.length-1);show(s3,tt,t,"fly");shine(s3,t,0.8);}
  // LANGKAH
  for(let k=0;k<5;k++){const a=S(NI[k]),b=k<4?S(NI[k+1]):MT[0];if(scene("s"+(k+1),a-0.02,b-0.02,t)){header("n"+(k+1),a,t);$("s"+(k+1)+"svg").innerHTML=GW+V.steps[k](t,a,b)}}
  // MESEJ
  if(scene("msg",MT[0]-0.02,S(iFin)-0.02,t)){show("m1",MT[0],t,"pop");glitch($("m1"),t,[MT[0]]);const m2=$("m2");show(m2,MT[1],t,"pop");glitch(m2.firstElementChild,t,[MT[1]]);
    show("m3",MT[2],t);const m4=$("m4");show(m4,MT[3],t,"fly");shine(m4,t,0.8);}
  // OUTRO
  if(scene("fin",S(iFin)-0.02,99,t)){show("o0",S(iFin),t,"pop");$("o0").querySelector(".sw").style.left=`${lerp(-30,130,((t-S(iFin))*0.7)%1.4)}%`;
    for(let i=0;i<5;i++)show("st"+i,S(iFin)+0.15+i*0.12,t);const sg=$("sig");show(sg,S(iFin+1),t,"pop");shine(sg.firstElementChild,t,0.8);show("disc",S(iFin+1)+0.3,t);}
  // CAPTION
  let html="";
  for(let i=NI[0]+1;i<iMsg;i++){if(NI.includes(i))continue;const ph=P[i];if(t<ph.start||t>=ph.end+0.15)continue;
    const ws=ph.words;let ci=0;ws.forEach((w,j)=>{if(t>=w[1])ci=j});const c0=Math.floor(ci/3)*3;
    for(let j=c0;j<Math.min(ws.length,c0+3);j++){if(t<ws[j][1])break;const s=back((t-ws[j][1])/0.18);
      html+=`<span class="${j===ci?"on":""}" style="transform:scale(${1.35-0.35*s})">${ws[j][0].replace(/[,?]/g,"").replace(/\.$/,"")}</span>`}}
  $("cap").innerHTML=html;
  return PR;
}
window.build=build;window.render=render;
