var models = require('../../models');
var async = require("async");

var DepotObject = models.DepotObject;
/*
 * Create an activity with [type], [action], [name], and [author] params belonging to the
 * account [owner].
 * Execute a callback if exists when the activity is created.
 */
function guaranteeChecker() {

    console.log("--------------------- GUARANTEE CHECKER ----------------------");

    DepotObject.find(function (err, depotObjectResult) {
        async.each(depotObjectResult, function (depotObject, callback) {//YYYY-MM-DD

            if (checkDates(depotObject.guarantee)) {
                console.log("caducado: " + depotObject.guarantee);
            }

            callback();

        }, function (err) {

        });
    });
}

function dateOfExpiryChecker() {

    console.log("--------------------- dateOfExpiry CHECKER ----------------------");

    DepotObject.find(function (err, depotObjectResult) {
        async.each(depotObjectResult, function (depotObject, callback) {//YYYY-MM-DD

            if (checkDates(depotObject.dateOfExpiry)) {
                console.log("caducado: " + depotObject.dateOfExpiry);
            }

            callback();

        }, function (err) {

        });
    });
}


/*
 * Return [true] if [dateToCheck] (YYYY-MM-YY format) is major than a 'new Date()'
 */
function checkDates(dateToCheck) {
    var yearToCheck = Number(dateToCheck.substring(0, 4));
    var monthToCheck = Number(dateToCheck.substring(5, 7));
    var dayToCheck = Number(dateToCheck.substring(8));

    var currentDate = new Date();

    if (yearToCheck < currentDate.getFullYear()) {              //CHECK YEAR
        return true;
    } else if (yearToCheck === currentDate.getFullYear()) {

        if (monthToCheck < (currentDate.getMonth() + 1)) {     //CHECK MONTH
            return true;
        } else if (monthToCheck === (currentDate.getMonth() + 1)) {

            return dayToCheck < currentDate.getDate();

        } else {
            return false;
        }
    } else {
        return false;
    }
}

exports.guaranteeChecker = guaranteeChecker;
exports.dateOfExpiryChecker = dateOfExpiryChecker;
