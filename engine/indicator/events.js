const {chromium}=require("playwright");const fs=require("fs"),path=require("path");
(async()=>{const d=process.argv[2];const b=await chromium.launch();const p=await b.newPage();await p.goto("file://"+path.resolve(d,"v.html"));
const ev=await p.evaluate(tl=>{build(tl);return{hits:HITS,cuts:CUTS,fl:FL,stamp:V.stampT(),save:S(iSave),title:W(iSave+1,P[iSave+1].words.length-1),nums:NI.map(S),msg:MT[0],msg2:MT[1],msg3:MT[3],fin:S(iFin),fin2:S(iSig),hook0:P[0].words.map(w=>w[1]),total:TL.total}},JSON.parse(fs.readFileSync(path.resolve(d,"tl.json"))));
fs.writeFileSync(path.resolve(d,"ev.json"),JSON.stringify(ev));await b.close()})();
