// controllers/menuController.js
exports.showMenu = (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login"); // kalau belum login, balik ke login
  }

  // Ambil data user dari session
  const { firstname, lastname } = req.session.user;

  // Kirim hanya firstname & lastname ke EJS
  res.render("menu", { 
    user: { firstname, lastname } 
  });
};
