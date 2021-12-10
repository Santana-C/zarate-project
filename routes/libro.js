const multer = require('multer');
const express = require('express');
const { 
    index, 
    crear, 
    getLibro, 
    postLibro, 
    editar,
    putLibro,
    deleteLibro,
    descargar} = require('../controllers/librosController');
const router = express.Router();

let fecha = Date.now();

let ruta = multer.diskStorage(
    {
        destination: (request, file, callback) =>{
            callback(null, './public/images/');
        },
        filename: (request, file, callback) =>{
            console.log(file);
            callback(null, fecha+'_'+file.originalname);
        }
    }
);

let cargar = multer( { storage: ruta } );

/* GET home page. */
router.get('/', index );
router.get('/buscar', getLibro);
router.get('/crear', crear);
router.post('/', cargar.single('portada'), postLibro);
router.get('/editar/:id', editar);
router.post('/actualizar', cargar.single('portada'), putLibro);
router.post('/eliminar/:id', deleteLibro);
router.get('/descargar/:id', descargar);

module.exports = router;
