const { request, response } = require('express');
const Autor = require('../models/Autor');

const index = async (req, res = response)=>{
    const autores = await Autor.findAll();
     res.render('autores/index', { title: 'Express', autores: autores});
};

const crear = async (req, res = response)=>{
     res.render('autores/crear');
};

const postAutor = async (req, res = response) => {
    const {nombres, apellidos} = req.body;
    await Autor.create({
        nombres: nombres,
        apellidos: apellidos
    });
    res.redirect('/autores')
}

const editar = async (req, res = response) => {
    const autor = await Autor.findByPk(req.params.id);
    res.render('autores/editar', { autor: autor });
}

const putAutor = async (req, res = response) => {
    const {id, nombres, apellidos} = req.body;
    await Autor.update({ nombres: nombres, apellidos: apellidos }, {
        where: { id: id }
    });
    res.redirect('/autores');
}

const deleteAutor = async (req, res = response) => {
    const autor = await Autor.findByPk(req.params.id);
    await Autor.destroy({
        where:{ id: autor.id }
    });
    res.redirect('/autores');
};

module.exports = {
    index,
    crear,
    postAutor,
    editar,
    putAutor,
    deleteAutor
};