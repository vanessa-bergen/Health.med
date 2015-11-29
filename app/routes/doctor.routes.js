module.exports = function(app){
    var doctor_ctrlr = require('../controllers/doctor.controller.js')();

    app.post('/doctor/login', doctor_ctrlr.doLogIn);
    app.post('/doctor', doctor_ctrlr.create);
    
    app.get('/doctor/access', doctor_ctrlr.getAccessTo);
    app.delete('/doctor/access', doctor_ctrlr.deleteAccessTo);    
    app.put('/doctor/access', doctor_ctrlr.addAccessTo);
    
    app.get('/doctor/:doctor_id', doctor_ctrlr.get);
    app.get('/doctor', doctor_ctrlr.index);
    
    app.param('doctor_id', doctor_ctrlr.findById);

    //doctor.invite add and delete
//    app.put('/doctor/invite/add', doctor_controller.addInvite);
  //  app.delete('/doctor/invite/', doctor_controller.removeInvite);
    
    console.log('       doctor routes initialized');  
}

