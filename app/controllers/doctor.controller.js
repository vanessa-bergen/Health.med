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

    c.findById = function(req, res, next, doctor_id){
        if (!doctor_id) return next();

        Doctor.findOne({ _id : doctor_id }, function(err, doctor){
            if (err) return reqError(res, 500, err);

            req.doctor = doctor;
            next();
        });
    };

    c.getMe = function(req, res, next){
        if (!req.session.doctor) return res.json({ logged_in : false });

        res.json({
            account_type : req.session.account_type,
            doctor : req.session.doctor    
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
    

// patient - doctor invite controllers
// patient sends invitation. Seen as pending in patient DB
// see as an invite in docotor dB

    c.cancelInvite = function(req, res, next){

        
        if (isEmpty(req.body)) return reqError(res, 400, "body", "missing");
        if (!req.session.patient) return res.json({ logged_in : false });
        if (!req.body.doctor_id) return reqError(res, 400, "doctor_id", "missing");
    
        Doctor.update({ 
            _id : req.body.doctor_id
        }, 
        {
            $pull : {
                'invites' : req.session.patient._id
            }
        }, 
        function(err, newDoctor) {
            if(err) return reqError(res,500,err);
            res.status(202).json(newDoctor);
        });

        Patient.update({
            _id : req.session.patient._id
        },
        {
            $pull : {
                'pending' : req.body.doctor_id
            }
        },
        function(err, newPatient) {
            if(err) return reqError(res, 500, err);
        });
            
    };

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
        function(err, newDoctor){
            if(err) return reqError(res, 500, err);
            console.log(newDoctor);
        });

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
    };


 // doctor-patient has_access_to relationship controllers 


    c.addAccessTo = function(req, res, next){
        
        if(isEmpty(req.body)) return reqError(res, 400, "body", "missing");
        if(!req.body.patient_id) return reqError(res, 400, "body.patient", 
            "missing");

       if(!req.session.doctor) return res.json({logged_in : false });
    
  
        Doctor.findOneAndUpdate({
            _id: req.session.doctor._id
        },
        { 
            $addToSet : {
                'has_access_to' : req.body.patient_id
                 },            
            $pull : {
                'invites' : req.body.patient_id
                }
        },
                
       function(err, newDoctor){
            if(err) return reqError(res, 500, err);
            console.log(newDoctor);
            res.status(202).json(newDoctor);
        });

        Patient.Update({
            _id : req.body.patient_id
        },
        {
            $pull : {
                'pending' : req.session.doction._id
                },
        },
        function(err, newPatient){
            if(err) return reqError(res, 500, err);
            console.log(newPatient);
        });

    };

    c.deleteAccessTo = function(req, res, next){
        if(isEmpty(req.body)) return reqError(res, 400, "body", "missing");
        if(!req.body.patient_id) 
            return reqError(res, 400, "body.patient", "missing");
        if(!req.session.doctor) return res.json({ logged_in : false});
        
        Doctor.findOneAndUpdate({
            _id : req.session.doctor._id
        },
        {
            $pull : { 'has_access_to' : req.body.patient_id
            }
        },
        function (err, newDoctor){
            if(err) return reqError(res, 500, err);
            console.log("yoyo 3 ");
            res.status(202).json(newDoctor);
        });
    };

    c.getAccessTo = function(req, res, next){
        if(!req.session.doctor) return res.json({ logged_in : false});
        console.log(req.session.doctor);
        console.log();
        Doctor.find ({_id: req.session.doctor._id})
        .populate('has_access_to')
        .exec(function(err,doctor){
            if (err) return reqError(res, 500, err);
               
            res.json(doctor);
        });
    };
    
    return c;
}
