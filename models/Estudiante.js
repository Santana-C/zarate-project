const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Estudiante extends Model {};

Estudiante.init(
    {
        numControl: {
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: false,
            len: [8],
            validate:{
                isNumeric: true
            }
        },
        nombres:{
            type: DataTypes.STRING,
            len: [1,30]
        },
        apellidos:{
            type: DataTypes.STRING,
            len: [1,50]
        }
    }, 
    { 
        sequelize,
        modelName: 'estudiante',
        underscored: true,
        timestamps: false
    }
);

module.exports = Estudiante;