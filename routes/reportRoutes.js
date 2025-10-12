const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

function isLoggedIn(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/?error=Anda+belum+login');
  }
  next();
}

router.get('/', isLoggedIn, (req, res) => {
  res.render('report/index');
});

router.get('/murid', isLoggedIn, (req, res) => {
  res.render('report/muridReport');
});

router.get('/guru', isLoggedIn, reportController.showGuru);

module.exports = router;

module.exports = router;
