// KomikService.js

async function createKomik(database, komikData) {
  const { title, description, author, imageType, imageName, imageData } = komikData;

  // Validasi data wajib
  if (!title || !description || !author) {
    throw new Error('Title, description, dan author wajib diisi');
  }

  // Membuat entri baru di database
  const newKomik = await database.Komik.create({
    title,
    description,
    author,
    imageType: imageType || null,
    imageName: imageName || null,
    imageData: imageData || null, // Pastikan imageData adalah Buffer jika diupload
  });

  return newKomik;
}

