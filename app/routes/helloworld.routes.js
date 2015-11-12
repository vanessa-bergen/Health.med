module.exports = function(any){
    console.log('        helloworld routes intializing...');

    var helloWorldCont = require('../controllers/helloworld.controller.js')();

    any.get('/hello', helloWorldCont.say);
    any.get('/helloJson', helloWorldCont.sayJson);
    any.get('/index/:user_id', helloWorldCont.index);
    any.get('/index', helloWorldCont.index);

    any.param('user_id', helloWorldCont.index_user_id);
}
