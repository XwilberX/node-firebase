const express = require('express');
const app = express();
const morgan = require('morgan'); //midd
const exphbs = require('express-handlebars');
const path = require('path');

// settings 
// process.env,Port por si exite un puerto definido lo tomara
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));//de clarando la ruta para la views
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
})); //motor de plantillas
app.set('view engine', '.hbs');//diciendo que motor debe usar

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

//routes
app.use(require('./routes/index'));

// Stactic files
app.use(express.static(path.join(__dirname, 'public')));//definiendo carpeta publica


module.exports = app;

