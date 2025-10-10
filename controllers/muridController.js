const { readJSON, writeJSON } = require('../utils/db');

// Tampilkan semua murid
exports.showMurid = async (req, res) => {
  const murids = await readJSON('murid.json');
  res.render('murid', { murids });
};

// Tampilkan halaman edit murid
exports.showEditMurid = async (req, res) => {
  const { id } = req.params;
  const murids = await readJSON('murid.json');
  const murid = murids.find(m => m.id == id);
  if (!murid) return res.redirect('/murid');
  res.render('murid/editMurid', { murid });
};

// Tambah murid
exports.addMurid = async (req, res) => {
  try {
    const { fullname, kelas, mapel, tgl_lahir, asal_sekolah } = req.body;
    if (!fullname || !kelas || !mapel || !tgl_lahir || !asal_sekolah) {
      return res.render('murid', { murids: await readJSON('murid.json'), error: 'Semua field wajib diisi' });
    }

    const murids = await readJSON('murid.json');
    const id = murids.length ? Math.max(...murids.map(m => m.id)) + 1 : 1;

    murids.push({ id, fullname, kelas, mapel, tgl_lahir, asal_sekolah });
    await writeJSON('murid.json', murids);

    res.redirect('/murid');
  } catch (err) {
    console.error(err);
    res.render('murid', { murids: [], error: 'Terjadi kesalahan server' });
  }
};

// Update murid
exports.editMurid = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, kelas, mapel, tgl_lahir, asal_sekolah } = req.body;

    let murids = await readJSON('murid.json');
    const index = murids.findIndex(m => m.id == id);

    if (index !== -1) {
      murids[index] = { id: parseInt(id), fullname, kelas, mapel, tgl_lahir, asal_sekolah };
      await writeJSON('murid.json', murids);
    }

    res.redirect('/murid');
  } catch (err) {
    console.error(err);
    res.redirect('/murid');
  }
};

// Hapus murid
exports.deleteMurid = async (req, res) => {
  try {
    const { id } = req.params;
    let murids = await readJSON('murid.json');

    const muridIndex = murids.findIndex(m => String(m.id) === String(id));
    if (muridIndex === -1) {
      console.warn(`Murid dengan ID ${id} tidak ditemukan.`);
      return res.redirect('/murid?status=notfound');
    }

    murids.splice(muridIndex, 1);
    await writeJSON('murid.json', murids);

    console.log(`Murid dengan ID ${id} berhasil dihapus.`);
    return res.redirect('/murid?status=deleted');
  } catch (err) {
    console.error('Error menghapus murid:', err);
    return res.redirect('/murid?status=error');
  }
};
