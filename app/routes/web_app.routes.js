module.exports = function(app, homeDir){
    var fs = require('fs');
    var wa_ctrlr = require('../controllers/web_app.controller.js')(homeDir);

    app.get('/doctor', wa_ctrlr.getDoctorApp);
    app.get('/patient', wa_ctrlr.getPatientApp); 
    app.get('/', wa_ctrlr.getLogInApp);

    console.log('        web app routes initialized');
};
