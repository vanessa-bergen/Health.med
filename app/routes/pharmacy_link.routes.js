module.exports = function(app, dirname){
    var pharmacy_link_ctrlr = require('../controllers/pharmacy_link.controller.js')(dirname);

    app.post('/patient/pharmacy_link', pharmacy_link_ctrlr.create);
    
    app.get('/pharmacy_link/id/:pharmacyLink_id', pharmacy_link_ctrlr.getPharmacyLinkPage);
 	
    app.get('/pharmacy_link/prescriptionId/:prescription_id', 
    	pharmacy_link_ctrlr.getByPrescriptionId);

    app.get('/pharmacy_link/current', pharmacy_link_ctrlr.getCurrentPharmacyLink);

    app.param('pharmacyLink_id', pharmacy_link_ctrlr.findById);

    app.param('prescription_id', function(req,res,next){
    	next();
    });
    
    app.get('/pharmacy_link', pharmacy_link_ctrlr.index)
    

    console.log('        pharmacy_link routes initialized.');
}
