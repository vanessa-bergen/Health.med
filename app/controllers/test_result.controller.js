module.exports = function(){
    var TestResult = require('mongoose').model('TestResult');
    var reqError = require('./reqError.js');
    var isEmpty = require('./isEmpty.js');

    var c = {};
    c.create = function (req, res, next){
        if (isEmpty(req.body)) return reqError(res, 400, "body","missing");
        if (!req.params.patient_id) return reqError(res, 400, "patient_id", "missing");

        req.body.patient_id = req.params.patient_id;
        
        var newTestResult = new TestResult(req.body);
        newTestResult.save(function(err){
            if (err) return reqError(res, 500, err);
            
            res.status(201).json({
                testresult : newTestResult
            });
        });
    };

    c.setPatientId = function(req, res, next, patient_id){
        if (patient_id) req.patient_id = patient_id;

        next();
    }

    c.findByPatientId = function(req, res, next){
        if (!req.patient_id) 
            return reqError(res, 400, "param.patient_id", "missing");
 
        // TODO --> check if person can view these records
        
        TestResult.find({ patient_id : req.patient_id })
        .sort('date').exec(function(err, docs){
            if (err) return reqError(res, 500, err);

            res.json(docs);
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

