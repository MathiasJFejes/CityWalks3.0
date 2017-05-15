angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.factory('listItmeDataService', function(){
    var savedData = {}
    function set(name, data) {
        savedData[name] = data
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