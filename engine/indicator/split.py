# Pecah satu fail suara batch kepada 5 video + tl.json, guna DP align segmen senyap ke frasa skrip
import re,json,subprocess,sys,os,numpy as np
from scipy.io import wavfile
src=sys.argv[1]
subprocess.run(['ffmpeg','-y','-loglevel','error','-i',src,'-ac','1','-ar','44100','src.wav'],check=True)
sr,x=wavfile.read('src.wav');x=x.astype(np.float32);dur=len(x)/sr
out=subprocess.run(['ffmpeg','-i','src.wav','-af','silencedetect=noise=-38dB:d=0.14','-f','null','-'],capture_output=True,text=True).stderr
ss=[float(v) for v in re.findall(r'silence_start: ([\d.]+)',out)];se=[float(v) for v in re.findall(r'silence_end: ([\d.]+)',out)]
segs=[];a=0
for s,e in zip(ss,se):
    if s>a+0.04:segs.append([a,s])
    a=e
if dur>a+0.05:segs.append([a,dur])
scripts=open('scripts.txt').read().strip().split('\n\n')
PH=[];VID=[]
for k,s in enumerate(scripts):
    for p in re.findall(r'[^,.?]+[,.?]',s):PH.append(p.strip());VID.append(k)
L=[len(p.replace(' ','')) for p in PH]
rate=sum(e-s for s,e in segs)/sum(L)
n,m=len(PH),len(segs);INF=1e18
D=np.full((n+1,m+1),INF);B={};D[0,0]=0
for i in range(n+1):
    for j in range(m+1):
        if D[i,j]>=INF:continue
        for aa in range(1,4):
            for bb in range(1,4):
                if aa>1 and bb>1:continue
                if i+aa>n or j+bb>m:continue
                if len(set(VID[i:i+aa]))>1:continue
                d=segs[j+bb-1][1]-segs[j][0];exp=rate*sum(L[i:i+aa])
                c=((d-exp)/(0.25+0.3*exp))**2+(aa-1)*0.6+(bb-1)*0.9
                if D[i,j]+c<D[i+aa,j+bb]:D[i+aa,j+bb]=D[i,j]+c;B[(i+aa,j+bb)]=(i,j,aa,bb)
i,j=n,m;G=[]
while (i,j)!=(0,0):
    pi,pj,aa,bb=B[(i,j)];G.append((pi,aa,pj,bb));i,j=pi,pj
G.reverse()
# masa frasa dalam fail sumber
T=[None]*n
for pi,aa,pj,bb in G:
    s0,s1=segs[pj][0],segs[pj+bb-1][1]
    if aa==1:T[pi]=(s0,s1,[segs[q] for q in range(pj,pj+bb)])
    else:
        tot=sum(L[pi:pi+aa]);acc=0
        for q in range(aa):
            st=s0+(s1-s0)*acc/tot;acc+=L[pi+q];en=s0+(s1-s0)*acc/tot;T[pi+q]=(st,en,[[st,en]])
for k in range(len(scripts)):
    d=f'v{k+1}';os.makedirs(d,exist_ok=True);idx=[i for i in range(n) if VID[i]==k]
    buf=[np.zeros(int(0.05*sr))];t=0.05;P=[]
    for ii,i in enumerate(idx):
        st,en,_=T[i];a0=max(0,st-0.03);b0=min(dur,en+0.05);c=x[int(a0*sr):int(b0*sr)]
        s=t;e=t+len(c)/sr;ws=PH[i].split();Lw=sum(len(w)+1 for w in ws);acc=0;words=[]
        for w in ws:words.append([w,round(s+0.03+(e-s-0.08)*acc/Lw,3)]);acc+=len(w)+1
        P.append({"i":ii,"text":PH[i],"start":round(s,3),"end":round(e,3),"words":words});buf.append(c)
        g=0.08 if PH[i].endswith(',') else 0.2;buf.append(np.zeros(int(g*sr)));t=e+g
    y=np.concatenate(buf+[np.zeros(int(0.5*sr))]);wavfile.write(f'{d}/vo.wav',sr,y.astype(np.int16))
    json.dump({"total":round(len(y)/sr,3),"p":P},open(f'{d}/tl.json','w'))
    print(d,round(len(y)/sr,2),'s')
for pi,aa,pj,bb in G:
    if aa>1 or bb>1:print('grup',PH[pi:pi+aa],'segmen',bb)
print('segmen',m,'frasa',n,'rate',round(rate,4))
