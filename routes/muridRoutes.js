const express = require('express');
const router = express.Router();
const muridController = require('../controllers/muridController');

function isLoggedIn(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/?error=Anda+belum+login');
  }
  next();
}

// Tampilkan daftar murid
router.get('/', isLoggedIn, muridController.showMurid);

// Tambah murid
router.post('/add', isLoggedIn, muridController.addMurid);

// Tampilkan halaman edit murid
router.get('/edit/:id', isLoggedIn, muridController.showEditMurid);

// Update murid
router.post('/edit/:id', isLoggedIn, muridController.editMurid);

// Hapus murid
router.post('/delete/:id', isLoggedIn, muridController.deleteMurid);

module.exports = router;
