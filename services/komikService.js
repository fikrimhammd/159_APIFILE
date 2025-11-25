// KomikService.js

async function createKomik(database, komikData) {
  const { judul, deskripsi, penulis, imageType, imageName, imageData } = komikData;

  // Validasi data wajib
  if (!judul || !deskripsi || !penulis) {
    throw new Error('Title, description, dan author wajib diisi');
  }

  // Membuat entri baru di database
  const newKomik = await database.Komik.create({
    judul,
    deskripsi,
    penulis,
    imageType: imageType || null,
    imageName: imageName || null,
    imageData: imageData || null, // Pastikan imageData adalah Buffer jika diupload
  });

  return newKomik;
}

async function getAllKomik(database) {
  const komiks = await database.Komik.findAll();

  // Mengubah imageData (Buffer) menjadi string Base64 sebelum dikembalikan
  return komiks.map(k => {
    // k adalah objek komik. Kita pastikan k.imageData ada sebelum diubah
    if (k.imageData) {
      k.imageData = k.imageData.toString('base64');
    }
    return k;
  });
}

async function getKomikById(database, id) {
  const komik = await database.Komik.findByPk(id);

  if (!komik) {
    throw new Error('Komik tidak ditemukan');
  }

  // Mengubah imageData (Buffer) menjadi string Base64 sebelum dikembalikan
  if (komik.imageData) {
    komik.imageData = komik.imageData.toString('base64');
  }

  return komik;
}

// ... (Bagian sebelumnya dari createKomik, getAllKomik, getKomikById)

async function updateKomik(database, id, komikData) {
  // 1. Cari komik berdasarkan ID
  const komik = await database.Komik.findByPk(id);

  // 2. Jika komik tidak ditemukan, lempar error
  if (!komik) {
    throw new Error(`Komik dengan ID ${id} tidak ditemukan`);
  }

  // 3. Update data komik
  // Fungsi update ini berasal dari instance Sequelize Model yang ditemukan (komik)
  await komik.update(komikData);

  // 4. Kembalikan data komik yang telah diupdate
  return komik;
}

async function deleteKomik(database, id) {
  // 1. Cari komik berdasarkan ID
  const komik = await database.Komik.findByPk(id);

  // 2. Jika komik tidak ditemukan, lempar error
  if (!komik) {
    throw new Error(`Komik dengan ID ${id} tidak ditemukan`);
  }

  // 3. Hapus komik dari database
  // Fungsi destroy ini berasal dari instance Sequelize Model yang ditemukan (komik)
  await komik.destroy();

  // 4. Kembalikan pesan sukses
  return { message: `Komik dengan ID ${id} berhasil dihapus` };
}

// Mengekspor semua fungsi service agar dapat digunakan oleh Controller
module.exports = {
  createKomik,
  getAllKomik,
  getKomikById,
  updateKomik,
  deleteKomik,
};