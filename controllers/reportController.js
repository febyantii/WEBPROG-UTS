const { readJSON } = require('../utils/db');

exports.showGuru = async (req, res) => {
  try {
    const { search, filter } = req.query;
    let gurus = await readJSON('guru.json');

    if (search) {
      const searchLower = search.toLowerCase();
      gurus = gurus.filter(guru =>
        guru.firstname.toLowerCase().includes(searchLower) ||
        guru.lastname.toLowerCase().includes(searchLower)
      );
    }

    if (filter && filter !== '') {
      gurus = gurus.filter(guru => guru.mapel === filter);
    }

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

exports.showMurid = async (req, res) => {
  try {
    const {search, filter} = req.query;
    let murids = await readJSON('murid.json');

    if (search) {
      const searchLower = search.toLowerCase();
      murids = murids.filter(murid =>
        murid.fullname.toLowerCase().includes(searchLower)
      );
    }

    if (filter && filter !== 'all') {
      murids = murids.filter(murid => murid.mapel === filter);
    }

    res.render('report/muridReport', {
      murids,
      search: search || '',
      filter: filter || 'all',
      error: null
    });
  } catch (err) {
    console.error(err);
    res.render('report/muridReport', {
      murids: [],
      search: '',
      filter: 'all',
      error: 'gagal memua data murid'
    })
  }
};