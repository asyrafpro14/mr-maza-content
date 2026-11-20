// VIDEO 5: PIVOT POINT  (H=109 L=91 C=100 -> P=100 R1=109 S1=91 R2=118)
function wave(n,f,seed,z=0.5){const c=[];for(let i=0;i<n;i++)c.push(f(i)+(rnd(i*7.31+seed)-0.5)*2*z);return ohlc(c,seed)}
const PV=100,R1=109,S1=91,R2=118;
function lvl(C,v,col,lab,q=1,w=5,glow=false){const y=C.Y(v);return `<line x1="0" x2="${900*q}" y1="${y}" y2="${y}" stroke="${col}" stroke-width="${w}" ${glow?'filter="url(#gw)"':''}/>`+(q>0.6?txt(892,y-12,lab,col,40,"end"):"")}
let H5,B5,C5,D5,E5;
const V={sub:"Cara guna",stamp:"PIVOT?",title:"PIVOT<br>POINT",pill:"PIVOT POINT CARA BETUL",
 cheat:["Pivot = (High + Low + Close semalam) ÷ 3","Atas pivot, bias buy. Bawah pivot, bias sell","R1 & S1 selalu jadi tempat harga berhenti atau berpatah","Pecah R1 dengan kuat, selalu sambung ke R2","Paling kuat bila bertindih dengan zon SNR timeframe besar"],
 groups:[{p:[0,1]}],red:[[0,1],[0,2],[1,3]],
 stampT:()=>W(1,3),
 init(){
  H5=wave(46,i=>PV+0.6+5.5*Math.abs(Math.sin(i/3.6)),3,0.6);
  B5=wave(46,i=>i<22?PV+4+2.2*Math.sin(i/1.8):i<27?PV+4-(i-21)*2.2:PV-6+2.2*Math.sin(i/1.8),5,0.6);
  C5=wave(46,i=>PV+8.4*Math.sin(i/3.3),7,0.7);
  D5=wave(46,i=>i<18?PV+4+3.5*Math.sin(i/2):i<32?PV+4+(i-18)*1.05:R2-1.5-2*Math.abs(Math.sin(i/2)),9,0.6);
  E5=wave(46,i=>i<26?PV-9+0.35*i+2*Math.sin(i/2):i<30?PV+0.6-1.2*Math.abs(i-28):PV-1-(i-30)*0.7,11,0.5)},
 hits:()=>[W(0,4),W(1,3),W(5,3),W(6,0),W(6,2),S(7),W(10,3),S(12),W(14,2),W(14,5),W(16,3),W(17,5),W(19,5)],
 fl:()=>[[W(1,3),"#E7CE7C",.35],[W(16,3),"#E7CE7C",.3],[W(19,5),"#E7CE7C",.3]],
 hook(t){const D=H5,k=prog(t,0,W(1,2),46);const C=chart(D,k,{a:0,b:46,H:600,y0:120,extra:[PV-1.5,PV+7]});let h="";const rv=W(1,2);
  if(t>=rv){const q=ease((t-rv)/0.4);h+=lvl(C,PV,GOLD,"PIVOT",q,7,true)}else{h+=`<line x1="0" x2="900" y1="${C.Y(PV)}" y2="${C.Y(PV)}" stroke="${GOLD}" stroke-width="3" stroke-dasharray="4 14" opacity="${0.3+0.3*Math.sin(t*8)}"/>`}
  h+=C.svg;const lows=peaks(D.l,0,46,2,true);lows.forEach(i=>{if(D.l[i]>PV+1.5)return;const at=Math.max(tAt(i,C,0,W(1,2)),W(0,4));if(t<at)return;h+=ring(C.X(i),C.Y(D.l[i]),at,t,GOLD,110,0.6,9)+`<circle cx="${C.X(i)}" cy="${C.Y(PV)}" r="9" fill="${GOLD}" opacity="${t>=rv?1:0.6}"/>`});
  return h},
 steps:[
  (t,a,b)=>{let h="";const cx=220,top=150,bot=650,yH=top,yL=bot,yC=top+(bot-top)*0.5,yO=top+(bot-top)*0.78;const q=ease((t-a)/0.4);
   h+=`<g opacity="${q}"><line x1="${cx}" x2="${cx}" y1="${yH}" y2="${yL}" stroke="${GOLD}" stroke-width="8"/><rect x="${cx-60}" y="${yC}" width="120" height="${yO-yC}" fill="${GOLD}" rx="8"/></g>`+txt(cx,bot+70,"CANDLE SEMALAM",MUTE,34,"middle",q);
   [["H",yH,W(5,3),"HIGH 109"],["L",yL,W(6,0),"LOW 91"],["C",yC,W(6,2),"CLOSE 100"]].forEach(([l,y,t0,s])=>{if(t<t0)return;const p=ease((t-t0)/0.3);h+=`<line x1="${cx+70}" x2="${cx+70+80*p}" y1="${y}" y2="${y}" stroke="${CY}" stroke-width="5"/>`+popc(cx+260,y+14,s,CY,"#0F1B33",44,t0,t)});
   if(t>=S(7)){const s=2-back((t-S(7))/0.3);h+=`<g transform="translate(450 780) scale(${s})"><rect x="-420" y="-70" width="840" height="140" rx="26" fill="rgba(5,8,15,.9)" stroke="${GOLD}" stroke-width="5"/>${txt(0,30,"P = (H + L + C) ÷ 3",GOLD,74)}</g>`;
    if(t>=S(7)+0.6)h+=popc(450,40,"PIVOT = 100",GOLD,"#0F1B33",60,S(7)+0.6,t)}return h},
  (t,a,b)=>{const D=B5,k=prog(t,a,E(12),46);const C=chart(D,k,{a:0,b:46,H:720,y0:60,extra:[PV-10,PV+9]});let h="";const y=C.Y(PV);
   if(t>=W(10,3)){const q=ease((t-W(10,3))/0.4);h+=`<rect x="0" y="60" width="${900*q}" height="${y-60}" fill="${GOLD}" opacity=".1"/>`}
   if(t>=S(12)){const q=ease((t-S(12))/0.4);h+=`<rect x="0" y="${y}" width="${900*q}" height="${780-y}" fill="${RED}" opacity=".12"/>`}
   h+=lvl(C,PV,GOLD,"PIVOT",1,6,true)+C.svg+popc(450,y-220,"BIAS BUY",GOLD,"#0F1B33",70,W(10,3),t)+popc(450,y+260,"BIAS SELL",RED,"#fff",70,S(12),t);return h},
  (t,a,b)=>{const D=C5,a1=E(14),k=prog(t,a,a1,46);const C=chart(D,k,{a:0,b:46,H:720,y0:60,extra:[S1-3,R1+3]});let h="";
   h+=lvl(C,R1,RED,"R1",cl((t-W(14,1))/0.3),5)+lvl(C,PV,GOLD,"P",1,3)+lvl(C,S1,CY,"S1",cl((t-W(14,4))/0.3),5)+C.svg;
   peaks(D.h,0,46,2).forEach(i=>{if(D.h[i]<R1-1.6)return;const at=Math.max(tAt(i,C,a,a1),W(14,1));if(t>=at)h+=ring(C.X(i),C.Y(R1),at,t,RED,120,0.6,10)+`<g opacity="${ease((t-at)/0.25)}">${arrow(C.X(i),C.Y(D.h[i])-90,1,30,RED,1,7)}</g>`});
   peaks(D.l,0,46,2,true).forEach(i=>{if(D.l[i]>S1+1.6)return;const at=Math.max(tAt(i,C,a,a1),W(14,4));if(t>=at)h+=ring(C.X(i),C.Y(S1),at,t,CY,120,0.6,10)+`<g opacity="${ease((t-at)/0.25)}">${arrow(C.X(i),C.Y(D.l[i])+90,-1,30,CY,1,7)}</g>`});
   h+=popc(450,20,"BERHENTI / BERPATAH",INK,"#0F1B33",50,W(14,8),t);return h},
  (t,a,b)=>{const D=D5,a1=E(17),k=prog(t,a,a1,46);const C=chart(D,k,{a:0,b:46,H:720,y0:60,extra:[PV-2,R2+2]});let h="";
   h+=lvl(C,PV,GOLD,"P",1,3)+lvl(C,R1,RED,"R1",1,5)+lvl(C,R2,RED,"R2",cl((t-W(17,3))/0.3),6,t>=W(17,5))+C.svg;
   let bi=18;for(let i=18;i<40;i++)if(D.c[i]>R1){bi=i;break}const bt=Math.max(tAt(bi,C,a,a1),W(16,3));if(t>=bt)h+=ring(C.X(bi),C.Y(R1),bt,t,GOLD,200,0.6,14)+burst(C.X(bi),C.Y(R1),bt,t,20,GOLD,300,9,0.9)+popc(C.X(bi)-150,C.Y(R1)+70,"PECAH R1",GOLD,"#0F1B33",44,bt,t);
   if(t>=W(17,5))h+=dot(C.X(34),C.Y(R2),GOLD,W(17,5),t,14)+popc(560,C.Y(R2)-70,"SAMBUNG KE R2",GOLD,"#0F1B33",50,W(17,5),t);return h},
  (t,a,b)=>{const D=E5,a1=E(19),k=prog(t,a,a1,46);const C=chart(D,k,{a:0,b:46,H:720,y0:60,extra:[PV-12,PV+5]});let h="";const zt=W(19,5),zq=t>=zt?ease((t-zt)/0.4):0;
   if(zq>0)h+=band(C.Y(PV)-45,C.Y(PV)+35,RED,zq,0.22)+txt(890,C.Y(PV)-60,"ZON SNR TF BESAR",RED,36,"end",zq);
   h+=lvl(C,PV,GOLD,"PIVOT",1,6,zq>0)+C.svg;if(zq>0){const x=C.X(28);h+=ring(x,C.Y(PV),zt+0.3,t,GOLD,220,0.7,14)+popc(450,20,"PIVOT + ZON = KUAT",GOLD,"#0F1B33",56,zt+0.3,t)}return h}
 ]};
