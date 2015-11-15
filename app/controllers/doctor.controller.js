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

    return c;
}
