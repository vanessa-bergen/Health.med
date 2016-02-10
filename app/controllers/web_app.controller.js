module.exports = function(homeDir){
    var fs = require('fs');
    var hmSession = require('./session.controller.js');

    var c = {};

    c.getLogInApp = function(req, res, next){
        var account_type = req.session.account_type;

        // simply 'undefined checking' the account_type is good enough
        // to check session expiration.
        if (!account_type){
            res.sendFile(homeDir + "/app/views/home.html");
        } else if (account_type === hmSession.account_type.PATIENT){
            res.redirect("/app/patient");
        } else if (account_type === hmSession.account_type.DOCTOR){
            res.redirect("/app/doctor");
        } else {
            res.status(401).send("Unauthorized");
        }
    };

    c.getPatientApp = function(req, res, next){
        var account_type = req.session.account_type;
        
        if (!account_type){
            res.redirect('/');
        } else if (account_type === hmSession.account_type.PATIENT){
            res.sendFile(homeDir + "/app/views/patient.html");
        } else if (account_type === hmSession.account_type.DOCTOR){
            res.redirect('/doctor');
        } else {
            res.status(401).send("Unauthorized");
        }
    };

    c.getDoctorApp = function(req, res, next){
        var account_type = req.session.account_type;
        
        if (!account_type){
            res.redirect('/');
        } else if (account_type === hmSession.account_type.PATIENT){
            res.redirect('/patient');
        } else if (account_type === hmSession.account_type.DOCTOR){
            res.sendFile(homeDir + "/app/views/doctor.html");
        } else {
            res.status(401).send("Unauthorized");
        }
    };

    return c;

};
