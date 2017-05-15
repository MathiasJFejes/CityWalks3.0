angular.module('app.controllers', [])
  
.controller('cityWalksCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('menuCtrl', ['$scope', '$stateParams', '$state','listItmeDataService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, listItmeDataService) {
    $scope.userData = listItmeDataService.get();

    $scope.logout = function(){
        $state.go('login');
    }

}])
   
.controller('loginCtrl', ['$scope', '$stateParams', '$state', '$http', 'listItmeDataService',
// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $http, listItmeDataService) {

    $scope.error = '';

    $scope.data = {
        'email': '',
        'password': ''
    }

    var local = 'local';

    

    $scope.login = function () {
        console.log("inne i funktionen")
        console.log($scope.data.username, $scope.data.password)
        var req = {
            crossDomain: true,
            method: 'POST',
            url: 'http://46.101.219.139:5000/authentication',
            headers: {
                'Content-Type': 'application/json'
            },
            data: { 'strategy': local, 'email': $scope.data.email, 'password': $scope.data.password }

        }
        $http(req).then(function (response) {
            var jwt = response.data.accessToken;
            console.log('response jwt', jwt);
            listItmeDataService.set(jwt),
            console.log("tokenHandler", listItmeDataService.get())

            //var data = listItmeDataService.get();
            //console.log(data.jwt)

            var getReq = {
                method: 'GET',
                url: 'http://46.101.219.139:5000/users?username=' + $scope.data.username,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': jwt
                }
            }
            $http(getReq).then(function (response) {
                listItmeDataService.set(response)
                console.log(response)
                $state.go('menu.createRoute')

            });
        });
    };

}])
   
.controller('signupCtrl', ['$scope', '$stateParams', '$state', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $http) {
    
    $scope.data = {
        'name': '',
        'email': '',
        'password': ''
    }
    
    $scope.error='';

    $scope.signup = function () {
        console.log("inne i funktionen")
        var req = {
            crossDomain: true,
            method: 'POST',
            url: 'http://46.101.219.139:5000/users',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {'username': $scope.data.name, 'email': $scope.data.email, 'password': $scope.data.password }

        }
        $http(req).then(function successCallback (response) {
            $state.go('menu.createRoute')
        }, function errorCallback(response) {
            console.log('error',response)
        });


    };

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
   
.controller('createRouteCtrl', ['$scope', '$stateParams', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http) {

    $scope.data = {
        choice: "B"
    }

    $scope.range = {
        model: null,
        availableOptions: [{ value: 100, name: '100 m' },
                           { value: 500, name: '500 m' },
                           { value: 1000, name: '1000 m' },
                           { value: 2000, name: '2000 m' },
                           { value: 5000, name: '5000 m' }]
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
                //directionsDisplay.setOptions({ suppressMarkers: true });
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

    $scope.place = {
        model: null,
        availableOptions: [{ id: 'park', name: 'Park' },
                           { id: 'museum', name: 'Museum' },
                           { id: 'art_gallery', name: 'Art gallery' },
                           { id: 'cafe', name: 'Cafe' },
                           { id: 'university', name: 'University' },
                           { id: 'bar', name: 'Bar' },
                           { id: 'library', name: 'Library' }]
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

                    initialize();

                    var map;
                    var infowindow;
                    var directionsDisplay;
                    directionsDisplay.setOptions({ suppressMarkers: true });
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
                                waypoints: waypts,
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
                google.maps.event.addDomListener(window, 'load', initialize);
                }
            );
            })
    }


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
            console.log('response')
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
    var tracking_data = listItmeDataService.get();

    $scope.itemMapSmall = function() { 
            console.log('First Map')
            var tracking_data = listItmeDataService.get();
            var last_element = tracking_data.coords[tracking_data.coords.length - 1];
            var first_element = tracking_data.coords[0];
            console.log(last_element);
            console.log(tracking_data);
            console.log(first_element);

            //Latest Coordinates
            var myLatLng = new google.maps.LatLng(last_element["0"], last_element["1"]);
            //First Coordinates
            var myLatLng_first = new google.maps.LatLng(first_element["0"], first_element["1"]);

            console.log(myLatLng);
            console.log(myLatLng_first);

            // Google Map options center at current pos
            var myOptions = {
                zoom: 14,
                center: myLatLng_first,
                mapTypeId: google.maps.MapTypeId.WALKING
            };

            // Create the Google Map, set options
            var map = new google.maps.Map(document.getElementById("map_item_small"), myOptions);

            var trackCoords = []; // google maps lat lng coords for map

            // Add each GPS entry to array trackCoords
            for (i = 0; i < tracking_data.coords.length; i++) {
                trackCoords.push(new google.maps.LatLng(tracking_data.coords[i]["0"], tracking_data.coords[i]["1"]));

            }

            // Plot the GPS entries as a line on the Google Map
            var trackPath = new google.maps.Polyline({
                path: trackCoords,
                strokeColor: "#7253c3",
                strokeOpacity: 1.0,
                strokeWeight: 2
            });


            //Marker for last position
            var icon_current = {
                url: "/img/Icons/ic_radio_button_checked_red_24dp.png",
                fillColor: '#0099ff',
                scaledSize: new google.maps.Size(30, 30), // scaled size
                origin: new google.maps.Point(0, 0), // origin
                anchor: new google.maps.Point(15, 15) // anchor
            }

            var marker = new google.maps.Marker({
                position: myLatLng,
                icon: icon_current,
                map: map,
                title: 'Current position'
            });

            //Marker for first position
            var icon_first = {
                url: "/img/Icons/ic_radio_button_checked_green_24dp.png",
                fillColor: '#7253C3',
                scaledSize: new google.maps.Size(30, 30), // scaled size
                origin: new google.maps.Point(0, 0), // origin
                anchor: new google.maps.Point(15, 15) // anchor
            }

            var marker = new google.maps.Marker({
                position: myLatLng_first,
                icon: icon_first,
                map: map,
                title: 'Start position'
            });

            // Apply the line to the map
            trackPath.setMap(map);
            console.log('Last Map')
    }

    $scope.itemMapFull = function() { 
            console.log('First Map')
            var tracking_data = listItmeDataService.get();
            var last_element = tracking_data.coords[tracking_data.coords.length - 1];
            var first_element = tracking_data.coords[0];
            console.log(last_element);
            console.log(tracking_data);
            console.log(first_element);

            //Latest Coordinates
            var myLatLng = new google.maps.LatLng(last_element["0"], last_element["1"]);
            //First Coordinates
            var myLatLng_first = new google.maps.LatLng(first_element["0"], first_element["1"]);

            console.log(myLatLng);
            console.log(myLatLng_first);

            // Google Map options center at current pos
            var myOptions = {
                zoom: 16,
                center: myLatLng,
                mapTypeId: google.maps.MapTypeId.WALKING
            };

            // Create the Google Map, set options
            var map_full = new google.maps.Map(document.getElementById("map_item_full"), myOptions);

            var trackCoords = []; // google maps lat lng coords for map

            // Add each GPS entry to array trackCoords
            for (i = 0; i < tracking_data.coords.length; i++) {
                trackCoords.push(new google.maps.LatLng(tracking_data.coords[i]["0"], tracking_data.coords[i]["1"]));

            }

            // Plot the GPS entries as a line on the Google Map
            var trackPath = new google.maps.Polyline({
                path: trackCoords,
                strokeColor: "#7253c3",
                strokeOpacity: 1.0,
                strokeWeight: 2
            });


            //Marker for last position
            var icon_current = {
                url: "/img/Icons/ic_radio_button_checked_red_24dp.png",
                fillColor: '#0099ff',
                scaledSize: new google.maps.Size(30, 30), // scaled size
                origin: new google.maps.Point(0, 0), // origin
                anchor: new google.maps.Point(15, 15) // anchor
            }

            var marker = new google.maps.Marker({
                position: myLatLng,
                icon: icon_current,
                map: map_full,
                title: 'Current position'
            });

            //Marker for first position
            var icon_first = {
                url: "/img/Icons/ic_radio_button_checked_green_24dp.png",
                fillColor: '#7253C3',
                scaledSize: new google.maps.Size(30, 30), // scaled size
                origin: new google.maps.Point(0, 0), // origin
                anchor: new google.maps.Point(15, 15) // anchor
            }

            var marker = new google.maps.Marker({
                position: myLatLng_first,
                icon: icon_first,
                map: map_full,
                title: 'Start position'
            });

            // Apply the line to the map
            trackPath.setMap(map_full);
            console.log('Last Map')
    }


    $scope.data = {
        message: ''
    };

    $scope.sendComment = function () {

        $http({
            method: 'GET',
            url: 'http://46.101.219.139:5000/api/routes/' + tracking_data._id
        }).then(function (response) {
            var latest_tracking_data = response.data;
            console.log('latest_tracking_data')
            console.log(latest_tracking_data)

            var newCommentList = latest_tracking_data.comments;
            newCommentList.push({ "userId": "5911cd9d8b242d06d3d30c09", "comment": $scope.data.message, "date": "2017-05-09T14:09:33.552Z" })

            var req = {
                crossDomain: true,
                method: 'PUT',
                url: 'http://46.101.219.139:5000/api/routes/' + tracking_data._id,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    "title": latest_tracking_data.title,
                    "checkpoints": latest_tracking_data.checkpoints,
                    "creatorId": latest_tracking_data.creatorId,
                    "createdAt": latest_tracking_data.createdAt,
                    "updatedAt": latest_tracking_data.updatedAt,
                    "coords": latest_tracking_data.coords,
                    "time": latest_tracking_data.time,
                    "score": latest_tracking_data.score,
                    "comments": newCommentList,
                    "distance": latest_tracking_data.distance,
                    "_v": latest_tracking_data._v,
                    "__proto__": latest_tracking_data.__proto__
                }
            }

            $http(req).then(function () {
                $scope.data = {
                    message: ''
                };
                $scope.itemData = latest_tracking_data;
                $state.go('menu.myRoutes', {}, { reload: true });
            });
        })
    };


}])
   
.controller('settingsCtrl', ['$scope', '$http', '$state', '$stateParams', 'listItmeDataService',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $state, $stateParams,listItmeDataService) {

    $scope.getSettingsData = function () {
        var jwt = listItmeDataService.get();
        console.log("jwt",jwt);
        var req = {
            method: 'GET',
            url: 'http://46.101.219.139:5000/users',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt
            }
        }
       
                $http(req).then(function successCallback(response) {
                    console.log(response)
                },
                    function errorCallback(response) {
                        console.log('error', response)
                    })
         };
}])
   
.controller('recordRouteCtrl', ['$scope', '$state', '$stateParams', '$http', '$ionicPopup',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $stateParams, $http, $ionicPopup) {

    $scope.initPosition = function () {

        navigator.geolocation.getCurrentPosition(
       // Success
       function (position) {
           console.log('init')
           var myLatLngCurrent = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
           // Google Map options
           var myOptionsCurrent = {
               zoom: 17,
               center: myLatLngCurrent,
               mapTypeId: google.maps.MapTypeId.WALKING
           };

           // Create the Google Map, set options
           var map_current = new google.maps.Map(document.getElementById("map_canvas_current"), myOptionsCurrent);


           var icon = {
               url: "/img/Icons/ic_my_location_blue_24dp.png",
               fillColor: '#0099ff',
               scaledSize: new google.maps.Size(30, 30), // scaled size
               origin: new google.maps.Point(0, 0), // origin
               anchor: new google.maps.Point(15, 15) // anchor
           }

           var marker = new google.maps.Marker({
               position: myLatLngCurrent,
               icon: icon,
               map: map_current
           });


           // Apply the line to the map
           marker.setMap(map_current);


       }
     )
    }

    var watch_id = "WatchID";    // ID of the geolocation
    var tracking_data = []; // Array containing GPS position objects
    var trackCoords = []; // google maps lat lng coords for map
    var coordData = [];
    var interval;

    $scope.startRecordingRoute = function () {

        $ionicPopup.alert({
            title: 'You are now recording a route!',
            template: 'After you\'re done you can save, add a title and description and share this recorded route to the CityWalks community! </br></br> If you would like to stop and discard the recording, just click \'Stop recording\' and then \'Delete recording\'  ',
            okType: 'button-balanced'
        });

        watch_id = navigator.geolocation.watchPosition(
       // Success
       function (position) {
           console.log('recording')
           console.log('trackdata inne i rec')
           tracking_data.push(position);
           var counter = 0;
           var last_element = tracking_data[tracking_data.length - 1];
           var first_element = tracking_data[0];
           var interval = setInterval(function () {

               if (1 == tracking_data.length) {
                   console.log('trackdata inne i rec1')
                   var myLatLng = new google.maps.LatLng(last_element.coords.latitude, last_element.coords.longitude);
                   // Google Map options
                   var myOptions = {
                       zoom: 17,
                       center: myLatLng,
                       mapTypeId: google.maps.MapTypeId.WALKING
                   };
                   // Create the Google Map, set options
                   var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

                   var icon = {
                       url: "/img/Icons/ic_my_location_blue_24dp.png",
                       fillColor: '#0099ff',
                       scaledSize: new google.maps.Size(30, 30), // scaled size
                       origin: new google.maps.Point(0, 0), // origin
                       anchor: new google.maps.Point(15, 15) // anchor
                   }

                   var marker = new google.maps.Marker({
                       position: myLatLng,
                       icon: icon,
                       map: map
                   });

                   // Apply the line to the map
                   marker.setMap(map);
               }

               if (1 < tracking_data.length) {
                   console.log('trackdata inne i rec2')

                   //Latest Coordinates
                   var myLatLng = new google.maps.LatLng(last_element.coords.latitude, last_element.coords.longitude);
                   //First Coordinates
                   var myLatLng_first = new google.maps.LatLng(first_element.coords.latitude, first_element.coords.longitude);

                   // Google Map options center at current pos
                   var myOptions = {
                       zoom: 17,
                       center: myLatLng,
                       mapTypeId: google.maps.MapTypeId.WALKING
                   };

                   // Create the Google Map, set options
                   var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

                   var trackCoords = []; // google maps lat lng coords for map

                   var trackCoordsExtra = [];

                   // Add each GPS entry to array trackCoords
                   for (i = 0; i < tracking_data.length; i++) {
                       trackCoords.push(new google.maps.LatLng(tracking_data[i].coords.latitude, tracking_data[i].coords.longitude));

                   }

                   // Plot the GPS entries as a line on the Google Map
                   var trackPath = new google.maps.Polyline({
                       path: trackCoords,
                       strokeColor: "#7253c3",
                       strokeOpacity: 1.0,
                       strokeWeight: 2
                   });


                   //Marker for current position
                   var icon_current = {
                       url: "/img/Icons/ic_my_location_blue_24dp.png",
                       fillColor: '#0099ff',
                       scaledSize: new google.maps.Size(30, 30), // scaled size
                       origin: new google.maps.Point(0, 0), // origin
                       anchor: new google.maps.Point(15, 15) // anchor
                   }

                   var marker = new google.maps.Marker({
                       position: myLatLng,
                       icon: icon_current,
                       map: map,
                       title: 'Current position'
                   });

                   //Marker for first position
                   var icon_first = {
                       url: "/img/Icons/ic_radio_button_checked_green_24dp.png",
                       fillColor: '#7253C3',
                       scaledSize: new google.maps.Size(30, 30), // scaled size
                       origin: new google.maps.Point(0, 0), // origin
                       anchor: new google.maps.Point(15, 15) // anchor
                   }

                   var marker = new google.maps.Marker({
                       position: myLatLng_first,
                       icon: icon_first,
                       map: map,
                       title: 'Start position'
                   });

                   // Apply the line to the map
                   trackPath.setMap(map);
               }
               counter++;
               if (counter === 1) {
                   clearInterval(interval);
               }
           }, 2000);
       },
       // Error
       function (error) {
           console.log(error);
       },
       // Settings
       { frequency: 1000, enableHighAccuracy: true });

    }


    $scope.stopRecordingRoute = function () {
        clearInterval(interval);
        navigator.geolocation.clearWatch(watch_id);

        var data = tracking_data;
        console.log('trackingData Kolla')
        console.log(tracking_data)


        for (i = 0; i < data.length; i++) {
            coordData.push([data[i].coords.latitude, data[i].coords.longitude]);
        }
        console.log('coordsData Kolla')
        console.log(coordData)
        $scope.testData = data; //send all data to page
        showTotalDistance(data);
    }

    gps_distance = function (lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = (lat2 - lat1) * (Math.PI / 180);
        var dLon = (lon2 - lon1) * (Math.PI / 180);
        var lat1 = lat1 * (Math.PI / 180);
        var lat2 = lat2 * (Math.PI / 180);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;

        return d;
    }

    showTotalDistance = function (data) {
        total_km = 0;
        for (i = 0; i < data.length; i++) {
            if (i == (data.length - 1)) {
                break;
            }
            total_km += gps_distance(data[i].coords.latitude, data[i].coords.longitude, data[i + 1].coords.latitude, data[i + 1].coords.longitude);
        }
        total_km_rounded = total_km.toFixed(2);
        $scope.routeDistance = total_km_rounded; //send distance to html page

        start_time = new Date(data[0].timestamp).getTime();
        end_time = new Date(data[data.length - 1].timestamp).getTime();

        total_time_ms = end_time - start_time;
        total_time_s = total_time_ms / 1000;

        final_time_m = Math.floor(total_time_s / 60);
        $scope.routeTimeMin = final_time_m.toFixed(0);  //send time to html page
        final_time_s = total_time_s - (final_time_m * 60);
        $scope.routeTimeSec = final_time_s.toFixed(0);  //send time to html page
    };

    $scope.deleteRecordedRoute = function () {

        $ionicPopup.alert({
            title: 'You\'re route is now deleted!',
            okType: 'button-assertive'
        });

        navigator.geolocation.getCurrentPosition(
       // Success
       function (position) {
           var myLatLngCurrent = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
           // Google Map options
           var myOptionsCurrent = {
               zoom: 17,
               center: myLatLngCurrent,
               mapTypeId: google.maps.MapTypeId.WALKING
           };

           // Create the Google Map, set options
           var map = new google.maps.Map(document.getElementById("map_canvas"), myOptionsCurrent);
           tracking_data = []; // Array containing GPS position objects
           trackCoords = [];

       }
     )
        //Clear input values
        $scope.data = {
            routeComment: '',
            routeTitle: ''
        };
        $state.go('menu.recordRoute', {}, { reload: true });
    }

    $scope.data = {
        routeComment: '',
        routeTitle: ''
    };

    // $scope.getUserData = factory.user();

    $scope.sendRecordedRoute = function () {

        var routeCoords = coordData;

        var time = final_time_m.toFixed(0) + ":" + final_time_s.toFixed(0);

        var req = {
            crossDomain: true,
            method: 'POST',
            url: 'http://46.101.219.139:5000/api/routes',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                "title": $scope.data.routeTitle,
                "creatorId": "5911cd9d8b242d06d3d30c09",
                "coords": routeCoords,
                "time": time,
                "score": [{ "userId": "5911cd9d8b242d06d3d30c09", "score": $scope.data.routeLike }],
                "comments": [{ "userId": "5911cd9d8b242d06d3d30c09", "comment": $scope.data.routeComment, "date": "2017-05-09T14:09:33.552Z" }],
                "distance": total_km_rounded
            }
        }

        $http(req).then(function () {
            //Reload recording map
            navigator.geolocation.getCurrentPosition(
              // Success
             function (position) {
                 var myLatLngCurrent = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                 // Google Map options
                 var myOptionsCurrent = {
                     zoom: 17,
                     center: myLatLngCurrent,
                     mapTypeId: google.maps.MapTypeId.WALKING
                 };

                 // Create the Google Map, set options
                 var map = new google.maps.Map(document.getElementById("map_canvas"), myOptionsCurrent);
                 tracking_data = []; // Empty array with GPS position objects
                 trackCoords = [];// Empty trackCoords
                 coordData = [];// Empty coordData
             }
            ),
            $ionicPopup.alert({
                title: 'Thanks for sharing!',
                template: 'Now you and other people in the CityWalks community can find, walk, rate and comment on your route!',
                okType: 'button-royal'
            });
            //Clear input values
            $scope.data = {
                routeComment: '',
                routeTitle: ''
            };
            $state.go('menu.recordRoute'),
            $scope.error = 'Error logging in.'
        });


    };




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


.controller('EditFriendsCtrl', ['$scope', '$state', '$stateParams', '$http', 'listItmeDataService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $stateParams, $http, listItmeDataService) {

    $scope.data = {
        'username': '',
    }


    $scope.getFriends = function () {
        var jwt = listItmeDataService.get();
        console.log("jwt", jwt);
        var req = {
            method: 'GET',
            url: 'http://46.101.219.139:5000/users',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt
            }
        }
        $http(req).then(function (response) {
            console.log('response')
            console.log(response)
            $scope.myData = response.data;

        })
    }

    $scope.addFriend = function () {
        var jwt = listItmeDataService.get();
        var req = {
            crossDomain: true,
            method: 'PUT',
            url: 'http://46.101.219.139:5000/users/',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt
            },
            data: {}
        }

        $http(req).then(function () {
            $scope.getFriends();
        });

    };

    $scope.deleteFriend = function (item) {

        $http({
            method: 'DELETE',
            url: 'http://46.101.219.139:5000/users/' + item._id
        }).then(function () {
            $scope.getFriends();
        })
    };

}])
 



.controller('settingsCtrl', ['$scope', '$http', '$state', '$stateParams', 'listItmeDataService',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $state, $stateParams, listItmeDataService) {

    $scope.getSettingsData = function () {
        var jwt = listItmeDataService.get();
        console.log("jwt", jwt);
        var req = {
            method: 'GET',
            url: 'http://46.101.219.139:5000/users',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt
            }
        }

        $http(req).then(function successCallback(response) {
            console.log(response)
        },
            function errorCallback(response) {
                console.log('error', response)
            })
    };
}])