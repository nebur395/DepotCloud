var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

/**
 * @swagger
 * definition:
 *   DepotObject:
 *     description: Schema del modelo de DepotObject que representa un objeto guardable en un Depot.
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         uniqueItems: true
 *         required: true
 *         description: ID del DepotObject en el sistema.
 *       name:
 *         type: string
 *         required: true
 *         description: Nombre del objeto.
 *       image:
 *         type: string
 *         required: true
 *         description: String en base64 que representa la imagen adjunta al objecto, si la hay.
 *           Si no la hay, será un carácter vacío.
 *       owner:
 *         type: string
 *         required: true
 *         description: Idenfiticador de la cuenta del User al que pertenece el objecto.
 *       depot:
 *         type: string
 *         required: true
 *         description: Depot en el que se encuentra almacenado el objeto.
 *       guarantee:
 *         type: string
 *         format: date
 *         description: Fecha en el que cumple garantía el objeto.
 *       dateOfExpiry:
 *         type: string
 *         format: date
 *         description: Fecha en la que caduca el objeto.
 *       description:
 *         type: string
 *         description: Descripción del almacén.
 */

// Create the Schema
var depotObjectSchema = mongoose.Schema({
});

// Create the model if it does not exists
module.exports = mongoose.model('DepotObject', depotObjectSchema);
