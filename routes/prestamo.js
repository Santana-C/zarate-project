var express = require('express');
const { index, crear, postPrestamo } = require('../controllers/prestamoController');
var router = express.Router();

/* GET home page. */
router.get('/', index );
router.get('/crear', crear);
router.post('/', postPrestamo);

module.exports = router;
