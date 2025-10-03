const express = require('express');
const router = express.Router();
const guruController = require('../controllers/guruController');

// Tampilkan daftar guru
router.get('/', guruController.showGuru);

// Tambah guru
router.post('/add', guruController.addGuru);

// Tampilkan halaman edit guru
router.get('/edit/:id', guruController.showEditGuru);

// Update guru
router.post('/edit/:id', guruController.editGuru);

// Hapus guru
router.post('/delete/:id', guruController.deleteGuru);

module.exports = router;
