module.exports = function(){
    var Condition = require('mongoose').model('Condition');
    var reqError = require('./reqError.js');
    var isEmpty = require('./isEmpty.js');
    
    var c = {};

    c.create = function(req, res, next){
        if(isEmpty(req.body)) return reqError(res, 400, "body", "missing");

        var newCondition = new Condition(req.body);
        newCondition.save(function(err){
            if(err) return reqError(res, 500, err);

            res.status(201).json({
                condition : newCondition
            });
        });
    };

    c.findById = function(req, res, next, condition_id){
        if (!condition_id) return next();

        Condition.findOne({ _id : condition_id}, function(err, condition){
            if (err) reqError(res, 500, err);

            req.condition = condition;
            next();
        });
    };
    
    c.get = function(req, res, next){
        if(!req.condition) return reqError(res, 400, "condition", "missing");

        res.json(req.condition);
    };

    c.index = function(req, res, next){
        Condition.find({}, function(err, conditions){
            if (err) return reqError(res, 500, err);
            res.json(conditions);
        });
    };
    return c;
}
