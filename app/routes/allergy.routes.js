module.exports = function(app){
    var allergy_ctrlr = require('../controllers/allergy.controller.js')();

    app.post('/allergy', allergy_ctrlr.create);

    app.get('/allergy/:allergy_id', allergy_ctrlr.get);

    app.get('/allergy', allergy_ctrlr.index);

    app.param('allergy_id', allergy_ctrlr.findById);

    console.log('        allergy routes initialized.');
}
