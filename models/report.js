var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

/**
 * @swagger
 * definition:
 *   Report:
 *     description: Schema del modelo de Report que representa un informe generado
 *       periódicamente con una recomendación de acción asociada a un objeto de un almacén.
 *     type: object
 *     properties:
 *       owner:
 *         type: string
 *         required: true
 *         description: Idenfiticador de la cuenta de la unidad familiar al que pertenece la
 *           informe.
 *       type:
 *         type: string
 *         required: true
 *         description: |
 *           Tipo de informe generado. Puede ser: guarantee, dateOfExpiry, usageControl.
 *       depotObject:
 *         type: string
 *         required: true
 *         description: Nombre del objeto al que se refiere el informe.
 *       reportDate:
 *         type: string
 *         required: true
 *         description: Fecha en la que se ha realizado la actividad.
 */

// Create the Schema
var reportSchema = mongoose.Schema({

    owner: {type: String, required: true},
    depotObject: {type: mongoose.Schema.Types.ObjectId, required: true},
    type: {type: String, required: true},
    reportDate: {type: Date, default: Date.now}

});

// Create the model if it does not exists
module.exports = mongoose.model('Report', reportSchema);
