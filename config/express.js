var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');

module.exports = function(homeDir){
    console.log("initializing health.med.js!!!");
    
    var app = express();
    
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended : true }));
    app.use(bodyParser.json());
    app.use(session({
        saveUninitialized : true, 
        resave : true, 
        secret : "blahblahblahblah",
        cookie : {
            maxAge : 1000 * 3600 * 24
        }
    }));

    console.log("    initializing routes...");

    app.use(express.static(homeDir + "/public"));
    console.log('        ' + homeDir + "/public routes initialized.");
        
    require('../app/routes/helloworld.routes.js')(app);   
    require('../app/routes/patient.routes.js')(app);
    require('../app/routes/allergy.routes.js')(app);
    require('../app/routes/treatment.routes.js')(app);    
    require('../app/routes/appointment.routes.js')(app); 
    require('../app/routes/symptom.routes.js')(app);
    require('../app/routes/medication.routes.js')(app);     
    require('../app/routes/test_result.routes.js')(app);
    require('../app/routes/condition.routes.js')(app);
    require('../app/routes/doctor.routes.js')(app);
    require('../app/routes/web_frameworks.routes.js')(app);
    require('../app/routes/web_app.routes.js')(app, homeDir);

    console.log("    routes intialized.");

    return app;
}



