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
	
	c.update = function(req, res, next){
		if (!req.session.patient) return reqError(res, 401, "error", "not logged in");
        if (isEmpty(req.body)) return reqError(res, 400, "body", "missing");
        
		delete req.body["_id"];
		
		Patient.findOneAndUpdate({
			_id : req.session.patient._id
		}, req.body, function(err, oldPatient){
			if (err) return reqError(res, 500, err);
			
			Patient.findOne({ _id : req.session.patient._id }, function(err, newPatient){
				if (err) return reqError(res, 500, err);
				
				req.session.patient = newPatient;
				res.status(202).json(newPatient);
			});
		})
		
	}

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

    c.requestAccess = function(req, res, next){
        if (!req.params.patient_id) return reqError(res, 400, "patient_id", "missing");
        if (!req.session.doctor) return reqError(res, 401, "not logged in");

        var doctor_id = req.session.doctor._id;
        var patient_id = req.params.patient_id;

        Patient.findOneAndUpdate({ 
            _id : patient_id 
        }, {
            $addToSet : {
                'requests' : doctor_id
            }
        }, function(err, patient){
            if (err) return reqError(res, 500, err);

            Doctor.findOneAndUpdate({
                _id : doctor_id
            }, {
                $addToSet : {
                    'pending' : patient_id
                }
            }, function(err, doctor){
                if (err) return reqError(res, 500, err);

                res.status(202).send(patient);
            });
        });
    };

    c.cancelRequestAccess = function(req, res, next){
        if (!req.params.patient_id) return reqError(res, 400, "patient_id", "missing");
        if (!req.session.doctor) return reqError(res, 401, "not logged in");

        var doctor_id = req.session.doctor._id;
        var patient_id = req.params.patient_id;

        Patient.findOneAndUpdate({ 
            _id : patient_id 
        }, {
            $pull : {
                'requests' : doctor_id
            }
        }, function(err, patient){
            if (err) return reqError(res, 500, err);

            Doctor.findOneAndUpdate({
                _id : doctor_id
            }, {
                $pull : {
                    'pending' : patient_id
                }
            }, function(err, doctor){
                if (err) return reqError(res, 500, err);

                res.status(202).send(patient);
            });
        });
    }

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

    c.getById = function(req, res, next){
        if (!req.params.patient_id) return reqError(res, 400, "patient_id", "missing");
        if (!req.session.doctor) return reqError(res, 401, "Access denied");

        var patient_id = req.params.patient_id;

        Patient.findOne({
            _id : patient_id
        }).populate('allergies')
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

    c.getMe = function(req, res, next){
        if (!req.session.patient) return res.json({ logged_in : false });

        Patient.findOne({
            _id : req.session.patient._id
        })
        .populate('allergies')
        .populate('requests')

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

    return c;
}
