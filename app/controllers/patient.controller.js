module.exports = function(){
    var Patient = require('mongoose').model('Patient');
    var Doctor = require('mongoose').model('Doctor');
    var hmSession = require('./session.controller.js');

    var reqError = require('./reqError.js');
    var isEmpty = require('./isEmpty.js');

    var c = {};

    c.create = function(req, res, next){
        if (isEmpty(req.body)) return reqError(res, 400, "body", "missing");

        // TODO -> one-way hashing of passwords

        var newPatient = new Patient(req.body);
        newPatient.save(function(err, patient){
            if (err) return reqError(res, 500, err);

            req.session.account_type = hmSession.account_type.PATIENT;
            req.session.patient = patient;

            console.log(JSON.stringify({ patient : patient }) + "\n");
            res.status(201).json({
                patient : patient
            });
        });
    };

    c.doLogIn = function(req, res, next){
        if (!req.body) return reqError(res, 400, "body", "missing");
        if (!req.body.password) return reqError(res, 400, "password", "missing");
        if (!req.body.health_card_number) 
            return reqError(res, 400, "health_card_number", "missing");
        
        Patient.findOne({ 
            health_card_number : req.body.health_card_number 
        }, function(err, patient){
            if (err) return reqError(res, 500, err);
            if (!patient)
                return reqError(res, 401,"invalid health card number");
            
            // TODO -> one-way hashing of passwords
            if (patient.password === req.body.password){
                req.session.account_type = hmSession.account_type.PATIENT;
                req.session.patient = patient;

                res.json({ logged_in : true });
            } else {
                res.status(403).json({ logged_in : false });
            }
        });
    };

    c.findById = function(req, res, next, patient_id){
        if (!patient_id) return next();

        Patient.findOne({ _id : patient_id }, function(err, patient){
            if (err) return reqError(res, 500, err);

            req.patient = patient;
            next();
        });
    };

    c.getMe = function(req, res, next){
        if (!req.session.patient) return res.json({ logged_in : false });

        res.json({
            account_type : req.session.account_type,
            patient : req.session.patient
        });
    };


    c.index = function(req, res, next){
        Patient.find({}, function(err, patients){
            if (err) return reqError(res, err);

            res.json(patients);
        });
    };

    // patient-allergy relationship controllers

    c.addAllergy = function(req, res, next){
        if (!req.patient) return reqError(res, 400, "patient", "missing");        
        if (isEmpty(req.body)) return reqError(res, 400, "body", "missing");
        if (!req.body.allergy) return reqError(res, 400, "body.allergy", "missing");
     
        req.patient.allergies.push(req.body.allergy);
        req.patient.save(function(err){
            if (err) return reqError(res, 500, err);   
           
            res.status(202).json(req.patient);
        });
    };

    c.deleteAllergy = function(req, res, next){
        if (!req.patient) return reqError(res, 400, "patient", "missing");
        if (isEmpty(req.body)) return reqError(res, 400, "body", "missing");
        if (!req.body.allergy) return reqError(res, 400, "body.allergy", "missing");
   
        Patient.update({ 
            _id : req.patient._id
        },
        { // what we are going to do to the patient
            $pull : {
                'allergies' : req.body.allergy
            }
        },
        function(err, newPatient){
            if (err) return reqError(res, 500, err);
            
            res.status(202).json(newPatient); 
        });

    };

    c.getAllergies = function(req, res, next){
        if (!req.patient) return reqError(res, 400, "patient", "missing");        

        Patient.find({_id : req.patient._id})
        .populate('allergies')
        .exec(function(err, patient){
            if (err) return reqError(res, 500, err);

            res.json(patient);
        });
    };

    c.getPending = function(req, res, next){
        if(!req.session.patient) return res.json({ logged_in : false });
        Patient.find({ _id : req.session.patient._id})
        .populate('pending')
        .exec(function(err, patient){
            if (err) return reqError(res, 500, err);
            res.json(patient);
        });
    };
    return c;
}
