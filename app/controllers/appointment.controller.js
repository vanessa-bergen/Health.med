module.exports = function(){
    var Appointment = require('mongoose').model('Appointment');
    var reqError = require('./reqError.js');
    var isEmpty = require('./isEmpty.js');

    var c = {};

    c.create = function(req, res, next){
        if (isEmpty(req.body)) return reqError(res, 400, "body", "missing");
        
        var newApt = new Appointment(req.body);
        newApt.save(function(err){
            if (err) return reqError(res, 500, err);

            res.status(201).json({
                appointment : newApt
            });
        });
    };

    c.index = function(req, res, next){
        Appointment.find({}, function(err, apts){
            if (err) return reqError(res, 400, "body", "missing");

            res.json(apts);
        });
    };

    c.findById = function(req, res, next, apt_id){
        if (!apt_id) return next();

        Appointment.findOne({ _id : apt_id }, function(err, apt){
            if (err) return reqError(res, 500, err);

            req.appointment = apt;
            next();
        });
    };

    c.get = function(req, res, next){
        if (!req.appointment) return reqError(res, 400, "appointment", "missing");

        res.json(req.appointment);
    };

    return c;
}
