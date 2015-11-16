module.exports = function(){
    var Treatment = require('mongoose').model('Treatment');
    var reqError = require('./reqError.js');
    var isEmpty = require('./isEmpty.js');
    
    var c = {};
    
    c.create = function(req, res, next){
        if(isEmpty(req.body)) return reqError(res, 400, "body", "missing");
      
        var newTreatment = new Treatment(req.body);
        newTreatment.save(function(err){
            if(err) return reqError(res, 500, err);

            res.status(201).json({
                treatement : newTreatment 
            });
        });   
    };    

    c.findById = function(req, res, next, treatment_id){
        if(!treatment_id) return next();

        Treatment.findOne({_id: treatment_id}, function(err, treatment){
            if(err) return reqError(res, 500, err);
            req.treatment = treatment;
            next();    
        });

    };

    c.get = function(req, res, next){
        if(!req.treatment) return reqError(res, 400, "patient", "missing");
        res.json(req.treatment);    

    };
    
    c.index = function (req, res, next){
        Treatment.find({}, function(err, treatments){
            if(err) return reqError(res, 500, err);
            res.json(treatments);
        });
    };
    return c;

}

