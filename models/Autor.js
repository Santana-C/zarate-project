const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Autor extends Model {}
Autor.init(
    {
        nombres: {
            type: DataTypes.STRING,
            len: [1,30]
        },
        apellidos: {
            type: DataTypes.STRING,
            len: [1,50]
        }
    }, 
    { 
        sequelize,
        modelName: 'autor',
        underscored: true,
        timestamps: false
    }
);

module.exports = Autor;