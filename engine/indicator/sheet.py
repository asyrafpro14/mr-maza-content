import sys
from PIL import Image
d=sys.argv[1];ts=sys.argv[2:];W,H=270,480;cols=6;rows=(len(ts)+5)//6;im=Image.new('RGB',(W*cols,H*rows))
for k,t in enumerate(ts):im.paste(Image.open(f'{d}/f-{t}.png').convert('RGB').resize((W,H)),((k%cols)*W,(k//cols)*H))
im.save(f'{d}/sheet.png')
