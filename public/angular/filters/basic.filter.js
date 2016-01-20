angular.module('module_basic_filters', [])
.filter("isObjectEmpty", function(){
    return function(object){
        return angular.equals({}, object);
    }
});
