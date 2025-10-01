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

    req.session.user = { id: user.id, username: user.username, role: user.role || 'admin' };
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
    const { username, password, password2 } = req.body;
    if (!username || !password) {
      return res.render('register', { error: 'Username & password wajib diisi' });
    }
    if (password !== password2) {
      return res.render('register', { error: 'Konfirmasi password tidak cocok' });
    }

    const users = await readJSON('users.json');
    if (users.find(u => u.username === username)) {
      return res.render('register', { error: 'Username sudah dipakai' });
    }

    const id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;

    users.push({ id, username, password, role: 'admin' }); // ⬅️ password langsung disimpan
    await writeJSON('users.json', users);

    req.session.user = { id, username, role: 'admin' };
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
