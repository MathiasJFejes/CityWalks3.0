angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.factory('myService', function(){
    var savedData = {}
    function set(data) {
        savedData = data;
    }
    function get() {
        return savedData;
    }

    return {
        set: set,
        get: get
    }
})

.service('BlankService', [function(){

}]);