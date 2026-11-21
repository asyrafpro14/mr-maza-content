import sys,json
cfg=json.load(open(sys.argv[1]));t=open('/home/claude/prod/leg/common/body.tpl.html').read()
g="\n  ".join(f'<div class="sc" id="{i}"><svg id="{i}svg" style="position:absolute;left:0;top:0;width:1080px;height:1920px;overflow:visible" viewBox="0 0 1080 1920"></svg></div>' for i in cfg['ids'])
for k,v in [('__GSCENES__',g),('__NAME__',cfg['name']),('__NSIZE__',str(cfg.get('nsize',200))),('__SUB__',cfg['sub']),('__F1__',cfg['f1']),('__PERSON__',cfg['person'])]:t=t.replace(k,v)
open('body.html','w').write(t)
