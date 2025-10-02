exports.showMenu = (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login"); // kalau belum login, balik ke login
  }

  const username = req.session.user.username; 
  res.render("menu", { username });
};
