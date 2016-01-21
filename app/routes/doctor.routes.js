module.exports = function(app){
    var doctor_ctrlr = require('../controllers/doctor.controller.js')();

    app.post('/doctor/login', doctor_ctrlr.doLogIn);
    app.post('/doctor', doctor_ctrlr.create);
    
    app.get('/doctor/access', doctor_ctrlr.getAccessTo);
    app.delete('/doctor/access', doctor_ctrlr.deleteAccessTo);    
    app.put('/doctor/access', doctor_ctrlr.addAccessTo);
   
    app.get('/doctor/id/:doctor_id', doctor_ctrlr.getById);
    app.get('/doctor/id', doctor_ctrlr.getById);
    
    app.get('/doctor/me', doctor_ctrlr.getMe); 
    app.get('/doctor/index', doctor_ctrlr.index);

    //doctor.invite add and delete
    app.put('/doctor/invite/add', doctor_ctrlr.addInvite);
    app.delete('/doctor/decline_invite', doctor_ctrlr.declineInvite);
    app.delete('/patient/cancel_invite/:doctor_id', doctor_ctrlr.cancelInvite); 

    app.param('doctor_id', function(req, res, next){
        console.log('yep');
        next();
    });
    
    console.log('       doctor routes initialized');  
}

