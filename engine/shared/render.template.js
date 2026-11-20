const { chromium } = require("playwright");
const { spawn } = require("child_process");
const fs = require("fs"), path = require("path");
const TL = JSON.parse(fs.readFileSync(path.join(__dirname, "tl.json"), "utf8"));
(async () => {
  const mode = process.argv[2];
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto("file://" + path.join(__dirname, "__PAGE__"));
  await p.evaluate(() => document.fonts.ready);
  const total = await p.evaluate((tl) => build(tl), TL);
  if (mode === "frames") {
    for (const t of process.argv.slice(3).map(Number)) { await p.evaluate((t) => render(t), t); await p.screenshot({ path: path.join(__dirname, `f-${t}.png`) }); }
  } else {
    const out = path.join(__dirname, "v.part.mp4");
    const ff = spawn("ffmpeg", ["-y","-loglevel","error","-f","image2pipe","-framerate","30","-i","-","-c:v","libx264","-crf","18","-preset","veryfast","-pix_fmt","yuv420p",out]);
    const n = Math.round(total * 30);
    for (let f = 0; f < n; f++) { await p.evaluate((t) => render(t), f / 30); const buf = await p.screenshot({ type: "jpeg", quality: 92 }); if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once("drain", r)); }
    ff.stdin.end(); await new Promise((r, j) => ff.on("close", c => c ? j(c) : r()));
    fs.renameSync(out, path.join(__dirname, "v.mp4"));
  }
  await b.close();
})();
