const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const {
    promisify
} = require("es6-promisify");
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const expressValidator = require('express-validator');
const routes = require('./routes/index');
const helpers = require('./helpers');
const errorHandlers = require('./handlers/errorHandlers');


const app = express();




app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(expressValidator());


app.use(cookieParser());

// app.enable('trust proxy'); 

app.use(session({
    secret: 'koronawirus19Sklepy',
    key: 'koronasklepy',
    resave: false,
    saveUninitialized: false,

    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));



app.use(flash());


app.use((req, res, next) => {
    res.locals.h = helpers;
    res.locals.flashes = req.flash();
    // res.locals.user = req.user || null;
    res.locals.currentPath = req.path;
    next();
});

app.use((req, res, next) => {


    next();
});

app.use('/', routes);

app.use(errorHandlers.notFound);

app.use(errorHandlers.flashValidationErrors);


if (app.get('env') === 'development') {

    app.use(errorHandlers.developmentErrors);
}
// production error handler
app.use(errorHandlers.productionErrors);
app.use((req, res, next) => {
    res.status(404).render('404');
});


module.exports = app;