module.exports = function(app){
    var medication_controller = require('../controllers/medication.controller.js');
    medication_controller = medication_controller();
    app.post('/medication', medication_controller.create);
    app.get('/medication/:medication_id', medication_controller.get);
    
    app.get('/medication', medication_controller.index);

    app.param('medication_id', medication_controller.findById);
    console.log('        medication routes initialized');
    }

