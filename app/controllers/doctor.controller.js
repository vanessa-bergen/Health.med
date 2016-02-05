module.exports = function(){
    var Doctor = require('mongoose').model('Doctor');
    var Patient = require('mongoose').model('Patient');
    var hmSession = require('./session.controller.js');
    
    var isEmpty = require('./isEmpty.js');
    var reqError = require('./reqError.js');
    
    var c = {};
    
    c.create = function(req, res){
        if (!req.body) return reqError(res, 400, "body", "missing");

        var newDoctor = new Doctor(req.body);
        newDoctor.save(function(err, doctor){
            if (err) return reqError(res, 500, err);
            
            req.session.account_type = hmSession.account_type.DOCTOR;
            req.session.doctor = doctor;

            console.log(JSON.stringify({ doctor : doctor }) + "\n");
            res.status(201).json({
                doctor : doctor
            });
        });
    };

    c.doLogIn = function(req, res, next){
        if (!req.body) return reqError(res, 400, "body", "missing");
        if (!req.body.password) return reqError(res, 400, "passsword", "missing");
        if (!req.body.minc) return reqEror(res, 400, "minc", "missing");
        
        Doctor.findOne({ minc : req.body.minc }, function (err, doctor){
            if (err) return reqError(res, 500, err);
            
            if (doctor.password === req.body.password) {
                req.session.account_type = hmSession.account_type.DOCTOR;
                req.session.doctor = doctor ;
                
                res.json({ logged_in : true });
            } else {
                res.status(403).json({ logged_in: false });
            }
        });
    };

    c.doLogOut = function(req, res, next){
        req.session.destroy();

        res.status(202).json({ logged_in : false });
    };

    var publicAttributes = "_id minc name_first name_last specialization";

    c.query = function(req, res, next){
        var query = {};
        if (req.query.name_first){
            query.name_first = req.query.name_first; 
        }
        if (req.query.name_last){
            query.name_last = req.query.name_last;
        } 

        Doctor.find(query, publicAttributes, function(err, doctors){
            if (err) return reqError(res, 500, err);

            res.json(doctors);
        });
    }

    c.getById = function(req, res, next){
        if (!req.params.doctor_id) return reqError(res, 400, "doctor_id param", "missing");
        var doctor_id = req.params.doctor_id;

        Doctor.findOne({ _id : doctor_id }, publicAttributes, function(err, doctor){
            if (err) return reqError(res, 500, err);

            res.json(doctor);
        });
    };

    c.getMe = function(req, res, next){
        if (!req.session.doctor) return res.json({ logged_in : false });

        Doctor.findOne({ 
            _id : req.session.doctor._id
        })
        .populate('has_access_to')
        .populate('invites')
        .exec(function(err, me){
            if (err) return reqError(res, 500, err);

            req.session.doctor = me;
            res.json(me);
        });
    };

    c.index = function(req, res, next){
        Doctor.find({}, publicAttributes, function(err, doctors){
            if (err) return reqError(res, 500, err);

            res.json(doctors);
        });
    }; 

// patient - doctor invite controllers
// patient sends invitation. Seen as pending in patient DB
// see as an invite in docotor dB

    c.getHasAccessToMe = function(req, res, next){
        if (!req.session.patient) { 
            return reqError(res, 403, {
                logged_in : false,
                msg : "not logged in as a patient"
            });
        }

        Doctor.find({ 
            "has_access_to" : req.session.patient._id
        },
        "name_first name_last minc _id specialization",
        function(err, doctors){
            if (err) return reqError(res, 500, err);

            res.json(doctors);
        });
    };

    c.cancelInvite = function(req, res, next){ 
        if (!req.session.doctor) return res.json({ logged_in : false });
        if (!req.params.patient_id) return reqError(res, 400, "patient_id param", "missing");

        var patient_id = req.params.patient_id;
     
        Doctor.update({ 
            _id : req.session.doctor._id
        }, 
        {
            $pull : {
                'invites' : req.session.patient._id
            }
        }, 
        function(err, newDoctor) {
            if(err) return reqError(res,500,err);
            
            Patient.update({
                _id : req.session.patient._id
            },
            {
                $pull : {
                    'pending' : doctor_id
                }
            },
            function(err, newPatient) {
                if(err) return reqError(res, 500, err);
            
                res.status(202).json(newPatient);
            });
        }); 
    };
        //       function(err, newPatient) {
        //         if(err) return reqError(res, 500, err);
        //   });
            

    c.declineInvite = function(req, res, next){
        if(isEmpty(req.body)) return reqError(res, 400, "body", "missing");
        if(!req.session.doctor) return res.json({logged_in : false});
        if(!req.body.patient_id) return reqError(res, 400, "patient_id", "missing");

        Doctor.update({
            _id: req.session.doctor._id
        },
        {
            $pull : { 
                'invites' : req.body.patient_id
            }
        },
        function(err, newDoctor){
            if(err) return reqError(res, 500, err);
            res.status(202).json(newDoctor);
    
    
        });

        Patient.update({
            _id: req.body.patient_id
        },
        {
            $pull : {
                'pending' : req.session.doctor._id
            }
        },
            function(err, newPatient) {
                if(err) return reqError(res, 500, err);
       });     
   };

    c.addInvite = function(req, res, next){
        if (isEmpty(req.body)) return reqError(res, 400, "body", "missing");
        if (!req.session.patient) return res.json ({ logged_in : false });
        if (!req.body.doctor_id) return reqError(res, 400, "doctor_id", "missing");        
        
        Doctor.update({
            _id : req.body.doctor_id
        }, 
        {
            $addToSet : {
                'invites' : req.session.patient._id
                           }
        }, 
        function(err, num_upd){
            if(err) return reqError(res, 500, err);
            console.log(num_upd)
            if(num_upd.n == 0) return reqError(res, 400, "doctor","does not exist");

            Patient.update({
                _id : req.session.patient._id
            },
            {
                $addToSet : {
                    'pending' : req.body.doctor_id
                    }
            },
            function(err, newPatient){
                if(err) return reqError(res, 500, err);
                res.status(202).json(newPatient);
            });
     
        });
   };

 // doctor-patient has_access_to relationship controllers 
 // patients grant access to doctors without doctors needing to accept

    c.addAccessTo = function(req, res, next){
        if (!req.session.patient) return reqError(res, 403, "not logged in as a patient");
        if (!req.params.doctor_id) return reqError(res, 400, "doctor_id param", "missing");

        var doctor_id = req.params.doctor_id;
        var patient_id = req.session.patient._id; 
  
        Doctor.findOneAndUpdate({
            _id: doctor_id
        },
        {
            $addToSet : {
                'has_access_to' : patient_id
            },
            $pull : {
                'invites' : patient_id
            }
        },
        function(err, newDoctor){
            if (err) return reqError(res, 500, err);
            
            console.log(newDoctor);
            
            Patient.update({
                _id : patient_id
            },
            {
                $pull : {
                    'pending' : doctor_id
                },
            },
            function(err, newPatient){
                if(err) return reqError(res, 500, err); 

                res.status(202).send(
                // TODO -> return only good points
                    newDoctor
                );
            });
        });
    };

    c.deleteAccessTo = function(req, res, next){
        if (!req.session.patient) return reqError(res, 403, "not logged in as a patient");
        if (!req.params.doctor_id) return reqError(res, 400, "doctor_id param", "missing");

        var doctor_id = req.params.doctor_id;
        var patient_id = req.session.patient._id; 

        Doctor.findOneAndUpdate({
            _id : doctor_id
        },
        {
            $pull : { 
                'has_access_to' : patient_id
            }
        },
        function (err, newDoctor){
            if(err) return reqError(res, 500, err);

            res.status(202).json(
                // TODO -> return only good points
                newDoctor
            );
        });
    };

    c.getAccessTo = function(req, res, next){
        if(!req.session.doctor) return res.json({ logged_in : false});
        
        Doctor.find ({_id: req.session.doctor._id})
        .populate('has_access_to')
        .exec(function(err,doctor){
            if (err) return reqError(res, 500, err);
               
            res.json(doctor);
        });
    };
    
    return c;
}
