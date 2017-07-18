var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

/**
 * @swagger
 * definition:
 *   Activity:
 *     description: Schema del modelo de Activity que representa una actividad de una unidad
 *       familiar en el sistema.
 *     type: object
 *     properties:
 *       owner:
 *         type: string
 *         required: true
 *         description: Idenfiticador de la cuenta de la unidad familiar al que pertenece la
 *           actividad.
 *       type:
 *         type: string
 *         required: true
 *         description: |
 *           Tipo de entidad sobre la que se realiza la actividad. Puede ser: MEMBER, DEPOT, OBJECT.
 *       action:
 *         type: string
 *         required: true
 *         description: |
 *           Acción que se realiza sobre la entidad de la actividad. Puede ser: ADD, MODIFY, DELETE.
 *       name:
 *         type: string
 *         required: true
 *         description: Nombre de la entidad sobre la que se realiza la actividad.
 *       author:
 *         type: string
 *         description: Miembro de la unidad familiar que realiza la actividad.
 *       activityDate:
 *         type: string
 *         description: Fecha en la que se ha realizado la actividad.
 */

// Create the Schema
var activitySchema = mongoose.Schema({
    /*
     * Type values: MEMBER;DEPOT;OBJECT
     * ACTION: ADD;MODIFY;DELETE;
     */
    owner : {type: String, required: true},
    type : {type: String, required: true},
    action: {type: String, required: true},
    name: {type: String, required: true},
    author: {type: String},
    activityDate: {type: Date, default: Date.now}
});

// Create the model if it does not exists
module.exports = mongoose.model('Activity', activitySchema);
