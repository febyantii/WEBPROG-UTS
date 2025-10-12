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

router.get('/guru', isLoggedIn, reportController.showGuru);

router.get('/murid', isLoggedIn, reportController.showMurid);


module.exports = router;
