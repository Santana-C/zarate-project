const Autor = require('../models/Autor');
const Libro = require('../models/Libro');
const Devolucion = require('../models/Devolucion');
const Prestamo = require('../models/Prestamo');
const Estudiante = require('../models/Estudiante');

//Relaciones 1:1


//Relaciones 1:N
Autor.hasMany(Libro);

Libro.belongsTo(Autor);

Libro.hasMany(Prestamo);

Prestamo.belongsTo(Libro);

Prestamo.hasOne(Devolucion);

Prestamo.belongsTo(Estudiante);

Estudiante.hasMany(Prestamo);
