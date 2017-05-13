var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

/**
 * @swagger
 * definition:
 *   User:
 *     description: Schema del modelo de User que representa una cuenta familiar o de usuario
 *       administrador del sistema.
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *         uniqueItems: true
 *         required: true
 *         description: Email de la cuenta o el usuario que sirve como identificador.
 *       name:
 *         type: string
 *         required: true
 *         description: Nombre de la cuenta o el usuario administrador.
 *       admin:
 *         type: boolean
 *         required: true
 *         description: True si el usuario es un administrador.
 *       active:
 *         type: boolean
 *         description: True si la cuenta está activa.
 *       members:
 *        type: array
 *        items:
 *         type: string
 *        description: Lista con los nombres de los miembros que pertenecen a la unidad familiar.
 */

// Create the Schema
var userSchema = mongoose.Schema({
    email : {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    admin: {type: Boolean, required: true},
    isActive: {type: Boolean, default: true},
    registerDate: {type: Date, default: Date.now},
    lastLoginDate: {type: Date, default: Date.now},
    members: {type:[String], default: []}
});

// Create the model if it does not exists
module.exports = mongoose.model('User', userSchema);
