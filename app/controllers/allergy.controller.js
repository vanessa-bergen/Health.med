module.exports = function(){
    var Allergy = require('mongoose').model('Allergy');
    var reqError = require('./reqError.js');
    var isEmpty = require('./isEmpty.js');
    
    var c = {};
 
    c.create = function(req, res, next){
        if (isEmpty(req.body)) return reqError(res, 400, "body", "missing");

        // TODO: to solve uniqueness problem for allergies:
        // check to see if its already in the db; 
        // if it is, return it;
        // otherwise, create it

        var newAllergy = new Allergy(req.body);
        newAllergy.save(function(err){
            if (err) return reqError(res, 500, err);

            res.status(201).json({
                allergy : newAllergy
            });
        });
    };

    c.findById = function(req, res, next, allergy_id){
        if (!allergy_id) return next();

        Allergy.findOne({ _id : allergy_id }, function(err, allergy){
            if (err) reqError(res, 500, err);

            req.allergy = allergy;
            next();
        });
    };

    c.get = function(req, res, next){
        if (!req.allergy) return reqError(res, 400, "allergy", "missing");

        res.json(req.allergy);
    };


    c.index = function(req, res, next){
        Allergy.find({}, function(err, allergies){
            if (err) reqError(res, 500, err);

            res.json(allergies);
        });
    
    };
    

    return c;
}
    

