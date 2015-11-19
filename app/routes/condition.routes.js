module.exports = function(app){
    var condition_ctrlr = require('../controllers/condition.controller.js')();
    
    app.post('/condition', condition_ctrlr.create);
    app.get('/condition/:condition_id', condition_ctrlr.get);
    app.get('/condition', condition_ctrlr.index);
    app.param('condition_id', condition_ctrlr.findById);
    console.log('       condition routes initialized.');
}

