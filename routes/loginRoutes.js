const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.get('/', loginController.showLogin);          // GET / -> login form
router.post('/login', loginController.login);        // POST /login -> proses login
router.get('/register', loginController.showRegister); // GET /register -> form register
router.post('/register', loginController.register);    // POST /register -> simpan user
router.get('/logout', loginController.logout);       // GET /logout

module.exports = router;
