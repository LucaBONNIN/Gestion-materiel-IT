var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const db = require('./config/db'); // connexion MySQL

// Routes API
const produitRoutes = require('./routes/produitRoutes');
const mouvementRoutes = require('./routes/mouvementRoutes');
const authRoutes = require('./routes/authRoutes');

var app = express();

// view engine setup 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// =======================
// Routes simples de test
// =======================

// route racine : test que le serveur répond
app.get('/', (req, res) => {
    res.send('API Gestion-materiel-IT OK');
});

// route de test BDD
app.get('/test-bdd', (req, res) => {
    db.query('SELECT 1 + 1 AS result', (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ ok: false, error: 'Erreur BDD' });
        }
        res.json({ ok: true, result: rows[0].result });
    });
});

// =======================
// Routes API
// =======================
app.use('/api/produits', produitRoutes);
app.use('/api/mouvements', mouvementRoutes);
app.use('/api/auth', authRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
