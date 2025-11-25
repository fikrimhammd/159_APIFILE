// KomikService.js

async function createKomik(database, komikData) {
  const { title, description, author, imageType, imageName, imageData } = komikData;

  // Validasi data wajib
  if (!title || !description || !author) {
    throw new Error('Title, description, dan author wajib diisi');
  }

 