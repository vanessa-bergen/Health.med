module.exports = function(app){
    var doctor_ctrlr = require('../controllers/doctor.controller.js')();

    app.post('/doctor/login', doctor_ctrlr.doLogIn);
    app.post('/doctor', doctor_ctrlr.create);
    
    app.get('/doctor/access', doctor_ctrlr.getAccessTo);
    app.delete('/doctor/access', doctor_ctrlr.deleteAccessTo);    
    app.put('/doctor/access', doctor_ctrlr.addAccessTo);
   
    app.get('/doctor/id/:doctor_id', doctor_ctrlr.get);
    app.get('/doctor/me', doctor_ctrlr.getMe); 
    app.get('/doctor/index', doctor_ctrlr.index);
    
    app.param('doctor_id', doctor_ctrlr.findById);

    //doctor.invite add and delete
    app.put('/patient/invite/add', doctor_ctrlr.addInvite);
    app.delete('/doctor/decline_invite', doctor_ctrlr.declineInvite);
    app.delete('/patient/cancel_invite', doctor_ctrlr.cancelInvite);
    
    console.log('       doctor routes initialized');  
}

