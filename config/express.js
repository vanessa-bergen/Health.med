var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');


console.log('loading of applcition');

module.exports = function(){
    console.log("initializing health.med.js!!!");
    
    var app = express();
    
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended : true }));
    app.use(bodyParser.json());

    console.log("    initializing routes...");
    
    require('../app/routes/helloworld.routes.js')(app);   

    console.log("    routes intialized.");

    return app;
}



