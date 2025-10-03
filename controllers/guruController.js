const { readJSON, writeJSON } = require('../utils/db');

// Tampilkan semua guru
exports.showGuru = async (req, res) => {
  const gurus = await readJSON('guru.json');
  res.render('guru', { gurus });
};

// Tampilkan halaman edit guru
exports.showEditGuru = async (req, res) => {
  const { id } = req.params;
  const gurus = await readJSON('guru.json');
  const guru = gurus.find(g => g.id == id);
  if (!guru) return res.redirect('/guru');
  res.render('guru/editGuru', { guru });
};

// Tambah guru
exports.addGuru = async (req, res) => {
  try {
    const { firstname, lastname, pendidikan, mapel, tgl_lahir, sertifikat } = req.body;
    if (!firstname || !lastname || !pendidikan || !mapel || !tgl_lahir || !sertifikat) {
      return res.render('guru', { gurus: await readJSON('guru.json'), error: 'Semua field wajib diisi' });
    }

    const gurus = await readJSON('guru.json');
    const id = gurus.length ? Math.max(...gurus.map(g => g.id)) + 1 : 1;

    gurus.push({ id, firstname, lastname, pendidikan, mapel, tgl_lahir, sertifikat });
    await writeJSON('guru.json', gurus);

    res.redirect('/guru');
  } catch (err) {
    console.error(err);
    res.render('guru', { gurus: [], error: 'Terjadi kesalahan server' });
  }
};

// Update guru
exports.editGuru = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, pendidikan, mapel, tgl_lahir, sertifikat } = req.body;

    let gurus = await readJSON('guru.json');
    const index = gurus.findIndex(g => g.id == id);

    if (index !== -1) {
      gurus[index] = { id: parseInt(id), firstname, lastname, pendidikan, mapel, tgl_lahir, sertifikat };
      await writeJSON('guru.json', gurus);
    }

    res.redirect('/guru');
  } catch (err) {
    console.error(err);
    res.redirect('/guru');
  }
};

// Hapus guru
exports.deleteGuru = async (req, res) => {
  try {
    const { id } = req.params;
    let gurus = await readJSON('guru.json');
    gurus = gurus.filter(g => g.id != id);
    await writeJSON('guru.json', gurus);
    res.redirect('/guru');
  } catch (err) {
    console.error(err);
    res.redirect('/guru');
  }
};
