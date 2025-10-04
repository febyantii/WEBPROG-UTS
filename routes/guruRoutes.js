const express = require('express');
const router = express.Router();
const guruController = require('../controllers/guruController');

function isLoggedIn(req, res, next) {
    if (!req.session.user) {
      return res.redirect('/?error=Anda+belum+login');
    }
    next();
  }

// Tampilkan daftar guru
router.get('/', isLoggedIn, guruController.showGuru);

// Tambah guru
router.post('/add', isLoggedIn, guruController.addGuru);

// Tampilkan halaman edit guru
router.get('/edit/:id', isLoggedIn, guruController.showEditGuru);

// Update guru
router.post('/edit/:id', isLoggedIn, guruController.editGuru);

// Hapus guru
router.post('/delete/:id', isLoggedIn, guruController.deleteGuru);

module.exports = router;
