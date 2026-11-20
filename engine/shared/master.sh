# guna: master.sh video.mp4 audio.wav out.mp4  (loudnorm 2-pass linear, tiada clipping)
V=$1;A=$2;O=$3
J=$(ffmpeg -hide_banner -i "$A" -af loudnorm=I=-14:TP=-2:LRA=11:print_format=json -f null - 2>&1 | sed -n '/{/,/}/p')
g(){ echo "$J" | python3 -c "import json,sys;print(json.load(sys.stdin)['$1'])"; }
ffmpeg -y -loglevel error -i "$V" -i "$A" -map 0:v -map 1:a -c:v copy -af "loudnorm=I=-14:TP=-2:LRA=11:measured_I=$(g input_i):measured_TP=$(g input_tp):measured_LRA=$(g input_lra):measured_thresh=$(g input_thresh):offset=$(g target_offset):linear=true,alimiter=limit=0.84:attack=5:release=80:level=false,aresample=48000" -c:a aac -b:a 192k -shortest -movflags +faststart "${O%.mp4}.tmp.mp4" && mv "${O%.mp4}.tmp.mp4" "$O"
