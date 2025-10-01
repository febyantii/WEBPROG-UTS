exports.showMenu = (req, res) => {
  const user = req.session.user;
  res.render('menu', { user });
};
