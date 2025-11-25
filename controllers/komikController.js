// KomikController.js

const db = require('../models/');
const komikService = require('../services/KomikService');

// Fungsi Controller untuk membuat Komik (POST)
async function createKomik(req, res) {
  try {
    const komikData = req.body;

    // Menangani data file yang diupload (misalnya menggunakan Multer)
    if (req.file) {
      komikData.imageType = req.file.mimetype;
      komikData.imageName = req.file.originalname;
      komikData.imageData = req.file.buffer; // Menggunakan buffer untuk disimpan ke database
    }

    const result = await komikService.createKomik(db, komikData);
    // Jika berhasil, kirim respons 201 Created
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    // Jika terjadi error (termasuk error validasi dari service), kirim respons 400 Bad Request
    res.status(400).json({ success: false, error: error.message });
  }
}

// Fungsi Controller untuk mengambil semua Komik (GET)
async function getAllKomik(req, res) {
  try {
    const result = await komikService.getAllKomik(db);
    // Jika berhasil, kirim respons 200 OK
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    // Jika terjadi error pada server atau database, kirim respons 500 Internal Server Error
    res.status(500).json({ success: false, error: error.message });
  }
}

// Fungsi Controller untuk mengambil Komik berdasarkan ID (GET /:id)
async function getKomikById(req, res) {
  try {
    const { id } = req.params; // Mengambil ID dari parameter URL
    const result = await komikService.getKomikById(db, id);
    // Jika berhasil, kirim respons 200 OK
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    // Jika terjadi error (termasuk "Komik tidak ditemukan" dari service), kirim respons 404/500
    // Berdasarkan kode di gambar, error akan ditangkap di sini
    res.status(404).json({ success: false, error: error.message }); // Menggunakan 404 jika tidak ditemukan
  }
}

// Mengekspor fungsi controller
module.exports = {
    createKomik,
    getAllKomik,
    getKomikById,
};

// ... (Bagian sebelumnya dari createKomik, getAllKomik, getKomikById)

// Fungsi Controller untuk mengupdate Komik (PUT/PATCH /:id)
async function updateKomik(req, res) {
  try {
    // Mengambil data update dari body request
    const komikData = req.body;

    // Menangani data file yang diupload (jika ada)
    if (req.file) {
      komikData.imageType = req.file.mimetype;
      komikData.imageName = req.file.originalname;
      komikData.imageData = req.file.buffer;
    }

    // Memanggil service untuk update, membutuhkan ID dari parameter
    const result = await komikService.updateKomik(db, req.params.id, komikData);
    
    // Jika berhasil, kirim respons 200 OK dengan data yang telah diupdate
    res.json({ success: true, data: result });
  } catch (error) {
    // Jika terjadi error (misalnya validasi atau ID tidak ditemukan), kirim respons 400 Bad Request
    res.status(400).json({ success: false, error: error.message });
  }
}

// Fungsi Controller untuk menghapus Komik (DELETE /:id)
async function deleteKomik(req, res) {
  try {
    // Memanggil service untuk delete, membutuhkan ID dari parameter
    const result = await komikService.deleteKomik(db, req.params.id);
    
    // Jika berhasil, kirim respons 200 OK
    // Diasumsikan service mengembalikan objek dengan properti 'message'
    res.json({ success: true, message: result.message });
  } catch (error) {
    // Jika terjadi error (misalnya ID tidak ditemukan), kirim respons 400 Bad Request
    res.status(400).json({ success: false, error: error.message });
  }
}

// Mengekspor semua fungsi controller
module.exports = {
  createKomik,
  getAllKomik,
  getKomikById,
  updateKomik,
  deleteKomik,
};