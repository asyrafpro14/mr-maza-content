// VIDEO 10: MARKET STRUCTURE
// zz: harga dari titik swing [idx,harga] + noise kecil
function zz(pts,seed,z=0.35){const n=pts[pts.length-1][0]+1,c=[];for(let i=0;i<n;i++){let k=0;while(k<pts.length-2&&i>pts[k+1][0])k++;const [x0,y0]=pts[k],[x1,y1]=pts[k+1];const p=(i-x0)/(x1-x0||1);c.push(y0+(y1-y0)*p+(rnd(i*7.31+seed)-0.5)*2*z)}return ohlc(c,seed)}
function pw(t,K){if(t<=K[0][0])return K[0][1];for(let i=1;i<K.length;i++)if(t<K[i][0]){const p=(t-K[i-1][0])/(K[i][0]-K[i-1][0]);return lerp(K[i-1][1],K[i][1],p)}return K[K.length-1][1]}
function lab(C,D,i,s,col,fg,t0,t,hi){const y=hi?C.Y(D.h[i])-50:C.Y(D.l[i])+70;return popc(C.X(i),y,s,col,fg,40,t0,t)}
let H10,U10,D10,N10,B10,F10,T10,M10;
const UP=[[0,100],[6,106],[10,103],[17,110],[22,107],[29,114],[34,111],[41,118],[45,116.5]];
const DN=UP.map(([i,v])=>[i,218-v]);
const V={stamp:"STRUKTUR?",title:"MARKET<br>STRUCTURE",sub:"Cara betul baca",pill:"MARKET STRUCTURE CARA BETUL",
 cheat:["Uptrend: HH & HL. Downtrend: LH & LL","Tanda swing jelas sahaja, bukan setiap candle kecil","BOS: tutup lepas high terakhir = trend masih sihat","Gagal buat HL & pecah low terakhir = amaran awal","Baca struktur TF besar dulu, baru TF kecil"],
 groups:[{p:[0,1,2,3],until:4},{p:[4,5]}],red:[[1,1],[3,1],[5,3]],
 stampT:()=>W(5,3),
 init(){
  H10=zz([[0,100],[8,104],[14,108],[22,100.5],[30,106],[38,103],[45,104.5]],3,0.45);
  U10=zz(UP,5);D10=zz(DN,7);
  N10=zz([[0,100],[9,107],[16,102],[27,110],[35,104.5],[45,112]],9,1.1);
  B10=zz([[0,100],[7,105],[12,102.5],[20,108],[26,105],[32,110],[37,107.5],[45,114]],11,0.35);
  F10=zz([[0,100],[7,107],[12,103],[20,111],[26,106.5],[32,109],[40,101],[45,102]],13,0.35);
  T10=zz([[0,100],[10,108],[16,105],[28,114],[34,111],[45,119]],15,0.6);
  M10=zz([[0,110],[14,104],[22,107],[30,103.5],[45,113]],17,0.4)},
 hits:()=>[S(1),S(3),W(5,3),W(9,3),W(10,3),S(12),W(13,1),S(15),S(17),W(19,8),S(20),S(22),S(23)],
 fl:()=>[[W(5,3),"#E0465A",.4],[S(20),"#E0465A",.3],[S(15),"#E7CE7C",.25]],
 hook(t){const D=H10,K=[[0,0],[W(0,1),15],[S(2),23],[S(4),33],[W(5,3),46]],k=pw(t,K);const C=chart(D,k,{a:0,b:46,H:620,y0:120});let h=C.svg;
  const bi=14,si=22;if(t>=S(0)){const y=C.Y(D.c[bi]);h+=`<line x1="${C.X(bi)}" x2="${C.X(si)}" y1="${y}" y2="${y}" stroke="${GOLD}" stroke-width="4" stroke-dasharray="10 8" opacity=".7"/>`+popc(C.X(bi),C.Y(D.h[bi])-60,"BUY",GOLD,"#0F1B33",54,S(0),t)}
  if(t>=S(1))h+=burst(C.X(si),C.Y(D.l[si]),S(1),t,18,RED,300,9,0.9)+popc(C.X(si)+20,C.Y(D.l[si])+80,"JATUH",RED,"#fff",48,S(1),t);
  if(t>=S(2)){const y=C.Y(D.c[si]);h+=popc(C.X(si)+40,C.Y(D.l[si])+170,"SELL",RED,"#fff",54,S(2),t)}
  if(t>=S(3))h+=burst(C.X(30),C.Y(D.h[30]),S(3),t,18,GOLD,300,9,0.9)+popc(C.X(30),C.Y(D.h[30])-70,"NAIK",GOLD,"#0F1B33",48,S(3),t);
  return h},
 steps:[
  (t,a,b)=>{const up=t<S(10);const D=up?U10:D10,a0=up?a:S(10),a1=up?E(9):E(10),k=prog(t,a0,a1,46);const C=chart(D,k,{a:0,b:46,H:700,y0:120});const col=up?GOLD:RED,fg=up?"#0F1B33":"#fff";
   const pts=up?UP:DN;let p="";pts.forEach(([i])=>{const at=tAt(i,C,a0,a1);if(t<at)return;const hi=(up?[6,17,29,41]:[10,22,34]).includes(i);p+=`${C.X(i)},${C.Y(hi?D.h[i]:D.l[i])} `});
   let h=`<polyline points="${p}" fill="none" stroke="${col}" stroke-width="4" opacity=".55" stroke-dasharray="10 8"/>`+C.svg;
   const tH=up?W(9,2):W(10,2),tL=up?W(9,5):W(10,5);
   [6,17,29,41].forEach((i,n)=>{const at=Math.max(tAt(i,C,a0,a1),tH);if(up)h+=lab(C,D,i,n?"HH":"H",col,fg,at,t,true);else h+=lab(C,D,i,n?"LL":"L",col,fg,at,t,false)});
   [10,22,34].forEach(i=>{const at=Math.max(tAt(i,C,a0,a1),tL);if(up)h+=lab(C,D,i,"HL",col,fg,at,t,false);else h+=lab(C,D,i,"LH",col,fg,at,t,true)});
   h+=popc(450,30,up?"UPTREND":"DOWNTREND",col,fg,64,a0+0.1,t);return h},
  (t,a,b)=>{const D=N10,k=prog(t,a,E(12),46);const C=chart(D,k,{a:0,b:46,H:700,y0:120});let h=C.svg;
   if(t>=S(13)){peaks(D.h,0,46,1).forEach((i,n)=>{h+=dot(C.X(i),C.Y(D.h[i])-18,RED,S(13)+n*0.04,t,7)});peaks(D.l,0,46,1,true).forEach((i,n)=>{h+=dot(C.X(i),C.Y(D.l[i])+18,RED,S(13)+n*0.04,t,7)})}
   const maj=[[9,1],[16,0],[27,1],[35,0]];maj.forEach(([i,hi],n)=>{const t0=W(12,2)+n*0.15;if(t<t0)return;const y=hi?C.Y(D.h[i])-30:C.Y(D.l[i])+30;h+=ring(C.X(i),y,t0,t,GOLD,90,0.5,8)+`<circle cx="${C.X(i)}" cy="${y}" r="16" fill="${GOLD}" filter="url(#gw)"/>`});
   h+=t<W(13,1)?popc(450,30,"SWING JELAS",GOLD,"#0F1B33",60,W(12,2),t):popc(450,30,"JANGAN TANDA SEMUA",RED,"#fff",54,W(13,1),t);return h},
  (t,a,b)=>{const D=B10,a1=E(16),k=prog(t,a,a1,46);const C=chart(D,k,{a:0,b:46,H:700,y0:120});let h=C.svg;const hi=32,lv=D.h[hi];
   let bi=40;for(let i=hi+2;i<46;i++)if(D.c[i]>lv){bi=i;break}
   const lt=Math.max(tAt(hi,C,a,a1),S(15));if(t>=lt){const y=C.Y(lv),q=ease((t-lt)/0.4);h+=`<line x1="${C.X(hi)}" x2="${lerp(C.X(hi),C.X(bi)+60,q)}" y1="${y}" y2="${y}" stroke="${GOLD}" stroke-width="5" stroke-dasharray="12 8"/>`+txt(C.X(hi)-10,y-16,"HIGH TERAKHIR",MUTE,32,"end",q)}
   const bt=Math.max(tAt(bi,C,a,a1),W(16,3));if(t>=bt)h+=ring(C.X(bi),C.Y(lv),bt,t,GOLD,180,0.6,12)+burst(C.X(bi),C.Y(lv),bt,t,20,GOLD,300,9,0.9)+popc(C.X(bi)-40,C.Y(lv)+90,"BOS",GOLD,"#0F1B33",64,bt,t);
   h+=t<S(17)?popc(450,30,"BREAK OF STRUCTURE",GOLD,"#0F1B33",56,S(15),t):popc(450,30,"TREND MASIH SIHAT",GOLD,"#0F1B33",60,S(17),t);return h},
  (t,a,b)=>{const D=F10,a1=E(19),k=prog(t,a,a1,46);const C=chart(D,k,{a:0,b:46,H:700,y0:120});let h="";const hl=26,lv=D.l[hl];
   if(t>=S(20)){const q=ease((t-S(20))/0.4);h+=`<rect x="0" y="120" width="${900*q}" height="700" fill="${RED}" opacity=".08"/>`}
   h+=C.svg;[[7,1,"H"],[12,0,"HL"],[20,1,"HH"],[26,0,"HL"]].forEach(([i,u,s])=>{h+=lab(C,D,i,s,GOLD,"#0F1B33",tAt(i,C,a,a1),t,u)});
   const lt=tAt(32,C,a,a1);h+=lab(C,D,32,"LH",RED,"#fff",lt,t,true);
   const y=C.Y(lv);if(t>=Math.max(tAt(hl,C,a,a1),W(19,3))){h+=`<line x1="${C.X(hl)}" x2="900" y1="${y}" y2="${y}" stroke="${RED}" stroke-width="5" stroke-dasharray="12 8"/>`}
   let bi=40;for(let i=33;i<46;i++)if(D.c[i]<lv){bi=i;break}const bt=Math.max(tAt(bi,C,a,a1),W(19,8));if(t>=bt)h+=ring(C.X(bi),y,bt,t,RED,180,0.6,12)+popc(C.X(bi)+40,y+110,"PECAH LOW",RED,"#fff",50,bt,t);
   h+=popc(450,30,"AMARAN AWAL",RED,"#fff",66,S(20),t);return h},
  (t,a,b)=>{let h="";const C1=chart(T10,46,{a:0,b:46,H:300,y0:70});const q1=ease((t-a)/0.4);
   h+=`<g opacity="${q1}"><rect x="0" y="40" width="900" height="360" rx="16" fill="rgba(5,8,15,.5)" stroke="${GOLD}" stroke-width="3"/>${C1.svg}${txt(16,90,"H4",GOLD,46,"start")}</g>`;
   if(t>=W(22,3)){h+=popc(640,70,"UPTREND",GOLD,"#0F1B33",44,W(22,3),t);const x0=C1.X(34)-20;h+=`<rect x="${x0}" y="60" width="${880-x0}" height="320" fill="none" stroke="${CY}" stroke-width="4" stroke-dasharray="10 6" opacity="${ease((t-W(22,3))/0.3)}"/>`}
   if(t>=S(23)){const k=prog(t,S(23),E(23),46);const C2=chart(M10,k,{a:0,b:46,H:330,y0:500});const q=ease((t-S(23))/0.4);
    h+=`<g opacity="${q}"><rect x="0" y="470" width="900" height="390" rx="16" fill="rgba(5,8,15,.5)" stroke="${CY}" stroke-width="3"/>${C2.svg}${txt(16,520,"M15",CY,46,"start")}</g>`+`<g opacity="${q}">${arrow(450,385,1,40,CY,q,8)}</g>`;
    h+=popc(600,520,"IKUT ARAH H4",CY,"#0F1B33",44,W(23,3),t)}return h}
 ]};
