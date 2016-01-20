module.exports = function(){
    var Symptom = require('mongoose').model('Symptom');
    var reqError = require('./reqError.js');
    var isEmpty = require('./isEmpty.js');

    var c = {};

    c.create = function(req, res, next){
        if (isEmpty(req.body)) return reqError(res, 400, "body", "missing");

        var newSymptom = new Symptom(req.body);
        newSymptom.save(function(err){
            if (err) return reqError(res, 500, err);

            res.status(201).json({
                symptom : newSymptom
            });
        });
    };

    c.findById = function(req, res, next, symptom_id){
        if (!symptom_id) return next();

        Symptom.findOne({ _id : symptom_id}, function(err, symptom){
            if (err) reqError(res, 500, err);

            req.symptom = symptom;
            next();
        });

    };

    c.get = function(req, res, next){
        if(!req.symptom) return reqError(res, 400, "symptom", "missing");

        res.json(req.symptom);
    };

    c.index = function(req, res, next){
        console.log('symptom.index');

        var q = Symptom.find({}, "-__v");
        q.sort("name");
        q.exec(function(err, symptoms){
            if (err) reqError(res, 500, err);

            res.json(symptoms);
        });
    };

    return c;
}


