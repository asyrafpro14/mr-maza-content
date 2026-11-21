// guna: node /home/claude/prod/leg/events_leg.js vN   (vN ada mm.html + tl.json) -> vN/ev.json
const {chromium}=require("playwright");const fs=require("fs"),path=require("path");
(async()=>{const d=process.argv[2];const b=await chromium.launch();const p=await b.newPage();await p.goto("file://"+path.resolve(d,"mm.html"));
const ev=await p.evaluate(tl=>{build(tl);const sc={};SC.forEach(s=>sc[s.id]=s.a);return{hits:HITS,cuts:CUTS,fl:FL,sc,pov:P[0].words.map(w=>w[1]),total:TL.total}},JSON.parse(fs.readFileSync(path.resolve(d,"tl.json"))));
fs.writeFileSync(path.resolve(d,"ev.json"),JSON.stringify(ev));await b.close()})();
