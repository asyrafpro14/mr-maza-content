import re,json,sys,os
sc=open('scripts.txt').read().strip().split('\n\n')
for k,s in enumerate(sc):
    ph=[p.strip() for p in re.findall(r'[^,.?]+[,.?]',s)];t=0.05;P=[]
    for i,p in enumerate(ph):
        d=max(0.45,len(p)*0.062);ws=p.split();L=sum(len(w)+1 for w in ws);acc=0;words=[]
        for w in ws:words.append([w,round(t+0.03+(d-0.08)*acc/L,3)]);acc+=len(w)+1
        P.append({"i":i,"text":p,"start":round(t,3),"end":round(t+d,3),"words":words});t+=d+(0.08 if p.endswith(',') else 0.2)
    os.makedirs(f'v{k+1}',exist_ok=True)
    if not os.path.exists(f'v{k+1}/tl.json') or '--force' in sys.argv: json.dump({"total":round(t+0.5,3),"p":P},open(f'v{k+1}/tl.json','w'))
