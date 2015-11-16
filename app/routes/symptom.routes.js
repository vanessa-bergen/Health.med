module.exports = function(app){
    var symptom_ctrlr = require('../controllers/symptom.controller.js')();

    app.post('/symptom', symptom_ctrlr.create);

    app.get('/symptom/:symptom_id', symptom_ctrlr.get);

    app.get('/symptom', symptom_ctrlr.index);

    app.param('symptom_id', symptom_ctrlr.findById);

    console.log('       symptom routes initialized.');
}
