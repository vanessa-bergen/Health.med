//var config = require('./config');

var mongoose = require('mongoose');

module.exports = function(){
    var db = mongoose.connect('mongodb://localhost/health_med_dev');

    require('../app/models/doctor.model.js');
    require('../app/models/medication.model.js');
    require('../app/models/patient.model.js');
    require('../app/models/symptom.model.js');    
    require('../app/models/test_result.model.js');
    require('../app/models/treatment.model.js');

    return db;  
};

