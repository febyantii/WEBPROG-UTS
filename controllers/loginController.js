const { readJSON, writeJSON } = require('../utils/db');

exports.showLogin = (req, res) => {
  const error = req.query.error || null;
  res.render('login', { error });
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.render('login', { error: 'Username & password wajib diisi' });
    }

    const users = await readJSON('users.json');
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
      return res.render('login', { error: 'Username atau password salah' });
    }

    req.session.user = { 
      id: user.id, 
      username: user.username, 
      firstname: user.firstname, 
      lastname: user.lastname, 
      role: user.role || 'admin' 
    };
    
    res.redirect('/menu');
  } catch (err) {
    console.error(err);
    res.render('login', { error: 'Terjadi kesalahan server' });
  }
};

exports.showRegister = (req, res) => {
  res.render('register', { error: null });
};

exports.register = async (req, res) => {
  try {
    const { username, firstname, lastname, password, password2 } = req.body;
    if (!username || !firstname || !lastname || !password) {
      return res.render('register', { error: 'Semua data wajib diisi' });
    }
    // Validasi nama depan & belakang kapital
    if (!/^[A-Z]/.test(firstname) || !/^[A-Z]/.test(lastname)) {
      return res.render('register', { error: 'Nama depan & nama belakang harus diawali huruf kapital' });
    }

    // Validasi password minimal 8 karakter & kombinasi huruf+angka
    if (password.length < 8 || !/(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) {
      return res.render('register', { error: 'Password harus minimal 8 karakter dan kombinasi huruf & angka' });
    }

    if (password !== password2) {
      return res.render('register', { error: 'Konfirmasi password tidak cocok' });
    }

    const users = await readJSON('users.json');
    if (users.find(u => u.username === username)) {
      return res.render('register', { error: 'Username sudah dipakai' });
    }

    const id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;

    users.push({ id, username, firstname, lastname, password, role: 'admin' }); // ⬅️ password langsung disimpan
    await writeJSON('users.json', users);

    req.session.user = { id, username, firstname, lastname, role: 'admin' };
    res.redirect('/menu');
  } catch (err) {
    console.error(err);
    res.render('register', { error: 'Terjadi kesalahan server' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};
