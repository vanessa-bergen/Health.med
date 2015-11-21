module.exports = function(){
    var TestResult = require('mongoose').model('TestResult');
    var reqError = require('./reqError.js');
    var isEmpty = require('./isEmpty.js');

    var c = {};
    c.create = function (req, res, next){
        if(isEmpty(req.body)) return reqError(res, 400, "body","missing");

        var newTestResult = new TestResult(req.body);
        newTestResult.save(function(err){
            if(err) return reqError(res, 500, err);
            res.status(201).json({
                testresult : newTestResult
             });
        });
    };

    c.findById = function (req, res, next, testresult_id){
        if (!testresult_id) return next ();
        
        TestResult.findOne( {_id: testresult_id}, function(err, testresult){
            if(err) return reqError(res, 500, err);
            req.testresult = testresult;

            next();
            });

   };

   c.index = function(req, res, next){
       TestResult.find({}, function(err, testresults){
           if(err) return reqError(res, 500, err);
           res.json(testresults);
           });          
   };

   c.get = function(req, res, next){
        if(!req.testresult) return reqError(res, 400, 'test result', 'missing');
        res.json(req.testresult);              
   };
    return c;
}

