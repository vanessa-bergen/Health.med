module.exports = function(app){
    var wF = require('../controllers/web_frameworks.controller.js')();

    app.get('/lib/angular.js', wF._angular.angular);
    app.get('/lib/angular-route.js', wF._angular.route);
    app.get('/lib/angular-resource.js', wF._angular.resource);

    app.get('/lib/bootstrap.css.map', wF._bootstrap.css.map.bootstrap);
    app.get('/lib/bootstrap-theme.css.map', wF._bootstrap.css.map.theme);
    app.get('/lib/bootstrap.css', wF._bootstrap.css.bootstrap);
    app.get('/lib/bootstrap-theme.css', wF._bootstrap.css.theme);

    console.log('        webFrameworks routes set.');
}
