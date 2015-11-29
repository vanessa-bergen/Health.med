module.exports = function(){
    var Doctor = require('mongoose').model('Doctor');

    var reqError = require('./reqError.js');
    
    var c = {};
    
    c.create = function(req, res){
        if (!req.body) return reqError(res, 400, "body", "missing");

        var newDoctor = new Doctor(req.body);
        newDoctor.save(function(err){
            if (err) return reqError(res, 500, err);

            console.log(JSON.stringify({ doctor : newDoctor }) + "\n");
            res.status(201).json({
                doctor : newDoctor
            });
        });
    };

    c.byId = function(req, res, next, doctor_id){
        if (!doctor_id) return next();

        req.doctor_id = doctor_id;
        next();
    };

    c.findById = function(req, res, next, doctor_id){
        if (!doctor_id) return next();

        Doctor.findOne({ _id : doctor_id }, function(err, doctor){
            if (err) return reqError(res, 500, err);

            req.doctor = doctor;
            next();
        });
    };

    c.get = function(req, res, next){
        if (!req.doctor) return reqError(res, 400, "doctor", "missing");

        res.json(req.doctor);
    };

    c.index = function(req, res, next){
        Doctor.find({}, function(err, doctors){
            if (err) return reqError(res, 500, err);

            res.json(doctors);
        });
    };

    // doctor-patient invites relationship controllers
    //     - called by patients 

    c.inviteDoctor = function(req, res, next){
        if (!req.session.patient) return res.status(403).({ logged_in : false });
        if (!req.doctor_id) return reqError(res, 400, "doctor", "missing");
        
        Doctor.findOneAndUpdate({ 
            _id : req.doctor_id
        }, {
            $addToSet : {
               invites : req.session.patient._id 
            }
        }, function(err, doctor){
            if (err) return reqError(res, 500, err);
            if (!doctor) return reqError(res, 400, "doctor", "invalid");

            doctor.invites.push(req.session.patient._id);
            doctor.save(function(err){
                if (err) return reqError(res, 500, err);

                res.status(202).json({
                    invited : true
                });
            });
        });
        
         
    }

    // doctor-patient has_access_to relationship controllers 

  //  c.addPatient = function()

    return c;
}
