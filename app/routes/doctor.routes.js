module.exports = function(app){
    var doctor_ctrlr = require('../controllers/doctor.controller.js')();

    app.post('/doctor/login', doctor_ctrlr.doLogIn);
    app.delete('/doctor/login', doctor_ctrlr.doLogOut);
    app.post('/doctor', doctor_ctrlr.create);
    
    app.get('/doctor/access/me', doctor_ctrlr.getHasAccessToMe);
    //app.get('/doctor/access', doctor_ctrlr.getAccessTo);
    // used by patients, requires valid patient session
    app.delete('/doctor/access/:doctor_id', doctor_ctrlr.deleteAccessTo);    
    app.put('/doctor/access/:doctor_id', doctor_ctrlr.addAccessTo);
   
    app.get('/doctor/id/:doctor_id', doctor_ctrlr.getById);
    app.get('/doctor/id', doctor_ctrlr.getById);
    app.get('/doctor/me', doctor_ctrlr.getMe);
    app.get('/doctor', doctor_ctrlr.query);

    app.delete('/doctor/request/:doctor_id', doctor_ctrlr.declineInvite);

    app.param('patient_id', function(req, res, next){
        next();
    });

    app.param('doctor_id', function(req, res, next){
        next();
    });
    
    console.log('       doctor routes initialized');  
}

