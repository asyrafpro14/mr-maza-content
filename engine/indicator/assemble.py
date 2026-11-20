# guna: python3 assemble.py N   (bina vN/v.html dari vN.js + lib.js)
import sys,os
B=os.path.dirname(os.path.abspath(__file__));S=os.path.join(B,'..','shared')
n=sys.argv[1];d=os.path.join(os.getcwd(),f'v{n}');os.makedirs(d,exist_ok=True)
h='<!doctype html>\n<html><head><meta charset="utf-8">\n<style>\n'+open(f'{S}/base.css').read()+'\n</style></head><body>\n'+open(f'{B}/body.html').read()+'<script>\n'+open(f'{S}/helpers.js').read()+'\n'+open(os.path.join(os.getcwd(),f'v{n}.js') if os.path.exists(f'v{n}.js') else f'{B}/v{n}.js').read()+'\n'+open(f'{B}/lib.js').read()+'\n</script></body></html>'
open(f'{d}/v.html','w').write(h)
open(f'{d}/render.js','w').write(open(f'{S}/render.template.js').read().replace('__PAGE__','v.html'))
