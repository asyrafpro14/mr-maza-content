# guna: python3 /home/claude/prod/leg/sfx_leg.py vN  -> vN/audio.wav (suara + SFX ringan, TANPA muzik latar)
import json,sys,numpy as np
from scipy.io import wavfile
from scipy.signal import butter,lfilter
from scipy.ndimage import maximum_filter1d
d=sys.argv[1];SR=44100;ev=json.load(open(f'{d}/ev.json'));TT=ev['total']+0.8;N=int(TT*SR)
rng=np.random.default_rng(5);sfx=np.zeros(N);amb=np.zeros(N)
def add(b,t,x,g=1):
    i=int(t*SR)
    if i<0 or i>=N:return
    n=min(len(x),N-i);b[i:i+n]+=x[:n]*g
def lp(x,f):b,a=butter(2,f/(SR/2));return lfilter(b,a,x)
def hp(x,f):b,a=butter(2,f/(SR/2),'high');return lfilter(b,a,x)
def env(n,a,dd):t=np.arange(n)/SR;return np.minimum(1,t/a)*np.exp(-t/dd)
def impact():n=int(1.5*SR);t=np.arange(n)/SR;return np.sin(2*np.pi*np.cumsum(32+70*np.exp(-t*9))/SR)*env(n,.001,.5)+lp(rng.standard_normal(n),1800)*env(n,.001,.12)*.4
def boom():n=int(2.5*SR);t=np.arange(n)/SR;return np.sin(2*np.pi*np.cumsum(28+40*np.exp(-t*3))/SR)*env(n,.01,1.0)
def heart():n=int(.5*SR);t=np.arange(n)/SR;b=np.sin(2*np.pi*55*t)*env(n,.002,.07);return b+np.concatenate([np.zeros(int(.18*SR)),b[:n-int(.18*SR)]*.7])
def whoosh(du=.6):n=int(du*SR);t=np.arange(n)/SR;return hp(lp(rng.standard_normal(n),3000),300)*np.sin(np.pi*t/du)**2*.6
def ding():n=int(1.5*SR);t=np.arange(n)/SR;return (np.sin(2*np.pi*1320*t)+.4*np.sin(2*np.pi*1980*t))*env(n,.002,.4)*.3
def riser(du):n=int(du*SR);t=np.arange(n)/SR;return hp(rng.standard_normal(n),500)*(t/du)**2.5*.5
sc=ev['sc'];pov_end=min(v for k,v in sc.items() if k!='pov')
for k in range(int(pov_end/1.1)):add(sfx,0.3+k*1.1,heart(),.8)
for h in ev['hits']:add(sfx,h,impact(),.35)
for c in ev['cuts']:add(sfx,c-0.3,whoosh(),.4)
for a,col,g in ev['fl']:
    if col.upper()=='#E7CE7C':add(sfx,a,ding(),.6)
    elif col.upper()=='#E0465A':add(sfx,a,boom(),.6)
    else:add(sfx,a-0.8,riser(0.8),.5);add(sfx,a,boom(),.5)
if 'fin' in sc:add(sfx,sc['fin'],ding(),.5)
sr,v=wavfile.read(f'{d}/vo.wav');v=v.astype(float);v=v.mean(1) if v.ndim>1 else v;v/=np.abs(v).max()+1e-9
if sr!=SR:v=np.interp(np.arange(int(len(v)*SR/sr))*sr/SR,np.arange(len(v)),v)
voice=np.zeros(N);voice[:min(N,len(v))]=v[:N]
e=np.abs(voice);w=int(.15*SR);e=np.convolve(e,np.ones(w)/w,'same');duck=1-0.4*np.clip(e/0.08,0,1)
tt=np.arange(N)/SR;fade=np.clip((TT-tt)/1.5,0,1)
out=voice*0.9+sfx*0.35*duck*fade
ceil=0.85;env_=maximum_filter1d(np.abs(out),size=int(0.012*SR));g=np.ones(N);need=np.minimum(1,ceil/np.maximum(env_,1e-9))
a_=np.exp(-1/(0.005*SR));r_=np.exp(-1/(0.2*SR));cur=1.0
for i in range(N):
    x=need[i];cur=a_*cur+(1-a_)*x if x<cur else r_*cur+(1-r_)*x;g[i]=cur
la=int(0.005*SR);g=np.concatenate([g[la:],np.ones(la)]);out=np.clip(out*g,-0.95,0.95)
wavfile.write(f'{d}/audio.wav',SR,out.astype(np.float32));print('ok',d,round(TT,2),'peak',round(float(abs(out).max()),3))
