const app = require('./app');//Requiriendo el archivo app 


app.listen(app.get('port'));//diciendole que app que ala ves tiene el enrutador que escuche en el puerto que esta configurado
                            // en el archivo app
console.log('Server on port ', app.get('port'));//mostrando por consola


