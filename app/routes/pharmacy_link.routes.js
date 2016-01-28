module.exports = function(app){
    var pharmacy_link_ctrlr = require('../controllers/pharmacy_link.controller.js')();

    app.post('/pharmacy_link', pharmacy_link_ctrlr.create);
    app.get('/pharmacy_link/id/:pharmacyLink_id',pharmacy_link_ctrlr.getById);

    app.param('pharmacyLink_id', function(req, res, next){
        next();
    });

    app.get('/pharmacy_link', pharmacy_link_ctrlr.index)
    console.log('        pharmacy_link routes initialized.');
}