import json,numpy as np
from scipy.io import wavfile
from scipy.signal import butter,lfilter
SR=44100
tl=json.load(open('tl.json'));P=tl['p'];T=tl['total']+0.6
S=lambda i:P[i]['start'];W=lambda i,j:P[i]['words'][j][1]
N=int(T*SR);mus=np.zeros(N);sfx=np.zeros(N)
rng=np.random.default_rng(7)
def add(buf,t,x,g=1.0):
    i=int(t*SR);
    if i<0 or i>=N:return
    n=min(len(x),N-i);buf[i:i+n]+=x[:n]*g
def env(n,a=0.002,d=0.2):
    t=np.arange(n)/SR;return np.minimum(1,t/a)*np.exp(-t/d)
def lp(x,f):b,a=butter(2,f/(SR/2));return lfilter(b,a,x)
def hp(x,f):b,a=butter(2,f/(SR/2),'high');return lfilter(b,a,x)
def kick():n=int(.45*SR);t=np.arange(n)/SR;f=45+110*np.exp(-t*30);return np.sin(2*np.pi*np.cumsum(f)/SR)*env(n,.001,.18)
def clap():n=int(.25*SR);return hp(rng.standard_normal(n),900)*env(n,.001,.07)
def hat():n=int(.05*SR);return hp(rng.standard_normal(n),7000)*env(n,.0005,.012)
def b808(f,dur):n=int(dur*SR);t=np.arange(n)/SR;return np.tanh(2*np.sin(2*np.pi*f*t))*env(n,.003,dur*.6)
def impact():n=int(1.2*SR);t=np.arange(n)/SR;return (np.sin(2*np.pi*np.cumsum(38+80*np.exp(-t*12))/SR)*env(n,.001,.35)+lp(rng.standard_normal(n),2500)*env(n,.001,.08)*.6)
def whoosh(d=.45):n=int(d*SR);t=np.arange(n)/SR;x=rng.standard_normal(n);sh=np.sin(np.pi*t/d)**2;return (hp(lp(x,2500),300)*(1-t/d)+hp(x,2500)*(t/d)*.6)*sh*.7
def glass():
    n=int(.9*SR);t=np.arange(n)/SR;x=hp(rng.standard_normal(n),3500)*env(n,.0005,.12)
    for f in [2900,4100,5300,6700,8100]:x+=np.sin(2*np.pi*f*t+rng.random()*6)*env(n,.001,.2+rng.random()*.3)*.25
    return x*.7
def glitch():
    n=int(.3*SR);x=np.sign(np.sin(2*np.pi*np.repeat(rng.integers(200,1800,30),n//30+1)[:n]*np.arange(n)/SR));return x*env(n,.001,.12)*.35
def pop():n=int(.15*SR);t=np.arange(n)/SR;return np.sin(2*np.pi*(900-500*t/.15)*t)*env(n,.001,.04)*.6
def ding():n=int(1.2*SR);t=np.arange(n)/SR;return (np.sin(2*np.pi*1760*t)+.5*np.sin(2*np.pi*2640*t))*env(n,.002,.35)*.35
def sparkle():
    n=int(.8*SR);x=np.zeros(n)
    for k in range(10):
        i=int(rng.random()*n*.7);m=int(.12*SR);tt=np.arange(m)/SR;s=np.sin(2*np.pi*(3000+rng.random()*4000)*tt)*env(m,.001,.04)
        x[i:i+m]+=s[:n-i]
    return x*.25
def riser(d):n=int(d*SR);t=np.arange(n)/SR;return hp(rng.standard_normal(n),400)*(t/d)**2*.5+np.sin(2*np.pi*np.cumsum(200+1200*(t/d)**2)/SR)*(t/d)**2*.15
def subdrop():n=int(1.0*SR);t=np.arange(n)/SR;return np.sin(2*np.pi*np.cumsum(90*np.exp(-t*2.5)+30)/SR)*env(n,.005,.5)
def slash():n=int(.25*SR);t=np.arange(n)/SR;return hp(rng.standard_normal(n),2000)*np.sin(np.pi*t/.25)**3*.6
# muzik trap 104bpm
bpm=104;b=60/bpm;roots=[43.65,43.65,38.89,41.2]
drops=[(W(2,4)-0.45,W(2,4)),(S(13)-0.5,S(13)),(W(26,1)-0.5,W(26,1)),(S(28)-0.4,S(28))]
def indrop(t):return any(a<=t<c for a,c in drops)
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
# pad
tt=np.arange(N)/SR;pad=np.zeros(N)
for f in[174.6,207.7,261.6,311.1]:pad+=np.sin(2*np.pi*f*tt+np.sin(2*np.pi*.2*tt))
mus+=lp(pad,1200)*.035
for a,c in drops: add(mus,a-1.0,riser(1.0),.6)
# sfx
add(sfx,0.0,impact(),.6)
add(sfx,W(0,1)+0.2,ding(),.4)
add(sfx,W(1,2),pop(),.9);add(sfx,W(1,2),impact(),.5)
add(sfx,W(1,2)+0.2,riser(W(2,4)-W(1,2)-0.2),.5)
add(sfx,W(2,4),impact(),.9);add(sfx,W(2,4),glitch(),.7);add(sfx,W(2,4),subdrop(),.7);add(sfx,W(2,4)+0.5,glitch(),.4)
for c in[S(3),S(5),S(9),S(14),S(19),S(23),S(26),S(28)]: add(sfx,c-0.25,whoosh(),.6)
add(sfx,S(3),pop(),.8);add(sfx,S(4),pop(),.6);add(sfx,W(4,4),sparkle(),.8);add(sfx,W(4,4),impact(),.45)
for i in[5,9,14,19,23]: add(sfx,S(i),impact(),.55);add(sfx,S(i),glitch(),.4)
add(sfx,W(6,3),pop(),.6);add(sfx,S(7),whoosh(.5),.5);add(sfx,S(8),pop(),.6);add(sfx,W(8,1),ding(),.4)
add(sfx,W(10,2),slash(),.5);add(sfx,S(11),impact(),.6);add(sfx,S(11),glitch(),.4)
add(sfx,S(12),riser(S(13)-S(12)),.6)
add(sfx,S(13),impact(),.9);add(sfx,S(13),sparkle(),.7);add(sfx,W(13,1),pop(),.5)
add(sfx,S(16),sparkle(),.6);add(sfx,S(17),impact(),.6);add(sfx,S(18),pop(),.6);add(sfx,W(18,2),slash(),.8);add(sfx,W(18,2),glitch(),.4)
add(sfx,S(21)+1.0,ding(),.45);add(sfx,S(22),impact(),.5)
add(sfx,W(24,6),pop(),.6);add(sfx,W(25,3),impact(),.5);add(sfx,W(25,3),whoosh(.5),.4)
for k in range(4): add(sfx,W(25,3)+0.4+k*0.45,pop(),.3)
add(sfx,S(26),impact(),.6);add(sfx,W(26,1),impact(),.9);add(sfx,W(26,1),glitch(),.6);add(sfx,W(26,1),subdrop(),.6)
add(sfx,W(27,5),sparkle(),.8);add(sfx,W(27,5),impact(),.45)
add(sfx,S(28),impact(),.7);add(sfx,S(28),sparkle(),.7);add(sfx,S(29),ding(),.5)
# voice + duck
sr,v=wavfile.read('vo.wav');v=v.astype(float);v=v.mean(1) if v.ndim>1 else v;v/=np.abs(v).max()+1e-9
if sr!=SR:
    v=np.interp(np.arange(int(len(v)*SR/sr))*sr/SR,np.arange(len(v)),v)
voice=np.zeros(N);voice[:min(N,len(v))]=v[:N]
e=np.abs(voice);w=int(.12*SR);e=np.convolve(e,np.ones(w)/w,'same');duck=1-0.6*np.clip(e/0.08,0,1)
mus*=duck
fade=np.clip((T-tt)/1.0,0,1)
from scipy.ndimage import maximum_filter1d
out=voice*0.9+mus*0.5*fade+sfx*0.4
ceil=0.85;env_=maximum_filter1d(np.abs(out),size=int(0.012*SR));need=np.minimum(1,ceil/np.maximum(env_,1e-9));g=np.ones(N)
a_=np.exp(-1/(0.005*SR));r_=np.exp(-1/(0.2*SR));cur=1.0
for i in range(N):
    v=need[i];cur=a_*cur+(1-a_)*v if v<cur else r_*cur+(1-r_)*v;g[i]=cur
la=int(0.005*SR);g=np.concatenate([g[la:],np.ones(la)]);out=np.clip(out*g,-0.95,0.95)
wavfile.write('audio.wav',SR,out.astype(np.float32))
print('ok',T)
