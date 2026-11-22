// VIDEO 20: FIBO EXPANSION (sasaran keluar)
function wv5(n,f,seed,z=0.5){const c=[];for(let i=0;i<n;i++)c.push(f(i)+(rnd(i*7.31+seed)-0.5)*2*z);return ohlc(c,seed)}
// titik swing A (mula), B (hujung), C (hujung tarikan balik); level = C + r*(B-A)
const FA={i:5,v:100},FB={i:16,v:110},FC={i:24,v:104.5};
const FR=[1,1.272,1.618],FX=r=>FC.v+r*(FB.v-FA.v),FRT=r=>FB.v-r*(FB.v-FA.v);
function fpath(pts,seed,z,n){const c=[];let k=0;for(let i=0;i<n;i++){while(k<pts.length-2&&i>pts[k+1][0])k++;const [i0,v0]=pts[k],[i1,v1]=pts[k+1];c.push(lerp(v0,v1,cl((i-i0)/((i1-i0)||1)))+(rnd(i*7.31+seed)-0.5)*2*z)}return ohlc(c,seed)}
let F5;
function flev(C,v,col,lab,q,t0,t,x0=0){if(t<t0)return"";const p=ease((t-t0)/0.5);const y=C.Y(v);return `<g opacity="${q}"><line x1="${x0}" x2="${lerp(x0,900,p)}" y1="${y}" y2="${y}" stroke="${col}" stroke-width="4" stroke-dasharray="14 8"/></g>`+txt(892,y-10,lab,col,34,"end",p*q)}
const V={stamp:"TERLEPAS!",title:"FIBO<br>EXPANSION",sub:"Cara betul guna",pill:"FIBO EXPANSION CARA BETUL",
 cta:true,q:"KOMEN: YA / TAK",msgRe:/^Fibo bukan/,m1:"FIBO",m3:"Ia peta keluar dalam",m4:"STORY CHART",
 msgTimes:()=>[S(iMsg),W(iMsg,1),S(iMsg+1),W(iMsg+1,4)],
 cheat:["Retracement ukur tarikan balik, expansion unjur ke depan","Perlu 3 titik: mula swing, hujung swing, hujung tarikan","Level dipantau: 100%, 127.2%, 161.8%","Level ialah zon, bukan garisan tepat. Tengok reaksi candle","Sasaran keluar ditetapkan SEBELUM masuk"],
 groups:[{p:[0,1],until:2},{p:[2]}],red:[[1,1],[1,3],[2,6]],
 stampT:()=>W(2,5),
 init(){F5=fpath([[0,101.5],[FA.i,FA.v],[FB.i,FB.v],[FC.i,FC.v],[31,FX(1)],[34,FX(1)-1.4],[40,FX(1.272)+0.3],[45,FX(1.618)-0.2]],4,0.45,46);
  // pastikan titik swing tepat
  F5.l[FA.i]=FA.v-0.2;F5.h[FB.i]=FB.v+0.2;F5.l[FC.i]=FC.v-0.2;
  // reaksi di 127.2: ekor atas
  F5.h[36]=FX(1.272)+0.6},
 hits:()=>[W(0,2),W(1,1),W(1,3),W(2,5),S(6),S(7),W(9,2),S(10),S(11),S(12),W(14,6),S(15),W(16,1),S(18),S(19),W(20,1),S(22),S(23)],
 fl:()=>[[W(1,3),"#E0465A",.3],[W(2,5),"#E0465A",.35],[W(16,1),"#E7CE7C",.3],[S(23),"#E0465A",.25]],
 hook(t){const D=F5,cT=W(1,3),eT=W(2,5);const k=t<cT?10+prog(t,0,cT,18):28+prog(t,cT+0.1,eT,18);
  const C=chart(D,k,{a:0,b:46,H:640,y0:120,extra:[FX(1.618)+1]});let h="";
  const ci=26,cy=C.Y(D.c[ci]);
  if(t>=W(0,2)&&C.last>=20)h+=popc(C.X(19),C.Y(D.h[16])-80,"UNTUNG",GOLD,"#0F1B33",48,W(0,2),t);
  if(t>=cT&&C.last>=ci){h+=`<line x1="${C.X(ci)}" x2="900" y1="${cy}" y2="${cy}" stroke="${RED}" stroke-width="4" stroke-dasharray="12 8"/>`+dot(C.X(ci),cy,RED,cT,t,12)+popc(C.X(ci),cy+90,"TUTUP",RED,"#fff",52,cT,t)}
  h+=C.svg;
  if(t>=S(2)&&C.last>=34){const yt=C.Y(D.h[45]);h+=`<line x1="${C.X(ci)}" x2="${C.X(ci)}" y1="${cy}" y2="${Math.max(yt,C.head[1])}" stroke="${GOLD}" stroke-width="6" stroke-dasharray="10 8"/>`+popc(620,C.head[1]-70,"HARGA SAMBUNG NAIK",GOLD,"#0F1B33",44,S(2),t)}
  return h},
 steps:[
  (t,a,b)=>{const D=F5,k=prog(t,a,a+0.8,FC.i+2),ex=t>=S(7);const C=chart(D,k,{a:0,b:ex?46:28,H:640,y0:170,extra:ex?[FX(1.618)+0.5]:[]});let h=C.svg;
   const xA=C.X(FA.i),xB=C.X(FB.i);
   if(t>=W(6,1)){[0.382,0.5,0.618].forEach((r,i)=>{h+=flev(C,FRT(r),CY,(r*100).toFixed(1)+"%",1,W(6,1)+i*0.12,t,xA)});}
   if(t>=S(7)){FR.forEach((r,i)=>{h+=flev(C,FX(r),GOLD,(r*100).toFixed(1)+"%",1,W(7,1)+i*0.15,t,C.X(FC.i))});
    const q=ease((t-W(7,3))/0.6);if(t>=W(7,3))h+=`<g opacity="${q}">`+arrow(C.X(FC.i)+60,C.Y(FC.v),-1,(C.Y(FC.v)-C.Y(FX(1.618)))*q,GOLD,1,8)+`</g>`+popc(450,40,"EXPANSION: UNJURAN",GOLD,"#0F1B33",54,W(7,1),t)}
   else h+=popc(450,40,"RETRACEMENT: TARIKAN BALIK",CY,"#0F1B33",48,a,t);
   return h},
  (t,a,b)=>{const D=F5,k=prog(t,a,S(12),FC.i+2);const C=chart(D,k,{a:0,b:28,H:640,y0:170});let h=C.svg;
   const pts=[[FA,"A","MULA SWING",S(10),1],[FB,"B","HUJUNG SWING",S(11),-1],[FC,"C","HUJUNG TARIKAN",S(12),1]];
   pts.forEach(([p,l,s,t0,d],i)=>{if(t<t0)return;const x=C.X(p.i),y=C.Y(p.v);h+=dot(x,y,GOLD,t0,t,16)+txt(x,y+d*60+(d>0?20:0),l,GOLD,60,"middle",ease((t-t0)/0.3))+popc(i===0?x+200:i===1?Math.min(720,x+220):Math.min(760,Math.max(140,x)),i===0?y+70:i===1?y:y+d*150,s,INK,"#0F1B33",38,t0+0.1,t);
    if(i>0){const q=pts[i-1][0];h+=seg2(C.X(q.i),C.Y(q.v),x,y,GOLD,t0,t,5)}});
   h+=popc(450,40,"3 TITIK",GOLD,"#0F1B33",60,W(9,2),t);return h},
  (t,a,b)=>{const D=F5,a1=E(16),k=prog(t,a,a1,46);const C=chart(D,k,{a:0,b:46,H:640,y0:170,extra:[FX(1.618)+0.5]});let h="";
   const T=[W(14,6),S(15),W(16,1)];FR.forEach((r,i)=>{h+=flev(C,FX(r),i===2?GOLD:i===1?CY:INK,(r*100).toFixed(1)+"%",1,T[i],t,C.X(FC.i))});
   h+=C.svg;[FA,FB,FC].forEach((p,i)=>{h+=`<circle cx="${C.X(p.i)}" cy="${C.Y(p.v)}" r="10" fill="${GOLD}"/>`+txt(C.X(p.i),C.Y(p.v)+(i===1?-26:52),"ABC"[i],GOLD,40)});
   h+=popc(450,40,"LEVEL DIPANTAU",GOLD,"#0F1B33",56,a,t);
   h+=`<g opacity="${ease((t-a)/0.4)}"><rect x="20" y="770" width="860" height="80" rx="18" fill="rgba(5,8,15,.8)" stroke="${MUTE}" stroke-width="3"/>${txt(450,825,"LEVEL = C + % x (B - A)",INK,40)}</g>`;
   return h},
  (t,a,b)=>{const D=F5,lv=FX(1.272);const C=chart(D,46,{a:28,b:44,H:640,y0:170});let h="";const yl=C.Y(lv);
   h+=`<line x1="0" x2="900" y1="${yl}" y2="${yl}" stroke="${INK}" stroke-width="3" stroke-dasharray="10 8" opacity="${t<S(19)?1:0.35}"/>`+txt(10,yl-12,"127.2%",INK,34,"start");
   if(t>=S(18)){const q=ease((t-S(18))/0.5);h+=band(yl-55,yl+55,GOLD,q,0.2)+popc(160,yl+110,"ZON",GOLD,"#0F1B33",52,W(18,1),t)}
   if(t>=S(19))h+=popc(700,yl+220,"BUKAN GARISAN",RED,"#fff",44,S(19),t);
   h+=C.svg;
   if(t>=W(20,1)){const x=C.X(36),y=C.Y(D.h[36]);h+=ring(x,y,W(20,1),t,GOLD,140,0.6,10)+`<circle cx="${x}" cy="${y}" r="44" fill="none" stroke="${GOLD}" stroke-width="6" filter="url(#gw)"/>`+popc(x,y-80,"REAKSI CANDLE",GOLD,"#0F1B33",46,W(20,1),t)}
   return h},
  (t,a,b)=>{let h="";const st=[["PLAN",80,GOLD],["MASUK",340,CY],["KELUAR",600,GOLD]];
   st.forEach(([s,x,col],i)=>{const t0=a+0.1+i*0.15;if(t<t0)return;const q=back((t-t0)/0.3);h+=`<g transform="translate(${x+110} 260) scale(${q})"><rect x="-110" y="-60" width="220" height="120" rx="22" fill="rgba(5,8,15,.8)" stroke="${col}" stroke-width="6"/>${txt(0,20,s,col,52)}</g>`;if(i<2)h+=arrow(x+225,260,1,0,MUTE,1,4)+`<line x1="${x+225}" x2="${x+255}" y1="260" y2="260" stroke="${MUTE}" stroke-width="6"/>`});
   if(t>=W(22,1)){const q=back((t-W(22,1))/0.35);h+=`<g transform="translate(190 450) scale(${q})"><rect x="-160" y="-60" width="320" height="120" rx="22" fill="${GOLD}"/>${txt(0,22,"SASARAN","#0F1B33",56)}</g>`+arrow(190,390,-1,40,GOLD,ease((t-W(22,1))/0.3),8)+popc(560,450,"SEBELUM MASUK",GOLD,"#0F1B33",50,W(22,3),t)}
   if(t>=S(23)){const t0=S(23);let pts="";for(let i=0;i<=40;i++){const x=80+i*18,y=690-Math.abs(Math.sin(i*0.9))*60*(1+i/20);pts+=`${x},${y} `}const q=ease((t-t0)/0.6);h+=`<polyline points="${pts}" fill="none" stroke="${RED}" stroke-width="6" stroke-dasharray="${1000*q} 2000"/>`+popc(450,790,"BILA EMOSI NAIK",RED,"#fff",52,W(23,2),t)+cross(450,620,80,W(23,3),t)}
   return h}
 ]};
