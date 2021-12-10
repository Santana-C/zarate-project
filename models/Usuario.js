const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Usuario extends Model {}
Usuario.init(
    {
        usuario_id:{
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: false,
            len: [6]
        },
        nombres: {
            type: DataTypes.STRING,
            len: [1,30]
        },
        apellidos: {
            type: DataTypes.STRING,
            len: [1,50]
        },
        password:{
            type: DataTypes.STRING,
            len: [8,20]
        }
    }, 
    { 
        sequelize,
        modelName: 'usuario',
        underscored: true,
        timestamps: false
    }
);

module.exports = Usuario;