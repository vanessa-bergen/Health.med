module.exports = function(app){
    var patient_controller = require('../controllers/patient.controller.js')();

    app.post('/patient', patient_controller.create);

    app.get('/patient/:patient_id', patient_controller.get);
    app.get('/patient', patient_controller.index);

    app.param('patient_id', patient_controller.findById);

    console.log('        patient routes initialized');
}
