//var config = require('./config');

var mongoose = require('mongoose');

module.exports = function(){
    var db = mongoose.connect('mongodb://localhost/health_med_dev');
    
    require('../app/models/patient.model.js');
    
    return db;  
};

