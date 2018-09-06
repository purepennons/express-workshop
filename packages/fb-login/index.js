require('dotenv').config();

const fs = require('fs');
const path = require('path');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const stylus = require('stylus');
const session = require('cookie-session');

const routes = require('./routes/');
const { SESSION_KEYS } = require('./constants/env');

// paths
const certPath = path.join(__dirname, 'certs');
const publicPath = path.join(__dirname, 'public');
const templatePath = path.join(__dirname, 'template');
const stylusSrc = path.join(__dirname, 'styles');
const stylusDest = path.join(publicPath, 'styles');

// cert
const certOpts = {
  key: fs.readFileSync(path.join(certPath, 'server.key')),
  cert: fs.readFileSync(path.join(certPath, 'server.crt'))
};

// app
const app = express();

// global
app.locals.db = new Map();
app.locals.clearSession = function(userId, req) {
  const db = app.locals.db;
  db.delete(userId);
  req.session = null;
};

// set
app.set('view engine', 'ejs');
app.set('views', templatePath);

// middlewares
app.use(
  stylus.middleware({
    src: stylusSrc,
    dest: stylusDest,
    sourcemap: true,
    compress: true
  })
);
app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    name: 'session',
    keys: [SESSION_KEYS],
    secure: true,
    httpOnly: true,
    signed: true,
    maxAge: 2 * 60 * 60 * 1000
  })
);

app.use('/', routes);

app.use((err, req, res, next) => {
  console.log('error', err.stack);
  res.status(500).send('internal server error');
});

https.createServer(certOpts, app).listen(3000);
