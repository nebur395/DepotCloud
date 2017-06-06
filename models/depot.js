var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

/**
 * @swagger
 * definition:
 *   Depot:
 *     description: Schema del modelo de Depot que representa un almacén, trastero, guardaropa o
 *       vivienda perteneciente a un User del sistema.
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         uniqueItems: true
 *         required: true
 *         description: Nombre del almacén que sirve como identificador.
 *       owner:
 *         type: string
 *         required: true
 *         description: Idenfiticador de la cuenta del User al que pertenece el almacén.
 *       location:
 *         type: string
 *         required: true
 *         description: Localización física real del almacén.
 *       type:
 *         type: string
 *         required: true
 *         description: |
 *           Tipo del almacén que puede ser: Storage Room, House, Wardrobe.
 *       distance:
 *         type: string
 *         required: true
 *         description: |
 *           Distancia que hay del deposito actual a tu domicilio habitual. Puede ser: Lejos, cerca.
 *       capacity:
 *         type: integer
 *         required: true
 *         description: Capacidad que tiene el almacén para guardar DepotObjects.
 *       description:
 *         type: string
 *         description: Descripción del almacén.
 */

// Create the Schema
var depotSchema = mongoose.Schema({
    name : {type: String, required: true, unique: true},
    owner: {type: String, required: true},
    location: {type: String, required: true},
    type: {type: String, required: true},
    distance: {type: String, required: true},
    capacity: {type: Number, required: true},
    description: {type: String},
    creationDate: {type: Date, default: Date.now}
});

// Create the model if it does not exists
module.exports = mongoose.model('Depot', depotSchema);
