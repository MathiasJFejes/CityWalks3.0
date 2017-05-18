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
    function drop() {
        savedData = {}
    }

    return {
        set: set,
        get: get,
        drop: drop

    }
})


.factory('handleUser', function () {
    var returnValue = {}

    function findName(id, userArray) {
        angular.forEach(userArray, function (value, key) {
            if (id == value._id) {
                returnValue['userName'] = value.username
                returnValue['key'] = key
            }

        })
        return returnValue
    }

    function findId(name, userArray) {
        console.log("inne i service;", name, userArray)
        angular.forEach(userArray, function (value, key) {
            if (name == value.username) {
                returnValue['_id'] = value._id
                console.log(returnValue)
            }

        })
        return returnValue._id
    }
    function drop() {
        savedData = {}
    }

    return {
        findName: findName,
        findId: findId

    }
})