angular.module('app.controllers', [])
  
.controller('cityWalksCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('menuCtrl', ['$scope', '$stateParams', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state) {

    $scope.logout = function(){
        $state.go('login');
    }

}])
   
.controller('loginCtrl', ['$scope', '$stateParams', '$state', '$http', 
// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $http) {

   $scope.data = {
        'email': '',
        'password': ''
    }
    var local = 'local';
    
    $scope.error = '';

    $scope.login = function () {
        console.log("inne i funktionen")
        var req = {
            crossDomain: true,
            method: 'POST',
            url: 'http://46.101.219.139:5000/authentication',
            headers: {
                'Content-Type': 'application/json'
            },
            data: { 'strategy': local, 'email': $scope.data.email, 'password': $scope.data.password }
        }

        $http(req).then(function (response) {console.log(response), $state.go('menu.topRoutes')});
        

    };

}])
   
.controller('signupCtrl', ['$scope', '$stateParams', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state) {
    
    $scope.data = {
        'name': '',
        'email': '',
        'password': ''
    }
    
    $scope.error='';

    $scope.signup = function(){

              $state.go('login');
    }

}])
   
.controller('requestResetPasswordCtrl', ['$scope', '$stateParams', '$state', function ($scope, $stateParams, $state) {

    $scope.data = {
        email: ''
    };
    $scope.request = function() {
         $state.go("confirmResetPassword");

    };
}])
   
.controller('confirmResetPasswordCtrl', ['$scope', '$stateParams', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state) {

    $scope.data = {
        code: '',
        newpassword: ''
    };

    $scope.error = '';
    
    $scope.reset = function() {
        $state.go("login");
    
    }
}])
   
.controller('nearbyRoutesCtrl', ['$scope', '$stateParams', '$state', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $http) {

    $scope.data = {
        'city': '',
        'distance': ''
    }


    $scope.findNearbyRoutes = function () {

        var req = {
            crossDomain: true,
            method: 'POST',
            url: 'http://46.101.219.139:5000/api/cities',
            headers: {
                'Content-Type': 'application/json'
            },
            data: { 'name': $scope.data.city, 'distance': $scope.data.distance }
        }

        $http(req).then(function () { $state.go('menu.nearbyRoutes'), $scope.error = 'Error logging in.' });


    };


}])
   
.controller('createRouteCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('topRoutesCtrl', ['$scope', '$state', '$stateParams', '$http', 'listItmeDataService', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $stateParams, $http, listItmeDataService, $ionicPopup) {

    $scope.getRouteData = function () {

        $http({
            method: 'GET',
            url: 'http://46.101.219.139:5000/api/cities'
        }).then(function (response) {
            $scope.myData = response.data.data;


        })
    }

    $scope.getRouteInfo = function (id) {
        var routeId = id;
        listItmeDataService.set(routeId);
        $state.go("menu.myRoutes")
        console.log(routeId._id, routeId.name);

    }

    $scope.deleteRouteData = function (item) {

        $http({
            method: 'DELETE',
            url: 'http://46.101.219.139:5000/api/cities/' + item._id
        }).then(function () {
            $scope.getRouteData();
        })
       };

}])
   
.controller('myRoutesCtrl', ['$scope', '$stateParams', 'listItmeDataService', '$http', '$state',   // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, listItmeDataService, $http, $state) {
    $scope.itemData = listItmeDataService.get();

    $scope.data = {
        'distance': ''
    };


    $scope.updateDistance = function (item) {
        console.log($scope.data.distance);
        var req = {
            crossDomain: true,
            method: 'PUT',
            url: 'http://46.101.219.139:5000/api/cities/' + item._id,
            headers: {
                'Content-Type': 'application/json'
            },
            data: { 'name': $scope.itemData.name, 'distance': $scope.data.distance }
        }
        $http(req).then(function () { $state.go('menu.topRoutes'), $scope.error = 'Error logging in.' });

    };

    $scope.deleteRouteData = function (item) {

        $http({
            method: 'DELETE',
            url: 'http://46.101.219.139:5000/api/cities/' + item._id
        }).then(function () {
            $state.go('menu.topRoutes');
        })
    };


}])
   
.controller('settingsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('recordRouteCtrl', ['$scope', '$stateParams', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicPopup) {

    /*
    $scope.stopRecordingRoute = function() {
       var alertPopup = $ionicPopup.show({
         template: '<ion-list>  <ion-toggle>Wheelchair frendly</ion-toggle> <ion-toggle>Green areas</ion-toggle> <ion-toggle>Water areas</ion-toggle> <ion-toggle>Historical buildings</ion-toggle> <ion-toggle>Museums</ion-toggle> <ion-toggle>Boutiques</ion-toggle> </ion-list> ',
         title: 'Please add informarion about your route',
         scope: $scope,
         buttons: [
           { text: 'Cancel' },
           {
             text: '<b>Save</b>',
             type: 'button-positive',
           }]
       });
    };
    */

    $scope.startRecordRoute = function () {

        
        init_lat = 59.84;
        init_lon = 17.65;
        
        range = .02;
        trackPoints = [];

        var start;
        var randCoord;
        var lat_long;

        //Fires up random coordinate generation based upon distance input
        findCoordinates(init_lat, init_lon, range);
        var request = {
            origin: lat_long,
            destination: randCoord,
            travelMode: google.maps.TravelMode.WALKING
        }
        var directionsDisplay;
        var directionsService = new google.maps.DirectionsService();
        initialize();
        //Displays start and chosen random coordinate - for debugging only
        //document.getElementById('buttonClick') = lat_long + randCoord;
        //Get's value from doc to use for start value
        //var start = document.getElementById('start').value;

        function initialize() {

            directionsDisplay = new google.maps.DirectionsRenderer();
            var mapOptions = {
                zoom: 18,
                center: new google.maps.LatLng(59.84, 17.65)
            };
            var map = new google.maps.Map(document.getElementById('map-canvas'),
                mapOptions);
            directionsDisplay.setMap(map);
        }
    
        directionsService.route(request, function (response, status) {

            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            } else {
                alert('You broke it.');
            }
        });

        function findCoordinates(lat, long, range) {

            // How many points do we want? (should probably be function param..)
            var numberOfPoints = 16;
            var degreesPerPoint = 360 / numberOfPoints;

            // Keep track of the angle from centre to radius
            var currentAngle = 0;

            // The points on the radius will be lat+x2, long+y2
            var x2;
            var y2;
            // Track the points we generate to return at the end

            for (var i = 0; i < numberOfPoints; i++) {

                // X2 point will be cosine of angle * radius (range)
                x2 = Math.cos(currentAngle) * range;
                // Y2 point will be sin * range
                y2 = Math.sin(currentAngle) * range;

                // Assuming here you're using points for each x,y..             
                newLat = lat + x2;
                newLong = long + y2;
                lat_long = new google.maps.LatLng(newLat, newLong);
                trackPoints[i] = lat_long;


                // Shift our angle around for the next point
                currentAngle += degreesPerPoint;
            }

            // Return the points we've generated
            //gets random coordinate from our array of coords

            randCoord = trackPoints[Math.floor(Math.random() * trackPoints.length)];

            /*
            document.getElementById('randCoord').innerHTML = randCoord;
            document.getElementById('points').innerHTML = trackPoints;
            */

        }

        google.maps.event.addDomListener(window, 'load', initialize);
    }
 

}])
   
.controller('createdRouteCtrl', ['$scope', '$stateParams', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicPopup) {
    
    $scope.rateRoute = function() {
       var alertPopup = $ionicPopup.show({
         template: '<ion-list>  <ion-toggle>Like route</ion-toggle> <ion-toggle>Dangerous route</ion-toggle>  </ion-list> ',
         title: 'Please add informarion about your route',
         scope: $scope,
         buttons: [
           { text: 'Cancel', style:'red'},
           { text: 'Save' },
          ]
       });
    };
 
    

}])
   
.controller('friendesRoutesCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 