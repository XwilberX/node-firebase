const { Router } = require('express');
const router = Router();
const admin = require('firebase-admin');

var serviceAccount = require("../../node-firebase-ejemplo-f5371-firebase-adminsdk-zd0rz-9f1127ce6a.json");


//Esto es algo asi como la cadena de coneccion
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://node-firebase-ejemplo-f5371.firebaseio.com/'
});

const db = admin.database();

router.get('/', (req, res) => {
    //esto es como hacer una consulta    once de solo una vez
    db.ref('contactos').once('value', (snapshot) =>{
        const data = snapshot.val();
        res.render('index', { contactos: data });
    });    
});

router.post('/new-contact', (req, res) => {
    console.log(req.body);
    const NewContact = {
        primernombre: req.body.primernombre,
        segundonombre: req.body.segundonombre,
        email: req.body.email,
        telefono: req.body.telefono
    };
    db.ref('contactos').push(NewContact);
    res.redirect('/');
})

router.get('/eliminar/:id', (req, res) => {
    db.ref('contactos/' + req.params.id).remove();
    res.redirect('/');
});

module.exports = router;