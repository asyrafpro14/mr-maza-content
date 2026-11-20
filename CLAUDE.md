# Mr Maza Content: SOP staff Claude

Repo ini ialah "pejabat" staff Claude untuk Mr Maza (Asyraf), pengasas Trade Like Maza (komuniti trading XAUUSD, Malaysia). Ia **public**: jangan simpan data client, link IB, token, password atau apa-apa maklumat sulit di sini.

## Struktur
- `queue.json`: giliran video. `status`: `menunggu-semakan` (belum lulus), `sedia` (boleh post), `posted`.
- `docs/videos/*.mp4`: video awam, dihos oleh GitHub Pages di `https://asyrafpro14.github.io/mr-maza-content/videos/<slug>.mp4` (URL ini yang diberi kepada Instagram).
- `engine/shared/`: `base.css`, `helpers.js` (animasi), `render.template.js` (Playwright → ffmpeg, 1080x1920 30fps), `master.sh` (loudnorm 2-pass + limiter; WAJIB guna untuk mux akhir).
- `engine/indicator/`: enjin siri indicator (chart + indicator sebenar dikira dengan formula). `lib.js` rangka video, `vN.js` config setiap video, `split.py` pecah satu fail suara batch kepada beberapa video, `audio.py` muzik trap + SFX + limiter, `events.js` buang masa event.
- `engine/legenda/`: enjin kisah legenda gaya emosi (contoh Mark Minervini). `split_keep.py` kekalkan jeda dramatik, `music.py` piano/strings. Mr Maza minta video legenda TANPA muzik latar (suara + SFX ringan sahaja: env MODE=sfx).
- `engine/lama/`: rujukan video terdahulu (Bollinger, SNR, Livermore, Fibo).

## Peraturan kandungan (wajib)
- Bahasa Melayu santai, suara Mr Maza (aku/kau). Tiada em dash.
- Hook 3 saat pertama: curiosity + catchy + masalah + desire. Mula dari SAKIT trader (blow akaun, kena SL, rasa nak berhenti), bukan sejarah kering.
- Mesti ada nilai yang orang nak SAVE (langkah, cheat sheet). Fokus teknikal & indicator.
- Fakta legenda/indicator mesti disemak dengan WebSearch sebelum skrip.
- Tiada janji untung, tiada signal/entry/SL/TP, tiada galakan lot/deposit besar. Setiap video ada "Pendidikan sahaja. Bukan nasihat kewangan."
- SRR/RSS, Kotak Hitam dan setup tandatangan Mr Maza: JANGAN buat skrip tanpa Asyraf sahkan konsep dahulu.
- Brand: navy #0F1B33, emas #E7CE7C, merah #E0465A, font Anton + Poppins.

## Suara
- ElevenLabs `creative_generate_speech`, model `eleven_v4`, voice_id `1uDSnuWUOvbosqTWAzfW` (Shahrul, Melayu), generations_count 1. Satu panggilan untuk SEMUA skrip batch (pisah perenggan dengan baris kosong) supaya Asyraf download satu fail sahaja.
- Sandbox tidak boleh muat turun dari ElevenLabs. Minta Asyraf download mp3 dan attach.
- Untuk video emosi boleh guna tag seperti [softly] [sad, slowly] [determined] [proudly]; buang tag dari scripts.txt yang dipakai split.py.
- Semak kredit dengan `account_get_usage` sebelum generate (pelan Creator, ~121k sebulan; satu video ~650 hingga 900).

## Aliran render (ringkas)
1. `scripts.txt` (satu perenggan setiap video) → `python3 split.py <mp3>` → `vN/tl.json`, `vN/vo.wav`.
2. Tulis/ubah `vN.js`, `python3 assemble.py N`, render frame semakan (`node vN/render.js frames t1 t2 ...`), buat contact sheet, betulkan pertindihan.
3. `node events.js vN && python3 audio.py vN N`, `node vN/render.js video`.
4. `bash engine/shared/master.sh vN/v.mp4 vN/audio.wav out.mp4` (puncak mesti bawah 0 dBFS; semak dengan astats).
5. Salin ke `docs/videos/<slug>.mp4` (mampat crf 25 jika > 25MB), tambah ke `queue.json` dengan status `menunggu-semakan`, commit & push.

## Git
- Klon: `git clone --depth 1 https://github.com/asyrafpro14/mr-maza-content` (guna add_repo dahulu jika repo belum dilampirkan).
- Push: `git -c push.negotiate=true push origin main`. Mesej commit dalam BM ringkas.

## Menerbitkan
- Instagram melalui Windsor.ai (connector `instagram`, akaun `17841407130745013` @asyraf_maza), aksi `create_video_post` dengan `video_url` URL Pages dan `caption` dari queue.
- SETIAP post awam perlukan "OK" daripada Asyraf dalam sesi itu. Tanpa OK, jangan post; laporkan apa yang sedia.
- TikTok: tiada API post. Hantar fail video + caption kepada Asyraf (SendUserFile) untuk dia upload sendiri.
- Selepas post: kemas kini `queue.json` (status `posted`, `ig_media_id`, `ig_posted_at`), commit & push.

## Organisasi staff (lihat ORG.md)
General Manager melapor kepada Asyraf. Di bawahnya: Content Creator (Threads + Telegram), Video Editor (produksi video), Marketing Director (strategi, analisis, penerbitan Instagram), Developer (kesihatan sistem dan connector).

## Log kerja (WAJIB untuk setiap staff)
Di akhir setiap run, tambah satu baris ke `logs/<YYYY-MM-DD>.md` (tarikh Asia/Kuching), cipta fail jika belum ada:
`- HH:MM | <Nama staff> | <apa yang dibuat> | <status: siap / tunggu OK Asyraf / gagal: sebab>`
Kemudian commit dan push (`git pull --rebase` dahulu jika push ditolak). General Manager membaca log ini untuk laporan.

## Brief strategi
`strategi/brief.md` ditulis oleh Marketing Director setiap minggu. Content Creator dan Video Editor WAJIB membacanya sebelum memilih topik dan hook.

## Arahan CEO
`strategi/arahan-ceo.md` mengandungi arahan terkini Asyraf (dicatat oleh General Manager). Semua staff WAJIB membacanya bersama brief; arahan CEO mengatasi brief.
