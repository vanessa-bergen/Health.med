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

    app.post('/patient', patient_controller.create);

    app.put('/patient/:patient_id/allergy/add', patient_controller.addAllergy);
    app.get('/patient/:patient_id/allergy', patient_controller.getAllergies);
    app.delete('/patient/:patient_id/allergy/', patient_controller.deleteAllergy); 

    app.get('/patient/:patient_id', patient_controller.get);

    // devel endpoint
    app.get('/patient', patient_controller.index);

    app.param('patient_id', patient_controller.findById);

    console.log('        patient routes initialized');
}
