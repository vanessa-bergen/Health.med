var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

module.exports = function(){
    console.log("initializing health.med.js!!!");
    
    var app = express();
    
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended : true }));
    app.use(bodyParser.json());

    console.log("    initializing routes...");
    
    require('../app/routes/helloworld.routes.js')(app);   
    require('../app/routes/patient.routes.js')(app);
    require('../app/routes/allergy.routes.js')(app);
    require('../app/routes/treatment.routes.js')(app);    
    require('../app/routes/appointment.routes.js')(app); 
    require('../app/routes/symptom.routes.js')(app);
    require('../app/routes/medication.routes.js')(app);     
    console.log("    routes intialized.");

    return app;
}



