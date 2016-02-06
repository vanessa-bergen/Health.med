module.exports = function(app){
    var patient_controller = require('../controllers/patient.controller.js');
    patient_controller = patient_controller();

    app.post('/patient/login', patient_controller.doLogIn);
    app.delete('/patient/login', patient_controller.doLogOut);
    app.post('/patient', patient_controller.create);
	
	// Profile
	app.put('/patient/edit', patient_controller.update);

    // patient.allergy CRUDs
    app.put('/patient/allergy/add', patient_controller.addAllergy);
    app.get('/patient/allergy', patient_controller.getAllergies);
    app.delete('/patient/allergy/', patient_controller.deleteAllergy); 


    app.get('/patient/me', patient_controller.getMe);    
    app.get('/patient/pending', patient_controller.getPending);
    app.get('/patient', patient_controller.query);

    app.param('patient_id', patient_controller.findById);

    console.log('        patient routes initialized');
}
