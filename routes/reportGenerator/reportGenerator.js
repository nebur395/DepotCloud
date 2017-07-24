var models = require('../../models');
var async = require("async");

var Depot = models.Depot;
var DepotObject = models.DepotObject;
var Report = models.Report;

/*
 * Check if the guarantee of any DepotObject is expired.
 */
function guaranteeChecker() {

    DepotObject.find(function (err, depotObjectResult) {
        async.each(depotObjectResult, function (depotObject, callback) {

            if (depotObject.guarantee && checkDates(depotObject.guarantee)) {

                Report.findOne({
                    depotObject: depotObject._id,
                    type: "guarantee"
                }, function (err, reportResult) {
                    // The report is created if it doesn't exist
                    if (!reportResult) {
                        Report.create({

                            owner: depotObject.owner,
                            depotObject: depotObject._id,
                            type: "guarantee"

                        }, function () {
                            callback();
                        });
                    } else {
                        callback();
                    }
                });
            } else {
                callback();
            }
        });
    });
}

/*
 * Check if the dateOfExpiry of any DepotObject is expired.
 */
function dateOfExpiryChecker() {

    DepotObject.find(function (err, depotObjectResult) {
        async.each(depotObjectResult, function (depotObject, callback) {

            if (depotObject.dateOfExpiry && checkDates(depotObject.dateOfExpiry)) {

                Report.findOne({
                    depotObject: depotObject._id,
                    type: "dateOfExpiry"
                }, function (err, reportResult) {
                    // The report is created if it doesn't exist
                    if (!reportResult) {
                        Report.create({

                            owner: depotObject.owner,
                            depotObject: depotObject._id,
                            type: "dateOfExpiry"

                        }, function () {
                            callback();
                        });
                    } else {
                        callback();
                    }
                });
            } else {
                callback();
            }
        });
    });
}

/*
 * Check if any depotObject have been used many times and there are another nearest depot.
 */
function depotObjectsUsageControl() {

    DepotObject.find(function (err, depotObjectResult) {
        async.each(depotObjectResult, function (depotObject, callback) {

            if (depotObject.uses > 20) {

                Report.findOne({
                    depotObject: depotObject._id,
                    type: "usageControl"
                }, function (err, reportResult) {
                    // The report is created if it doesn't exist
                    if (!reportResult) {

                        Depot.findOne({
                            owner: depotObject.owner,
                            distance: "[0-1km]"
                        }, function (err, depotResult) {
                            if (depotResult && depotObject.depot !== depotResult._id) {

                                Report.create({

                                    owner: depotObject.owner,
                                    depotObject: depotObject._id,
                                    type: "usageControl"

                                }, function () {
                                    callback();
                                });

                            } else {
                                callback();
                            }
                        });

                    } else {
                        callback();
                    }
                });
            } else {
                callback();
            }
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
exports.depotObjectsUsageControl = depotObjectsUsageControl;
