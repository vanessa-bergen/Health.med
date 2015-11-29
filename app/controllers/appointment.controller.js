module.exports = function(){
    var Appointment = require('mongoose').model('Appointment');
    var reqError = require('./reqError.js');
    var isEmpty = require('./isEmpty.js');

    var c = {};

    c.create = function(req, res, next){
        if (!req.session.doctor) return res.status(403).json({ logged_in : false });
        if (isEmpty(req.body)) return reqError(res, 400, "body", "missing");
        if (!req.body.about_patient) return reqError(res, 400, "body.about_patient", "missing");
        req.body.with_doctor = req.session.doctor._id;

        var newApt = new Appointment(req.body);
        newApt.save(function(err){
            if (err) return reqError(res, 500, err);

            res.status(201).json({
                appointment : newApt
            });
        });
    };

    c.index = function(req, res, next){
        if (!req.session.doctor) return res.status(403).json({ logged_in : false });
        
        Appointment.find({ with_doctor : req.session.doctor._id }, function(err, apts){
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
