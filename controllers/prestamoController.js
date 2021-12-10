const { request, response } = require('express');
const Prestamo = require('../models/Prestamo');

const index = async (req, res = response)=>{
    const prestamos = await Prestamo.findAll();
     res.render('prestamos/index', { title: 'Express', prestamos: prestamos});
};

const crear = async (req, res = response)=>{
     res.render('prestamos/crear');
};

const postPrestamo = async (req, res = response) => {
    const {fecha, libro_id, estudiante_num_control} = req.body;
    await Presamo.create({
        fecha: fecha,
        libro_id: libro_id,
        estudiante_num_control: estudiante_num_control
    });
    res.redirect('/prestamos')
}

module.exports = {
    index,
    crear,
    postPrestamo
};