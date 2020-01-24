const { Router } = require('express'); //Requiriendo el a express pero solo a su obtero Rauter que sirve para todo lo relacionado a rutas
const router = Router(); // lo guardamos en una constante 
const admin = require('firebase-admin');// Requiriendo a modulo de firebase 

var serviceAccount = require("../../node-firebase-ejemplo-f5371-firebase-adminsdk-zd0rz-9f1127ce6a.json");
//esta es llamado una variable de entorno ya que se esta guardo en una variable el archivo de auntenticacion de firebase
// que este archivo es proporcionado por firebase al crear un proyecto


//Esto es algo asi como la cadena de coneccion
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),// podemos observar qur con el metodo de cert llamamos a la variable
                                                      //de entorno que como sinonimo seria el certificado                          
    databaseURL: 'https://node-firebase-ejemplo-f5371.firebaseio.com/'// esta URL igual es proporcionada por firebase
});

const db = admin.database();// aqui en especial guardamos en una constante la base de datos como tal 

//aqui es donde se usa a express en este caso con una peticion .get en / osea el el directorio principal
// req y res que viene de requiere response , entenderlo asi: Requieren pues Respondo, son variable necesarias
// muy pegados a el protocolo HTTP
router.get('/', (req, res) => {
    //esto es como hacer una consulta  //  once de solo una vez es algo como dame los contactos de la bd solo una vez
    db.ref('contactos').once('value', (snapshot) =>{
        const data = snapshot.val();// guardamos los datos del documento 'contactos' es como guardar en un arreglo 
                                    // en entidad completa de un base de datos SQL, recordad que esto es un base 
                                    // de dato NoSQL que a menudo a lo que nosotros conociamos con entidad aqui son documentos
        res.render('index', { contactos: data });// aqui mandamos a rendderizar al index en este caso, checasr el index.hbs en views
    });    
});

//peticion post con express
router.post('/new-contact', (req, res) => {
    console.log(req.body);// mandamos el cuerpo de req
    const NewContact = { //creamos un objeto sinonimo de un arreglo, y pues como se observa a cada uno con su correspondiente dato
        primernombre: req.body.primernombre,
        segundonombre: req.body.segundonombre,
        email: req.body.email,
        telefono: req.body.telefono
    };
    db.ref('contactos').push(NewContact);// aqui se manda a la base de datos los registros
    res.redirect('/');// y redireccionamos al mismo lugar '/' pa actualizar 
})


//express pero con una ruta dinamica
                    //el :id hace referencia a que sera una ruta dinamica
router.get('/eliminar/:id', (req, res) => {
    db.ref('contactos/' + req.params.id).remove();//en el req.params.id se guardo un id que te lo genera firebase 
                                                  // e identifica a cada registro, asi podemos eliminar o editar un registro
    res.redirect('/');// y redireccionamos
});

//exportamos a al objeto router que tiene todo guardado de lo que hicimos arriba por si en otro directorio se necesita
module.exports = router;
