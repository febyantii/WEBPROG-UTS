const express = require('express');
const router = express.Router();
const guruController = require('../controllers/guruController');

router.get('/', guruController.showGuru);
router.post('/add', guruController.addGuru);
router.get('/edit/:id', guruController.showEditGuru); // halaman edit
router.post('/edit/:id', guruController.editGuru);
router.get('/delete/:id', guruController.deleteGuru);

module.exports = router;
