import json,sys,numpy as np
from scipy.io import wavfile
from scipy.signal import butter,lfilter
d=sys.argv[1];SR=44100;ev=json.load(open(f'{d}/ev.json'));T=ev['total']+0.6;N=int(T*SR)
mus=np.zeros(N);sfx=np.zeros(N);rng=np.random.default_rng(int(sys.argv[2]) if len(sys.argv)>2 else 7)
def add(buf,t,x,g=1.0):
    i=int(t*SR)
    if i<0 or i>=N:return
    n=min(len(x),N-i);buf[i:i+n]+=x[:n]*g
def env(n,a=0.002,dd=0.2):tt=np.arange(n)/SR;return np.minimum(1,tt/a)*np.exp(-tt/dd)
def lp(x,f):b,a=butter(2,f/(SR/2));return lfilter(b,a,x)
def hp(x,f):b,a=butter(2,f/(SR/2),'high');return lfilter(b,a,x)
def kick():n=int(.45*SR);tt=np.arange(n)/SR;f=45+110*np.exp(-tt*30);return np.sin(2*np.pi*np.cumsum(f)/SR)*env(n,.001,.18)
def clap():n=int(.25*SR);return hp(rng.standard_normal(n),900)*env(n,.001,.07)
def hat():n=int(.05*SR);return hp(rng.standard_normal(n),7000)*env(n,.0005,.012)
def b808(f,dur):n=int(dur*SR);tt=np.arange(n)/SR;return np.tanh(2*np.sin(2*np.pi*f*tt))*env(n,.003,dur*.6)
def impact():n=int(1.2*SR);tt=np.arange(n)/SR;return (np.sin(2*np.pi*np.cumsum(38+80*np.exp(-tt*12))/SR)*env(n,.001,.35)+lp(rng.standard_normal(n),2500)*env(n,.001,.08)*.6)
def whoosh(du=.45):n=int(du*SR);tt=np.arange(n)/SR;x=rng.standard_normal(n);sh=np.sin(np.pi*tt/du)**2;return (hp(lp(x,2500),300)*(1-tt/du)+hp(x,2500)*(tt/du)*.6)*sh*.7
def glitch():n=int(.3*SR);x=np.sign(np.sin(2*np.pi*np.repeat(rng.integers(200,1800,30),n//30+1)[:n]*np.arange(n)/SR));return x*env(n,.001,.12)*.35
def pop():n=int(.15*SR);tt=np.arange(n)/SR;return np.sin(2*np.pi*(900-500*tt/.15)*tt)*env(n,.001,.04)*.6
def ding():n=int(1.2*SR);tt=np.arange(n)/SR;return (np.sin(2*np.pi*1760*tt)+.5*np.sin(2*np.pi*2640*tt))*env(n,.002,.35)*.35
def sparkle():
    n=int(.8*SR);x=np.zeros(n)
    for k in range(10):
        i=int(rng.random()*n*.7);m=int(.12*SR);tt=np.arange(m)/SR;s=np.sin(2*np.pi*(3000+rng.random()*4000)*tt)*env(m,.001,.04);x[i:i+m]+=s[:n-i]
    return x*.25
def riser(du):n=int(du*SR);tt=np.arange(n)/SR;return hp(rng.standard_normal(n),400)*(tt/du)**2*.5+np.sin(2*np.pi*np.cumsum(200+1200*(tt/du)**2)/SR)*(tt/du)**2*.15
def subdrop():n=int(1.0*SR);tt=np.arange(n)/SR;return np.sin(2*np.pi*np.cumsum(90*np.exp(-tt*2.5)+30)/SR)*env(n,.005,.5)
bpm=[100,104,98,108,102][hash(d)%5];b=60/bpm;roots=[[43.65,43.65,38.89,41.2],[41.2,41.2,36.71,38.89],[46.25,46.25,41.2,43.65]][hash(d)%3]
drops=[(ev['stamp']-0.45,ev['stamp']),(ev['msg2']-0.5,ev['msg2']),(ev['fin']-0.4,ev['fin'])]
indrop=lambda t:any(a<=t<c for a,c in drops)
k=0;t=0.0
while t<T:
    bar=int(t/(4*b));pos=k%16
    if not indrop(t) and t>0.05:
        if pos in(0,10) or (pos==7 and bar%2): add(mus,t,kick(),.9)
        if pos in(4,12): add(mus,t,clap(),.45)
        add(mus,t,hat(),.18 if pos%2==0 else .1)
        if bar%2 and pos in(14,15): add(mus,t+b/8,hat(),.1)
        if pos in(0,10): add(mus,t,b808(roots[bar%4],b*2.2),.42)
    t+=b/4;k+=1
tt=np.arange(N)/SR;pad=np.zeros(N)
for f in[174.6,207.7,261.6,311.1]:pad+=np.sin(2*np.pi*f*tt+np.sin(2*np.pi*.2*tt))
mus+=lp(pad,1200)*.035
for a,c in drops: add(mus,a-1.0,riser(1.0),.6)
add(sfx,0.0,impact(),.6)
for w in ev['hook0'][:6]: add(sfx,w,pop(),.25)
for h in ev['hits']: add(sfx,h,impact(),.45)
for c in ev['cuts']: add(sfx,c-0.25,whoosh(),.6)
for c,col,g in ev['fl']: add(sfx,c,glitch(),.45)
add(sfx,ev['stamp'],impact(),.9);add(sfx,ev['stamp'],subdrop(),.7);add(sfx,ev['stamp'],glitch(),.6);add(sfx,ev['stamp']+0.5,glitch(),.35)
add(sfx,ev['save'],pop(),.8);add(sfx,ev['title'],sparkle(),.8)
for n in ev['nums']: add(sfx,n,glitch(),.35)
add(sfx,ev['msg2'],subdrop(),.6);add(sfx,ev['msg3'],sparkle(),.8)
add(sfx,ev['fin'],sparkle(),.7);add(sfx,ev['fin2'],ding(),.5)
sr,v=wavfile.read(f'{d}/vo.wav');v=v.astype(float);v=v.mean(1) if v.ndim>1 else v;v/=np.abs(v).max()+1e-9
if sr!=SR:v=np.interp(np.arange(int(len(v)*SR/sr))*sr/SR,np.arange(len(v)),v)
voice=np.zeros(N);voice[:min(N,len(v))]=v[:N]
e=np.abs(voice);w=int(.12*SR);e=np.convolve(e,np.ones(w)/w,'same');mus*=1-0.6*np.clip(e/0.08,0,1)
fade=np.clip((T-tt)/1.0,0,1)
from scipy.ndimage import maximum_filter1d
out=voice*0.9+mus*0.5*fade+sfx*0.4
ceil=0.85;env_=maximum_filter1d(np.abs(out),size=int(0.012*SR));need=np.minimum(1,ceil/np.maximum(env_,1e-9));g=np.ones(N)
a_=np.exp(-1/(0.005*SR));r_=np.exp(-1/(0.2*SR));cur=1.0
for i in range(N):
    v=need[i];cur=a_*cur+(1-a_)*v if v<cur else r_*cur+(1-r_)*v;g[i]=cur
la=int(0.005*SR);g=np.concatenate([g[la:],np.ones(la)]);out=np.clip(out*g,-0.95,0.95)
wavfile.write(f'{d}/audio.wav',SR,out.astype(np.float32));print('audio',d,T)
