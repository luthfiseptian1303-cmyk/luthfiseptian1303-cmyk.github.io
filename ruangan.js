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
     scroll jadi bar tetap. Jalur sentuh v3t tidak berubah. */
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
     detail | live (situs asli via iframe — utama di deploy) |
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
     LANDSCAPE room-final.jpg — kiri x 8.8-31.9 y 29.8-55.6;
     tengah x 32.3-54.8 y 33.0-54.5; kanan x 55.1-77.1 y 31.4-55.5.
     PORTRAIT room-portrait.jpg — kiri x 1.5-27.9 y 42.3-53.7;
     tengah x 28.0-55.6 y 43.5-53.7; kanan x 55.9-80.1 y 42.8-54.2.
     Skala dive TIDAK lagi tetap: dihitung agar lebar display yang
     ter-zoom = 88% lebar panggung (s = 0.88 * lebarPanggung / lebarDisplayPx)
     — samakan bingkai terdekat reel KAPSEL: bezel monitor + sisa rim
     ruangan gelap tetap terlihat, layar tidak pernah memenuhi tepi.
     rotY = perspektif trapesium monitor samping di foto (samakan .scr). */
  var QUADS_L = {
    web:   { x:32.3, y:33.0, w:22.5, h:21.5, rotY:0,   org:"50% 50%" },
    brand: { x:8.8,  y:29.8, w:23.1, h:25.8, rotY:19,  org:"100% 50%" },
    video: { x:55.1, y:31.4, w:22.0, h:24.1, rotY:-19, org:"0% 50%" }
  };
  var QUADS_P = {
    web:   { x:28.0, y:43.5, w:27.6, h:10.2, rotY:0,   org:"50% 50%" },
    brand: { x:1.5,  y:42.3, w:26.4, h:11.4, rotY:19,  org:"100% 50%" },
    video: { x:55.9, y:42.8, w:24.2, h:11.4, rotY:-19, org:"0% 50%" }
  };
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
  var breath = cam.querySelector(".breath");

  /* Mode portrait: aspek viewport < 0.8 ATAU lebar <= 640px (samakan dgn CSS) */
  var MQ = window.matchMedia("(max-width: 640px), (max-aspect-ratio: 4/5)");
  function portrait(){ return MQ.matches; }

  /* Bingkai foto = rect gambar setelah object-fit:cover di dalam panggung.
     .breath diset persis ke rect ini (JS), jadi zona % dan titik dive selalu
     menempel di foto pada ukuran layar berapa pun. Landscape: rect = panggung. */
  var IMG_L = { w:1920, h:1280 }, IMG_P = { w:1152, h:2560 };
  var frame = { x:0, y:0, w:0, h:0 };
  function layout(){
    var r = stage.getBoundingClientRect();
    var im = portrait() ? IMG_P : IMG_L;
    var sc = Math.max(r.width / im.w, r.height / im.h);
    var fw = im.w * sc, fh = im.h * sc;
    frame = { x:(r.width - fw) / 2, y:(r.height - fh) / 2, w:fw, h:fh };
    breath.style.left = frame.x + "px"; breath.style.top = frame.y + "px";
    breath.style.width = frame.w + "px"; breath.style.height = frame.h + "px";
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
    var px = frame.x + (q.x + q.w/2)/100 * frame.w;   /* pusat display dlm koordinat panggung */
    var py = frame.y + (q.y + q.h/2)/100 * frame.h;
    /* Lebar display ter-zoom: portrait 92% lebar panggung (target
       90-94%), landscape 88% (bingkai reel v3k); tinggi dibatasi 94%
       tinggi panggung agar display tak pernah terpotong vertikal. */
    var frac = portrait() ? 0.92 : 0.88;
    var s = Math.min(frac * r.width / (q.w/100 * frame.w),
                     0.94 * r.height / (q.h/100 * frame.h));
    lastDive = { key:key, s:s, q:q };
    diveO = { x:px, y:py }; diveS = s;
    diveT = { x:r.width/2 - px, y:r.height/2 - py };
    applyCam();
  }
  /* KOREKSI PAS BERBASIS UKURAN NYATA (cacat 3 v3m di HP user: display
     samping terpotong tepi viewport). Setelah dive mendarat, rect
     monitor (.scr) diukur; bila keluar dari [8, W-8]x[6, H-6] atau
     pusatnya meleset > 3px, transform ditulis ulang dari hasil ukur:
     R2(p) = Sc + cs*(R(p) - Mc)  ->  s' = cs*s,
     t' = Sc + cs*(O + t - Mc) - O. Di browser normal koreksi ~= 0;
     di perangkat yang matematikanya meleset, framing dipaksa pas. */
  function correctFit(){
    if(!curGroup || (state !== "open" && state !== "diving")) return;
    var zone = document.querySelector('[data-open="' + curGroup + '"]');
    if(!zone || !zone.parentElement) return;
    var sr = stage.getBoundingClientRect();
    var mr = zone.parentElement.getBoundingClientRect();
    if(mr.width < 10 || sr.width < 10) return;
    var cs = Math.min((sr.width - 16) / mr.width, (sr.height - 12) / mr.height, 1);
    var mcx = mr.left - sr.left + mr.width/2, mcy = mr.top - sr.top + mr.height/2;
    var dx = sr.width/2 - mcx, dy = sr.height/2 - mcy;
    if(cs > 0.999 && Math.abs(dx) < 3 && Math.abs(dy) < 3) return;
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
    /* Kanvas layar HP: skala k (koordinat lokal hub) dipilih agar
       (a) kanvas 340x280 muat di dalam hub (faktor 0.98), dan
       (b) skala TERGAMBAR k*s tidak pernah melebihi 1.2 — teks tetap
       berukuran HP walau display raksasa di desktop. */
    var sc = document.getElementById("screen");
    if(sc && lastDive.s > 0){
      var Hw = q.w * (1 - 2 * HUB_INSET) / 100 * frame.w;
      var Hh = q.h * (1 - 2 * HUB_INSET) / 100 * frame.h;
      var k = Math.min(Hw * 0.98 / 340, Hh * 0.98 / 280, 1.2 / lastDive.s);
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
     data-play membuka view "live": iframe same-origin /lumera.html
     memenuhi badan layar di bawah bar tetap (pola live CarlLab).
     Konfirmasi positif wajib: dokumen iframe bisa diakses (same-origin),
     URL-nya lumera.html, dan teks badannya memuat "LUMÉRA". Bila dalam
     ±4 detik tidak terkonfirmasi (terblokir CSP/X-Frame, 404, error),
     ATAU dokumen selesai dimuat tapi terbukti bukan LUMÉRA, tampilan
     ditukar otomatis ke showcase lokal ("show") — layar tidak pernah
     menampilkan halaman error browser. */
  var liveSeq = 0, liveTimer = null;
  function clearLiveTimer(){ if(liveTimer){ clearTimeout(liveTimer); liveTimer = null; } }
  function liveFallback(seq){
    if(seq !== liveSeq) return;
    if(view !== "live" || (state !== "open" && state !== "diving")) return;
    view = "show"; renderScreen();
  }
  function armLiveFrame(){
    var seq = ++liveSeq;
    clearLiveTimer();
    var f = hub.querySelector("iframe.liveframe");
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
    var h = '<div class="view scr-view"><div class="screen' + (content ? " content" : "") + '" id="screen">'
      + top;
    if(content){
      if(view !== "prod") h += '<div class="tabs" id="uiTabs">' + tabsHTML() + '</div>';
      if(view === "detail") h += '<div class="bar viewbar"><button class="backbar" type="button" data-back>\u2039 Grup</button></div>';
      if(view === "show") h += '<div class="bar viewbar"><button class="backbar" type="button" data-backshow>\u2039 Detail</button><b>' + esc(LUMERA.nm) + '</b></div>';
      if(view === "live") h += '<div class="bar viewbar"><button class="backbar" type="button" data-backlive>\u2039 Detail</button><b>' + esc(LUMERA.nm) + '</b></div>';
      if(view === "live"){
        h += '<div class="scr-body fill" id="uiBody">' + liveHTML() + "</div>";
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
    if(view === "live") armLiveFrame();
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
    if(view === "live"){ view = "detail"; renderScreen(); return; }
    if(view === "show"){ view = "detail"; renderScreen(); return; }
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
    blurIfTouch();   /* lepas ring fokus oranye dari tombol zona sejak dive mulai */
    state = "diving";
    stage.classList.remove("returning");
    stage.classList.add("zoomed");
    diveTransform(key);
    renderHub();
    placeHub();                                   /* geometri foto + pose trapesium, tetap sampai akhir */
    hub.hidden = false;
    later(function(){ hub.classList.add("show"); }, 700);        /* teks display menyala di tengah dolly 1600ms */
    later(function(){
      if(state === "diving") state = "open";
      correctFit();   /* ukur rect nyata display; paksa pas di viewport */
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
    state = "returning";
    hub.classList.remove("show");
    stage.classList.remove("zoomed");
    stage.classList.add("returning");
    cam.style.transform = "";
    later(function(){
      hub.hidden = true;
      hub.innerHTML = "";   /* konten layar dibersihkan total */
      stage.classList.remove("returning");
      state = "idle"; curGroup = null; view = "main";
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
    if(state === "open" && e.composedPath().indexOf(hub) === -1) closeGroup();
  });

  /* Aksi hub dipakai bersama oleh jalur click (mouse/keyboard) dan
     jalur touchend (v3t). Mengembalikan true bila ketukan tertangani. */
  function hubAction(t){
    if(!t || !t.closest) return false;
    if(state !== "open" && state !== "diving") return false;
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
    if(t.closest("[data-work]")){ view = "detail"; renderScreen(); return true; }
    if(t.closest("[data-play]")){ view = "live"; renderScreen(); return true; }
    if(t.closest("[data-backlive]")){ view = "detail"; renderScreen(); return true; }
    var pr = t.closest("[data-prod]");
    if(pr){ curProd = +pr.getAttribute("data-prod"); view = "prod"; renderScreen(); return true; }
    if(t.closest("[data-backprod]")){ view = "show"; renderScreen(); return true; }
    if(t.closest("[data-backshow]")){ view = "detail"; renderScreen(); return true; }
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
    hub.classList.remove("show"); hub.hidden = true; hub.innerHTML = "";
    stage.classList.remove("zoomed"); stage.classList.remove("returning");
    cam.style.transform = "";
    state = "idle"; curGroup = null; view = "main";
  }
  if(MQ.addEventListener) MQ.addEventListener("change", function(){ hardReset(); layout(); });

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
