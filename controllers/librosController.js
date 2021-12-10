const fs = require('fs');
const { request, response } = require('express');
const { Op } = require('sequelize');
const builder = require('xmlbuilder');
const Libro = require('../models/Libro');
const Autor = require('../models/Autor');

const index = async (req, res = response)=>{
    const libros = await Libro.findAll();
     res.render('libros/index', { title: 'Express', libros: libros});
};

const crear = async (req, res = response)=>{
    const autores = await Autor.findAll();
    res.render('libros/crear', { autores: autores});
};

const getLibro = async (req, res = response) => {
    const {titulo} = req.query;
    if(titulo == null || titulo.length == 0){
        const libros = await Libro.findAll();
        res.render('libros/index', { title: 'Express', libros: libros});
    }
    const libros = await Libro.findAll(
        { where:{ titulo:{ [Op.like]: titulo+'%' } } }
    );
    res.render('libros/buscar', { libros: libros});
}

const postLibro = async (req, res = response) => {
    const {titulo, autor_id} = req.body;
    let portada = '';
    if(req.file){
        if(req.file.filename){
            portada = req.file.filename;
        }
    }
    await Libro.create({
        "titulo": titulo, 
        "portada": portada,
        "autor_id": autor_id
    });
    res.redirect('/libros');
};

const editar = async (req, res = response) => {
    const librito = await Libro.findByPk(req.params.id);
    const autores = await Autor.findAll({ 
        where:{ id:{ [Op.not]: librito.autor_id} } 
    });
    const autorSel = await Autor.findByPk(librito.autor_id);
    res.render('libros/editar', { libro: librito, autores: autores, autorSel: autorSel });
}

const putLibro = async (req, res = response) => {
    const {id, titulo, autor_id} = req.body;
    const libroOriginal = await Libro.findByPk(id);
    const antiguaPortada = libroOriginal.portada;
    if(req.file){
        if(req.file.filename){
            portada = req.file.filename;
            let nombreImagen = `public/images/${antiguaPortada}`;
            if(antiguaPortada != ''){
                if(fs.existsSync(nombreImagen)){ fs.unlinkSync(nombreImagen); }
            }
        }else{
            portada = antiguaPortada;
        }
    }else{
        portada = antiguaPortada.portada;
    }
    await Libro.update({ titulo: titulo, portada: portada, autor_id: autor_id }, {
        where: { id: id }
    });
    res.redirect('/libros');
}

const deleteLibro = async (req, res = response) => {
    const librito = await Libro.findByPk(req.params.id);
    let nombreImagen = `public/images/${librito.portada}`;
    await Libro.destroy({
        where:{ id: librito.id }
    });
    if(librito.portada != ''){
        if(fs.existsSync(nombreImagen)){
            fs.unlinkSync(nombreImagen);
        }
    }
    res.redirect('/libros');
};

const descargar = async (req, res = response) => {
    const librito = await Libro.findByPk(req.params.id);
    const autor = await Autor.findByPk(librito.autor_id);
    let xml = builder.create('root');
    xml.ele('libro')
            .ele('id', librito.id).up()
            .ele('titulo', librito.titulo).up()
            .ele('autor_id', librito.autor_id).up()
            .ele('autor', autor.nombres+' '+autor.apellidos).end();
    var xmldoc = xml.toString({ pretty: true });
    let nombresArchivo = __dirname+'/../public/data/archivo.xml';
    if(fs.existsSync(nombresArchivo)){
        fs.unlinkSync(nombresArchivo);
    }
    fs.writeFileSync(nombresArchivo, xmldoc, function(err) {
        if(err) { return console.log(err); }
    });
    res.download(nombresArchivo,'archivo.xml', function(error){
        if(error){
            console.log(error);
        }
    }); 
};

module.exports = {
    index,
    crear,
    getLibro,
    postLibro,
    editar,
    putLibro,
    deleteLibro,
    descargar
};