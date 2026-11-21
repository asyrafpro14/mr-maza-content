# Enjin legenda generik (batch 21 Nov 2026: v12 PTJ, v13 Richard Dennis, v14 Mark Douglas)
Folder kerja vN perlu: cfg.json, story.js, tl.json, vo.wav (dari split_keep.py).
1. `bash asm.sh` (dalam vN) jana body.html, scenes.js, mm.html, render.js. Laluan dalam asm.sh/mkbody.py menunjuk ke /home/claude/prod/leg/common; tukar jika folder kerja lain.
2. `node render.js frames t...` + sheet.py untuk semakan.
3. `node events_leg.js vN` lalu `python3 sfx_leg.py vN` (suara + SFX ringan, tanpa muzik latar).
4. `node vN/render.js video`, kemudian `bash engine/shared/master.sh vN/v.mp4 vN/audio.wav out.mp4`.
