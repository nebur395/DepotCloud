var server = require('../../server');
var ObjectId = require('mongoose').Types.ObjectId;
var Report = server.models.Report;

/*
 * Create a Report
 */
function createReport(owner, depotObject, type, reportsId, callback){

    Report.create({

        owner : owner,
        depotObject : depotObject,
        type : type

    }, function (err, result) {

        reportsId.push(new ObjectId(result._id));

        console.log(":.........................................................................");
        callback();

    });
}

/*
 * Delete a ReportReport
 */
function deleteReport(reportsId, callback){

    Report.collection.remove({"_id": {$in: reportsId}}, function(){

        callback();

    });
}

exports.createReport = createReport;
exports.deleteReport = deleteReport;
