# guna dalam vN: bash ../common/asm.sh  (perlu cfg.json, story.js, tl.json)
set -e
python3 /home/claude/prod/leg/common/mkbody.py cfg.json
cat story.js /home/claude/prod/leg/common/lib.js > scenes.js
python3 /home/claude/mr-maza-content/engine/legenda/asm.py
