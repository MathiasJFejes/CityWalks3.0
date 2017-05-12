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
   
    
.controller('createdRouteCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
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
            url: 'http://46.101.219.139:5000/api/routes'
        }).then(function (response) {
            console.log(response)
            $scope.myData = response.data;


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
            url: 'http://46.101.219.139:5000/api/routes/' + item._id
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
   
.controller('createRouteCtrl', ['$scope', '$stateParams', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http) {

    $scope.range = {
        model: null,
        availableOptions: [ { value: 100, name: '100 m' },
                            { value: 500, name: '500 m' },
                            { value: 1000, name: '1000 m' },
                            { value: 2000, name: '2000 m' },
                            { value: 5000, name: '5000 m' }]
    }

    $scope.place = {
        model: null,
        availableOptions: [ { value: 'park', name: 'Park' },
                            { value: 'museum', name: 'Museum' },
                            { value: 'art_gallery', name: 'Art gallery' },
                            { value: 'cafe', name: 'Cafe' },
                            { value: 'bar', name: 'Bar' },
                            { value: 'city_hall', name: 'City hall' },
                            { value: 'university', name: 'University' },
                            { value: 'library', name: 'Library' }]
    }

    $scope.startRandomRoute = function () {

        navigator.geolocation.getCurrentPosition(
        //success
        function (position) {

            var init_lat = position.coords.latitude;
            var init_lon = position.coords.longitude;
            var startend = new google.maps.LatLng(init_lat, init_lon);
            trackPoints = [];
            var radius = ($scope.range.model) / 100000; 

            var randCoordfirst;
            var randCoordsecond;
            var randCoordthird;

            //Fires up a random coordinate generation based upon range input and start
            findCoordinates(init_lat, init_lon, radius);
            initialize();

            var directionsDisplay;
            var directionsService = new google.maps.DirectionsService();

            function initialize() {

                directionsDisplay = new google.maps.DirectionsRenderer();
           
                var mapOptions = {
                    zoom: 25,
                    suppressMarkers: true,
                    center: startend
                };

                var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
                directionsDisplay.setMap(map);
            }
            
                var request = {
                    origin: startend,
                    destination: startend,
                    waypoints: [{ location: randCoordfirst, stopover: false },
                                { location: randCoordsecond, stopover: false },
                                { location: randCoordthird, stopover: false }],
                    optimizeWaypoints: true,
                    travelMode: google.maps.TravelMode.WALKING,
                    avoidHighways: true
                }
            
               directionsService.route(request, function (response, status) {

                    if (status == google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setDirections(response);
                            console.log(response.routes[0].legs[0].distance.value + " m");
                        } else {
                            alert('You broke it.');
                        }
                    });
                
                
  
            function findCoordinates(lat, long, range) {
                console.log("findCoordinates")
                // How many points do we want? 
                var numberOfPoints = 16;
                var degreesPerPoint = 360 / numberOfPoints;

                // Keep track of the angle from centre to radius
                var currentAngle = 0;

                // The points on the radius will be lat+x2, long+y2
                var x2;
                var y2;
                // Track the points we generate to return at the end

                for (var i = 1; i < numberOfPoints; i++) {

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
                //Add the last point to array that is the start point so that we start and stop at same position
                //trackPoints[numberOfPoints] = new google.maps.LatLng(init_lat, init_lon);
                randCoordfirst = trackPoints[Math.floor(Math.random() * trackPoints.length)];
                randCoordsecond = trackPoints[Math.floor(Math.random() * trackPoints.length)];
                randCoordthird = trackPoints[Math.floor(Math.random() * trackPoints.length)];
            }
            google.maps.event.addDomListener(window, 'load', initialize);
            }
        );
    }

    $scope.startRecordRoute = function () {
        
        navigator.geolocation.getCurrentPosition(
            //success
            function (position) {

                $http({
                    method: 'GET',
                    url: 'http://46.101.219.139:5000/api/checkpoints?type=Nation'
                    }).then(function (response) {
                        var checkpointStockholms = response.data["1"].coord;
                        var checkpointNorrlands = response.data["6"].coord;
                        var checkpointUplands = response.data["10"].coord;
                        var checkpointKalmar = response.data["12"].coord;

                var init_lat = position.coords.latitude;
                var init_lon = position.coords.longitude;
                trackPoints = [];

                var startend = new google.maps.LatLng(init_lat, init_lon);
                var stockholms = new google.maps.LatLng(checkpointStockholms[0], checkpointStockholms[1]);
                var norrlands = new google.maps.LatLng(checkpointNorrlands[0], checkpointNorrlands[1]);
                var uplands = new google.maps.LatLng(checkpointUplands[0], checkpointUplands[1]);
                var kalmar = new google.maps.LatLng(checkpointKalmar[0], checkpointKalmar[1]);

                var randCoordfirst;
                var randCoordsecond;
                var randCoordthird;

                //Fires up a random coordinate generation based upon range input and start
                findCoordinates(init_lat, init_lon, $scope.range.model);
                initialize();

                var map;
                var infowindow;
                var directionsDisplay;
                var directionsService = new google.maps.DirectionsService();

                function initialize() {

                    directionsDisplay = new google.maps.DirectionsRenderer();
                    var currentpos = new google.maps.LatLng(init_lat, init_lon);

                    var mapOptions = {
                        zoom: 25,
                        suppressMarkers: true,
                        center: currentpos
                    };

                    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
                    directionsDisplay.setMap(map);
                    var service = new google.maps.places.PlacesService(map);
                    service.nearbySearch({
                        location: currentpos,
                        radius: $scope.range.model,
                        type: [$scope.place.model]
                    }, callback);

                    function callback(results, status) {
                        var waypts = [];

                        if (status === google.maps.places.PlacesServiceStatus.OK) {
                            for (var i = 0; i < results.length; i++) {
                                waypts.push({
                                    location: new google.maps.LatLng(results[i].geometry.location.lat(), results[i].geometry.location.lng()),
                                    stopover: false
                                });
                                //createMarker(results[i]);
                                console.log(results[i])
                            }
                        }

                        var request = {
                            origin: startend,
                            destination: startend,
                            waypoints: waypts, /*[{ location: randCoordfirst, stopover: false },
                                { location: randCoordsecond, stopover: false },
                                { location: randCoordthird, stopover: false }],*/
                            optimizeWaypoints: true,
                            travelMode: google.maps.TravelMode.WALKING,
                            avoidHighways: true
                        }

                        directionsService.route(request, function (response, status) {
                           
                            if (status == google.maps.DirectionsStatus.OK) {
                                directionsDisplay.setDirections(response);
                                console.log(response.routes[0].legs[0].distance.value + " m");
                            } else {
                                alert('You broke it.');
                            }
                        });
                    }
                }
/*
                function createMarker(place) {
                    var placeLoc = place.geometry.location;
                    var marker = new google.maps.Marker({
                        map: map,
                        position: place.geometry.location
                    });

                    google.maps.event.addListener(marker, 'click', function() {
                        infowindow.setContent(place.name);
                        infowindow.open(map, this);
                    });
                }
*/
                function findCoordinates(lat, long, range) {
                    console.log("findCoordinates")
                    // How many points do we want? 
                    var numberOfPoints = 16;
                    var degreesPerPoint = 360 / numberOfPoints;

                    // Keep track of the angle from centre to radius
                    var currentAngle = 0;

                    // The points on the radius will be lat+x2, long+y2
                    var x2;
                    var y2;
                    // Track the points we generate to return at the end
                  
                    for (var i = 1; i < numberOfPoints; i++) {
                        
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
                    //Add the last point to array that is the start point so that we start and stop at same position
                    //trackPoints[numberOfPoints] = new google.maps.LatLng(init_lat, init_lon);
                    randCoordfirst = trackPoints[Math.floor(Math.random() * trackPoints.length)];
                    randCoordsecond = trackPoints[Math.floor(Math.random() * trackPoints.length)];
                    randCoordthird = trackPoints[Math.floor(Math.random() * trackPoints.length)];
                }
                google.maps.event.addDomListener(window, 'load', initialize);
                }
            );
        })
    }
 

}])

   /*
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
   */

.controller('friendesRoutesCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 