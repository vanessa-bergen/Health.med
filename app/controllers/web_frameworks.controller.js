// webFrameworks.server.controller.js --- Version 1

module.exports = function(){
    var c = {
        _angular : {},
        _bootstrap : {
            css : {
                map : {}
            },
            fonts : {},
            js : {}
        }
    };

    c._angular.angular = function(req, res){
        res.sendFile('/home/chris/NodeJs/AngularJs/lib/src/angular.js'); 
    };

    c._angular.route = function(req, res){
        res.sendFile('/home/chris/NodeJs/AngularJs/lib/src/angular-route.js');    
    };

    c._angular.resource = function(req, res){
        res.sendFile('/home/chris/NodeJs/AngularJs/lib/src/angular-resource.js');    
    };

    c._bootstrap.css.bootstrap = function(req, res){
        res.sendFile('/home/chris/Bootstrap/lib/bootstrap-3.3.2-dist/css/bootstrap.css');
    };

    c._bootstrap.css.theme = function(req, res){
        res.sendFile(
            '/home/chris/Bootstrap/lib/bootstrap-3.3.2-dist/css/bootstrap-theme.css'
        );
    };

    c._bootstrap.css.map.bootstrap = function(req, res){
        res.sendFile(
            '/home/chris/Bootstrap/lib/bootstrap-3.3.2-dist/css/bootstrap.css.map'
        );
    };

    c._bootstrap.css.map.theme = function(req, res){
        res.sendFile(
            '/home/chris/Bootstrap/lib/bootstrap-3.3.2-dist/css/bootstrap-theme.css.map'
        );
    };
    return c;
}
