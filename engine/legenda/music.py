import json,sys,numpy as np
from scipy.io import wavfile
from scipy.signal import butter,lfilter
SR=44100;tl=json.load(open('tl.json'));P=tl['p'];TT=tl['total']+0.8;N=int(TT*SR)
S=lambda i:P[i]['start'];E=lambda i:P[i]['end'];W=lambda i,j:P[i]['words'][min(j,len(P[i]['words'])-1)][1]
rng=np.random.default_rng(5);mus=np.zeros(N);sfx=np.zeros(N);amb=np.zeros(N)
def add(b,t,x,g=1):
    i=int(t*SR)
    if i<0 or i>=N:return
    n=min(len(x),N-i);b[i:i+n]+=x[:n]*g
def lp(x,f):b,a=butter(2,f/(SR/2));return lfilter(b,a,x)
def hp(x,f):b,a=butter(2,f/(SR/2),'high');return lfilter(b,a,x)
def env(n,a,d):t=np.arange(n)/SR;return np.minimum(1,t/a)*np.exp(-t/d)
def piano(f,dur=2.5,vel=1):
    n=int(dur*SR);t=np.arange(n)/SR;x=np.zeros(n)
    for k,a in [(1,1),(2,.45),(3,.22),(4,.12),(5,.06)]:x+=a*np.sin(2*np.pi*f*k*t*(1+0.0004*k))*np.exp(-t*(1.2+k*0.9))
    return x*np.minimum(1,t/0.004)*vel*0.35
def pad(fs,dur,vol=1):
    n=int(dur*SR);t=np.arange(n)/SR;x=np.zeros(n)
    for f in fs:
        for dt in(-0.003,0,0.003):x+=np.sin(2*np.pi*f*(1+dt)*t)+0.25*np.sin(2*np.pi*2*f*(1+dt)*t)
    sh=np.minimum(1,t/1.2)*np.minimum(1,(dur-t)/1.0);return lp(x,1600)*sh*vol*0.035
def impact():n=int(2*SR);t=np.arange(n)/SR;return np.sin(2*np.pi*np.cumsum(32+70*np.exp(-t*9))/SR)*env(n,.001,.6)+lp(rng.standard_normal(n),1800)*env(n,.001,.15)*.5
def boom():n=int(3*SR);t=np.arange(n)/SR;return np.sin(2*np.pi*np.cumsum(28+40*np.exp(-t*3))/SR)*env(n,.01,1.2)
def heart():n=int(.5*SR);t=np.arange(n)/SR;b=np.sin(2*np.pi*55*t)*env(n,.002,.07);return b+np.concatenate([np.zeros(int(.18*SR)),b[:n-int(.18*SR)]*.7])
def glass():
    n=int(1.0*SR);t=np.arange(n)/SR;x=hp(rng.standard_normal(n),3500)*env(n,.0005,.12)
    for f in[2900,4100,5300,6700]:x+=np.sin(2*np.pi*f*t+rng.random()*6)*env(n,.001,.25)*.25
    return x*.7
def whoosh(du=.6):n=int(du*SR);t=np.arange(n)/SR;return hp(lp(rng.standard_normal(n),3000),300)*np.sin(np.pi*t/du)**2*.6
def riser(du):n=int(du*SR);t=np.arange(n)/SR;return hp(rng.standard_normal(n),500)*(t/du)**2.5*.5
def coin():n=int(.4*SR);t=np.arange(n)/SR;return (np.sin(2*np.pi*2400*t)+np.sin(2*np.pi*3600*t)*.5)*env(n,.001,.08)*.3
def tick():n=int(.05*SR);return hp(rng.standard_normal(n),5000)*env(n,.0005,.01)
nt=lambda m:440*2**((m-69)/12)
# progresi Am F C G (sedih), versi naik C G Am F
sad=[[57,60,64],[53,57,60],[48,52,55],[55,59,62]];up=[[48,52,55],[55,59,62],[57,60,64],[53,57,60]]
bpm=72;b=60/bpm;bar=4*b
rise0=S(16);epic=W(22,3);calm=S(26)
t=0.0;bi=0
while t<TT-1:
    ch=(sad if t<rise0 or t>=calm else up)[bi%4]
    if t<S(3):    # pov: hanya not tinggi perlahan
        add(mus,t,piano(nt(ch[2]+12),3,.5))
    elif t<rise0:
        add(mus,t,piano(nt(ch[0]-12),3.5,.8));add(mus,t+b*2,piano(nt(ch[1]),2.5,.45));add(mus,t+b*3,piano(nt(ch[2]),2.5,.4))
    elif t<epic:
        for k in range(8):add(mus,t+k*b/2,piano(nt(ch[k%3]+(12 if k>=4 else 0)),1.6,.45))
        add(mus,t,piano(nt(ch[0]-12),3,.9));add(mus,t,pad([nt(m) for m in ch],bar+0.3,.8))
    elif t<calm:
        for k in range(8):add(mus,t+k*b/2,piano(nt(ch[k%3]+12),1.4,.55))
        add(mus,t,piano(nt(ch[0]-24),3,1.1));add(mus,t,pad([nt(m) for m in ch]+[nt(ch[0]+12)],bar+0.3,1.4))
        for k in range(4):
            n=int(.3*SR);tt=np.arange(n)/SR;add(mus,t+k*b,np.sin(2*np.pi*np.cumsum(50+60*np.exp(-tt*25))/SR)*env(n,.001,.12),.7)
    else:
        add(mus,t,piano(nt(ch[0]),3.5,.6));add(mus,t+b*2,piano(nt(ch[2]+12),2.5,.35));add(mus,t,pad([nt(m) for m in ch],bar+0.3,.5))
    t+=bar;bi+=1
add(mus,S(32),piano(nt(57),5,.8));add(mus,S(32),piano(nt(64),5,.6));add(mus,S(32),piano(nt(69),5,.6))
# ambien hujan
r=lp(hp(rng.standard_normal(int(rise0*SR)),800),5000)*0.05;fd=np.minimum(1,np.arange(len(r))/SR/0.5)*np.clip((rise0-np.arange(len(r))/SR)/1.5,0,1);amb[:len(r)]+=r*fd
# sfx
for k in range(int(S(3)/1.1)):add(sfx,0.3+k*1.1,heart(),.9)
add(sfx,W(0,4),impact(),.5);add(sfx,S(1),glass(),.8);add(sfx,S(2),whoosh(),.5)
add(sfx,S(3),whoosh(),.5);add(sfx,W(3,3),boom(),.4)
for i in range(5):add(sfx,S(5)+i*0.18,coin(),.6)
add(sfx,S(7),coin(),.8);add(sfx,S(8),whoosh(.4),.4)
add(sfx,S(10)-1.0,riser(1.0),.4);add(sfx,W(11,0),impact(),.8);add(sfx,W(11,0),boom(),.6)
yrs=np.linspace(S(11),E(11)+0.6,7)
for y in yrs:add(sfx,y,tick(),.8)
add(sfx,S(12),impact(),.7);add(sfx,S(13),whoosh(.8),.4)
add(sfx,S(15),boom(),.7);add(sfx,S(15),piano(nt(81),3,.8),1)
for i in range(6):add(sfx,W(17,2)+i*0.15,impact()[:int(.25*SR)],.25)
for i in[18,19,20]:add(sfx,S(i),piano(nt(76+(i-18)*2),1.5,.9),1)
add(sfx,epic-1.6,riser(1.6),.7);add(sfx,epic,impact(),1.0);add(sfx,epic,boom(),.8)
add(sfx,S(23),impact(),.6);add(sfx,W(25,0),boom(),.7);add(sfx,W(25,0),whoosh(.6),.4)
add(sfx,W(26,4),impact(),.5);add(sfx,S(27),piano(nt(76),2,.8),1);add(sfx,S(29),piano(nt(72),1.5,.8),1);add(sfx,S(30),impact(),.4)
sr,v=wavfile.read('vo.wav');v=v.astype(float);v=v.mean(1) if v.ndim>1 else v;v/=np.abs(v).max()+1e-9
if sr!=SR:v=np.interp(np.arange(int(len(v)*SR/sr))*sr/SR,np.arange(len(v)),v)
voice=np.zeros(N);voice[:min(N,len(v))]=v[:N]
e=np.abs(voice);w=int(.15*SR);e=np.convolve(e,np.ones(w)/w,'same');duck=1-0.5*np.clip(e/0.08,0,1)
tt=np.arange(N)/SR;fade=np.clip((TT-tt)/1.5,0,1)
# reverb ringkas pada muzik
rv=np.zeros(N)
for d,g in[(0.11,.35),(0.23,.25),(0.37,.18),(0.53,.12)]:k=int(d*SR);rv[k:]+=mus[:-k]*g
out=voice*0.9+(mus+rv)*0.5*duck*fade+sfx*0.35+amb
# limiter lembut (attack 5ms, release 200ms) - tiada saturation
from scipy.ndimage import maximum_filter1d
ceil=0.85;env_=maximum_filter1d(np.abs(out),size=int(0.012*SR));g=np.ones(N);need=np.minimum(1,ceil/np.maximum(env_,1e-9))
a_=np.exp(-1/(0.005*SR));r_=np.exp(-1/(0.2*SR));cur=1.0
for i in range(N):
    v=need[i]
    cur=a_*cur+(1-a_)*v if v<cur else r_*cur+(1-r_)*v
    g[i]=cur
la=int(0.005*SR);g=np.concatenate([g[la:],np.ones(la)])
out=out*g;out=np.clip(out,-0.95,0.95)
wavfile.write('audio.wav',SR,out.astype(np.float32));print('ok',TT,'peak',abs(out).max())
