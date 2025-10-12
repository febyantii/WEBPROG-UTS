const express = require('express');
const session = require('express-session');
const path = require('path');

const loginRoutes = require('./routes/loginRoutes');
const menuRoutes = require('./routes/menuRoutes');
const guruRoutes = require('./routes/guruRoutes');
const muridRoutes = require('./routes/muridRoutes'); 
const reportRoutes = require('./routes/reportRoutes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET || 'rahasiaUTS',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 } // 1 jam
}));

// routes
app.use('/', loginRoutes);
app.use('/menu', menuRoutes);
app.use('/guru', guruRoutes);
app.use('/murid', muridRoutes);
app.use('/report', reportRoutes);

// 404 simple
app.use((req, res) => res.status(404).send('404 Not Found'));

app.use(express.static('public')); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server berjalan: http://localhost:${PORT}`));
