const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Libro extends Model {}
Libro.init(
    {
        titulo: {
            type: DataTypes.STRING,
            len: [1,255]
        },
        portada: {
            type: DataTypes.STRING,
            len: [0,2000],
            allowNull: true
        },
        autor_id:{
            type: DataTypes.INTEGER
        }
    }, 
    { 
        sequelize,
        modelName: 'libro',
        underscored: true,
        timestamps: false
    }
);

module.exports = Libro;