const express        = require('express');
const path           = require('path');
const exphbs         = require('express-handlebars');
const methodOverride = require('method-override');
const session        = require('express-session')
const morgan         = require('morgan');
const bodyParser     = require('body-parser');
//Initializations
const app     = express();

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs')

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({extended: false})); // It's used for receive data from forms or others sources
app.use(methodOverride('_method')); // It's used for handle not just GET or POST requests, but also PUT or DELETE
app.use(session({
    secret : 'mysecretapp',
    resave : true,
    saveUninitialized: true
}));

//Global variables


//Routes 
app.use(express.json());
app.use('/', require('./views/'))
app.use('/tables', require('./routes/tablesRoute'));
app.use('/dashboard', require('./routes/dashboardRoute'));
app.use('/block', require('./routes/blockRoute'));
app.use('/logs',  require('./routes/logRoute'));
app.use('/devices', require('./routes/dispositivosRoute'));


//Statics Files
app.use(express.static(path.join(__dirname, 'public')));


//Server is listening
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})