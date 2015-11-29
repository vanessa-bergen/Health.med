module.exports = function(){
    var Doctor = require('mongoose').model('Doctor');

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
    
    c.removeInvite = function(req, res, next){

        
        if (isEmpty(req.body)) return reqError(res, 400, "body", "missing");
        if (!req.session.doctor) return res.json({ logged_in : false });
        if (!req.body.invite) return reqError(res,400, "body.invite", "missing");
    }

    c.addInvite = function(req, res, next){

        
        if (isEmpty(req.body)) return reqError(res, 400, "body", "missing");
        if (!req.session.doctor) return res.json ({ logged_in : false });
        if (!req.body.invite) return reqError(res, 400, "body.invite", "missing");

        req.doctor.invites.push(req.body.invite);
        req.doctor.save(function(err){
            if (err) return reqError(res, 500, err);
            res.status(202).json(req.doctor);
        });
    };

    
    Doctor.update({
        _id : req.session.doctor._id
    },
 
    {
        $push : {
            'invites' : req.body.invite
        }
    }, 
    function(err, newDoctor){
        if(err) return reqError(res, 500, err);
        res.status(202).json(newDoctor);
    });
};





    return c;
}

