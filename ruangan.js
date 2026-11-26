(function(){
  "use strict";

  /* ================= DATA — IDENTITAS GRUP SAJA =================
     Perintah user (25 Nov): "hapus dulu isinya, buat grupnya dulu
     aja" + "Website belum ada grupnya tuh" — seluruh ISI karya tiap
     grup DIHAPUS total (tidak ada daftar karya, detail, thumbnail,
     atau pemutar video). Yang tampil per monitor hanya
     identitas grup ala CUES KAPSEL (v3k): nomor + label, headline
     dua baris, dan nama-nama KATEGORI grup sebagai tab pill —
     bisa dipencet untuk mengganti tab aktif, area di bawah tab
     tetap kosong.
     Kategori Websites = 5 macam dari halaman live websites.html
     (hero "Company sites, landing pages, and online stores" + tab
     HP Undangan Digital / Portofolio). Brand: Kuliner / Beauty /
     Jasa & Tech. Video: Podcast / Explainer / Wawancara.

     v3r (perintah user: "Masukan lumera buy"): LUMÉRA dimasukkan
     lagi — HANYA di grup Websites, di bawah tab macamnya "Toko
     Online" (LUMÉRA = toko online yang benar-benar checkout).
     v3s (perintah user: "Ganti pratinjau lokal dulu"): tampilan
     putar v3r yang membingkai halaman live DIBUANG — dari berkas
     lokal situs live menolak dibingkai (ERR_BLOCKED_BY_CSP di HP
     user). Diganti SHOWCASE LOKAL bawaan berkas ini: baris karya ->
     detail -> showcase (hero + 5 produk The Night Collection) ->
     tampilan produk, semua dari berkas lokal. Tab Websites lain
     dan grup Brand / Video tetap struktur saja (tab tanpa isi).
     Semua gambar LUMÉRA adalah berkas LOKAL (lumera-thumb.jpg /
     lumera-wide.jpg dari hub-thumbs/ situs live; lumera-p1..p5.jpg
     = render close-up per produk dari halaman live, diperkecil
     <=480px) supaya tidak pernah pecah seperti di HP user pada
     v3p; versi embed menanam semuanya sebagai data URI. Satu-
     satunya tautan keluar: "Buka situs aslinya" ke halaman live
     LUMÉRA (toko interaktif aslinya). TANPA HARGA di showcase ini
     (aturan CarlLab: tidak ada harga publik di halaman ini),
     walau situs live LUMÉRA sendiri memasang harga.
     v3t (keluhan user di HP asli: "Gabisa di pencet parfumnya"):
     diagnosis elementFromPoint membuktikan botol di HERO showcase
     menelan ketukan tanpa aksi apa pun (hero = <img> polos) —
     sekarang ada 5 zona pencet transparan di atas hero sesuai
     urutan produk. Dan baris produk tidak lagi bergantung pada
     click sintetis saja: ketukan sentuh diproses langsung di
     touchend (ambang gerak 12px) + touch-action:manipulation,
     karena di viewer Android click di dalam badan yang bisa
     scroll gugur sebagai gestur scroll.
     v3u (perintah user: "Semuanya samain yang di CarlLab buy" +
     screenshot HP: tampilan produk Encre Marine meluber keluar
     display — bar atas terpotong, nama terpotong dua di tepi bawah
     bezel): SEMUA tampilan di layar disamakan ke komposisi bingkai
     HP situs live — bar atas TETAP di dalam kanvas, isi di SATU
     area scroll, tidak ada elemen terpotong di tepi. Tampilan
     produk: bar produk (‹ Koleksi + posisi + ✕) jadi bar atas
     kanvas, tab disembunyikan, foto tampil UTUH tanpa crop di
     panggung gelap 134px (sumbernya potret — cover pasti memotong
     botol), nama + baris notes pertama selalu terlihat pada paint
     pertama. Bar kembali detail/showcase dihoist keluar dari badan
     scroll jadi bar tetap. Jalur sentuh v3t tidak berubah.
     v3v (perintah user di HP asli pada versi LIVE /ruangan: "Pas di
     pencet buat full layar"): framing kedatangan dive diganti dari
     fit 88-92% (bezel + rim ruangan disisakan) menjadi COVER —
     display yang dipencet memenuhi seluruh panggung tepi-ke-tepi,
     tanpa dinding/bezel/rim. Konsekuensinya diatur di tiga tempat:
     diveTransform (skala cover + over-cover 1.04 + faktor cos(rotY)
     untuk monitor samping), correctFit (koreksi ukur sekarang
     menegakkan COVER, dibatasi kanvas), dan placeHub (skala
     tergambar kanvas dibatasi juga oleh ukuran panggung agar
     kanvas + tombol x tidak terpotong tepi viewport). Isi grup,
     jalur sentuh, iframe live + fallback lokal: TIDAK berubah.
     v3w (perintah user di HP asli pada versi LIVE: "Fullin buy
     tampilannya", membalas screenshot view live yang masih duduk
     di dalam kanvas hub ~336px di bawah bar hub): view LIVE kini
     TAKEOVER LAYAR PENUH — iframe situs asli dirender di lapisan
     .takeover (saudara .cam, inset:0 terhadap .stage = seluruh
     viewport panggung; di HP = 100vw x 100dvh), tanpa bar hub /
     tab / margin kanvas, jadi LUMÉRA tampil persis seperti dibuka
     layar penuh dan layout responsifnya sendiri yang berlaku.
     Keluar lewat chip melayang "‹ Kembali" (kanan-atas — pojok
     yang sengaja dikosongkan masthead HP situs asli; lihat
     ruangan.css) -> kembali ke DETAIL di dalam monitor, dari sana
     x bertahap seperti biasa. Deteksi fallback sama, tapi kini
     keluar dari takeover secara bersih ke showcase lokal DI DALAM
     kanvas (fallback tidak ikut takeover). Sisanya tidak berubah.
     v4 (25 Nov, perintah user: "Hapus semua buy" lalu basis baru
     "Tema ruangan untuk CarlLab" + "Mau kujadikan CarlLab"):
     seluruh proyek /ruangan versi lama DIHAPUS user (live + lokal),
     lalu dibangun ulang dari paket deploy terakhir di atas BASIS
     FOTO BARU — ruangan biasa yang hangat (bukan kapsul cyber):
     room-final.jpg 1920x1280 + room-portrait.jpg 1040x2352, tiga
     monitor lengkung melengkung dalam SATU busur di atas meja kayu,
     layar MATI/hitam saat diam. Quad diukur ulang dari piksel kedua
     foto baru (mask gelap lum<85; jahitan antar-panel dari klaster
     tepi vertikal baris atas: landscape 20.3/39.0/59.8/79.0,
     portrait 2.1/31.8/66.0/96.8). Perilaku final v3w dipertahankan
     utuh (grup + tab, LUMÉRA live takeover + fallback lokal, dive
     cover full layar, jalur touchend, tutup bertahap). DUA hal baru:
     (1) PERBAIKAN BUG CHIP yang ditemukan verifikasi live v3w —
     ketukan chip "‹ Kembali" kini WAJIB berhenti di DETAIL (konsumsi
     penuh stopPropagation/stopImmediatePropagation di handler chip
     click + touchend, penjaga klik-luar panggung membaca
     composedPath TANPA syarat takeover.hidden, plus stempel keluar
     takeover 600ms) — direproduksi-pertama di rig dengan klik mouse
     desktop polos (jalur yang gagal di live), lalu dibuktikan lolos
     di jalur mouse DAN sentuh. (2) EFEK MENYALA (perintah user dari
     video KAPSEL terbalik: "tiap di pencet menyala") — monitor yang
     dipencet MENYALA selama dive: lapisan cahaya hub (.power)
     menyala dengan ramp power-on monitor (backlight naik -> bloom
     singkat -> stabil) tersinkron dolly 1600ms, isi menyusul ramp
     terang; dua monitor lain tetap hitam. Saat kembali bertahap,
     layar yang sama PADAM lagi (power-off) sampai foto bersih utuh. */
  var GROUPS = {
    brand: { no:"01", label:"BRAND & LOGO",  l1:"Brand &", l2:"Logo.",
             tabs:["Kuliner", "Beauty", "Jasa & Tech"] },
    web:   { no:"02", label:"WEBSITES",      l1:"Our",     l2:"Websites.",
             tabs:["Company Site", "Landing Page", "Toko Online", "Undangan Digital", "Portofolio"] },
    video: { no:"03", label:"VIDEO EDITING", l1:"Video",   l2:"Editing.",
             tabs:["Podcast", "Explainer", "Wawancara"] }
  };
  var activeTab = 0;   /* tab kategori aktif di layar yang sedang terbuka */

  /* ================= LUMÉRA (v3s) — satu-satunya isi =================
     Keadaan tampilan di dalam layar Websites: main (identitas grup
     saja, seperti v3q) | list (baris LUMÉRA di tab Toko Online) |
     detail | live (situs asli via iframe TAKEOVER layar penuh —
     utama di deploy, sejak v3w) |
     show (showcase lokal — fallback otomatis) | prod (produk).
     Grup lain selalu "main". */
  var view = "main";
  var curProd = 0;     /* produk yang sedang dibuka di tampilan produk */
  var ABS = "https://carllab.web.id/";
  var WEB_TOKO = 2;    /* indeks tab "Toko Online" pada grup Websites */
  var LUMERA = {
    nm:"LUMÉRA", sb:"Maison de Parfum — Website · 2026",
    img:"lumera-thumb.jpg", wide:"lumera-wide.jpg",
    ds:"Situs rumah parfum LUMÉRA — koleksi The Night Collection berisi lima wewangian, lengkap dengan toko konsep dan checkout di dalamnya. Koleksinya bisa dipratinjau langsung di HP ini; toko interaktif aslinya berjalan penuh di situs live.",
    meta:[["Jenis","Website"],["Brand","LUMÉRA — Maison de Parfum"],["Koleksi","The Night Collection · 5 produk"],["Tahun","2026"]],
    url:ABS + "lumera.html"
  };
  /* 5 produk The Night Collection — nama + puisi + notes PERSIS dari
     data PRODUCTS halaman live LUMÉRA (versi Bahasa Indonesia).
     Harga SENGAJA tidak diambil (aturan tanpa harga publik).
     Gambar = render close-up per relung dari halaman yang sama,
     diperkecil <=480px (lumera-p1..p5.jpg). Baris daftar memakai
     notes jantung sebagai garis keluarga. */
  var LUMERA_PRODUCTS = [
    { nm:"Cendre d'Or", img:"lumera-p1.jpg",
      poem:"Cahaya bara yang terperangkap dalam kaca — resin hangat yang meleleh perlahan di atas batu yang dingin.",
      notes:[["Top","Mandarin · Kapulaga"],["Jantung","Resin Amber · Iris"],["Dasar","Cendana · Vanila · Tonka"]] },
    { nm:"Pivoine Noire", img:"lumera-p2.jpg",
      poem:"Peony yang mekar setelah gelap — kelopaknya sejuk seperti marmer yang baru dipoles.",
      notes:[["Top","Kismis Merah · Bergamot"],["Jantung","Peony · Air Mawar"],["Dasar","Musk · Cedar Terang"]] },
    { nm:"Sauge de Pierre", img:"lumera-p3.jpg",
      poem:"Daun sage yang diremas di atas granit basah — hijau, mineral, dan sangat tenang.",
      notes:[["Top","Clary Sage · Jeruk Bali"],["Jantung","Daun Zaitun · Neroli"],["Dasar","Vetiver · Amber Putih"]] },
    { nm:"Encre Marine", img:"lumera-p4.jpg",
      poem:"Air biru tinta di tengah malam — garam laut yang menempel pada kayu gelap.",
      notes:[["Top","Bergamot · Juniper"],["Jantung","Iris Biru · Daun Violet"],["Dasar","Kayu Apung · Musk Garam"]] },
    { nm:"Rouge Braise", img:"lumera-p5.jpg",
      poem:"Batu garnet yang diangkat ke cahaya lilin — plum gelap, rempah hangat, dan kulit yang lembut.",
      notes:[["Top","Plum Hitam · Kayu Manis"],["Jantung","Hibiskus · Teh Hitam"],["Dasar","Kulit · Mirra · Kakao"]] }
  ];
  var WEB_FOOT = "1 karya — ditampilkan langsung di HP ini.";
  function webContent(){ return curGroup === "web" && activeTab === WEB_TOKO; }

  /* Quad DISPLAY tiap monitor (persen dari foto, hasil ukur):
     BASIS BARU v4 — ruangan biasa (meja kayu, dinding krem).
     LANDSCAPE room-final.jpg 1920x1280 — kiri x 20.3-39.0
     y 47.11-63.05; tengah x 39.0-59.9 y 48.12-60.70; kanan
     x 59.9-79.1 y 47.27-62.80.
     PORTRAIT room-portrait.jpg 1040x2352 — kiri x 2.0-31.9
     y 57.74-68.66; tengah x 31.9-66.1 y 58.25-66.75; kanan
     x 66.1-96.9 y 57.78-68.30.
     Ketiga monitor adalah SATU busur lengkung kontinu; segmentasi
     L/C/R dari JAHITAN panel: klaster tepi vertikal pada baris atas
     busur (landscape 20.3/39.0/59.8/79.0; portrait 2.1/31.8/66.0/
     96.8 — tepi luar + dua jahitan). Tepi atas/bawah per kolom dari
     mask gelap (lum<85); kolom yang tertutup tower PC (kanan bawah
     panel kanan) dibuang dari sampel.
     Skala dive TIDAK lagi tetap: sejak v3v dihitung COVER — display
     yang dipencet memenuhi seluruh panggung tepi-ke-tepi saat dive
     mendarat (perintah user di HP asli pada versi live: "Pas di
     pencet buat full layar"); bezel/dinding/rim ruangan tidak
     terlihat lagi selama grup terbuka. Dulu (v3k-v3u) framing-nya
     fit 88-92% dengan bezel + rim sengaja disisakan — DITOLAK user.
     REKTANG DALAM (iy/ih per quad, % foto) = tepi display NYATA:
     iy = maks sampel tepi atas (5 kolom per monitor), tepi bawah
     dalam = min sampel tepi bawah pada kolom-kolom BERSIH (panel
     samping melengkung: tepi bawahnya naik di tengah panel —
     mis. landscape kanan: 60.5 di dekat jahitan, 57.8 di tengah,
     62.8 di ujung luar; strip dalam yang dijamin di dalam panel
     di semua kolom adalah 48.20-57.80). Cover dihitung dari
     rektang dalam ini; bbox tetap dipakai untuk lebar, geometri
     hub, dan zona pencet.
     rotY = perspektif trapesium monitor samping di foto (samakan
     .scr): lebar tampak panel samping / panel tengah ~= cos(24°). */
  /* v6 — RUANGAN BARU (gaming ungu-oranye, perintah user "Semuanya
     ganti ini") + LAYAR DOM: quad di bawah = bbox sudut kaca terukur
     di foto gelap room-baru-{l,p}.jpg; sudut pastinya di CORNERS. */
  var QUADS_L = {
    web:   { x:37.2, y:47.5, w:17.7, h:17.0, iy:47.8, ih:16.4, rotY:0,   org:"50% 50%" },
    brand: { x:17.0, y:46.9, w:19.6, h:19.2, iy:47.2, ih:18.6, rotY:24,  org:"100% 50%" },
    video: { x:55.5, y:47.9, w:19.4, h:18.6, iy:48.2, ih:18.0, rotY:-24, org:"0% 50%" }
  };
  var QUADS_P = {
    web:   { x:35.7, y:53.7, w:20.7, h:10.7, iy:54.0, ih:10.1, rotY:0,   org:"50% 50%" },
    brand: { x:14.5, y:53.5, w:20.8, h:11.7, iy:53.8, ih:11.1, rotY:24,  org:"100% 50%" },
    video: { x:56.8, y:53.9, w:20.8, h:11.5, iy:54.2, ih:10.9, rotY:-24, org:"0% 50%" }
  };
  /* Sudut kaca NYATA (TL, TR, BR, BL — % foto) untuk homografi
     .domscreen. DIUKUR ULANG 26 Nov dari foto GELAP yang benar-benar
     tampil sebagai dasar halaman (profil tepi blob gelap per kolom +
     inset bezel: atas/sisi 0,3%, bawah 0,75%). Ukuran lama berasal
     dari foto versi menyala — posisi monitornya bergeser ±2–3%. */
  var CORNERS_L = {
    brand: [[17.0,46.9],[36.6,47.5],[36.6,63.6],[17.0,66.1]],
    web:   [[37.2,47.5],[54.9,47.9],[54.9,64.5],[37.2,64.1]],
    video: [[55.5,47.9],[74.9,48.0],[74.9,66.5],[55.5,63.9]]
  };
  var CORNERS_P = {
    brand: [[14.5,53.5],[35.3,53.7],[35.3,63.9],[14.5,65.2]],
    web:   [[35.7,53.7],[56.4,53.9],[56.4,64.4],[35.7,64.1]],
    video: [[56.8,53.9],[77.6,54.0],[77.6,65.4],[56.8,64.0]]
  };
  function corners(key){ return (portrait() ? CORNERS_P : CORNERS_L)[key]; }
  /* Homografi: petakan persegi sumber (0,0),(w,0),(w,h),(0,h) ke
     empat titik tujuan (px bingkai foto). Selesaikan sistem 8x8
     (eliminasi Gauss) untuk koefisien a..h dengan penyebut
     (g*x + h*y + 1), lalu tulis sebagai matrix3d kolom-mayor. */
  function homography(sw, sh, dst){
    var src = [[0,0],[sw,0],[sw,sh],[0,sh]];
    var A = [], b = [];
    for(var i = 0; i < 4; i++){
      var x = src[i][0], y = src[i][1], X = dst[i][0], Y = dst[i][1];
      A.push([x, y, 1, 0, 0, 0, -X*x, -X*y]); b.push(X);
      A.push([0, 0, 0, x, y, 1, -Y*x, -Y*y]); b.push(Y);
    }
    for(var col = 0; col < 8; col++){
      var piv = col;
      for(var r2 = col + 1; r2 < 8; r2++) if(Math.abs(A[r2][col]) > Math.abs(A[piv][col])) piv = r2;
      var tmpA = A[col]; A[col] = A[piv]; A[piv] = tmpA;
      var tmpB = b[col]; b[col] = b[piv]; b[piv] = tmpB;
      var d = A[col][col] || 1e-12;
      for(var r3 = 0; r3 < 8; r3++){
        if(r3 === col) continue;
        var f = A[r3][col] / d;
        if(!f) continue;
        for(var c2 = col; c2 < 8; c2++) A[r3][c2] -= f * A[col][c2];
        b[r3] -= f * b[col];
      }
    }
    var s = [];
    for(var k = 0; k < 8; k++) s.push(b[k] / (A[k][k] || 1e-12));
    return "matrix3d(" + [s[0], s[3], 0, s[6], s[1], s[4], 0, s[7], 0, 0, 1, 0, s[2], s[5], 0, 1].map(function(v){ return v.toFixed(6); }).join(",") + ")";
  }
  var domScreens = document.querySelectorAll(".domscreen");
  function layoutScreens(){
    domScreens.forEach(function(el){
      var cs = corners(el.getAttribute("data-mon"));
      if(!cs) return;
      var dst = cs.map(function(p){ return [p[0]/100 * frame.w, p[1]/100 * frame.h]; });
      el.style.transform = homography(480, 270, dst);
    });
  }
  function quad(key){ return (portrait() ? QUADS_P : QUADS_L)[key]; }
  var lastDive = null;   /* {key, s, q} hasil dive terakhir — untuk ukuran hub */
  var DIVE_MS = 1600, RETURN_MS = 900;

  function esc(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;"); }
  function tabsHTML(){
    var g = GROUPS[curGroup], h = "";
    g.tabs.forEach(function(t, i){
      h += '<button class="tab' + (activeTab === i ? " on" : "") + '" type="button" data-tab="' + i + '">' + esc(t) + "</button>";
    });
    return h;
  }
  /* Perangkat sentuh: lepas fokus dari elemen yang baru disentuh.
     Browser Android/WebView menggambar ring fokus bawaan (oranye) pada
     elemen yang masih fokus; tombol zona selebar display penuh, jadi
     ring itu membingkai seluruh layar selama dive (cacat v3p di HP
     user pada grup Video + Websites). Di pointer halus fungsi ini
     tidak melakukan apa-apa (fokus keyboard tetap dihormati). */
  function blurIfTouch(){
    if(!window.matchMedia("(hover: hover) and (pointer: fine)").matches
       && document.activeElement && document.activeElement.blur){
      document.activeElement.blur();
    }
  }

  /* ================= PANGGUNG & DIVE ================= */
  var stage = document.getElementById("stage");
  var cam = document.getElementById("cam");
  var hub = document.getElementById("hub");
  var takeover = document.getElementById("takeover");
  var breath = cam.querySelector(".breath");

  /* Mode portrait: aspek viewport < 0.8 ATAU lebar <= 640px (samakan dgn CSS) */
  var MQ = window.matchMedia("(max-width: 640px), (max-aspect-ratio: 4/5)");
  function portrait(){ return MQ.matches; }

  /* Bingkai foto = rect gambar setelah object-fit:cover di dalam panggung.
     .breath diset persis ke rect ini (JS), jadi zona % dan titik dive selalu
     menempel di foto pada ukuran layar berapa pun. Landscape: rect = panggung. */
  var IMG_L = { w:1920, h:1280 }, IMG_P = { w:1184, h:2096 };
  var frame = { x:0, y:0, w:0, h:0 };
  function layout(){
    var r = stage.getBoundingClientRect();
    var im = portrait() ? IMG_P : IMG_L;
    var sc = Math.max(r.width / im.w, r.height / im.h);
    var fw = im.w * sc, fh = im.h * sc;
    frame = { x:(r.width - fw) / 2, y:(r.height - fh) / 2, w:fw, h:fh };
    breath.style.left = frame.x + "px"; breath.style.top = frame.y + "px";
    breath.style.width = frame.w + "px"; breath.style.height = frame.h + "px";
    layoutScreens();   /* v6: kunci layar DOM ke sudut kaca foto aktif */
  }

  var state = "idle";            /* idle | diving | open | returning */
  var curGroup = null;
  var timers = [];
  function later(fn, ms){ timers.push(setTimeout(fn, ms)); }
  function clearTimers(){ timers.forEach(clearTimeout); timers = []; }

  /* Keadaan transform dive disimpan sebagai (origin, translasi, skala)
     agar koreksi hasil UKUR (correctFit) bisa menulis ulang transform
     yang sama persis. Peta render: R(p) = O + t + s*(p - O). */
  var diveO = { x:0, y:0 }, diveT = { x:0, y:0 }, diveS = 1;
  function applyCam(){
    cam.style.transformOrigin = diveO.x.toFixed(1) + "px " + diveO.y.toFixed(1) + "px";
    cam.style.transform = "translate(" + diveT.x.toFixed(1) + "px," + diveT.y.toFixed(1) + "px) scale(" + diveS.toFixed(4) + ")";
  }
  function diveTransform(key){
    var q = quad(key), r = stage.getBoundingClientRect();
    var px = frame.x + (q.x + q.w/2)/100 * frame.w;   /* pusat quad (x) dlm koordinat panggung */
    var py = frame.y + (q.y + q.h/2)/100 * frame.h;   /* pusat quad (y) */
    /* v7.1 — DIVE = FIT MONITOR KE PANGGUNG (perintah user 26 Nov
       14:30: "Kotaknya sesuaikan monitornya buy"). Sejak v7.1 kotak
       hub = monitor itu sendiri (kanvas mengisi hub penuh), jadi
       kamera tidak lagi COVER (yang memotong sisi kotak di HP tegak:
       monitor hampir persegi dipaksa menutupi panggung tinggi)
       melainkan FIT: seluruh monitor tampil utuh di tengah panggung
       (margin 4px), di semua orientasi sama. Lebar efektif monitor
       samping dikali cos(rotY) — proyeksi trapesiumnya menyempit
       secara horizontal. correctFit tinggal mengoreksi sisa ukur. */
    var effW = (q.w/100 * frame.w) * (q.rotY ? Math.cos(q.rotY * Math.PI/180) : 1);
    var qh = q.h/100 * frame.h;
    var s = Math.min((r.width - 8) / effW, (r.height - 8) / qh);
    lastDive = { key:key, s:s, q:q };
    diveO = { x:px, y:py }; diveS = s;
    diveT = { x:r.width/2 - px, y:r.height/2 - py };
    applyCam();
  }
  /* KOREKSI COVER BERBASIS UKURAN NYATA (v3v; menggantikan koreksi
     fit v3m yang MENYUSUTKAN display ke dalam [8, W-8]x[6, H-6]).
     Setelah dive mendarat: (1) rect HUB diukur lalu digelembungkan
     balik sebesar inset-nya (hub = quad x (1-2*HUB_INSET), konsentris
     dengan quad) menjadi proksi rect DISPLAY — lebarnya dari bbox
     quad, TINGGI dan PUSATNYA dari rektang dalam (iy/ih), karena
     hanya rektang dalam yang menjamin tepi display nyata (bukan
     dinding/bezel) yang menutupi panggung; (2) bila proksi itu
     belum MENUTUPI panggung atau pusatnya meleset > 3px, transform
     ditulis ulang dari hasil ukur: R2(p) = Sc + cs*(R(p) - Mc) ->
     s' = cs*s, t' = Sc + cs*(O + t - Mc) - O, Mc = pusat hub terukur;
     (3) cs DIBATASI kanvas .screen: faktor terbesar yang menjaga
     kanvas tetap utuh di dalam panggung (margin 4px) MENANG atas
     cover — kanvas tidak boleh terpotong. Karena dive analitik
     sudah over-cover 1.04 dan placeHub membatasi skala tergambar
     kanvas dari ukuran panggung, kedua syarat praktis selalu
     terpenuhi bersamaan; bila suatu perangkat memaksa konflik,
     kanvas yang didahulukan dan display bisa kurang-cover < 1%. */
  function correctFit(){
    if(!curGroup || (state !== "open" && state !== "diving")) return;
    if(!hub || hub.hidden) return;
    var sr = stage.getBoundingClientRect();
    var hr = hub.getBoundingClientRect();
    if(hr.width < 10 || sr.width < 10) return;
    /* v7.1: koreksi = FIT hub ke panggung + pusatkan pusat hub.
       (Logika proksi rektang-dalam + cap kanvas lama dibuang: kotak
       sekarang = hub itu sendiri, jadi yang dijaga pas adalah hub.) */
    var mcx = hr.left - sr.left + hr.width/2, mcy = hr.top - sr.top + hr.height/2;
    var dx = sr.width/2 - mcx, dy = sr.height/2 - mcy;
    var csFit = Math.min((sr.width - 8) / hr.width, (sr.height - 8) / hr.height);
    var cs = csFit < 1 ? csFit : 1;
    if(Math.abs(cs - 1) < 0.002 && Math.abs(dx) < 3 && Math.abs(dy) < 3) return;
    cs = Math.max(cs, 0.5);
    var t2x = sr.width/2  + cs * (diveO.x + diveT.x - mcx) - diveO.x;
    var t2y = sr.height/2 + cs * (diveO.y + diveT.y - mcy) - diveO.y;
    diveS = diveS * cs; diveT = { x:t2x, y:t2y };
    lastDive.s = diveS;
    cam.style.transition = "none"; applyCam(); void cam.offsetWidth; cam.style.transition = "";
    placeHub();   /* skala kanvas .screen bergantung pada s — hitung ulang */
  }
  /* Hub v3i = teks display di DALAM bingkai foto (anak .breath).
     Akar masalah v3h: hub adalah elemen stage-level ber-background yang
     ukurannya = bounding box sumbu-lurus dari quad, lalu pose trapesiumnya
     DILURUSKAN (rotateY->0) di akhir — sementara display asli di foto
     adalah trapesium miring yang tertulis di dalam bbox itu. Kotak bbox
     ber-tint + backdrop-filter pasti tumpah ke dinding/bezel di sudut-
     sudutnya, dan label di pojok kiri-atas mendarat di luar layar.
     Perbaikan: hub ditaruh di koordinat foto (ikut napas Ken Burns DAN
     dive secara identik — tidak ada lagi rumus ukuran terpisah, cap
     tinggi, atau drift), ukurannya quad display di-inset 1.5% tiap sisi,
     pose rotateY trapesium dipertahankan sampai akhir (seperti teks
     layar KAPSEL yang ter-warp homography), dan background dihapus
     total: yang terlihat hanya teks di atas piksel layar sendiri. */
  var HUB_INSET = 0.015;   /* 1.5% dari ukuran display, tiap sisi */
  function placeHub(){
    if(!lastDive) return;
    var q = lastDive.q;
    hub.style.left   = (q.x + q.w * HUB_INSET).toFixed(3) + "%";
    hub.style.top    = (q.y + q.h * HUB_INSET).toFixed(3) + "%";
    hub.style.width  = (q.w * (1 - 2 * HUB_INSET)).toFixed(3) + "%";
    hub.style.height = (q.h * (1 - 2 * HUB_INSET)).toFixed(3) + "%";
    hub.style.transformOrigin = q.org;
    hub.style.transform = "rotateY(" + q.rotY + "deg)";
    hub.classList.toggle("tilt", q.rotY !== 0);
    /* v7.1 — KOTAK MENYESUAIKAN MONITOR (perintah user 26 Nov 14:30:
       "Kotaknya sesuaikan monitornya buy"). Kanvas tidak lagi ukuran
       tetap 340x280 yang mengambang di tengah layar: lebar kanvas
       tetap 340, TINGGI kanvas dihitung dari rasio hub monitor yang
       dipencet (clamp 230..380 agar tipografi tetap waras), lalu
       skala k mengisi hub SEPENUHNYA (faktor 0.998) — jendela =
       layar monitor itu sendiri, seperti aplikasi dibuka full-screen.
       Cap skala-tergambar 1.2 + cap panggung lama DICABUT: keduanya
       memang dibuat untuk jendela mengambang, bukan layar penuh.
       correctFit tetap menjaga seluruh kanvas terlihat di panggung
       (rect kanvas kini ≈ rect hub ≈ rect display). */
    var sc = document.getElementById("screen");
    if(sc && lastDive.s > 0){
      var Hw = q.w * (1 - 2 * HUB_INSET) / 100 * frame.w;
      var Hh = q.h * (1 - 2 * HUB_INSET) / 100 * frame.h;
      var cH = Math.round(340 * Hh / Hw);
      cH = Math.max(230, Math.min(380, cH));
      sc.style.width = "340px";
      sc.style.height = cH + "px";
      var k = Math.min(Hw / 340, Hh / cH) * 0.998;
      sc.style.transform = "scale(" + k.toFixed(4) + ")";
    }
  }
  /* ---------- LUMÉRA: baris / detail / showcase lokal (v3s) ---------- */
  function metaHTML(meta, cls){
    var h = '<dl class="dmeta' + (cls ? " " + cls : "") + '">';
    meta.forEach(function(m){ h += "<div><dt>" + esc(m[0]) + "</dt><dd>" + esc(m[1]) + "</dd></div>"; });
    return h + "</dl>";
  }
  function listHTML(){
    return '<p class="note">Toko Online — 1 karya</p>'
      + '<div class="rows">'
      + '<button class="row" type="button" data-work="0"><img class="timg sq" alt="" src="' + LUMERA.img + '">'
      + '<span class="rtx"><span class="rnm">' + esc(LUMERA.nm) + '</span><span class="rsb">' + esc(LUMERA.sb) + "</span></span>"
      + '<span class="arw">\u203a</span></button>'
      + "</div>"
      + '<p class="foot">' + esc(WEB_FOOT) + "</p>";
  }
  function detailHTML(){
    /* v3u: bar kembali BUKAN di sini lagi — ia tetap (viewbar) di
       luar badan scroll, dirender oleh renderScreen. */
    return '<div class="hero"><img alt="" src="' + LUMERA.wide + '"><b>' + esc(LUMERA.nm) + "</b></div>"
      + '<p class="rsb" style="white-space:normal">' + esc(LUMERA.sb) + "</p>"
      + metaHTML(LUMERA.meta)
      + '<p class="dds" style="margin-top:7px">' + esc(LUMERA.ds) + "</p>"
      + '<button class="pbtn" type="button" data-play>Lihat di HP ini</button>'
      + '<a class="lbtn" href="' + LUMERA.url + '" target="_blank" rel="noopener">Buka situs aslinya \u2197</a>';
  }
  /* Showcase LOKAL: kepala LUMÉRA + The Night Collection, hero wide,
     lalu 5 produk sebagai daftar ala HP (gambar + nama + garis
     keluarga). Semua gambar berkas lokal / data URI — nol jaringan.
     Di bawahnya tautan teks ke toko interaktif aslinya. */
  function heroZonesHTML(){
    var h = '<span class="herozones" aria-hidden="false">';
    LUMERA_PRODUCTS.forEach(function(p, i){
      h += '<button class="herozone" type="button" data-prod="' + i + '" aria-label="Buka produk ' + esc(p.nm) + '"></button>';
    });
    return h + "</span>";
  }
  function showHTML(){
    /* v3u: bar (‹ Detail + nama) dihoist jadi viewbar tetap oleh
       renderScreen — di sini tinggal isi scroll-nya. */
    var h = '<p class="note">The Night Collection \u00b7 5 wewangian</p>'
      + '<div class="hero"><img alt="" src="' + LUMERA.wide + '"><b>The Night Collection</b>' + heroZonesHTML() + '</div>'
      + '<div class="rows">';
    LUMERA_PRODUCTS.forEach(function(p, i){
      h += '<button class="row" type="button" data-prod="' + i + '"><img class="timg" alt="" src="' + p.img + '">'
        + '<span class="rtx"><span class="rnm">' + esc(p.nm) + '</span><span class="rsb">' + esc(p.notes[1][1]) + "</span></span>"
        + '<span class="arw">\u203a</span></button>';
    });
    return h + "</div>"
      + '<a class="lbtn" href="' + LUMERA.url + '" target="_blank" rel="noopener">Buka situs aslinya \u2197</a>';
  }
  /* Tampilan produk (v3u): bar atas (‹ Koleksi + posisi n / 5 + ✕)
     adalah .scr-top kanvas — tetap, di luar scroll (lihat
     renderScreen). Badan scroll hanya berisi: foto utuh di panggung
     gelap + nama + puisi + notes lengkap, diukur agar pada paint
     pertama terlihat bar + botol utuh + nama penuh + baris notes
     pertama. Tanpa harga (aturan CarlLab untuk halaman ini). */
  function prodHTML(){
    var p = LUMERA_PRODUCTS[curProd];
    return '<div class="prodstage"><img alt="" src="' + p.img + '"></div>'
      + '<p class="pnm">' + esc(p.nm) + "</p>"
      + '<p class="dds poem">' + esc(p.poem) + "</p>"
      + metaHTML(p.notes, "prodmeta");
  }

  /* ---------- TAMPILAN LIVE (deploy): iframe situs asli + fallback ----------
     data-play membuka view "live": iframe same-origin /lumera.html.
     v3w: iframe TIDAK lagi dirender di badan kanvas hub — ia masuk
     lapisan TAKEOVER layar penuh (.takeover, lihat showTakeover),
     dan hub di belakangnya hanya memuat placeholder. Konfirmasi
     positif wajib: dokumen iframe bisa diakses (same-origin),
     URL-nya lumera.html, dan teks badannya memuat "LUMÉRA". Bila dalam
     ±4 detik tidak terkonfirmasi (terblokir CSP/X-Frame, 404, error),
     ATAU dokumen selesai dimuat tapi terbukti bukan LUMÉRA, takeover
     ditutup bersih dan tampilan ditukar otomatis ke showcase lokal
     ("show") DI DALAM kanvas — layar tidak pernah menampilkan
     halaman error browser, dan fallback tidak pernah ikut takeover. */
  var liveSeq = 0, liveTimer = null;
  /* Stempel waktu keluar terakhir dari takeover (diisi exitLive).
     Dipakai penjaga klik-luar di panggung: klik yang menutup
     takeover tidak boleh ikut menutup grup pada dispatch yang sama. */
  var lastTakeoverExit = 0;
  var lastViewChange = 0;   /* v4.1: stempel render view terakhir (penjaga klik-luar) */
  function clearLiveTimer(){ if(liveTimer){ clearTimeout(liveTimer); liveTimer = null; } }
  function liveFallback(seq){
    if(seq !== liveSeq) return;
    if(view !== "live" || (state !== "open" && state !== "diving")) return;
    hideTakeover();
    view = "show"; renderScreen();
  }
  /* TAKEOVER (v3w): tampilkan/sembunyikan lapisan layar penuh.
     showTakeover merender iframe + chip "‹ Kembali" ke .takeover;
     hideTakeover mengosongkannya lagi (iframe dibuang = muatannya
     berhenti) dan membatalkan cek fallback yang menggantung lewat
     liveSeq++ — pola yang sama seperti liveSeq++ di closeGroup. */
  function showTakeover(){
    takeover.innerHTML = liveHTML()
      + '<button class="backchip" type="button" data-backlive aria-label="Kembali ke detail LUM\u00c9RA">\u2039 Kembali</button>';
    takeover.hidden = false;
    document.body.classList.add("live-open");   /* pil nav disembunyikan selama takeover (lihat CSS) */
  }
  function hideTakeover(){
    document.body.classList.remove("live-open");
    if(takeover.hidden && !takeover.innerHTML) return;
    takeover.hidden = true;
    /* v4.1: pengosongan DOM DITUNDA 400ms — selama jendela ini chip
       masih ada di DOM, jadi klik susulan dari ketukan yang sama tetap
       terarah ke lapisan takeover dan tertangkap penjaga capture,
       bukan jatuh ke lapisan ruangan. */
    setTimeout(function(){ if(takeover.hidden) takeover.innerHTML = ""; }, 400);
    liveSeq++;
    clearLiveTimer();
  }
  /* Keluar dari live: tutup takeover, kembali ke DETAIL di dalam
     monitor (keadaan sebelum "Lihat di HP ini" dipencet). */
  function exitLive(){
    lastTakeoverExit = Date.now();
    hideTakeover();
    view = "list"; renderScreen();   /* v4.4: kembali dari live langsung ke DAFTAR — view detail dihapus dari alur atas perintah user (pencet LUMÉRA langsung situsnya full) */
  }
  function armLiveFrame(){
    var seq = ++liveSeq;
    clearLiveTimer();
    var f = takeover.querySelector("iframe.liveframe");
    if(!f){ liveFallback(seq); return; }
    var done = false;
    function check(){
      if(done || seq !== liveSeq) return;
      var ok = false;
      try {
        var d = f.contentWindow.document;
        ok = !!d && /lumera\.html/.test(d.URL || "") && !!d.body
             && /LUM\u00c9RA/.test(d.body.innerText || "");
      } catch(e){ ok = false; }
      if(ok){ done = true; clearLiveTimer(); return; }
      /* dokumen termuat tapi terbukti BUKAN LUMÉRA (mis. halaman 404):
         jangan tunggu tenggat — langsung fallback. Dokumen about:blank
         sesaat (navigasi belum mulai) tidak dihitung sebagai bukti. */
      var url = "";
      try { url = f.contentWindow.location.href || ""; } catch(e){ url = "inaccessible"; }
      if(url && url !== "about:blank") liveFallback(seq);
    }
    f.addEventListener("load", function(){ setTimeout(check, 350); });
    liveTimer = setTimeout(function(){ if(!done) liveFallback(seq); }, 4000);
  }
  function liveHTML(){
    return '<iframe class="liveframe" src="/lumera.html" title="Situs live LUM\u00c9RA di dalam monitor" loading="eager"></iframe>';
  }
  /* Render seluruh isi layar. Mode identitas (view "main") = markup
     v3q persis: label + angka + headline + tab, tanpa badan isi.
     Mode isi (khusus Websites tab Toko Online): angka/headline
     diganti badan layar (daftar/detail/showcase/produk) di bawah tab. */
  function renderScreen(){
    clearLiveTimer();
    lastViewChange = Date.now();   /* v4.1 */
    var g = GROUPS[curGroup];
    var content = (view !== "main");
    /* v3u — STANDAR PAS CARLLAB LIVE untuk semua tampilan di layar:
       bar atas TETAP di dalam kanvas, isi di SATU area scroll di
       bawahnya, tidak ada elemen terpotong di tepi kanvas.
       - tampilan produk: .scr-top-nya adalah bar produk itu sendiri
         (‹ Koleksi + posisi n / 5 + ✕) dan tab grup tidak dirender —
         badan scroll jadi lega untuk foto + nama + notes.
       - detail/showcase: bar kembali (‹ Grup / ‹ Detail) dihoist
         jadi .viewbar tetap di antara tab dan badan scroll (di v3t
         ia di dalam scroll: ikut terseret dan terpotong di tepi). */
    var top;
    if(view === "prod"){
      top = '<div class="scr-top"><button class="backbar" type="button" data-backprod>\u2039 Koleksi</button>'
        + '<span class="prodpos">' + (curProd + 1) + " / " + LUMERA_PRODUCTS.length + '</span>'
        + '<button class="xbtn" type="button" data-close aria-label="Tutup grup">\u2715</button></div>';
    } else {
      top = '<div class="scr-top"><span class="scr-label"><span class="no">' + g.no + '</span> \u00b7 ' + g.label + '</span>'
        + '<button class="xbtn" type="button" data-close aria-label="Tutup grup">\u2715</button></div>';
    }
    var h = '<div class="view scr-view"><img class="deskbg" src="win11-desktop.jpg" alt="" aria-hidden="true"><div class="power" aria-hidden="true"></div><div class="screen' + (content ? " content" : "") + '" id="screen">'
      + top;
    if(content){
      if(view !== "prod") h += '<div class="tabs" id="uiTabs">' + tabsHTML() + '</div>';
      if(view === "detail") h += '<div class="bar viewbar"><button class="backbar" type="button" data-back>\u2039 Grup</button></div>';
      if(view === "show") h += '<div class="bar viewbar"><button class="backbar" type="button" data-backshow>\u2039 Grup</button><b>' + esc(LUMERA.nm) + '</b></div>';
      if(view === "live") h += '<div class="bar viewbar"><button class="backbar" type="button" data-backlive>\u2039 Detail</button><b>' + esc(LUMERA.nm) + '</b></div>';
      if(view === "live"){
        /* v3w: badan kanvas hanya placeholder — situs aslinya tampil
           di lapisan TAKEOVER layar penuh di atas seluruh panggung
           (showTakeover di akhir render ini), bukan di sini lagi. */
        h += '<div class="scr-body fill" id="uiBody"><p class="note">Situs live dibuka memenuhi layar\u2026</p></div>';
      } else {
        h += '<div class="scr-body" id="uiBody">'
          + (view === "list" ? listHTML() : view === "detail" ? detailHTML() : view === "show" ? showHTML() : prodHTML())
          + "</div>";
      }
    } else {
      h += '<div class="scr-mid"><span class="scr-num" aria-hidden="true">' + g.no + '</span>'
        + '<div class="scr-head"><span class="l1">' + esc(g.l1) + '</span><span class="l2">' + esc(g.l2) + '</span></div></div>'
        + '<div class="tabs" id="uiTabs">' + tabsHTML() + '</div>';
    }
    hub.innerHTML = h + "</div></div>";
    placeHub();   /* skala kanvas .screen dihitung ulang tiap render */
    if(view === "live"){ showTakeover(); armLiveFrame(); }
  }
  function renderHub(){
    /* Websites dibuka langsung di tab Toko Online — tab satu-satunya
       yang berisi (LUMÉRA). Grup lain mulai dari tab pertama. */
    activeTab = (curGroup === "web") ? WEB_TOKO : 0;
    view = webContent() ? "list" : "main";
    renderScreen();
  }
  /* Tutup bertahap: produk -> showcase -> detail -> daftar ->
     keluar zoom. Di mode identitas (view "main") langsung keluar,
     seperti v3q. */
  function backOrClose(){
    if(view === "prod"){ view = "show"; renderScreen(); return; }
    if(view === "live"){ exitLive(); return; }
    if(view === "show"){ view = "list"; renderScreen(); return; }
    if(view === "detail"){ view = "list"; renderScreen(); return; }
    closeGroup();
  }
  function openGroup(key){
    if(state === "diving" || state === "returning") return;
    if(state === "open" && curGroup === key) return;
    if(state === "open" && curGroup !== key){          /* ganti monitor: zoom out dulu, lalu dive ke yang baru */
      closeGroup(function(){ openGroup(key); });
      return;
    }
    curGroup = key;
    stage.classList.remove("awake");   /* v4.6: lapisan nyala padam begitu dive mulai */
    blurIfTouch();   /* lepas ring fokus oranye dari tombol zona sejak dive mulai */
    state = "diving";
    stage.classList.remove("returning");
    stage.classList.add("zoomed");
    diveTransform(key);
    renderHub();
    placeHub();                                   /* geometri foto + pose trapesium, tetap sampai akhir */
    hub.hidden = false;
    hub.classList.add("powering");   /* v4: monitor MENYALA sejak dive mulai — lapisan .power menjalankan ramp power-on 1500ms tersinkron dolly */
    later(function(){ hub.classList.add("show"); }, 700);        /* isi layar menyusul ramp terang di tengah dolly 1600ms */
    later(function(){
      if(state === "diving") state = "open";
      correctFit();   /* ukur rect nyata display; paksa pas di viewport */
      later(correctFit, 450);   /* v7.1: sapuan kedua setelah transisi benar-benar diam — koreksi pertama bisa membaca rect tengah-terbang */
      /* fokus ke x hanya untuk pointer halus/keyboard — di layar sentuh
         JANGAN autofocus (kotak fokus oranye bawaan browser merusak layar) */
      if(window.matchMedia("(hover: hover) and (pointer: fine)").matches){
        var x = hub.querySelector("[data-close]"); if(x) x.focus({preventScroll:true});
      } else {
        blurIfTouch();   /* sentuh: pastikan tidak ada fokus tertinggal di elemen mana pun */
      }
    }, DIVE_MS);
  }

  function closeGroup(done){
    if(state === "idle") { if(done) done(); return; }
    clearTimers(); clearLiveTimer(); liveSeq++;
    hideTakeover();   /* v3w: takeover live tidak boleh tertinggal di atas ruangan */
    state = "returning";
    hub.classList.remove("show");   /* isi meredup duluan (ramp .screen) */
    /* v4 power-off: cahaya layar menyusul padam di tengah jalan
       pulang — .powering dilepas +350ms, glow memudar saat kamera
       mundur, dan pada rest foto kembali hitam bersih utuh. */
    later(function(){ hub.classList.remove("powering"); }, 350);
    stage.classList.remove("zoomed");
    stage.classList.add("returning");
    cam.style.transform = "";
    later(function(){
      hub.hidden = true;
      hub.innerHTML = "";   /* konten layar dibersihkan total */
      stage.classList.remove("returning");
      state = "idle"; curGroup = null; view = "main";
      wakeNow();   /* v4.5: kembali ke ruangan = monitor menyala lagi */
      if(done) done();
    }, RETURN_MS);
  }

  document.querySelectorAll("[data-open]").forEach(function(btn){
    btn.addEventListener("click", function(){ openGroup(btn.getAttribute("data-open")); });
  });
  /* klik di mana pun di panggung di luar display = tutup (pengganti scrim) */
  stage.addEventListener("click", function(e){
    /* composedPath, BUKAN hub.contains(e.target): handler hub mengganti
       innerHTML tab saat klik diproses (elemen yang diklik bisa terlepas
       dari DOM sebelum event selesai bubbling), jadi contains() bisa
       false untuk klik yang sah di dalam hub — path saat dispatch
       yang benar. */
    /* v3w: ketukan pada lapisan takeover (chip kembali) BUKAN klik
       di luar display — jangan tutup grup karenanya. (Ketukan di
       dalam iframe sendiri tidak pernah mencapai dokumen induk.)
       PERBAIKAN pasca-verifikasi live: syarat "!takeover.hidden"
       dibuang — handler chip menjalankan exitLive() LEBIH DULU pada
       dispatch yang sama (takeover terlanjur hidden saat giliran
       handler panggung tiba), jadi syarat itu menggugurkan penjaga
       ini dan klik yang sama ikut menutup grup (lompat lurus ke
       ruangan). Path saat dispatch adalah bukti asal klik, bukan
       keadaan sesudahnya. Lapisan pertahanan kedua: klik-luar
       diabaikan 600ms setelah takeover ditutup lewat exitLive. */
    if(e.composedPath().indexOf(takeover) !== -1) return;
    if(Date.now() - lastTakeoverExit < 1200) return;
    if(Date.now() - lastViewChange < 1000) return;
    if(state !== "open") return;
    /* v4.1 — WHITELIST POSITIF: grup hanya tertutup bila target klik
       PERSIS lapisan ruangan (panggung/cam/breath/foto/veil). Klik dari
       elemen UI mana pun, sisa lapisan, atau klik sintetis susulan yang
       terarah ulang setelah takeover hilang TIDAK PERNAH menutup grup. */
    /* v4.2 — klik-luar TIDAK LAGI menutup grup (dihapus total: jalur
       inilah satu-satunya jalan klik tak bertombol menuju closeGroup,
       dan di browser live ia terpicu oleh klik susulan dari ketukan
       chip yang jatuh ke lapisan ruangan sesudah takeover hilang —
       6x reproduksi. Menutup grup sekarang HANYA lewat tombol ✕ di
       layar dan tombol Escape, yang terverifikasi benar.) */
    return;
  });

  /* Aksi hub dipakai bersama oleh jalur click (mouse/keyboard) dan
     jalur touchend (v3t). Mengembalikan true bila ketukan tertangani. */
  function hubAction(t){
    if(!t || !t.closest) return false;
    if(state !== "open" && state !== "diving") return false;
    /* v4.3 — KUNCI INPUT PASCA-GANTI-VIEW: aksi apa pun dalam 600ms
       sesudah render view terakhir DIBUANG. Sesudah chip menjalankan
       exitLive, view DETAIL muncul dengan tombol ✕ TEPAT di titik
       layar yang sama dengan chip barusan — kejadian susulan dari
       ketukan yang sama (click sintetis pasca-touchend / dispatch
       kedua) mendarat di ✕ itu dan memutar backOrClose berantai
       (detail → daftar → ruangan) dalam satu kedipan: itulah
       lompatan chip (7x reproduksi; Escape & ✕ manual sehat karena
       tidak ada view baru yang muncul di bawah kursornya). Manusia
       tidak mungkin menekan aksi berikut <600ms sesudah view berganti
       (rantai ✕ tetap nyaman dipakai), jadi kunci ini hanya memakan
       kejadian sintetis. */
    if(Date.now() - lastViewChange < 600) return false;
    if(t.closest("[data-close]")){ backOrClose(); return true; }
    if(state !== "open") return false;
    var tb = t.closest("[data-tab]");
    if(tb){
      /* ganti tab aktif: Websites tab Toko Online membuka daftar
         LUMÉRA; tab/grup lain kembali ke identitas (area di bawah
         tab tetap kosong) */
      activeTab = +tb.getAttribute("data-tab");
      view = webContent() ? "list" : "main";
      renderScreen();
      blurIfTouch();
      return true;
    }
    if(!webContent()) return false;
    if(t.closest("[data-work]")){ view = "live"; renderScreen(); return true; }
    if(t.closest("[data-play]")){ view = "live"; renderScreen(); return true; }
    if(t.closest("[data-backlive]")){ exitLive(); return true; }
    var pr = t.closest("[data-prod]");
    if(pr){ curProd = +pr.getAttribute("data-prod"); view = "prod"; renderScreen(); return true; }
    if(t.closest("[data-backprod]")){ view = "show"; renderScreen(); return true; }
    if(t.closest("[data-backshow]")){ view = "list"; renderScreen(); return true; }
    if(t.closest("[data-back]")){ view = "list"; renderScreen(); return true; }
    return false;
  }
  hub.addEventListener("click", function(e){
    /* click sintetis yang menyusul touchend yang sudah tertangani
       dibuang — kalau tidak, aksinya jalan dua kali (mis. membuka
       produk lalu "kembali" sendiri oleh klik kedua). */
    if(Date.now() - lastTouchAction < 800) return;
    hubAction(e.target);
  });

  /* v3w — CHIP KEMBALI di lapisan takeover. Chip adalah satu-satunya
     elemen dokumen induk yang bisa dipencet selama takeover (sisanya
     wilayah iframe, dokumen terpisah). Jalur ganda seperti hub:
     click biasa + touchend langsung (ambang gerak/waktu yang sama
     dengan jalur sentuh hub v3t) dengan stempel dedupe bersama,
     supaya ketukan chip tidak pernah gugur atau jalan dua kali. */
  takeover.addEventListener("click", function(e){
    if(e.target.closest && e.target.closest("[data-backlive]")) e.stopPropagation();
    if(Date.now() - lastTouchAction < 800) return;
    if(e.target.closest && e.target.closest("[data-backlive]")){
      /* konsumsi PENUH: klik chip tidak boleh bubbling ke handler
         klik-luar panggung — exitLive menyembunyikan takeover di
         tengah dispatch, dan handler panggung pernah salah membaca
         klik ini sebagai klik di luar display (grup ikut tertutup,
         lompat lurus ke ruangan). */
      e.stopPropagation();
      e.stopImmediatePropagation();
      exitLive();
    }
  });
  /* v4.1 — PENJAGA CAPTURE: klik apa pun yang targetnya di dalam
     lapisan takeover dikonsumsi pada fase capture di dokumen, sebelum
     handler bubble mana pun (termasuk klik-luar panggung) melihatnya;
     chip dijalankan dari sini. Berlaku selama chip masih di DOM
     (pengosongan takeover kini tertunda — lihat hideTakeover). */
  document.addEventListener("click", function(e){
    if(takeover.hidden || !e.target || !takeover.contains(e.target)) return;
    e.stopPropagation();
    if(e.target.closest && e.target.closest("[data-backlive]")
       && Date.now() - lastTouchAction >= 800) exitLive();
  }, true);
  var tkStart = null;
  takeover.addEventListener("touchstart", function(e){
    var t = e.changedTouches[0];
    tkStart = { x:t.clientX, y:t.clientY, time:Date.now() };
  }, { passive:true });
  takeover.addEventListener("touchend", function(e){
    if(!tkStart) return;
    var t = e.changedTouches[0];
    var dx = t.clientX - tkStart.x, dy = t.clientY - tkStart.y;
    var dt = Date.now() - tkStart.time;
    tkStart = null;
    if(dx * dx + dy * dy > 144 || dt > 600) return;   /* ini scroll, bukan ketuk */
    var el = document.elementFromPoint(t.clientX, t.clientY);
    if(!el || !takeover.contains(el)) return;
    if(el.closest && el.closest("[data-backlive]")){
      /* konsumsi penuh juga di jalur sentuh: hentikan rambatan
         touchend, dan preventDefault + stempel memutus click
         sintetis susulan (penjaga panggung kini juga menghormati
         stempel keluar takeover — lihat handler klik panggung). */
      e.stopPropagation();
      e.stopImmediatePropagation();
      exitLive();
      e.preventDefault();
      lastTouchAction = Date.now();
    }
  }, { passive:false });
  takeover.addEventListener("touchcancel", function(){ tkStart = null; }, { passive:true });

  /* v3t — JALUR SENTUH LANGSUNG. Diagnosis HP user: baris produk
     hanya bergantung pada event click sintetis. Di WebView/viewer
     berkas Android, click itu tidak lahir bila ketukan terjadi di
     dalam .scr-body yang bisa scroll dan jarinya bergeser mikro
     (gestur dibaca sebagai awal scroll), atau tertahan cadangan
     zoom dobel-ketuk. Karena itu ketukan diproses di touchend:
     bila jari nyaris tidak bergerak (<= 12px) dan singkat
     (<= 600ms), elemen di titik lepas dicari lewat elementFromPoint
     dan aksinya dijalankan saat itu juga; preventDefault memutus
     click sintetis susulan, dan stempel waktu menjaga-jaga viewer
     yang tetap menembakkan click. Gerakan lebih besar = scroll
     biasa, tidak disentuh sama sekali. */
  var touchStart = null, lastTouchAction = 0;
  hub.addEventListener("touchstart", function(e){
    var t = e.changedTouches[0];
    touchStart = { x:t.clientX, y:t.clientY, time:Date.now() };
  }, { passive:true });
  hub.addEventListener("touchend", function(e){
    if(!touchStart) return;
    var t = e.changedTouches[0];
    var dx = t.clientX - touchStart.x, dy = t.clientY - touchStart.y;
    var dt = Date.now() - touchStart.time;
    touchStart = null;
    if(dx * dx + dy * dy > 144 || dt > 600) return;   /* ini scroll, bukan ketuk */
    var el = document.elementFromPoint(t.clientX, t.clientY);
    if(!el || !hub.contains(el)) return;
    if(!el.closest || !el.closest("[data-prod],[data-work],[data-play],[data-tab],[data-back],[data-backshow],[data-backprod],[data-backlive],[data-close]")) return;
    if(hubAction(el)){
      e.preventDefault();
      lastTouchAction = Date.now();
    }
  }, { passive:false });
  hub.addEventListener("touchcancel", function(){ touchStart = null; }, { passive:true });

  document.addEventListener("keydown", function(e){
    if(e.key !== "Escape" || state === "idle") return;
    backOrClose();
  });

  var rszT = null;
  window.addEventListener("resize", function(){
    clearTimeout(rszT);
    rszT = setTimeout(function(){
      layout();
      if((state === "open" || state === "diving") && curGroup) {
        /* geometri hub % dari bingkai foto (ikut layout sendiri), tapi
           skala kanvas .screen bergantung frame + s: hitung ulang,
           lalu koreksi ukur sekali lagi */
        cam.style.transition = "none"; diveTransform(curGroup); placeHub(); void cam.offsetWidth; cam.style.transition = "";
        requestAnimationFrame(correctFit);
      }
    }, 120);
  });

  function hardReset(){
    clearTimers(); clearLiveTimer(); liveSeq++;
    hideTakeover();   /* v3w: ganti mode portrait/landscape juga menutup takeover */
    hub.classList.remove("show"); hub.classList.remove("powering"); hub.hidden = true; hub.innerHTML = "";
    stage.classList.remove("zoomed"); stage.classList.remove("returning");
    cam.style.transform = "";
    state = "idle"; curGroup = null; view = "main";
    stage.classList.toggle("awake", woke);   /* v4.6 */
  }
  if(MQ.addEventListener) MQ.addEventListener("change", function(){ hardReset(); layout(); });

  /* v4.6 — MONITOR MENYALA SEJAK MASUK, DI FOTONYA SENDIRI
     (perintah user final): cahaya bukan lapisan geometris — piksel
     foto versi monitor-menyala yang dipotong persis siluet kacanya
     (.onlayer). Menyala begitu gambar-gambar nyala siap (fallback
     2,8 dtk), berurutan kiri → tengah → kanan lewat transition-delay;
     padam saat dive mulai, menyala lagi saat kembali ke ruangan. */
  var woke = false;
  function wakeNow(){
    woke = true;
    stage.classList.add("awake");
  }
  var onImgs = document.querySelectorAll(".domscreen img"), onReady = 0, onLit = false;
  function lightUp(){
    if(onLit) return; onLit = true;
    if(state === "idle") wakeNow(); else woke = true;
  }
  if(!onImgs.length) lightUp();
  onImgs.forEach(function(im){
    function done(){ onReady++; if(onReady >= onImgs.length) lightUp(); }
    if(im.complete) done(); else { im.addEventListener("load", done); im.addEventListener("error", done); }
  });
  setTimeout(lightUp, 2800);

  /* v7.2 — LAMPU = STATUS STUDIO: jam buka 08.00–22.00 WIB
     (Asia/Jakarta, apa pun zona waktu pengunjung). Buka: body.open
     menyalakan glow lampu foto + chip "Studio buka · sampai 22.00";
     tutup: glow padam + "Studio tutup · pesan tetap masuk".
     Dicek ulang tiap 60 detik. */
  var statusTx = document.querySelector("#studioStatus .st-tx");
  function applyStudioStatus(){
    var h;
    try { h = parseInt(new Intl.DateTimeFormat("en-GB", { timeZone:"Asia/Jakarta", hour:"2-digit", hourCycle:"h23" }).format(new Date()), 10); }
    catch(e){ h = new Date().getHours(); }
    if(isNaN(h)) h = new Date().getHours();
    var open = h >= 8 && h < 22;
    document.body.classList.toggle("open", open);
    if(statusTx) statusTx.textContent = open ? "Studio buka · sampai 22.00" : "Studio tutup · pesan tetap masuk";
  }
  applyStudioStatus();
  setInterval(applyStudioStatus, 60000);

  layout();
  window.addEventListener("load", layout);

  /* ================= MASUK HALAMAN (samakan KAPSEL asli) =================
     Tidak ada loader / zoom pembuka / reveal bertahap. Latar halaman
     (#1e1712, nada bayangan foto sendiri) langsung terlukis; ruangan +
     zona mulai opacity 0, lalu memudar masuk ±900ms (cubic-bezier
     .22,.8,.2,1) BEGITU foto aktif (landscape/portrait sesuai mode)
     selesai ter-decode. Nav + petunjuk menyusul ±200ms setelahnya.
     Gagal muat -> tetap tampil lewat fallback 1.5 dtk (tidak pernah
     halaman kosong permanen). Gerak dikurangi -> langsung tampil. */
  var entryShown = false;
  function showEntry(){
    if(entryShown) return; entryShown = true;
    document.body.classList.add("ready");
  }
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    showEntry();
  } else {
    var entryImg = portrait() ? document.getElementById("roomP") : document.getElementById("room");
    var entryFallback = setTimeout(showEntry, 1500);
    var entryDone = function(){ clearTimeout(entryFallback); showEntry(); };
    if(entryImg.complete && entryImg.naturalWidth > 0){
      entryDone();
    } else {
      if(entryImg.decode){ entryImg.decode().then(entryDone).catch(function(){}); }
      entryImg.addEventListener("load", entryDone);
      entryImg.addEventListener("error", entryDone);
    }
  }

  /* Ruangan hidup: napas Ken Burns murni CSS (.breath, 24 dtk) — tidak ada JS film. */

})();
