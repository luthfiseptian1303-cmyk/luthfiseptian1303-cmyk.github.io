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
             tabs:["Kuliner"] },
    web:   { no:"02", label:"WEBSITES",      l1:"Our",     l2:"Websites.",
             tabs:["Toko Online", "Undangan Digital"] },
    video: { no:"03", label:"VIDEO EDITING", l1:"Video",   l2:"Editing.",
             tabs:["Podcast", "Explainer", "Wawancara"] }
  };
  var activeTab = 0;   /* tab kategori aktif di layar yang sedang terbuka */

  /* ================= BAHASA ID/EN (ide 5, perintah user 27 Nov) =====
     Seluruh CarlLab dwibahasa; halaman ruangan ini yang terakhir
     masih ID saja. Toggle di pil nav menukar SEMUA teks halaman +
     isi hub (tab, daftar, detail, showcase, produk, chip takeover).
     Pilihan tersimpan di localStorage ("carllab-lang"); bawaan ID.
     T(id, en) memilih string aktif; data EN untuk tab / LUMÉRA /
     produk adalah peta override di bawah — data ID tetap sumber
     utama dan tidak berubah. */
  var LANG = "id";
  try { if(localStorage.getItem("carllab-lang") === "en") LANG = "en"; } catch(e){}
  function T(id, en){ return LANG === "en" ? en : id; }
  var TAB_EN = {
    brand: ["Culinary"],
    web:   ["Online Store", "Digital Invitations"],
    video: ["Podcast", "Explainer", "Interview"]
  };
  var LUMERA_EN = {
    ds: "The LUMÉRA perfume house website — The Night Collection of five fragrances, complete with a concept store and checkout inside. The collection can be previewed right on this phone; the full interactive store runs on the live site.",
    meta: [["Type","Website"],["Brand","LUMÉRA — Maison de Parfum"],["Collection","The Night Collection · 5 products"],["Year","2026"]]
  };
  var PROD_EN = [
    { poem:"Ember light trapped in glass — warm resin melting slowly over cold stone.",
      notes:[["Top","Mandarin · Cardamom"],["Heart","Amber Resin · Iris"],["Base","Sandalwood · Vanilla · Tonka"]] },
    { poem:"A peony blooming after dark — petals cool as freshly polished marble.",
      notes:[["Top","Red Currant · Bergamot"],["Heart","Peony · Rose Water"],["Base","Musk · Bright Cedar"]] },
    { poem:"Sage leaves crushed over wet granite — green, mineral, and deeply calm.",
      notes:[["Top","Clary Sage · Grapefruit"],["Heart","Olive Leaf · Neroli"],["Base","Vetiver · White Amber"]] },
    { poem:"Ink-blue water at midnight — sea salt clinging to dark wood.",
      notes:[["Top","Bergamot · Juniper"],["Heart","Blue Iris · Violet Leaf"],["Base","Driftwood · Salt Musk"]] },
    { poem:"A garnet stone lifted to candlelight — dark plum, warm spice, and soft leather.",
      notes:[["Top","Black Plum · Cinnamon"],["Heart","Hibiscus · Black Tea"],["Base","Leather · Myrrh · Cacao"]] }
  ];

  /* ================= LUMÉRA (v3s) — satu-satunya isi =================
     Keadaan tampilan di dalam layar Websites: main (identitas grup
     saja, seperti v3q) | list (baris LUMÉRA di tab Toko Online) |
     detail | live (situs asli via iframe TAKEOVER layar penuh —
     utama di deploy, sejak v3w) |
     show (showcase lokal — fallback otomatis) | prod (produk).
     Grup lain selalu "main". */
  var view = "main";
  var winState = "normal";   /* jendela Windows di desktop monitor: normal | min | max (v8) */
  var curProd = 0;     /* produk yang sedang dibuka di tampilan produk */
  var ABS = "https://carllab.web.id/";
  var WEB_TOKO = 0;    /* indeks tab "Toko Online" pada grup Websites (v8.9: folder web lain dikosongkan — demo lama dihapus perintah user 27 Nov 22:19, dibuat ulang satu-satu) */
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
  function webContent(){ return curGroup === "web" && activeTab === WEB_TOKO; }

  /* ================= v8.7 — ISI ASLI TIAP FOLDER =================
     Perintah user 27 Nov 19:43 (screenshot folder Culinary yang isinya
     malah halaman identitas 01): "Pas bagian pencet file jangan
     begini buy, buat sesuai isi filenya aja yang muncul" + "langsung
     isinya aja pas pencet file". Jadi: SETIAP folder langsung membuka
     ISINYA — tidak ada lagi halaman identitas sebagai isi folder.
     Data = isi asli CarlLab (sama seperti halaman layanan live):
     Brand 15 logo demo (data v3p, thumbnail brand-media/ yang masih
     live), Websites 10 demo website-* + KELAM/KAVUNA + 6 undangan,
     Video 5 edit (MP4 + poster di video-editing/media/, live). */
  var BRAND_KEYS = ["kuliner"];
  var BRAND_GNAME = { kuliner:"grup kuliner", beauty:"grup beauty", jasa:"grup jasa & tech" };
  var BRAND_GNAME_EN = { kuliner:"culinary group", beauty:"beauty group", jasa:"services & tech group" };
  var LOGOS = [
    { id:"gigit", sets:[{t:"Carousel Feed",imgs:["gigit-panel-1.jpg","gigit-panel-2.jpg","gigit-panel-3.jpg","gigit-panel-4.jpg","gigit-panel-5.jpg","gigit-panel-6.jpg","gigit-panel-7.jpg","gigit-panel-8.jpg","gigit-panel-9.jpg","gigit-panel-10.jpg"]},{t:"Story 9:16",imgs:["gigit-story-1.jpg","gigit-story-2.jpg","gigit-story-3.jpg","gigit-story-4.jpg","gigit-story-5.jpg"]},{t:"Edisi Cokelat",ten:"Chocolate Edition",imgs:["gigit-dark-5.jpg","gigit-dark-6.jpg","gigit-dark-7.jpg","gigit-dark-8.jpg"]}], set:"gigit-carousel.html", setpath:"gigit-carousel", g:"kuliner", nm:"GIGIT!", rl:"Cookies & Crumble — ceria dan berani",
      en:{ rl:"Cookies & Crumble — cheerful and bold", ds:"This is the original finished set, not a mock-up: nineteen panels from one design system — the feed carousel, the 9:16 stories, and the darker Chocolate Edition. One system that stretches across every post the brand will ever make.", pal:["Orange","Cream","Edition Chocolate","Caramel"] },
      ds:"Ini file aslinya, bukan reka ulang: set jadi GIGIT! berisi sembilan belas panel dari satu sistem desain — carousel feed, story 9:16, dan Edisi Cokelat. Satu sistem yang meregang ke semua postingan brand ini.",
      pal:[["Oranye","#F96A0D"],["Krem","#FFF3E0"],["Cokelat Edisi","#2B170B"],["Karamel","#E8A33D"]], bg:"#F96A0D" },
    { id:"momirel", tv:"2", sets:[{t:"Set Lengkap",ten:"Full Set",imgs:["brand-media/momirel-lockup.jpeg","brand-media/momirel-seal.jpeg","brand-media/momirel-sticker.jpeg"],caps:["Logo Utama","Segel Bundar","Versi Stiker"]}], set:"momirel-set.html", setpath:"momirel-set", g:"kuliner", nm:"MomiRel", rl:"Homemade Dessert — hangat dan rumahan",
      en:{ rl:"Homemade Dessert — warm and homemade", ds:"CarlLab's first real client logo — a homemade dessert brand from BSD. A mother and daughter baking together, hand-drawn with thick lines so it stays legible printed on a spunbond bag, with a black brush-script wordmark. Approved by the client on 14 Nov 2026 and published with her permission.", pal:["Burgundy","Cream","Script Black"] },
      ds:"Logo klien asli pertama CarlLab — brand dessert rumahan dari BSD. Ilustrasi ibu dan anak memanggang bersama, digambar tangan dengan garis tebal supaya tetap terbaca saat dicetak di tas spunbond, wordmark brush script hitam. Disetujui klien 14 Nov 2026 dan dipublikasikan atas izinnya.",
      pal:[["Burgundy","#6E1423"],["Krem","#F5E9DA"],["Hitam Script","#14100E"]], bg:"#FAF6EE" }
  ];
  function logoById(id){ for(var i = 0; i < LOGOS.length; i++) if(LOGOS[i].id === id) return LOGOS[i]; return null; }
  /* Websites per folder (indeks tab): 0 = Toko Online (LUMÉRA,
     ditangani khusus), 1 = Undangan Digital. v8.9 (perintah user
     27 Nov 22:19–22:24): SEMUA halaman demo lama dihapus dari situs
     dan dibuat ulang SATU-SATU, tiap demo beda — folder Company /
     Landing / Portofolio hilang dari grup Websites sampai demo
     penggantinya jadi. Undangan diisi LARIK (demo baru pertama) +
     PAGI SORE (klien asli, TIDAK ikut dihapus). */
  var SITE_TABS = {
    1: [
      { nm:"PAGI SORE", sb:"Grand Opening — Klien Asli", sbEn:"Grand Opening — Real Client", img:"hub-thumbs/pagi-sore.jpg", url:ABS + "pagi-sore.html", path:"pagi-sore" }
    ]
  };   /* v8.19: PAGI SORE DIPERTAHANKAN di ruangan — perintah user 28 Nov 05:14 "jangan di hapus" (masuk daftar simpan: Video, LUMÉRA, GIGIT!, MomiRel, PAGI SORE) */
  /* Video Editing per folder (indeks tab): MP4 + poster live di
     video-editing/media/<m>.mp4|.jpg; Drive hanya tautan cadangan. */
  var VID_TABS = [
    [ { t:"Sam Altman Got Addicted to TikTok", d:"0:31", m:"sam-altman-tiktok", drv:"1F7QB5xWQSYFn8KVbKn_ae4FKMj8rSE9x" },
      { t:"ChatGPT's First Million Users", d:"0:28", m:"chatgpt-first-million", drv:"1U8DubczgtF2HhjQ06Ly851ReFp2X-6mG" },
      { t:"212 Weekends Left With My Son", d:"0:33", m:"212-weekends", drv:"1Ukx3-6kQtBDhqQ469-W3Jt_xXPbgNvT5" } ],
    [ { t:"Computers That Run on Brain Cells", d:"0:35", m:"brain-cells-explainer", drv:"1Mw2qrlAA3G7LWZHUcAPI9gZkA8j_mf7m" } ],
    [ { t:"Elon Musk on the Future of Work", d:"0:36", m:"elon-musk-future-work", drv:"1Gj-p8tCHaMIKbUr1fDwZQNldt2Lvjkyb" } ]
  ];
  var curLogo = null;   /* logo yang sedang dibuka di view "ldetail" */
  var curVid = null;    /* video yang sedang diputar di view "vplay" */
  var liveItem = null;  /* situs yang sedang di takeover: {nm,url,path,lumera} */
  var LUMERA_LIVE = { nm:"LUMÉRA", url:"/lumera.html", path:"lumera.html", lumera:true };

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
    web:   { x:37.2, y:47.5, w:17.7, h:16.6, iy:47.8, ih:16.0, rotY:0,   org:"50% 50%" },
    brand: { x:17.0, y:46.9, w:19.6, h:19.2, iy:47.2, ih:18.6, rotY:24,  org:"100% 50%" },
    video: { x:55.5, y:47.9, w:19.4, h:18.6, iy:48.2, ih:18.0, rotY:-24, org:"0% 50%" }
  };
  var QUADS_P = {
    web:   { x:35.35, y:53.35, w:21.4, h:11.1, iy:53.65, ih:10.5, rotY:0,   org:"50% 50%" },
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
    web:   [[37.2,47.5],[54.9,47.9],[54.9,64.1],[37.2,63.7]],
    video: [[55.5,47.9],[74.9,48.0],[74.9,66.5],[55.5,63.9]]
  };
  var CORNERS_P = {
    brand: [[14.5,53.5],[35.3,53.7],[35.3,63.9],[14.5,65.2]],
    web:   [[35.35,53.35],[56.75,53.55],[56.75,64.45],[35.35,64.15]],
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

  /* ================= v8 — DESKTOP WINDOWS ASLI =================
     Perintah user 27 Nov 18:40: "pas di pencet layar aku pengennya
     kaya windows asli — tampilannya". Jadi isi monitor yang dizoom
     BUKAN lagi jendela melayang: ia DESKTOP Windows 11 utuh —
     wallpaper Bloom yang sama dengan foto (deskbg), ikon folder
     kategori di kiri (berfungsi = tab grup), jendela aplikasi
     ber-title-bar Windows (perkecil / perbesar / tutup ala Win11)
     berisi konten grup seperti sebelumnya, menu Start berisi tiga
     grup (berfungsi = pindah monitor), dan taskbar bawah lengkap:
     tombol Start logo Windows, ikon aplikasi berjalan, tray, dan
     JAM + TANGGAL LIVE (Asia/Jakarta). Semua kontrol berfungsi;
     tidak ada tombol pajangan. */
  var FOLDER_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 6.8A1.8 1.8 0 0 1 4.3 5h4.9l2.1 2.3h8.4a1.8 1.8 0 0 1 1.8 1.8V17a1.8 1.8 0 0 1-1.8 1.8H4.3A1.8 1.8 0 0 1 2.5 17z" fill="#f5c04a" stroke="#cf9413" stroke-width=".7"/></svg>';
  var WINLOGO_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.2" y="3.2" width="8.4" height="8.4" fill="#4cc2ff"/><rect x="12.4" y="3.2" width="8.4" height="8.4" fill="#4cc2ff"/><rect x="3.2" y="12.4" width="8.4" height="8.4" fill="#4cc2ff"/><rect x="12.4" y="12.4" width="8.4" height="8.4" fill="#4cc2ff"/></svg>';
  var TRAY_SVG = '<svg viewBox="0 0 24 24" class="tb-ic" aria-hidden="true"><path d="M4 10.5a12 12 0 0 1 16 0M6.8 13.8a8 8 0 0 1 10.4 0M9.6 17a4 4 0 0 1 4.8 0" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><circle cx="12" cy="19.4" r="1.3" fill="currentColor"/></svg>'
    + '<svg viewBox="0 0 24 24" class="tb-ic" aria-hidden="true"><path d="M4 9.5v5h3.5L12 18.6V5.4L7.5 9.5z" fill="currentColor"/><path d="M15.5 9a4.2 4.2 0 0 1 0 6M18 6.8a7.4 7.4 0 0 1 0 10.4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>'
    + '<svg viewBox="0 0 28 24" class="tb-icb" aria-hidden="true"><rect x="2" y="7" width="21" height="10" rx="2.4" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="4" y="9" width="13" height="6" rx="1.2" fill="currentColor"/><path d="M25.4 10.4v3.2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
  function winBtnsHTML(){
    return '<span class="winbtns">'
      + '<button class="winbtn" type="button" data-winmin aria-label="' + T("Perkecil", "Minimize") + '"><svg viewBox="0 0 10 10"><path d="M1 5h8" stroke="currentColor" stroke-width="1"/></svg></button>'
      + '<button class="winbtn" type="button" data-winmax aria-label="' + T("Perbesar", "Maximize") + '"><svg viewBox="0 0 10 10"><rect x="1.5" y="1.5" width="7" height="7" fill="none" stroke="currentColor" stroke-width="1"/></svg></button>'
      + '<button class="winbtn close" type="button" data-close aria-label="' + T("Tutup grup", "Close group") + '"><svg viewBox="0 0 10 10"><path d="M1.5 1.5l7 7M8.5 1.5l-7 7" stroke="currentColor" stroke-width="1"/></svg></button>'
      + '</span>';
  }
  function deskIconsHTML(){
    var g = GROUPS[curGroup];
    var tabList = (LANG === "en" && TAB_EN[curGroup]) ? TAB_EN[curGroup] : g.tabs;
    var h = '<div class="deskicons">';
    tabList.forEach(function(t, i){
      h += '<button class="dicon' + (activeTab === i ? " on" : "") + '" type="button" data-tab="' + i + '">' + FOLDER_SVG + '<span>' + esc(t) + '</span></button>';
    });
    return h + '</div>';
  }

  /* v8.12 — ikon bawah DISAMAKAN dengan taskbar di foto monitornya
     (perintah user 27 Nov 23:47 dari screenshot desktop hub: 'Icon
     icon di bawahnya juga samain buy'). Taskbar foto = widget kecil
     foto: ikon kecil pojok kiri bawah + baris TENGAH mulai dari
     Start, lalu Cari, Task View, Edge, File Explorer, Chrome,
     Store, pusaran + tray ^ wifi speaker baterai jam (susunan
     final v8.13 di taskbarHTML — samakan plek foto).
     Deret pin di sini adalah perabot desktop (span, bukan
     tombol — kontrol interaktif tetap cuma Start + aplikasi grup
     yang berjalan, sesuai aturan tanpa tombol pajangan). */
  var PIN_SVGS =
      '<span class="tb-pin" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.2" fill="none" stroke="#e8f2f8" stroke-width="2"/><path d="M15.4 15.4L20.4 20.4" stroke="#e8f2f8" stroke-width="2.2" stroke-linecap="round"/></svg></span>'
    + '<span class="tb-pin" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3.4" y="5" width="11" height="14" rx="1.6" fill="#9fb6c4"/><rect x="8.6" y="3.4" width="12" height="14" rx="1.6" fill="#e8f2f8"/></svg></span>'
    + '<span class="tb-pin" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20.6 13.2c-.3 3.4-2.9 5.6-6.4 5.6-4.2 0-7.4-3-7.4-7.2 0-3.9 2.9-7 6.7-7 3.9 0 6.6 2.6 6.6 6.4H9.4c.2 2.3 1.8 3.7 4 3.7 1.9 0 3.2-.7 4.2-2.1z" fill="#37c6f4"/><path d="M13.5 4.6c-3.8 0-6.7 3.1-6.7 7 0 .4 0 .8.1 1.1.9-1 2.3-1.6 3.8-1.6h9.9c0-3.8-2.7-6.5-7.1-6.5z" fill="#0c88c3"/></svg></span>'
    + '<span class="tb-pin" aria-hidden="true">' + FOLDER_SVG + '</span>'
    + '<span class="tb-pin" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 12L5.2 4.6A11 11 0 0 1 21.5 8L12 12z" fill="#ef4136"/><path d="M12 12l8.5 4.7A11 11 0 0 1 4 17.5L12 12z" fill="#fbbc05"/><path d="M12 12L3.6 17.9A11 11 0 0 1 5.2 4.6L12 12z" fill="#34a853"/><circle cx="12" cy="12" r="4.1" fill="#1a73e8" stroke="#fff" stroke-width="1.4"/></svg></span>';
  /* v8.17 — pin Store (tas belanja) + pin pusaran DIHAPUS atas
     perintah user 28 Nov 04:59 dari screenshot zoom-nya ("Tiga
     icon ini hapus aja buy": tas, pusaran, tombol aplikasi). */
  var CHEVRON_SVG = '<svg viewBox="0 0 24 24" class="tb-ic" aria-hidden="true"><path d="M6 14.4l6-5.4 6 5.4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
  var APP_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="4.5" width="17" height="15" rx="2" fill="rgba(87,200,222,.22)" stroke="#57c8de" stroke-width="1.5"/><path d="M3.5 8.6h17" stroke="#57c8de" stroke-width="1.5"/></svg>';
  function taskbarHTML(){
    var g = GROUPS[curGroup];
    /* v8.15 — SAMAKAN + TANPA DOBEL, dua-duanya (perintah final user
       28 Nov 02:47 dari rekaman HP-nya): taskbar desktop plek foto —
       deret rapat DI TENGAH mulai dari logo Windows Start, lalu
       Cari, Task View, Edge, Explorer, Chrome (Store, pusaran +
       tombol aplikasi dihapus di v8.17); tray + jam kecil di
       kanan; pojok kiri
       KOSONG. Logo Windows hanya SATU di tiap keadaan: sebelum
       dipencet, lapisan .rest menimpa seluruh strip foto dengan
       salinan taskbar ini juga (restTaskbarHTML, v8.16) — jadi
       tampilan belum dipencet = tampilan sudah dipencet. */
    return '<div class="taskbar"><div class="tb-center">'
      + '<button class="tb-btn" type="button" data-start aria-label="Start">' + WINLOGO_SVG + '</button>'
      + PIN_SVGS
      + '</div><div class="tb-tray">' + CHEVRON_SVG + TRAY_SVG
      + '<span class="tb-clock"><span class="tb-time"></span><span class="tb-date"></span></span>'
      + '</div></div>';
  }

  /* v8.16 — salinan STATIS taskbar untuk lapisan .rest (perintah
     user 28 Nov 03:03 dari screenshot HP-nya: "tampilan belum di
     kliknya samakan juga tampilan sudah di klik"). Strip foto
     tertutup PENUH oleh taskbar yang sama persis seperti di hub
     (span, bukan tombol — .rest memang pointer-events none);
     skala dihitung di placeRest supaya proporsinya plek hub. */
  function restTaskbarHTML(){
    return '<div class="rest-taskbar"><div class="rest-tb-in"><div class="taskbar"><div class="tb-center">'
      + '<span class="tb-btn" aria-hidden="true">' + WINLOGO_SVG + '</span>'
      + PIN_SVGS
      + '</div><div class="tb-tray">' + CHEVRON_SVG + TRAY_SVG
      + '<span class="tb-clock"><span class="tb-time"></span><span class="tb-date"></span></span>'
      + '</div></div></div></div>';
  }
  function startMenuHTML(){
    var rows = [["brand", "Brand & Logo"], ["web", "Websites"], ["video", "Video Editing"]];
    var h = '<div class="startmenu" id="startMenu"><p class="sm-h">' + T("Disematkan", "Pinned") + '</p>';
    rows.forEach(function(r){
      h += '<button class="sm-row' + (curGroup === r[0] ? " on" : "") + '" type="button" data-goto="' + r[0] + '">' + r[1] + '</button>';
    });
    return h + '<div class="sm-f"><span class="sm-user"><i></i>Carl</span>'
      + '<button class="sm-power" type="button" data-close aria-label="' + T("Tutup grup", "Close group") + '"><svg viewBox="0 0 24 24"><path d="M12 3.5v7" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M6.3 6.8a8 8 0 1 0 11.4 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button></div></div>';
  }
  function applyWinState(){
    var w = document.getElementById("win");
    if(w){ w.classList.toggle("min", winState === "min"); w.classList.toggle("max", winState === "max"); }
    var ab = hub.querySelector("[data-tbapp]");
    if(ab) ab.classList.toggle("idle", winState === "min");
  }
  function closeStart(){ var sm = document.getElementById("startMenu"); if(sm) sm.classList.remove("open"); }
  function tickClock(){
    try {
      var now = new Date();
      var loc = (LANG === "en") ? "en-US" : "id-ID";
      var tm = new Intl.DateTimeFormat(loc, { timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit", hour12: false }).format(now);
      var dt = new Intl.DateTimeFormat(loc, { timeZone: "Asia/Jakarta", day: "2-digit", month: "2-digit", year: "numeric" }).format(now);
      document.querySelectorAll(".tb-time").forEach(function(e){ e.textContent = tm; });
      document.querySelectorAll(".tb-date").forEach(function(e){ e.textContent = dt; });
    } catch(e){}
  }
  setInterval(tickClock, 15000);
  function tabsHTML(){
    var g = GROUPS[curGroup], h = "";
    var tabList = (LANG === "en" && TAB_EN[curGroup]) ? TAB_EN[curGroup] : g.tabs;
    tabList.forEach(function(t, i){
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
    placeRest();       /* v8.3: ikon file diam ikut menempel ke kaca monitor */
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
    /* v7.4 — BUKAN KOTAK, IKUTI MONITOR (perintah user 26 Nov 15:45
       dari rekaman HP-nya: "Jangan di buat kotak tapi di sesuain
       monitornya"). Hub tidak lagi persegi sumbu-lurus + rotateY:
       keempat sudutnya di-warp HOMOGRAPHY persis ke sudut kaca
       monitor di foto (CORNERS terukur, inset nyaris nol sejak
       27 Nov 23:29 — tengah 1,5%, samping 0,8%) — tepi hub
       miring mengikuti panelnya, termasuk lengkung trapesium
       monitor samping. Ukuran layout hub = bbox quad ter-inset
       (px bingkai), transform-origin 0 0, matriks dari solver yang
       sama seperti layar DOM v6 dulu. */
    var Hw = q.w * (1 - 2 * HUB_INSET) / 100 * frame.w;
    var Hh = q.h * (1 - 2 * HUB_INSET) / 100 * frame.h;
    /* SUPERSAMPLE x4: hub diraster browser pada ukuran layout-nya;
       tanpa ini teks hub (layout ±96px) diperbesar zoom kamera
       ±3.9x dari raster kecil -> buram/bergelombang (bukti cek
       v7.4 pertama). Layout 4x + matriks yang sama = raster padat,
       teks tetap tajam setelah di-warp + di-zoom. */
    var SS = 4;
    hub.style.left = "0px";
    hub.style.top = "0px";
    hub.style.width = (Hw * SS).toFixed(1) + "px";
    hub.style.height = (Hh * SS).toFixed(1) + "px";
    hub.style.transformOrigin = "0 0";
    var cs = corners(lastDive.key);
    if(cs){
      var cx = (cs[0][0] + cs[1][0] + cs[2][0] + cs[3][0]) / 4;
      var cy = (cs[0][1] + cs[1][1] + cs[2][1] + cs[3][1]) / 4;
      /* Inset nyaris nol — verdict user 27 Nov 23:29 dari foto
         laptopnya: 'sisi-sisinya ga sesuai monitornya'. Cek overlay
         lokal membuktikan CORNERS memang pas di tepi kaca; yang bikin
         kotaknya mengambang = inset lama (tengah 5%, samping 2%).
         Kini tengah 1,5%, samping 0,8% — sisa tipis pengaman bezel
         (jejak verdict 26 Nov 'Kegedean dikit'). */
      var insetF = lastDive.key === "web" ? 0.015 : 0.008;
      var dst = cs.map(function(p){
        var ix = p[0] + (cx - p[0]) * insetF, iy = p[1] + (cy - p[1]) * insetF;
        return [ix / 100 * frame.w, iy / 100 * frame.h];
      });
      /* Monitor tengah, tepi BAWAH diangkat ekstra (verdict user
         27 Nov 12:18 'Bawahnya kelewatan monitor'): sudut bawah
         warp-nya naik 0,25% tinggi bingkai agar tepi bawah jendela
         berhenti di dalam kaca, tidak melewati batas bawah monitor.
         Sisi lain tidak berubah. */
      if(lastDive.key === "web"){
        var liftB = 0.0025 * frame.h;
        dst[2][1] -= liftB;
        dst[3][1] -= liftB;
      }
      hub.style.transform = homography(Hw * SS, Hh * SS, dst);
    } else {
      hub.style.transform = "";
    }
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
      var k = 4 * Math.min(Hw / 340, Hh / cH) * 0.998;   /* x4 mengikuti supersample hub */
      sc.style.transform = "scale(" + k.toFixed(4) + ")";
    }
  }
  /* ---------- v8.3: FILE-FILE KELIHATAN DI MONITOR SAAT RUANGAN DIAM
     (perintah user 27 Nov 19:06 dari screenshot HP-nya: "Disini juga
     tampilin file-file-nya bisa ga buy"). Lapisan .rest per monitor:
     ikon folder grupnya (ikon yang sama seperti desktop hub) di-warp
     HOMOGRAPHY ke kaca monitor yang sama persis dengan hub (inset
     sama: tengah 1,5% + angkat bawah 0,25%, samping 0,8%), di atas foto —
     wallpaper Bloom-nya memang sudah menyala di foto. pointer-events
     none: zona pencet tetap yang menerima ketukan. Panggung .zoomed
     (dive / grup terbuka) -> .rest memudar; kamera pulang -> muncul
     lagi. Label mengikuti bahasa aktif (refreshRest di applyLang). */
  var REST_W = 480;
  var restEls = {};
  function restHTML(g){
    var tabList = (LANG === "en" && TAB_EN[g]) ? TAB_EN[g] : GROUPS[g].tabs;
    var h = '<div class="rest-icons">';
    for(var i = 0; i < tabList.length; i++){
      h += '<div class="rest-ic">' + FOLDER_SVG + '<span>' + esc(tabList[i]) + '</span></div>';
    }
    /* v8.16 — strip bawah .rest = salinan taskbar hub (menutup
       seluruh taskbar bawaan foto, termasuk widget pojoknya). */
    /* v8.30 — lapisan kaca (kilau + bayangan tepi) paling atas di
       dalam .rest: ikut warp kaca, di atas ikon + taskbar. */
    return h + '</div>' + restTaskbarHTML() + '<div class="rest-fx" aria-hidden="true"></div>';
  }
  function buildRest(){
    ["brand", "web", "video"].forEach(function(g){
      var el = document.createElement("div");
      el.className = "rest";
      el.setAttribute("data-g", g);   /* v8.27: kunci kompensasi posisi kolom ikon per monitor (lihat ruangan.css) */
      el.setAttribute("aria-hidden", "true");
      el.innerHTML = restHTML(g);
      breath.appendChild(el);
      restEls[g] = el;
    });
  }
  function placeRest(){
    for(var g in restEls){
      var el = restEls[g], q = quad(g), cs = corners(g);
      if(!cs || !frame.w) continue;
      var Hw = q.w * (1 - 2 * HUB_INSET) / 100 * frame.w;
      var Hh = q.h * (1 - 2 * HUB_INSET) / 100 * frame.h;
      var RH = Math.round(REST_W * Hh / Hw);
      RH = Math.max(240, Math.min(400, RH));
      el.style.left = "0px";
      el.style.top = "0px";
      el.style.width = REST_W + "px";
      el.style.height = RH + "px";
      var cx = (cs[0][0] + cs[1][0] + cs[2][0] + cs[3][0]) / 4;
      var cy = (cs[0][1] + cs[1][1] + cs[2][1] + cs[3][1]) / 4;
      var insetF = g === "web" ? 0.015 : 0.008;
      var dst = cs.map(function(p){
        return [ (p[0] + (cx - p[0]) * insetF) / 100 * frame.w,
                 (p[1] + (cy - p[1]) * insetF) / 100 * frame.h ];
      });
      if(g === "web"){ var liftB = 0.0025 * frame.h; dst[2][1] -= liftB; dst[3][1] -= liftB; }
      el.style.transform = homography(REST_W, RH, dst);
      /* v8.16 — skala salinan taskbar .rest: tingginya 12,5% dari
         tinggi lapisan (menutup strip foto), lebar batinnya
         menyesuaikan supaya proporsi ikon plek hub. */
      var tin = el.querySelector(".rest-tb-in");
      if(tin){
        var k = (0.125 * RH) / 26;
        tin.style.width = (REST_W / k).toFixed(1) + "px";
        tin.style.transform = "scale(" + k.toFixed(4) + ")";
      }
    }
  }
  function refreshRest(){
    for(var g in restEls) restEls[g].innerHTML = restHTML(g);
    placeRest();   /* v8.16: skala salinan taskbar .rest ikut dihitung ulang */
  }
  buildRest();

  /* ---------- LUMÉRA: baris / detail / showcase lokal (v3s) ---------- */
  function metaHTML(meta, cls){
    var h = '<dl class="dmeta' + (cls ? " " + cls : "") + '">';
    meta.forEach(function(m){ h += "<div><dt>" + esc(m[0]) + "</dt><dd>" + esc(m[1]) + "</dd></div>"; });
    return h + "</dl>";
  }
  function tabLabel(){
    var g = GROUPS[curGroup];
    return (LANG === "en" && TAB_EN[curGroup]) ? TAB_EN[curGroup][activeTab] : g.tabs[activeTab];
  }
  function listHTML(){
    /* v8.7 — SETIAP folder langsung menampilkan ISINYA (perintah user
       27 Nov 19:43): petak file ala File Explorer; isi per folder =
       karya asli CarlLab di kategori itu. */
    var h = "", foot = "";
    if(curGroup === "brand"){
      var key = BRAND_KEYS[activeTab];
      var items = LOGOS.filter(function(l){ return l.g === key; });
      h += '<p class="note">' + items.length + (LANG === "en" ? " logos · " : " logo · ")
        + esc(LANG === "en" ? BRAND_GNAME_EN[key] : BRAND_GNAME[key]) + '</p><div class="files">';
      items.forEach(function(l){
        h += '<button class="file" type="button" data-logo="' + l.id + '"><img class="fimg" alt="" loading="lazy" src="' + ABS + "brand-media/thumb-" + l.id + ".jpeg" + (l.tv ? "?v=" + l.tv : "") + '" style="background:' + l.bg + '">'
          + '<span class="fnm">' + esc(l.nm) + '</span><span class="fsb">' + esc(LANG === "en" ? l.en.rl : l.rl) + "</span></button>";
      });
      h += "</div>";
      foot = T("Pencet satu logo untuk melihat detail + palet warnanya.", "Tap a logo to see its detail and colour palette.");
    } else if(curGroup === "video"){
      var vids = VID_TABS[activeTab] || [];
      h += '<p class="note">' + esc(tabLabel()) + " — " + vids.length + " video</p>" + '<div class="files">';
      vids.forEach(function(v, i){
        h += '<button class="file" type="button" data-vid="' + i + '"><span class="fwrap"><img class="fimg" alt="" loading="lazy" src="' + ABS + "video-editing/media/" + v.m + '.jpg"><span class="fdur">' + v.d + '</span></span>'
          + '<span class="fnm">' + esc(v.t) + '</span><span class="fsb">' + v.d + " · " + T("Vertikal", "Vertical") + "</span></button>";
      });
      h += "</div>";
      foot = T("Pencet satu video untuk memutarnya di layar ini.", "Tap a video to play it on this screen.");
    } else if(activeTab === WEB_TOKO){
      /* LUMÉRA = FILE di folder Toko Online (v8.2, perintah user
         27 Nov 18:47). Dipencet -> situs livenya kebuka layar penuh. */
      h += '<p class="note">' + T("Toko Online — 1 karya", "Online Store — 1 work") + '</p>'
        + '<div class="files">'
        + '<button class="file" type="button" data-work="0"><img class="fimg" alt="" src="' + LUMERA.img + '">'
        + '<span class="fnm">' + esc(LUMERA.nm) + '</span><span class="fsb">' + esc(LUMERA.sb) + "</span></button>"
        + "</div>";
      foot = T("1 karya — ditampilkan langsung di HP ini.", "1 work — shown live on this phone.");
    } else {
      var sites = SITE_TABS[activeTab] || [];
      h += '<p class="note">' + esc(tabLabel()) + " — " + sites.length + T(" karya", " works") + '</p><div class="files">';
      sites.forEach(function(s, i){
        var cover = s.img
          ? '<img class="fimg" alt="" loading="lazy" src="' + s.img + '">'
          : '<span class="fimg ftile" style="background:' + s.tile.bg + ";color:" + s.tile.fg + '">' + esc(s.nm) + "</span>";
        h += '<button class="file" type="button" data-site="' + i + '">' + cover
          + '<span class="fnm">' + esc(s.nm) + '</span><span class="fsb">' + esc(LANG === "en" && s.sbEn ? s.sbEn : s.sb) + "</span></button>";
      });
      h += "</div>";
      foot = T("Pencet satu karya untuk membukanya langsung di HP ini.", "Tap a work to open it live on this phone.");
    }
    return h + '<p class="foot">' + foot + "</p>";
  }
  /* Detail logo (v8.7): sampul warna brand + thumbnail asli, nama,
     garis peran, deskripsi, palet (pencet swatch = salin hex). */
  function logoDetailHTML(){
    var l = curLogo; if(!l) return listHTML();
    var en = LANG === "en";
    var h = '<div class="cover" style="background:' + l.bg + '"><img alt="" src="' + ABS + "brand-media/thumb-" + l.id + ".jpeg" + (l.tv ? "?v=" + l.tv : "") + '"></div>'
      + '<div class="dnm">' + esc(l.nm) + "</div>"
      + '<p class="rsb" style="white-space:normal">' + esc(en ? l.en.rl : l.rl) + "</p>"
      + '<p class="dsub">' + T("Tentang logo ini", "About this logo") + '</p><p class="dds">' + esc(en ? l.en.ds : l.ds) + "</p>"
      + '<p class="dsub">' + T("Palet warna", "Colour palette") + ' <span class="hint">— ' + T("pencet untuk salin hex", "tap to copy the hex") + '</span></p><div class="pal">';
    l.pal.forEach(function(p, i){
      h += '<button class="sw" type="button" data-hex="' + p[1] + '"><i style="background:' + p[1] + '"></i><b>' + esc(en ? l.en.pal[i] : p[0]) + "</b><span>" + p[1] + "</span></button>";
    });
    h += "</div>";
    if(l.sets) h += '<button class="lbtn" type="button" data-setview>' + T("Lihat set lengkapnya", "See the full set") + "</button>";   /* v8.23: set tampil NATIV di dalam jendela monitor (view lset), bukan takeover/iframe — perintah user 28 Nov 05:57 (screenshot HP: takeover kebuka tapi isi tak turun di koneksi 1,44 K/s) */   /* v8.22: full set tampil DI DALAM ruangan (takeover bermesin sama dengan situs live), bukan tab baru — perintah user 28 Nov 05:38 dari screenshot HP-nya */
    return h;
  }

  /* Pemutar video di dalam jendela (v8.7): MP4 live dari halaman
     Video Editing CarlLab sendiri; Drive hanya cadangan. */
  function logoSetHTML(){
    var l = curLogo; if(!l || !l.sets) return "";
    var h = "";
    l.sets.forEach(function(g){
      h += '<div class="setgrp"><div class="setgh">' + esc(T(g.t, g.ten || g.t)) + '</div><div class="setgrid">'
        + g.imgs.map(function(src, i){ return '<figure class="setfig"><img loading="lazy" src="' + ABS + src + '" alt="' + esc(l.nm) + '">' + (g.caps && g.caps[i] ? "<figcaption>" + esc(g.caps[i]) + "</figcaption>" : "") + "</figure>"; }).join("")
        + "</div></div>";
    });
    return h;
  }
  function videoPlayHTML(){
    var v = curVid; if(!v) return listHTML();
    var poster = ABS + "video-editing/media/" + v.m + ".jpg";
    var src = ABS + "video-editing/media/" + v.m + ".mp4";
    return '<div class="vidwrap"><video id="scrVideo" controls playsinline preload="none" poster="' + poster + '" src="' + src + '"></video></div>'
      + '<p class="rsb" style="white-space:normal">' + esc(tabLabel()) + " · " + v.d + " · " + T("Vertikal", "Vertical") + "</p>"
      + '<a class="lbtn" href="https://drive.google.com/file/d/' + v.drv + '/view" target="_blank" rel="noopener">' + T("Tidak berputar? Buka di Google Drive ↗", "Not playing? Open in Google Drive ↗") + "</a>";
  }
  function stopVideo(){
    var v = hub.querySelector("video");
    if(v){ try{ v.pause(); }catch(e){} v.removeAttribute("src"); try{ v.load(); }catch(e){} }
  }
  function detailHTML(){
    /* v3u: bar kembali BUKAN di sini lagi — ia tetap (viewbar) di
       luar badan scroll, dirender oleh renderScreen. */
    return '<div class="hero"><img alt="" src="' + LUMERA.wide + '"><b>' + esc(LUMERA.nm) + "</b></div>"
      + '<p class="rsb" style="white-space:normal">' + esc(LUMERA.sb) + "</p>"
      + metaHTML(LANG === "en" ? LUMERA_EN.meta : LUMERA.meta)
      + '<p class="dds" style="margin-top:7px">' + esc(LANG === "en" ? LUMERA_EN.ds : LUMERA.ds) + "</p>"
      + '<button class="pbtn" type="button" data-play>' + T("Lihat di HP ini", "View on this phone") + '</button>'
      + '<a class="lbtn" href="' + LUMERA.url + '" target="_blank" rel="noopener">' + T("Buka situs aslinya ↗", "Open the original site ↗") + '</a>';
  }

  /* Showcase LOKAL: kepala LUMÉRA + The Night Collection, hero wide,
     lalu 5 produk sebagai daftar ala HP (gambar + nama + garis
     keluarga). Semua gambar berkas lokal / data URI — nol jaringan.
     Di bawahnya tautan teks ke toko interaktif aslinya. */
  function heroZonesHTML(){
    var h = '<span class="herozones" aria-hidden="false">';
    LUMERA_PRODUCTS.forEach(function(p, i){
      h += '<button class="herozone" type="button" data-prod="' + i + '" aria-label="' + T("Buka produk ", "Open product ") + esc(p.nm) + '"></button>';
    });
    return h + "</span>";
  }
  function showHTML(){
    /* v3u: bar (‹ Detail + nama) dihoist jadi viewbar tetap oleh
       renderScreen — di sini tinggal isi scroll-nya. */
    var h = '<p class="note">' + T("The Night Collection · 5 wewangian", "The Night Collection · 5 fragrances") + '</p>'
      + '<div class="hero"><img alt="" src="' + LUMERA.wide + '"><b>The Night Collection</b>' + heroZonesHTML() + '</div>'
      + '<div class="rows">';
    LUMERA_PRODUCTS.forEach(function(p, i){
      h += '<button class="row" type="button" data-prod="' + i + '"><img class="timg" alt="" src="' + p.img + '">'
        + '<span class="rtx"><span class="rnm">' + esc(p.nm) + '</span><span class="rsb">' + esc(LANG === "en" ? PROD_EN[i].notes[1][1] : p.notes[1][1]) + "</span></span>"
        + '<span class="arw">›</span></button>';
    });
    return h + "</div>"
      + '<a class="lbtn" href="' + LUMERA.url + '" target="_blank" rel="noopener">' + T("Buka situs aslinya ↗", "Open the original site ↗") + '</a>';
  }
  /* Tampilan produk (v3u): bar atas (‹ Koleksi + posisi n / 5 + ✕)
     adalah .scr-top kanvas — tetap, di luar scroll (lihat
     renderScreen). Badan scroll hanya berisi: foto utuh di panggung
     gelap + nama + puisi + notes lengkap, diukur agar pada paint
     pertama terlihat bar + botol utuh + nama penuh + baris notes
     pertama. Tanpa harga (aturan CarlLab untuk halaman ini). */
  function prodHTML(){
    var p = LUMERA_PRODUCTS[curProd];
    var pd = LANG === "en" ? PROD_EN[curProd] : p;
    return '<div class="prodstage"><img alt="" src="' + p.img + '"></div>'
      + '<p class="pnm">' + esc(p.nm) + "</p>"
      + '<p class="dds poem">' + esc(pd.poem) + "</p>"
      + metaHTML(pd.notes, "prodmeta");
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
    /* v8.7: fallback showcase lokal hanya ada untuk LUMÉRA; situs
       folder lain yang gagal dimuat kembali ke daftar foldernya. */
    if(liveItem && !liveItem.lumera){ view = "list"; renderScreen(); return; }
    view = "show"; renderScreen();
  }

  /* TAKEOVER (v3w): tampilkan/sembunyikan lapisan layar penuh.
     showTakeover merender iframe + chip "‹ Kembali" ke .takeover;
     hideTakeover mengosongkannya lagi (iframe dibuang = muatannya
     berhenti) dan membatalkan cek fallback yang menggantung lewat
     liveSeq++ — pola yang sama seperti liveSeq++ di closeGroup. */
  function showTakeover(){
    takeover.innerHTML = liveHTML()
      + '<button class="backchip" type="button" data-backlive aria-label="' + T("Kembali ke folder", "Back to the folder") + '">‹ ' + T("Kembali", "Back") + '</button>';
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
        var path = liveItem ? liveItem.path : "lumera.html";
        ok = !!d && (d.URL || "").indexOf(path) !== -1 && !!d.body
             && (liveItem && !liveItem.lumera ? (d.body.innerText || "").length > 20 : /LUMÉRA/.test(d.body.innerText || ""));
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
    var it = liveItem || LUMERA_LIVE;
    return '<iframe class="liveframe" src="' + it.url + '" title="' + T("Situs live ", "Live site ") + esc(it.nm) + T(" di dalam monitor", " inside the monitor") + '" loading="eager"></iframe>';
  }

  /* Render seluruh isi layar. Mode identitas (view "main") = markup
     v3q persis: label + angka + headline + tab, tanpa badan isi.
     Mode isi (khusus Websites tab Toko Online): angka/headline
     diganti badan layar (daftar/detail/showcase/produk) di bawah tab. */
  function renderScreen(){
    clearLiveTimer();
    stopVideo();   /* v8.7: video folder tidak boleh terus bersuara saat view berganti */
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
      top = '<div class="scr-top"><button class="backbar" type="button" data-backprod>‹ ' + T("Koleksi", "Collection") + '</button>'
        + '<span class="prodpos">' + (curProd + 1) + " / " + LUMERA_PRODUCTS.length + '</span>'
        + winBtnsHTML() + '</div>';
    } else {
      top = '<div class="scr-top"><span class="scr-label">' + g.label + '</span>'
        + winBtnsHTML() + '</div>';
    }
    /* Wallpaper desktop di dalam monitor DISAMAKAN dengan wallpaper
       monitornya di foto (perintah user 26 Nov 18:38): file yang sama
       persis dengan span Bloom yang membentang di tiga monitor foto,
       dan tiap monitor menampilkan sepertiga bagiannya sendiri
       (kiri 0% / tengah 50% / kanan 100%). */
    var wallPos = curGroup === "brand" ? "0%" : (curGroup === "video" ? "100%" : "50%");
    var winCls = (winState === "min") ? " min" : (winState === "max") ? " max" : "";
    var h = '<div class="view scr-view"><img class="deskbg" src="desk-wallpaper.jpg" alt="" aria-hidden="true" style="object-position:' + wallPos + ' 50%"><div class="power" aria-hidden="true"></div><div class="screen' + (content ? " content" : "") + '" id="screen">'
      + deskIconsHTML()
      + '<div class="win' + winCls + '" id="win">'
      + top;
    if(content){
      if(view !== "prod") h += '<div class="tabs" id="uiTabs">' + tabsHTML() + '</div>';
      if(view === "detail") h += '<div class="bar viewbar"><button class="backbar" type="button" data-back>‹ ' + T("Grup", "Group") + '</button></div>';
      if(view === "ldetail") h += '<div class="bar viewbar"><button class="backbar" type="button" data-back>‹ ' + T("Semua logo", "All logos") + '</button><b>' + esc(curLogo ? curLogo.nm : "") + '</b></div>';
      if(view === "lset") h += '<div class="bar viewbar"><button class="backbar" type="button" data-backdetail>‹ ' + esc(curLogo ? curLogo.nm : "") + '</button><b>' + T("Set Lengkap", "Full Set") + '</b></div>';
      if(view === "vplay") h += '<div class="bar viewbar"><button class="backbar" type="button" data-back>‹ ' + T("Semua video", "All videos") + '</button><b>' + esc(curVid ? curVid.t : "") + '</b></div>';
      if(view === "show") h += '<div class="bar viewbar"><button class="backbar" type="button" data-backshow>‹ ' + T("Grup", "Group") + '</button><b>' + esc(LUMERA.nm) + '</b></div>';
      if(view === "live") h += '<div class="bar viewbar"><button class="backbar" type="button" data-backlive>‹ ' + T("Folder", "Folder") + '</button><b>' + esc(liveItem ? liveItem.nm : LUMERA.nm) + '</b></div>';
      if(view === "live"){
        /* v3w: badan kanvas hanya placeholder — situs aslinya tampil
           di lapisan TAKEOVER layar penuh di atas seluruh panggung
           (showTakeover di akhir render ini), bukan di sini lagi. */
        h += '<div class="scr-body fill" id="uiBody"><p class="note">' + T("Situs live dibuka memenuhi layar…", "Opening the live site full-screen…") + '</p></div>';
      } else {
        h += '<div class="scr-body" id="uiBody">'
          + (view === "list" ? listHTML() : view === "detail" ? detailHTML() : view === "ldetail" ? logoDetailHTML() : view === "lset" ? logoSetHTML() : view === "vplay" ? videoPlayHTML() : view === "show" ? showHTML() : prodHTML())
          + "</div>";
      }
    } else {
      h += '<div class="scr-mid">'
        + '<div class="scr-head"><span class="l1">' + esc(g.l1) + '</span><span class="l2">' + esc(g.l2) + '</span></div></div>'
        + '<div class="tabs" id="uiTabs">' + tabsHTML() + '</div>';
    }
    hub.innerHTML = h + "</div>" + startMenuHTML() + taskbarHTML() + "</div></div>";
    placeHub();   /* skala kanvas .screen dihitung ulang tiap render */
    tickClock();   /* jam taskbar langsung terisi, tidak menunggu interval */
    if(view === "live"){ showTakeover(); armLiveFrame(); }
    if(view === "vplay"){ var sv = document.getElementById("scrVideo"); if(sv){ var pr = sv.play(); if(pr && pr.catch) pr.catch(function(){}); } }
  }

  function renderHub(){
    /* Websites dibuka langsung di tab Toko Online — tab satu-satunya
       yang berisi (LUMÉRA). Grup lain mulai dari tab pertama. */
    activeTab = (curGroup === "web") ? WEB_TOKO : 0;
    /* v8.1 — DESKTOP DULU (perintah user 27 Nov 18:45: "buat kaya
       gambar ke dua"): dive mendarat di DESKTOP BERSIH persis
       gambar kedua — wallpaper + ikon folder + taskbar, TANPA
       jendela. Jendela grup baru muncul bila ikon aplikasinya di
       taskbar dipencet, atau ikon folder desktopnya dipencet
       (folder kebuka di kategorinya). */
    winState = "min";
    view = "list";   /* v8.7: semua grup mendarat di ISI folder aktifnya — tidak ada lagi view identitas "main" sebagai isi */
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
    if(view === "lset"){ view = "ldetail"; renderScreen(); return; }
    if(view === "ldetail"){ view = "list"; renderScreen(); return; }
    if(view === "vplay"){ view = "list"; renderScreen(); return; }
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
    /* v8.30 — penanda dive untuk lapisan realisme: data-dive =
       monitor target (tetap tajam), kelas .diving menyalakan blur
       gerak + tarikan fokus + sapuan kilau kaca. Parallax penunjuk
       dinolkan SEBELUM transform dive dihitung (matematika dive
       menuntut .breath tepat di translate(0,0)). */
    stage.setAttribute("data-dive", key);
    stage.classList.add("diving");
    parReset();
    diveTransform(key);
    renderHub();
    placeHub();                                   /* geometri foto + pose trapesium, tetap sampai akhir */
    hub.hidden = false;
    /* v8.6 — TANPA KEDIP: hub TIDAK ditampilkan selama dive. Selama
       kamera mendekat, yang terlihat hanya foto + ikon file diam
       (.rest) yang ikut membesar di kaca — persis menyamperi monitor
       betulan. Ramp power-on v4 (monitor menyala di tengah jalan +
       isi menyusul di +700ms) DICABUT dari jalur dive: gejalanya
       persis yang user keluhkan dari rekaman HP-nya — ikon hilang
       dulu, desktop muncul kemudian. Hub baru memudar masuk .35s
       TEPAT saat kamera tiba (di callback DIVE_MS di bawah), dengan
       kelas .arrive (tanpa sapuan .power, tanpa glow), di atas ikon
       diam yang geometrinya sudah disamakan. */
    later(function(){
      if(state === "diving"){
        state = "open";
        stage.classList.remove("diving");   /* v8.30: blur/kilau selesai bersama kamera tiba */
        hub.classList.add("arrive");
        hub.classList.add("powering");
        hub.classList.add("show");
      }
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
    stage.classList.remove("diving"); stage.removeAttribute("data-dive");   /* v8.30: jaring pengaman lapisan realisme */
    hub.classList.remove("arrive");   /* v8.6: penanda kedatangan lepas bersama jalan pulang */
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
    /* v8 — kontrol desktop Windows: perkecil/perbesar jendela, ikon
       aplikasi di taskbar (pulihkan/perkecil), tombol Start, dan baris
       grup di menu Start (pindah monitor lewat openGroup). */
    if(t.closest("[data-winmin]")){ winState = "min"; applyWinState(); closeStart(); return true; }
    if(t.closest("[data-winmax]")){ winState = (winState === "max") ? "normal" : "max"; applyWinState(); closeStart(); return true; }
    if(t.closest("[data-tbapp]")){ winState = (winState === "min") ? "normal" : "min"; applyWinState(); closeStart(); return true; }
    if(t.closest("[data-start]")){ var sm0 = document.getElementById("startMenu"); if(sm0) sm0.classList.toggle("open"); return true; }
    var gt = t.closest("[data-goto]");
    if(gt){ closeStart(); var gk = gt.getAttribute("data-goto"); if(gk !== curGroup) openGroup(gk); return true; }
    var tb = t.closest("[data-tab]");
    if(tb){
      /* v8.7: ganti folder = langsung ISI folder itu (semua grup,
         semua tab). v8.1 tetap: ketukan pada IKON FOLDER DESKTOP
         juga MEMBUKA jendelanya; tab di dalam jendela hanya
         mengganti folder. */
      activeTab = +tb.getAttribute("data-tab");
      if(tb.classList.contains("dicon")) winState = "normal";
      view = "list";
      renderScreen();
      blurIfTouch();
      return true;
    }

    /* v8.7 — aksi isi folder (dulu gerbang webContent() membatasi
       semua aksi hanya untuk LUMÉRA; sekarang tiap folder hidup). */
    var lg = t.closest("[data-logo]");
    if(lg){ curLogo = logoById(lg.getAttribute("data-logo")); view = "ldetail"; renderScreen(); return true; }
    if(t.closest("[data-setview]")){ view = "lset"; renderScreen(); return true; }
    if(t.closest("[data-backdetail]")){ view = "ldetail"; renderScreen(); return true; }
    var st = t.closest("[data-site]");
    if(st){ var sit = (SITE_TABS[activeTab] || [])[+st.getAttribute("data-site")]; if(sit){ liveItem = { nm:sit.nm, url:sit.url, path:sit.path, lumera:false }; view = "live"; renderScreen(); } return true; }
    var vd = t.closest("[data-vid]");
    if(vd){ curVid = (VID_TABS[activeTab] || [])[+vd.getAttribute("data-vid")] || null; view = "vplay"; renderScreen(); return true; }
    var hx = t.closest("[data-hex]");
    if(hx){
      var hex = hx.getAttribute("data-hex");
      try { if(navigator.clipboard) navigator.clipboard.writeText(hex); } catch(e){}
      var sp = hx.querySelector("span"); if(sp){ var old = sp.textContent; sp.textContent = T("Disalin", "Copied"); setTimeout(function(){ sp.textContent = old; }, 1200); }
      return true;
    }
    if(t.closest("[data-work]")){ liveItem = LUMERA_LIVE; view = "live"; renderScreen(); return true; }
    if(t.closest("[data-play]")){ liveItem = LUMERA_LIVE; view = "live"; renderScreen(); return true; }
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
    if(!el.closest || !el.closest("[data-prod],[data-work],[data-play],[data-tab],[data-back],[data-backshow],[data-backprod],[data-backlive],[data-close],[data-winmin],[data-winmax],[data-tbapp],[data-start],[data-goto],[data-logo],[data-site],[data-setview],[data-backdetail],[data-vid],[data-hex]")) return;
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
    hub.classList.remove("show"); hub.classList.remove("powering"); hub.classList.remove("arrive"); hub.hidden = true; hub.innerHTML = "";
    stage.classList.remove("zoomed"); stage.classList.remove("returning");
    stage.classList.remove("diving"); stage.removeAttribute("data-dive");   /* v8.30 */
    cam.style.transform = "";
    state = "idle"; curGroup = null; view = "main";
    stage.classList.toggle("awake", woke);   /* v4.6 */
  }
  if(MQ.addEventListener) MQ.addEventListener("change", function(){ hardReset(); layout(); });

  /* v8.30 — PARALLAX MIKRO PENUNJUK (realisme #5): .breath bergeser
     maks ±3px/±2px mengikuti penunjuk, dilicinkan lerp rAF; variabel
     --parx/--pary dikomposisikan ke keyframes kb + transform diam
     .breath. Hanya pointer halus, hanya saat idle, mati untuk
     reduced-motion. parReset() dipanggil openGroup SEBELUM
     diveTransform: saat zoom animasi kb mati dan transform diam
     membaca var ini — wajib 0 agar matematika dive tetap tepat. */
  var parTX = 0, parTY = 0, parX = 0, parY = 0;
  var parOK = window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
              !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function parReset(){
    parTX = 0; parTY = 0; parX = 0; parY = 0;
    breath.style.setProperty("--parx", "0px");
    breath.style.setProperty("--pary", "0px");
  }
  if(parOK){
    stage.addEventListener("pointermove", function(e){
      if(state !== "idle") return;
      var r = stage.getBoundingClientRect();
      if(!r.width) return;
      parTX = ((e.clientX - r.left) / r.width - .5) * -6;
      parTY = ((e.clientY - r.top) / r.height - .5) * -4;
    });
    stage.addEventListener("pointerleave", function(){ parTX = 0; parTY = 0; });
    (function parLoop(){
      var dx = parTX - parX, dy = parTY - parY;
      if(Math.abs(dx) > .01 || Math.abs(dy) > .01){
        parX += dx * .045; parY += dy * .045;
        breath.style.setProperty("--parx", parX.toFixed(2) + "px");
        breath.style.setProperty("--pary", parY.toFixed(2) + "px");
      }
      requestAnimationFrame(parLoop);
    })();
  }

  /* v8.30 — LAYAR IKUT WAKTU (realisme #8): jam Asia/Jakarta
     menentukan --scr-f (terang layar diam) + --spill-k (kuat
     pendar ke meja). Siang: layar sedikit kalah terang dari
     ruangan + pendar lemah. Malam: layar relatif lebih terang +
     pendar lebih kuat. Dicek ulang tiap 5 menit. */
  function applyDaypart(){
    var h;
    try{
      h = Number(new Intl.DateTimeFormat("en-GB", { hour:"numeric", hour12:false, timeZone:"Asia/Jakarta" }).format(new Date())) % 24;
    }catch(e){ h = new Date().getHours(); }
    var scr, spill;
    if(h >= 19 || h < 5){ scr = 1.05; spill = 1.15; }        /* malam */
    else if(h >= 17){ scr = 1.01; spill = .9; }              /* sore */
    else if(h >= 9){ scr = .97; spill = .6; }                /* siang */
    else { scr = 1.0; spill = .85; }                         /* pagi */
    document.documentElement.style.setProperty("--scr-f", scr);
    document.documentElement.style.setProperty("--spill-k", spill);
  }
  applyDaypart();
  setInterval(applyDaypart, 5 * 60 * 1000);

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

  /* ================= TOGGLE BAHASA — penerapan =================
     applyLang menukar seluruh teks statis halaman (judul, meta,
     nav, petunjuk, label zona, alt foto, label hub) dan label
     tombol toggle itu sendiri (menampilkan bahasa TUJUAN).
     Bila sebuah grup sedang terbuka, isi hub dirender ulang pada
     view yang sama agar teksnya ikut berganti di tempat; selama
     takeover live, hanya teks chip-nya yang ditukar. */
  var langBtn = document.getElementById("langBtn");
  function applyLang(){
    document.documentElement.lang = LANG;
    document.title = "CarlLab";
    var md = document.querySelector('meta[name="description"]');
    if(md) md.setAttribute("content", T(
      "Ruangan foto realistis CarlLab dengan tiga monitor. Pencet satu monitor: kamera meluncur mendekat dan identitas grupnya tampil di dalam layar itu — kiri Brand & Logo, tengah Websites, kanan Video Editing.",
      "CarlLab's realistic photo room with three monitors. Tap a monitor: the camera glides in and that group's identity appears inside its screen — left Brand & Logo, centre Websites, right Video Editing."));
    var nl = document.querySelector("nav .nl");
    if(nl) nl.textContent = T("Ruangan", "Room");
    var cta = document.querySelector("nav .cta");
    if(cta && cta.childNodes.length > 1) cta.childNodes[cta.childNodes.length - 1].textContent = T("Pesan", "Order");
    var hint = document.querySelector(".stage-hint");
    if(hint) hint.textContent = T("Pencet salah satu monitornya — kamera akan mendekat.",
                                  "Tap one of the monitors — the camera will move in.");
    var zoneLbl = {
      brand: T("Buka grup Brand dan Logo di monitor kiri", "Open the Brand & Logo group on the left monitor"),
      web:   T("Buka grup Websites di monitor tengah", "Open the Websites group on the centre monitor"),
      video: T("Buka grup Video Editing di monitor kanan", "Open the Video Editing group on the right monitor")
    };
    document.querySelectorAll("[data-open]").forEach(function(b){
      var lbl = zoneLbl[b.getAttribute("data-open")];
      if(lbl) b.setAttribute("aria-label", lbl);
    });
    var roomImg = document.getElementById("room");
    if(roomImg) roomImg.setAttribute("alt", T("Foto ruangan gaming CarlLab dengan tiga monitor menyala",
                                              "Photo of the CarlLab gaming room with three monitors lit"));
    if(hub) hub.setAttribute("aria-label", T("Identitas grup di dalam monitor", "Group identity inside the monitor"));
    if(langBtn) langBtn.textContent = (LANG === "en") ? "ID" : "EN";
    refreshRest();   /* v8.3: label ikon file diam ikut bahasa aktif */
  }
  if(langBtn) langBtn.addEventListener("click", function(){
    LANG = (LANG === "en") ? "id" : "en";
    try { localStorage.setItem("carllab-lang", LANG); } catch(e){}
    applyLang();
    if(curGroup && (state === "open" || state === "diving")){
      if(view === "live"){
        var chip = takeover.querySelector("[data-backlive]");
        if(chip){
          chip.textContent = "‹ " + T("Kembali", "Back");
          chip.setAttribute("aria-label", T("Kembali ke detail LUMÉRA", "Back to the LUMÉRA detail"));
        }
      } else {
        renderScreen();
      }
    }
  });
  applyLang();

  /* Ruangan hidup: napas Ken Burns murni CSS (.breath, 24 dtk) — tidak ada JS film. */

})();
