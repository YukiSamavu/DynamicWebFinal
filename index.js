const pug = require('pug');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
const cookieParser = require('cookie-parser');
const routes = require('./routes/routes');
const expressSession = require('express-session');
const { decodeBase64 } = require('bcryptjs');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(expressSession({
    secret: 'W3b15n1c5',
    saveUninitialized: true,
    resave: true
}));

let salt = bcrypt.genSaltSync(10);

let urlendcodedParser  = express.urlencoded({extended: false});

const checkAuth = (req, res, next) => {
    if(req.session.user && req.session.user.isAuthenticated){
        next();
    }else{
        res.redirect('/login');
    }
}

app.get('/logout', (res, req) => {
    req.session.destroyer(err => {
        if(err) {
            console.log(err);
        }else {
            res.redirect('/login');
        }
    });
});

app.get('/login', (req, res) => {
    res.render('login');
});


let today = new Date();
let theTime = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

app.get('/', routes.index);
app.post('/', urlendcodedParser, routes.login);
app.get('/home', (req,res) => {
    res.cookie('time', theTime, {maxAge:9999999999999999});
    res.render('Home', {
        title: 'Welcome',
        time: theTime
        });
    });
app.get('/create', routes.create);
app.post('/create', urlendcodedParser, routes.createAccount);
app.get('/edit', routes.edit)
app.post('/edit', urlendcodedParser, routes.editAccount);
app.listen(3000);

