const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

function isLoggedIn(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/?error=Anda+belum+login');
  }
  next();
}

router.get('/', isLoggedIn, menuController.showMenu);

module.exports = router;
