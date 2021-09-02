const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://Awesomewott:Password1234@cluster0.kxwjd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useUnifiedTopology: true, 
    useNewUrlParser: true
});

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

let mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error'));
mdb.once('open', callback => {});

let salt = bcrypt.genSaltSync(10);
let currentUser = ''
let avatarLink = ''

let accountSchema = mongoose.Schema({
    username: String,
    password: String, 
    email: String, 
    age: Number,
    continent: String,
    color: String, 
    cardgame: String,
    avatarLink: String
}); 

let Account = mongoose.model('Account_Connection', accountSchema);

exports.index = (req, res) => {
    Account.find((err, account) => {
    res.render('index', {
        title: `Hello!`,
        //image.src = avatarLink
        });
    });
};

exports.home = (req, res) => {
    res.render('Home'), {
        title: `Hey ${req.body.username}`
    };
};

exports.login = (req,res) => {
    const inputUser = {username: req.body.username}
    Account.find(inputUser, (err,user) => {
        if(err) return console.error(err);
        console.log(inputUser)
        console.log(user);
        //console.log(bcrypt.compareSync(req.body.password, user.password))
        console.log(user[0].username);
        if(bcrypt.compareSync(req.body.password, user[0].password))
        {
            currentUser = inputUser;
            req.session.user = {
                isAuthenticated: true,
                username: req.body.username
            }
            avatarLink = user[0].avatarLink
            console.log(avatarLink)
            res.redirect('/home');
        }
        else{
            res.redirect('/');
        }
    })
    //bcrypt.compareSync(req.body.password, database password)
}

exports.create = (req, res) => {
    res.render('create', {
        title: 'Create New Profile'
    });
};
var myList = [];

exports.createAccount = (req, res) => {
    //if(err) return console.error(err);
    let avatar = `https://avatars.dicebear.com/api/avataaars/custom.svg?hairColor[]=${req.body.hairColor}&clothes[]=${req.body.clothing}&skin[]=${req.body.skin}`
    let profiles = new Account({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        age: req.body.age,
        continent: req.body.continent,
        color: req.body.color,
        cardgame: req.body.cardgame,
        avatarLink: avatar
    });
    myList.push(profiles);
    profiles.password = bcrypt.hashSync(profiles.password, salt);
    myList[0].save((err, profiles) => {
        if(err) return console.error(err);
        console.log(req.body.username);
    });
    res.redirect('/');
}

exports.edit = (req, res) => {
    res.render('edit', {
        title: 'Edit account'
    });
};
var account = new Account()
exports.editAccount = (req, res) => {
    Account.find(req.params.email, (err, account) => {
        account.username = req.body.username,
        account.password = req.body.password,
        account.email = req.body.email,
        account.age = req.body.age,
        account.continent = req.body.continent,
        account.color = req.body.color,
        account.cardgame = req.body.cardgame;
        account.password = bcrypt.hashSync(account.password, salt);
        myList[0].save((err, profiles) => {
            if(err) return console.error(err);
            console.log(req.body.username);
        });
        res.redirect('/home');
    });
};

exports.api = (req, res) => {
    Account.find( {}, (err, questionData) => {
        let qArray = {
            continent: {
                'NA' : 0,
                'SA' : 0,
                'EU' : 0,
                'AS' : 0,
                'AF' : 0,
                'AU' : 0,
                'AN' : 0
            },
            color: {
                'green' : 0,
                'blue' : 0,
                'pink' : 0,
                'brown' : 0
            },
            cardgame: {
                'Go Fish' : 0,
                'Old Maid' : 0,
                'War' : 0,
                'Memory' : 0
            }
        }
        questionData.forEach(qData => {
            qArray.continent[qData.continent]++
            qArray.color[qData.color]++
            qArray.cardgame[qData.cardgame]++
        });
        res.json(qArray);
    })
}


exports.bargraph = (req, res) => {
    res.render('Graph', {
        title: 'Data Graph'
    });
};
