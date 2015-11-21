module.exports = function(app){
    var testresult_controller = require('../controllers/test_result.controller.js')();
    app.post('/testresult', testresult_controller.create);

    app.get('/testresult/:testresult_id', testresult_controller.get);

    app.get('/testresult', testresult_controller.index);

    app.param('testresult_id', testresult_controller.findById);
    console.log('        test result routes initialized');

}
