module.exports = function(app){
    var aptmnt_ctrlr = require('../controllers/appointment.controller.js')();
    
    app.post('/appointment', aptmnt_ctrlr.create);

    app.get('/appointment/:appointment_id', aptmnt_ctrlr.get);
    
    app.get('/appointment', aptmnt_ctrlr.index);
    
    app.param('appointment_id', aptmnt_ctrlr.findById);
    
    console.log('        appointment routes initialized.');
}
