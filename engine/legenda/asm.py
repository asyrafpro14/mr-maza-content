# guna (dalam folder kerja yang ada body.html, scenes.js, tl.json): python3 /path/engine/legenda/asm.py
import os
S=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','shared')
css=open(f'{S}/base.css').read()+'\n#grain{position:absolute;inset:0;pointer-events:none;background-size:256px 256px;mix-blend-mode:overlay;z-index:50}\n'
open('mm.html','w').write('<!doctype html>\n<html><head><meta charset="utf-8">\n<style>\n'+css+'\n</style></head><body>\n'+open('body.html').read()+'<script>\n'+open(f'{S}/helpers.js').read()+'\n'+open('scenes.js').read()+'\n</script></body></html>')
open('render.js','w').write(open(f'{S}/render.template.js').read().replace('__PAGE__','mm.html'))
