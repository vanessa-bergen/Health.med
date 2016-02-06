module.exports = function(){
    var Patient = require('mongoose').model('Patient');
    var Doctor = require('mongoose').model('Doctor');
    var Allergy = require('mongoose').model('Allergy');
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

    c.doLogOut = function(req, res, next){
        req.session.destroy();

        res.status(202).json({logged_in : false });
    };

    var publicAttributes = "_id health_card_number gender name_first name_last phone_number address";

    c.query = function(req, res, next){
        var query = {};
        if (req.query.name_first){
            query.name_first = req.query.name_first; 
        }
        if (req.query.name_last){
            query.name_last = req.query.name_last;
        } 

        Patient.find(query, publicAttributes, function(err, patients){
            if (err) return reqError(res, 500, err);

            res.json(patients);
        });
    };

    c.findById = function(req, res, next, patient_id){
        if (!patient_id) return next();

        Patient.findOne({ 
            _id : patient_id }
        , publicAttributes, function(err, patient){
            if (err) return reqError(res, 500, err);

            req.patient = patient;
            next();
        });
    };

    c.getMe = function(req, res, next){
        if (!req.session.patient) return res.json({ logged_in : false });

        Patient.findOne({
            _id : req.session.patient._id
        })
        .populate('allergies')
        .populate('pending')

        .exec(function(err, unpopulated){
            if (err) return reqError(res, 500, err);

            var options = {
                path : "allergies.symptoms",
                model : 'Symptom'
            };

            Patient.populate(unpopulated, options, function(err, patient){
                if (err) return reqError(res, 500, err);

                req.session.patient = patient;
                res.json(patient);
            });
        });
    };

    // patient-allergy relationship controllers

    c.addAllergy = function(req, res, next){
        if (!req.session.patient) return reqError(res, 401, "error", "not logged in");
        if (isEmpty(req.body)) return reqError(res, 400, "body", "missing");
        if (!req.body.allergy) return reqError(res, 400, "body.allergy", "missing");

        var newAllergy = new Allergy(req.body.allergy)
        .save(function(err, newDoc){
            if (err) return reqError(res, 500, err);

            Patient.findOneAndUpdate({
                _id : req.session.patient._id
            },
            { 
                $push : {
                    'allergies' : newDoc._id
                }
            }, 
            {
                new : true
            },
            function(err, patient){
                if (err) return reqError(res, 500, err);
            
                Patient.populate(patient, {
                    path : "allergies"
                }, function(err, doc){
                    if (err) reqError(res, 500, err);
                    
                    var options = {
                        path : "allergies.symptoms",
                        model : "Symptom"
                    };

                    Patient.populate(doc, options, function(err, patient){
                        if (err) return reqError(res, 500, err); 
                        
                        res.status(202).json(patient);
                    });
                });
            });
        });
    };

    c.deleteAllergy = function(req, res, next){
        if (!req.session.patient) return reqError(res, 401, "error", "not logged in");
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
