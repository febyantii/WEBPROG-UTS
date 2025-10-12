const { readJSON } = require('../utils/db');

exports.showGuru = async (req, res) => {
  try {
    const { search, filter } = req.query;
    let gurus = await readJSON('guru.json');

    // 🔍 Fitur pencarian
    if (search) {
      const searchLower = search.toLowerCase();
      gurus = gurus.filter(guru =>
        guru.firstname.toLowerCase().includes(searchLower) ||
        guru.lastname.toLowerCase().includes(searchLower)
      );
    }

    // 🧮 Fitur filter mapel
    if (filter && filter !== '') {
      gurus = gurus.filter(guru => guru.mapel === filter);
    }

    // ✅ Kirim ke file yang benar: report/guruReport.ejs
    res.render('report/guruReport', {
      gurus,
      search: search || '',
      filter: filter || '',
      error: null
    });

  } catch (err) {
    console.error(err);
    res.render('report/guruReport', {
      gurus: [],
      search: '',
      filter: '',
      error: 'Gagal memuat data guru'
    });
  }
};