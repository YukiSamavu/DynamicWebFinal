const pug = require('pug');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const routes = require('./routes/routes');
const expressSession = require('express-session');
const { decodeBase64 } = require('bcryptjs');

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(expressSession({
    secret: 'W3b15n1c5',
    saveUninitialized: true,
    resave: true
}));

let urlendcodedParser  = express.urlencoded({extended: false});

const checkAuth = (req, res, next) => {
    if(req.session.user && req.session.user.isAuthenticated){
        next();
    }else{
        res.redirect('/home');
    }
}

app.post('/logout', (req,res) => {
    req.session.destroy(err => {
        if(err) {
            console.log(err)
        }
        else {
            res.redirect('/')
        }
    })
})

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/', routes.index);
app.post('/', urlendcodedParser, routes.login);
app.get('/home', (req,res) => {
    let today = new Date();
    let theTime = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
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
app.get('/api', routes.api)
app.listen(3000);

