module.exports = function(){
    var Medication = require('mongoose').model('Medication');
    var reqError = require ('./reqError.js');
    var isEmpty = require('./isEmpty.js');

    var c = {};

    c.create = function(req, res, next){
        if(isEmpty(req.body)) return reqError(res, 400, "body", "missing");

        var newMedication = new Medication(req.body);
        newMedication.save(function(err){
            if(err) return reqError(res, 500, err);
            res.status(201).json({ medication: newMedication});
            });
        
    };
    
    c.findById = function(req, res, next, medication_id){
        if(!medication_id) return next(); //when would this occur?

        Medication.findOne({_id: medication_id}, function(err, medication){
            if(err) return reqError(res, 500, err);
            req.medication = medication; 
            next();
            });
    };
    c.get = function(req,res, next){
       if(!req.medication) return reqError(res, 400, "medication", "missing");
       res.json(req.medication); 
       //default status= 200  
    }; 
    
    c.index = function(req, res, next){
        Medication.find({}, function(err, medications){
            if (err) return reqError(res, 500, err);
            res.json(medications);
        });     
    };  
    return c;
    };

