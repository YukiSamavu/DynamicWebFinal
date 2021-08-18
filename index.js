const pug = require('pug');
const bcrypt = require('bcryptjs');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./routes/routes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

let urlendcodedParser  = express.urlencoded({
    extended: false
});

app.get('/', routes.index);
app.get('/create', routes.createAccount);
app.post('/create', urlendcodedParser, routes.createAccount);
app.get('/edit', routes.editAccount)
app.post('/edit', urlendcodedParser, routes.editAccount)
app.listen(3000);

