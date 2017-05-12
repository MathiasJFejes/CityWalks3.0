angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.factory('listItmeDataService', function(){
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

.factory('tokenHandler', [function () {
    var savedToken;
    function set(token) {
        savedToken = token;
    }
    function get() {
        return savedToken
    }
    function drop() {
        savedToken = 'no longer valid token'
    }
    return {
        set: set,
        get: get,
        drop: drop
            
    }
}])

.service('BlankService', [function(){

}]);