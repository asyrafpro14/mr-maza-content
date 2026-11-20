const {chromium}=require("playwright");const fs=require("fs"),path=require("path");
(async()=>{const d=process.argv[2];const b=await chromium.launch();const p=await b.newPage();await p.goto("file://"+path.resolve(d,"v.html"));
const ev=await p.evaluate(tl=>{build(tl);return{hits:HITS,cuts:CUTS,fl:FL,stamp:V.stampT(),save:S(iSave),title:W(iSave+1,P[iSave+1].words.length-1),nums:NI.map(S),msg:S(iMsg),msg2:W(iMsg,1),msg3:W(iMsg+1,5),fin:S(iFin),fin2:S(iFin+1),hook0:P[0].words.map(w=>w[1]),total:TL.total}},JSON.parse(fs.readFileSync(path.resolve(d,"tl.json"))));
fs.writeFileSync(path.resolve(d,"ev.json"),JSON.stringify(ev));await b.close()})();
