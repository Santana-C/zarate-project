const { request, response } = require('express');

const index = async (req, res = response)=>{
     res.render('index', { title: 'Sistema de Biblioteca' });
};

module.exports = {
    index
}