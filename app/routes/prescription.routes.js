module.exports = function(app){
    var prescripton_ctrlr = require('../controllers/prescription.controller.js')();

    app.post('/prescription', prescripton_ctrlr.create);

    app.get('/prescription/by_id/:prescription_id', prescripton_ctrlr.get);
    app.get('/prescription/me', prescripton_ctrlr.getPrescriptionsMe);

    app.get('/prescription', prescripton_ctrlr.index);

    app.param('prescription_id', prescripton_ctrlr.findById);

    console.log('        prescription routes initialized.');
}
