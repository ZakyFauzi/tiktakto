# Tik Tek Tok

Selamat datang di *Tik Tek Tok*! Ini bukan sekadar game Tic Tac Toe biasa. Proyek ini adalah imajinasi ulang dari game klasik yang menggabungkan elemen strategi seperti catur atau dam dengan sistem permainan yang dinamis dan antarmuka pengguna yang modern.

## Deskripsi

Game ini dirancang untuk dua pemain, di mana setiap pemain tidak hanya berusaha untuk membuat barisan tiga bidak, tetapi juga harus memikirkan kapan harus menempatkan bidak baru atau memindahkan bidak yang sudah ada di papan. Dengan fitur personalisasi nama dan avatar, serta gaya visual **Neobrutalism** yang tegas, game ini menawarkan pengalaman yang segar dan menantang.

## Fitur Utama

  - **Personalisasi Pemain**: Masukkan nama untuk setiap pemain untuk pengalaman yang lebih personal.
  - **Sistem Avatar Unik**: Ganti simbol 'X' dan 'O' klasik dengan avatar emoji yang seru (🍃, 🪨, 🌸).
      - Giliran memilih avatar ditentukan secara acak setelah nama diinput.
  - **Gameplay Strategis Hibrida**:
      - **Fase Fleksibel**: Tidak ada fase menaruh yang kaku. Pemain bebas memilih antara menempatkan bidak baru dari "gudang" atau memindahkan bidak yang sudah ada di papan pada setiap giliran.
      - **Manajemen Bidak**: Setiap pemain memiliki 3 bidak yang bisa dikelola, memberikan lapisan strategi tambahan.
  - **Antarmuka Modern & Responsif**:
      - **Gaya Neobrutalism**: Tampilan visual yang tegas, dengan border tebal, bayangan kaku, dan palet warna yang menarik.
      - **Desain Responsif**: Layout beradaptasi dengan mulus dari desktop ke perangkat mobile, memastikan pengalaman bermain yang optimal di semua ukuran layar.
  - **Sistem Notifikasi Modern**:
      - **Toast Notification**: Pesan giliran dan instruksi muncul sebagai notifikasi singkat yang tidak mengganggu alur permainan.
      - **Pop-up Kemenangan**: Layar kemenangan yang jelas muncul sebagai modal overlay saat permainan berakhir.

## Teknologi yang Digunakan

Proyek ini dibangun murni dengan teknologi web fundamental, tanpa memerlukan *framework* atau *library* eksternal.

  - **HTML5**: Sebagai struktur dasar dari aplikasi web.
  - **CSS3**: Untuk styling, layouting (Flexbox & Grid), animasi, dan desain responsif (Media Queries).
  - **JavaScript (ES6+)**: Untuk semua logika permainan, manipulasi DOM, manajemen *state*, dan interaktivitas.

## Cara Menjalankan Proyek Secara Lokal

Kamu tidak memerlukan instalasi atau *build tools* yang rumit untuk menjalankan proyek ini.

1.  **Clone repositori ini:**

    ```bash
    git clone https://github.com/ZakyFauzi/tiktakto.git
    ```

2.  **Buka direktori proyek:**

    ```bash
    cd tiktakto
    ```

3.  **Buka file `index.html`:**
    Langsung buka file `index.html` di browser pilihanmu (Google Chrome, Firefox, dll).

    Atau, jika kamu menggunakan Visual Studio Code dengan ekstensi "Live Server", kamu bisa klik kanan pada file `index.html` dan pilih "Open with Live Server".

## Cara Bermain

1.  **Input Nama**: Masukkan nama untuk Pemain 1 dan Pemain 2, lalu klik "Mulai Permainan".
2.  **Pilih Avatar**: Pemain yang gilirannya ditentukan secara acak akan memilih avatar terlebih dahulu. Pemain kedua kemudian memilih dari sisa avatar yang tersedia.
3.  **Bermain**:
      - Pada giliranmu, kamu memiliki dua pilihan:
          - **Menaruh Bidak Baru**: Klik salah satu bidakmu yang tersedia di panel samping, lalu klik kotak kosong di papan.
          - **Memindahkan Bidak**: Klik salah satu bidakmu yang sudah ada di papan, lalu klik kotak kosong lain sebagai tujuan.
4.  **Menang**: Pemain pertama yang berhasil membentuk garis lurus (horizontal, vertikal, atau diagonal) dengan tiga bidaknya akan menjadi pemenang.
5.  **Mulai Ulang**: Klik tombol "Mulai Ulang" di papan atau di pop-up kemenangan untuk kembali ke layar awal.

-----
