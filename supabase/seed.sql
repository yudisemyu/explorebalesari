-- ============================================
-- Desa Balesari — Seed Data
-- ============================================

-- Homepage
INSERT INTO homepage (hero_title, hero_subtitle, about_title, about_description)
VALUES (
  'Jelajahi Keindahan Desa Balesari',
  'Rasakan pesona alam pegunungan, kekayaan budaya, dan keramahan masyarakat di desa wisata yang tersembunyi di lereng Gunung Sumbing.',
  'Desa Balesari, Permata di Lereng Sumbing',
  'Terletak di lereng Gunung Sumbing, Kecamatan Windusari, Kabupaten Magelang, Desa Balesari menawarkan keindahan alam pegunungan yang memukau dengan udara sejuk dan pemandangan yang menakjubkan. Dengan kearifan lokal yang terjaga, potensi wisata alam yang melimpah, dan semangat masyarakat yang guyub rukun, Desa Balesari siap menyambut setiap pengunjung dengan kehangatan.'
);

-- Statistics
INSERT INTO statistics (label, value, suffix, icon, sort_order) VALUES
  ('Penduduk', 3500, '+', 'users', 1),
  ('Hektar Luas', 450, '', 'mountain', 2),
  ('Destinasi Wisata', 8, '', 'tree-pine', 3),
  ('UMKM Aktif', 25, '+', 'store', 4);

-- Contacts
INSERT INTO contacts (address, phone, email, maps_embed_url, instagram, facebook)
VALUES (
  'Desa Balesari, Kec. Windusari, Kab. Magelang, Jawa Tengah 56152',
  '(0293) 000-000',
  'info@desabalesari.id',
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15816.567!2d110.0788!3d-7.3831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a9e2b1b0b0b0b%3A0x0!2sBalesari%2C+Windusari%2C+Magelang!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid',
  'https://instagram.com/desabalesari',
  'https://facebook.com/desabalesari'
);

-- Tourism
INSERT INTO tourism (title, slug, description, excerpt, location, is_featured) VALUES
  ('Curug Silawe', 'curug-silawe', '<p>Air terjun tersembunyi dengan ketinggian 30 meter di tengah hutan pinus yang sejuk. Curug Silawe menawarkan pengalaman wisata alam yang menyegarkan dengan udara pegunungan yang bersih.</p><p>Terletak sekitar 2 km dari pusat desa, perjalanan menuju air terjun ini melewati jalur trekking yang indah dengan pepohonan rindang.</p>', 'Air terjun tersembunyi dengan ketinggian 30 meter di tengah hutan pinus yang sejuk.', 'Dusun Krajan', true),
  ('Puncak Gunung Sumbing', 'puncak-gunung-sumbing', '<p>Jalur pendakian menuju puncak Gunung Sumbing dengan pemandangan sunrise yang spektakuler. Pendakian via Desa Balesari merupakan salah satu jalur favorit para pendaki.</p>', 'Jalur pendakian menuju puncak dengan pemandangan sunrise yang spektakuler.', 'Lereng Sumbing', true),
  ('Kebun Kopi Balesari', 'kebun-kopi-balesari', '<p>Wisata agro dengan pengalaman memetik dan mengolah kopi langsung dari kebunnya. Nikmati secangkir kopi arabika yang ditanam di ketinggian 1.200 mdpl.</p>', 'Wisata agro dengan pengalaman memetik dan mengolah kopi langsung dari kebunnya.', 'Dusun Balesari', true),
  ('Bukit Cinta', 'bukit-cinta', '<p>Spot foto dengan latar belakang pegunungan dan hamparan sawah terasering. Tempat romantis untuk menikmati sunset bersama orang tercinta.</p>', 'Spot foto dengan latar belakang pegunungan dan hamparan sawah terasering.', 'Dusun Ngasinan', false),
  ('Camping Ground Balesari', 'camping-ground-balesari', '<p>Area berkemah dengan fasilitas lengkap dan suasana alam yang menenangkan. Cocok untuk kegiatan outdoor bersama keluarga maupun komunitas.</p>', 'Area berkemah dengan fasilitas lengkap dan suasana alam yang menenangkan.', 'Dusun Krajan', false),
  ('Taman Bermain Edukasi', 'taman-bermain-edukasi', '<p>Wisata edukasi untuk anak-anak dengan kegiatan bertani dan mengenal alam. Anak-anak dapat belajar menanam sayur, memberi makan ternak, dan mengenal ekosistem pedesaan.</p>', 'Wisata edukasi untuk anak-anak dengan kegiatan bertani dan mengenal alam.', 'Dusun Balesari', false);

-- UMKM
INSERT INTO umkm (name, slug, description, excerpt, category, owner_name, phone, address, is_featured) VALUES
  ('Kopi Lereng Sumbing', 'kopi-lereng-sumbing', '<p>Kopi arabika premium yang ditanam di ketinggian 1.200 mdpl dengan cita rasa khas pegunungan. Diproses dengan metode natural dan honey process.</p>', 'Kopi arabika premium yang ditanam di ketinggian 1.200 mdpl dengan cita rasa khas.', 'Minuman', 'Pak Suroto', '0812-xxxx-xxxx', 'Dusun Balesari RT 02/RW 01', true),
  ('Batik Balesari', 'batik-balesari', '<p>Batik tulis dengan motif khas pegunungan dan flora lokal Desa Balesari. Setiap karya dibuat dengan tangan oleh pengrajin lokal.</p>', 'Batik tulis dengan motif khas pegunungan dan flora lokal Desa Balesari.', 'Kerajinan', 'Bu Siti', '0856-xxxx-xxxx', 'Dusun Krajan RT 01/RW 02', true),
  ('Sayur Organik Segar', 'sayur-organik-segar', '<p>Sayuran organik segar langsung dari kebun petani lokal tanpa pestisida. Tersedia wortel, kubis, brokoli, dan berbagai sayuran dataran tinggi.</p>', 'Sayuran organik segar langsung dari kebun petani lokal tanpa pestisida.', 'Pertanian', 'Kelompok Tani Maju', '0813-xxxx-xxxx', 'Dusun Balesari', true),
  ('Keripik Singkong Crispy', 'keripik-singkong-crispy', '<p>Camilan renyah dari singkong pilihan dengan berbagai varian rasa. Tersedia rasa original, balado, keju, dan jagung bakar.</p>', 'Camilan renyah dari singkong pilihan dengan berbagai varian rasa.', 'Makanan', 'Bu Wati', '0857-xxxx-xxxx', 'Dusun Ngasinan RT 03/RW 01', false);

-- News
INSERT INTO news (title, slug, content, excerpt, author, is_published, published_at) VALUES
  ('Festival Budaya Desa Balesari 2025 Sukses Digelar', 'festival-budaya-2025', '<h2>Kemeriahan Festival Budaya Tahunan</h2><p>Ratusan pengunjung memadati acara Festival Budaya tahunan Desa Balesari yang menampilkan seni tradisi dan kuliner khas. Acara yang berlangsung selama tiga hari ini menampilkan berbagai pertunjukan seni tradisional, pameran kerajinan, dan bazar kuliner.</p><p>Kepala Desa Balesari menyampaikan bahwa festival ini merupakan salah satu upaya untuk melestarikan budaya lokal sekaligus mempromosikan potensi desa kepada masyarakat luas.</p>', 'Ratusan pengunjung memadati acara Festival Budaya tahunan Desa Balesari yang menampilkan seni tradisi dan kuliner khas.', 'Admin', true, '2025-12-15T08:00:00Z'),
  ('Pembangunan Jalan Wisata Baru Dimulai', 'pembangunan-jalan-wisata', '<h2>Akses Menuju Destinasi Wisata Semakin Mudah</h2><p>Pemerintah desa memulai pembangunan akses jalan menuju destinasi wisata baru di kawasan Bukit Cinta. Proyek ini diharapkan selesai dalam waktu tiga bulan dan akan meningkatkan aksesibilitas wisatawan.</p>', 'Pemerintah desa memulai pembangunan akses jalan menuju destinasi wisata baru di kawasan Bukit Cinta.', 'Admin', true, '2025-11-28T08:00:00Z'),
  ('Pelatihan Digital Marketing untuk Pelaku UMKM', 'pelatihan-digital-marketing', '<h2>Meningkatkan Daya Saing UMKM Desa</h2><p>Sebanyak 30 pelaku UMKM Desa Balesari mengikuti pelatihan pemasaran digital untuk meningkatkan penjualan produk. Pelatihan ini mencakup penggunaan media sosial, marketplace, dan teknik fotografi produk.</p>', 'Sebanyak 30 pelaku UMKM Desa Balesari mengikuti pelatihan pemasaran digital untuk meningkatkan penjualan produk.', 'Admin', true, '2025-11-10T08:00:00Z');

-- Village Profile
INSERT INTO village_profile (content)
VALUES ('<h2>Tentang Desa Balesari</h2><p>Desa Balesari merupakan sebuah desa yang terletak di Kecamatan Windusari, Kabupaten Magelang, Provinsi Jawa Tengah. Berada di lereng Gunung Sumbing pada ketinggian sekitar 800-1.200 meter di atas permukaan laut, desa ini dianugerahi keindahan alam pegunungan yang memukau dan udara yang sejuk sepanjang tahun.</p><p>Dengan luas wilayah sekitar 450 hektar dan dihuni oleh lebih dari 3.500 jiwa, Desa Balesari memiliki potensi besar di bidang pertanian, perkebunan, pariwisata, dan industri kreatif.</p><h2>Visi</h2><p><em>Terwujudnya Desa Balesari yang mandiri, sejahtera, dan berdaya saing melalui pengembangan potensi alam, budaya, dan sumber daya manusia yang berkelanjutan.</em></p><h2>Misi</h2><ol><li>Mengembangkan potensi wisata alam dan budaya desa secara berkelanjutan</li><li>Meningkatkan kualitas sumber daya manusia melalui pendidikan dan pelatihan</li><li>Mendorong pertumbuhan UMKM dan ekonomi kreatif masyarakat</li><li>Memperkuat infrastruktur desa untuk mendukung aksesibilitas</li><li>Melestarikan lingkungan hidup dan kearifan lokal</li><li>Meningkatkan pelayanan publik yang transparan dan akuntabel</li></ol>');
