const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Devolucion extends Model {};

Devolucion.init(
    {
        fecha:{
            type: DataTypes.DATE
        },
        prestamo_id:{
            type: DataTypes.INTEGER
        }
    }, 
    { 
        sequelize,
        modelName: 'devolucion',
        underscored: true,
        timestamps: false
    }
);

module.exports = Devolucion;