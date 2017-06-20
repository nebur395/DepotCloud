var models = require('../../models');
var async = require("async");

var DepotObject = models.DepotObject;
/*
 * Check if the guarantee of any DepotObject is expired.
 */
function guaranteeChecker() {

    DepotObject.find(function (err, depotObjectResult) {
        async.each(depotObjectResult, function (depotObject, callback) {

            if (checkDates(depotObject.guarantee)) {
                //notify
            }

            callback();

        }, function (err) {

        });
    });
}

/*
 * Check if the dateOfExpiry of any DepotObject is expired.
 */
function dateOfExpiryChecker() {

    DepotObject.find(function (err, depotObjectResult) {
        async.each(depotObjectResult, function (depotObject, callback) {

            if (checkDates(depotObject.dateOfExpiry)) {
                //notify
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
