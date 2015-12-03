module.exports = function(app){
    var patient_controller = require('../controllers/patient.controller.js');
    patient_controller = patient_controller();

    // ReST Resprestational State Transfer
    // Rest interface:
    //  C: reate
    //  R: ead
    //  U: pdate
    //  D: elete

    //  C -> Post,
    //  R -> Get,
    //  U -> Put,
    //  D -> Delete, 

    app.post('/patient/login', patient_controller.doLogIn);

    // patient CRUDs
    app.post('/patient', patient_controller.create);

    

    // patient.allergy CRUDs
    app.put('/patient/:patient_id/allergy/add', patient_controller.addAllergy);
    app.get('/patient/:patient_id/allergy', patient_controller.getAllergies);
    app.delete('/patient/:patient_id/allergy/', patient_controller.deleteAllergy); 

    app.get('/patient/me', patient_controller.getMe);
    
    //pending CRUDs
    app.get('/patient/pending', patient_controller.getPending);
    // devel endpoint
    app.get('/patient', patient_controller.index);

    app.param('patient_id', patient_controller.findById);

    console.log('        patient routes initialized');
}
