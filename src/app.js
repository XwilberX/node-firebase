const express = require('express'); //Requiriendo a express
const app = express();// lo guardamos en una constante
const morgan = require('morgan'); // Middleware de registrador de solicitudes HTTP para node.js
const exphbs = require('express-handlebars');// modelo de handlebars (motor de plantilla
const path = require('path');//path solo sirve para identificar direcciones detro de tu proyecto por ejemplo puede saber en
// que direcctorio esta este archivo o aveces conocido como variable path

// settings 
// process.env,Port por si exite un puerto definido lo tomara
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));//declarando la ruta para la views
app.engine('.hbs', exphbs({
    defaultLayout: 'main', // diciendo como se llamara el archivo que se ejecutara en todas las rutas
    extname: '.hbs'// y aqui es para por ejecutar archivos de .hbs
})); //motor de plantillas
app.set('view engine', '.hbs');//diciendo que motor debe usar

// middlewares, estos son las funciones que se ejecutan antes que cualquier cosa 
// este middleware solo es para desarrollo ya que nos dara informacion por consola de si una peticion se realizo 
// de manera correcta , cuanto tiempo tardo y pesa
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

//routes
app.use(require('./routes/index'));// requiriendo al archivo index dentro del directorio routes en ese arichivo se hacen mas 
//cosas relacionadas a express y rutas

// Stactic files
app.use(express.static(path.join(__dirname, 'public')));//definiendo carpeta publica


module.exports = app; //exportando app con sus configuracion para poder ser usado donde se requiera checar el archivo index.js
//en esta mismo nivel de directorio BIEN

