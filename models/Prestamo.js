const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Prestamo extends Model {}
Prestamo.init(
    {
        fecha: {
            type: DataTypes.DATE
        },
        libro_id: {
            type: DataTypes.INTEGER
        },
        estudiante_num_control: {
            type: DataTypes.STRING
        }
    }, 
    { 
        sequelize,
        modelName: 'Prestamo',
        tableName: 'prestamo',
        underscored: true,
        timestamps: false
    }
);

module.exports = Prestamo;