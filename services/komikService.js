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

