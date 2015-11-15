module.exports = function(){
    var Patient = require('mongoose').model('Patient');
    var reqError = require('./reqError.js');
    var isEmpty = require('./isEmpty.js');

    var c = {};

    c.create = function(req, res, next){
        if (isEmpty(req.body)) return reqError(res, 400, "body", "missing");

        var newPatient = new Patient(req.body);
        newPatient.save(function(err){
            if (err) return reqError(res, 500, err);

            console.log(JSON.stringify({ patient : newPatient }) + "\n");
            res.status(201).json({
                patient : newPatient
            });
        });
    };

    c.findById = function(req, res, next, patient_id){
        console.log('    findById()');
        
        if (!patient_id) return next();

        Patient.findOne({ _id : patient_id }, function(err, patient){
            if (err) return reqError(res, 500, err);

            req.patient = patient;
            next();
        });
    };

    c.get = function(req, res, next){
        console.log('    get()');
        if (!req.patient) return reqError(res, 400, "patient", "missing");

        res.json(req.patient);
    };


    c.index = function(req, res, next){
        Patient.find({}, function(err, patients){
            if (err) return reqError(res, err);

            res.json(patients);
        });
    };
    
    return c;
}
