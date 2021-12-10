var express = require('express');
const { 
    index, 
    crear, 
    postAutor,
    editar,
    putAutor,
    deleteAutor } = require('../controllers/autorsController');
var router = express.Router();

/* GET home page. */
router.get('/', index );
router.get('/crear', crear);
router.post('/', postAutor);
router.get('/editar/:id', editar);
router.post('/actualizar', putAutor);
router.post('/eliminar/:id', deleteAutor);

module.exports = router;
