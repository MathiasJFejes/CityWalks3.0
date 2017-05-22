angular.module('app.controllers', [])
  
.controller('cityWalksCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('menuCtrl', ['$scope', '$stateParams', '$state','listItmeDataService','$ionicHistory','$window','$location', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, listItmeDataService, $ionicHistory, $window, $location) {
    $scope.logout = function () {
        $window.localStorage.clear();
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
        listItmeDataService.drop()
        $location.path('login');
        $window.location.reload();
        $state.go('login');
    }

}])
   
.controller('loginCtrl', ['$scope', '$stateParams', '$state', '$http', 'listItmeDataService', '$ionicPopup', 
// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $http, listItmeDataService, $ionicPopup) {

    $scope.error = '';

    $scope.data = {
        'username': '',
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
            data: { 'strategy': local, 'username': $scope.data.username, 'password': $scope.data.password }

        }
        $http(req).then(function (response) {
            var jwt = response.data.accessToken;
            console.log('response jwt', jwt);
            listItmeDataService.set('jwt',jwt),
            console.log("tokenHandler", listItmeDataService.get())

            var getReq = {
                method: 'GET',
                url: 'http://46.101.219.139:5000/users?username=' + $scope.data.username,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': jwt
                }
            }
            $http(getReq).then(function (response) {
                listItmeDataService.set('Userdata', response.data["0"])
                $state.go('menu.createRoute', {}, { reload: true })

            });
            var getReqAll = {
                method: 'GET',
                url: 'http://46.101.219.139:5000/users',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': jwt
                }
            }
            $http(getReqAll).then(function (response) {
                listItmeDataService.set('allUsers', response.data)

            });
        }, function errorCallback(response) {
            console.log('error', response)
            $ionicPopup.alert({
                title: 'Wrong Username or Password',
                //template: 'Click <i>Forgot password </i>if you dont remember your username or password',
                okType: 'button-balanced'
            });

        });
    };

}])
   
.controller('signupCtrl', ['$scope', '$stateParams', '$state', '$http', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $http, $ionicPopup) {
    
    $scope.data = {
        'name': '',
        'email': '',
        'password': '',
        'confirmpassword': ''
    }
    
    $scope.error='';



    $scope.signup = function () {

        if ($scope.data.password == $scope.data.confirmpassword) {
            console.log("inne i funktionen")
            var req = {
                crossDomain: true,
                method: 'POST',
                url: 'http://46.101.219.139:5000/users',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: { 'username': $scope.data.name, 'email': $scope.data.email, 'password': $scope.data.password }

            }
            $http(req).then(function successCallback(response) {
                $state.go('login')
                $ionicPopup.alert({
                    title: 'Welcome!',
                    template: 'Your account was succesfully created </br> </br> Please add your username and password to log in!',
                    okType: 'button-balanced'
                });
            }, function errorCallback(response) {
                console.log('error', response)
                $ionicPopup.alert({
                    title: 'Error creating account',
                    template: 'Please type in username, email and password',
                    okType: 'button-balanced'
                });

            });
        }
        else {
            $ionicPopup.alert({
                title: 'The two passwords do not match',
                //template: '',
                okType: 'button-balanced'
            });
        }


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
        availableOptions: [{ value: 100, name: 'Easy' },
                           { value: 500, name: 'Medium' },
                           { value: 1000, name: 'Hard' },
                           { value: 2000, name: 'Expert' }]
    }

    $scope.startRandomRoute = function () {

        navigator.geolocation.getCurrentPosition(
        //success
        function (position) {

            var init_lat = position.coords.latitude;
            var init_lon = position.coords.longitude;
            var startend = new google.maps.LatLng(init_lat, init_lon);
            var radius = ($scope.range.model) / 100000;
            trackPoints = [];

            var randCoordfirst;
            var randCoordsecond;

            //Fires up a random coordinate generation based upon range input and start
            findCoordinates(init_lat, init_lon, radius);

            var directionsDisplay;
            var directionsService;

            function initialize() {

                directionsDisplay = new google.maps.DirectionsRenderer();
                directionsService = new google.maps.DirectionsService();

                var mapOptions = {
                    zoom: 25,
                    suppressMarkers: true,
                    center: startend
                };

                var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
                directionsDisplay.setMap(map);

                var request = {
                    origin: startend,
                    destination: startend,
                    waypoints: [{ location: randCoordfirst, stopover: false },
                                { location: randCoordsecond, stopover: false }],
                    optimizeWaypoints: false, 
                    travelMode: google.maps.TravelMode.WALKING,
                    avoidHighways: true
                    }

                    directionsService.route(request, function (response, status) {

                    if (status == google.maps.DirectionsStatus.OK) {
                        $scope.routeDistance = response.routes[0].legs[0].distance.text;
                        $scope.routeTime = response.routes["0"].legs["0"].duration.text;
                        directionsDisplay.setDirections(response);
                        } else {
                            alert('You broke it.');
                        }
                    });
                }

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
                randCoordfirst = trackPoints[Math.floor(Math.random() * trackPoints.length)];
                randCoordsecond = trackPoints[Math.floor(Math.random() * trackPoints.length)];
                
                if (randCoordfirst == undefined || randCoordsecond == undefined) {
                    randCoordfirst = trackPoints[Math.floor(Math.random() * trackPoints.length)];
                    randCoordsecond = trackPoints[Math.floor(Math.random() * trackPoints.length)];
                }

                initialize();
            }
            google.maps.event.addDomListener(window, 'load', initialize);
            }
        );
    }

    $scope.placeOne = {
        model: null,
        availableOptions: [{ value: 'park', name: 'Park' },
                           { value: 'museum', name: 'Museum' },
                           { value: 'art_gallery', name: 'Art gallery' },
                           { value: 'cafe', name: 'Cafe' },
                           { value: 'university', name: 'University' },
                           { value: 'bar', name: 'Bar' },
                           { value: 'church', name: 'Church' },
                           { value: 'library', name: 'Library' }]
    }

    $scope.placeTwo = {
        model: null,
        availableOptions: [{ value: 'park', name: 'Park' },
                           { value: 'museum', name: 'Museum' },
                           { value: 'art_gallery', name: 'Art gallery' },
                           { value: 'cafe', name: 'Cafe' },
                           { value: 'university', name: 'University' },
                           { value: 'bar', name: 'Bar' },
                           { value: 'church', name: 'Church' },
                           { value: 'library', name: 'Library' }]
    }

    $scope.placeThree = {
        model: null,
        availableOptions: [{ value: 'park', name: 'Park' },
                           { value: 'museum', name: 'Museum' },
                           { value: 'art_gallery', name: 'Art gallery' },
                           { value: 'cafe', name: 'Cafe' },
                           { value: 'university', name: 'University' },
                           { value: 'bar', name: 'Bar' },
                           { value: 'church', name: 'Church' },
                           { value: 'library', name: 'Library' }]
    }

    $scope.placeNation = {
        model: null,
        availableOptions: [{ id: '0', name: 'Södermanlands-Nerikes' },
                           { id: '1', name: 'Stockholms' },
                           { id: '2', name: 'Värmlands' },
                           { id: '3', name: 'Gästrike-Hälsinge' },
                           { id: '4', name: 'Östgöta' },
                           { id: '5', name: 'Västgöta' },
                           { id: '6', name: 'Norrlands' },
                           { id: '7', name: 'Gotlands' },
                           { id: '8', name: 'Smålands' },
                           { id: '9', name: 'Göteborgs' },
                           { id: '10', name: 'Uplands' },
                           { id: '11', name: 'Västmanlands-Dala' },
                           { id: '12', name: 'Kalmar' }]
    }

    $scope.startRecordRoute = function () {

        navigator.geolocation.getCurrentPosition(
            //success
            function (position) {

                $http({
                    method: 'GET',
                    url: 'http://46.101.219.139:5000/api/checkpoints?type=Nation'
                }).then(function (response) {

                    var init_lat = position.coords.latitude;
                    var init_lon = position.coords.longitude;
                    var startend = new google.maps.LatLng(init_lat, init_lon);
                    var wayptsNation = response.data[$scope.placeNation.model].coord;

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
                            suppressMarkers: false,
                            center: currentpos
                        };

                        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
                        directionsDisplay.setMap(map);
                        var service = new google.maps.places.PlacesService(map);
                        var waypts = [];
                        waypts.push({
                            location: new google.maps.LatLng(wayptsNation[0], wayptsNation[1]),
                            stopover: false
                        });

                        service.nearbySearch({
                            location: currentpos,
                            radius: 1000,
                            //rankBy: google.maps.places.RankBy.DISTANCE,
                            type: [$scope.placeOne.model]
                        }, callback);

                        service.nearbySearch({
                            location: currentpos,
                            radius: 1000,
                            //rankBy: google.maps.places.RankBy.DISTANCE,
                            type: [$scope.placeTwo.model]
                        }, callback);

                        service.nearbySearch({
                            location: currentpos,
                            radius: 1000,
                            //rankBy: google.maps.places.RankBy.DISTANCE,
                            type: [$scope.placeThree.model]
                        }, callback);

                        function callback(results, status) {
                            
                            if (status === google.maps.places.PlacesServiceStatus.OK) {
                                //for (var i = 0; i < results.length; i++) {
                                    waypts.push({
                                        location: new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()),
                                        stopover: false
                                    });
                                //}
                            }

                            var request = {
                                origin: startend,
                                destination: startend,
                                waypoints: waypts,
                                optimizeWaypoints: false,
                                travelMode: google.maps.TravelMode.WALKING,
                                avoidHighways: true
                            }

                            directionsService.route(request, function (response, status) {
                           
                                if (status == google.maps.DirectionsStatus.OK) {
                                    $scope.routeDistance = response.routes[0].legs[0].distance.text;
                                    $scope.routeTime = response.routes[0].legs[0].duration.text;
                                    directionsDisplay.setDirections(response);
                                } else {
                                    alert('You broke it.');
                                }
                            });
                        }
                    }
                    google.maps.event.addDomListener(window, 'load', initialize);
                }
            );
        })
    }

}])
   
.controller('topRoutesCtrl', ['$scope', '$state', '$stateParams', '$http', 'listItmeDataService', '$ionicPopup', 'handleUser',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $stateParams, $http, listItmeDataService, $ionicPopup, handleUser) {

    $scope.getRouteData = function () {
        
        $http({
            method: 'GET',
            url: 'http://46.101.219.139:5000/api/routes'
        }).then(function (response) {
            var finalList = [];
            for (i = 0; i < response.data.length; i++) {
                var nameAndKey = handleUser.findName(response.data[i].creatorId, listItmeDataService.get().allUsers)   // get name of friend 
                var usernamepush = nameAndKey.userName;
                finalList.push([usernamepush, response.data[i]])
            }
            $scope.myData = finalList;
        })
    }

    $scope.getRouteInfo = function (id) {
        var routeId = id;
        listItmeDataService.set('routeId', routeId);
        $state.go("menu.myRoutes")
        //var data = listItmeDataService.get()
        //console.log('test av get().routeID', data.routeId);

        //console.log('test av get().routeID', listItmeDataService.get().routeId);

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
   
.controller('myRoutesCtrl', ['$scope', '$stateParams', 'listItmeDataService', '$http', '$state', '$ionicPopup',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName

function ($scope, $stateParams, listItmeDataService, $http, $state, $ionicPopup) {


    $scope.itemUser = listItmeDataService.get().routeId[0];
    $scope.itemData = listItmeDataService.get().routeId[1];
    var tracking_data = listItmeDataService.get().routeId[1];


    $scope.itemMapSmall = function() { 
            console.log('First Map')
            var tracking_data = listItmeDataService.get().routeId[1];
            var last_element = tracking_data.coords[tracking_data.coords.length - 1];
            var first_element = tracking_data.coords[0];

            //Latest Coordinates
            var myLatLng = new google.maps.LatLng(last_element["0"], last_element["1"]);
            //First Coordinates
            var myLatLng_first = new google.maps.LatLng(first_element["0"], first_element["1"]);


            // Google Map options center at first pos
            var myOptions = {
                zoom: 17,
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
                strokeWeight: 5
            });



            //Marker for last position
            var icon_last = {
                url: 'img/Icons/reddot.png',
                scaledSize: new google.maps.Size(30, 30), // scaled size
                origin: new google.maps.Point(0, 0), // origin
                anchor: new google.maps.Point(15, 15) // anchor
            }

            var marker = new google.maps.Marker({
                position: myLatLng,
                icon: icon_last,
                map: map,
                title: 'Last position'
            });

            //Marker for first position
            var icon_first = {
                url: 'img/Icons/greendot.png',
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

    var watch_id = "WatchCurrentID";    // ID of the geolocation
    var position_data = []; // Array containing GPS position objects
    var trackCoords = []; // google maps lat lng coords for map
    var coordData = [];
    var interval;

    $scope.walkRecordedRoute = function () {

        $ionicPopup.alert({
            title: 'You can now walk this route!',
            template: '<div style="text-align:center"> Follow the purple line (the route) with the red marker (your position) and you will probably have </br> a great experience! </br></br> Good luck! </div>',
            okType: 'button-balanced'
        });

        watch_id = navigator.geolocation.watchPosition(
       // Success
       function (position) {
           console.log('recording')
           console.log('trackdata inne i rec')
           position_data.push(position);  // For current position = last element

           //Route data
           var tracking_data = listItmeDataService.get().routeId[1];
           var last_element = tracking_data.coords[tracking_data.coords.length - 1];
           var first_element = tracking_data.coords[0];

           //Position data
           var counter = 0;
           var position_last_element = position_data[position_data.length - 1];
           var position_first_element = position_data[0];
           var interval = setInterval(function () {

               if (1 < tracking_data.coords.length) {
                   console.log(' inne i watch')

                       var positionCoords = []; // google maps lat lng coords for map
                       // Add each GPS entry to array trackCoords
                       for (i = 0; i < position_data.length; i++) {
                           positionCoords.push(new google.maps.LatLng(position_data[i].coords.latitude, position_data[i].coords.longitude));
                       }
                       //Latest Coordinates for current position marker
                       var myLatLng_current = positionCoords[positionCoords.length - 1];

                       //Last Route Coordinates
                       var myLatLng_last = new google.maps.LatLng(last_element["0"], last_element["1"]);
                       //First Route Coordinates
                       var myLatLng_first = new google.maps.LatLng(first_element["0"], first_element["1"]);

                       // Google Map options center at current pos
                       var myOptions = {
                           zoom: 17,
                           draggable: false,
                           scrollwheel: false,
                           disableDoubleClickZoom: true,
                           zoomControl: false,
                           center: myLatLng_current,
                           mapTypeId: google.maps.MapTypeId.WALKING
                       };

                       // Create the Google Map, set options
                       var map_current = new google.maps.Map(document.getElementById("map_item_full"), myOptions);

                       var trackCoords = []; // google maps lat lng coords for map

                       // ROUTE COORDS, Add each GPS entry to array trackCoords
                       for (i = 0; i < tracking_data.coords.length; i++) {
                           trackCoords.push(new google.maps.LatLng(tracking_data.coords[i]["0"], tracking_data.coords[i]["1"]));

                       // Plot the GPS entries as a line on the Google Map
                       var trackPath = new google.maps.Polyline({
                           path: trackCoords,
                           strokeColor: "#7253c3",
                           strokeOpacity: 1.0,
                           strokeWeight: 4,
                           map: map_current
                       });

                       //Marker for current position
                       var icon_current = {
                           url: 'img/Icons/bluecross.png',
                           scaledSize: new google.maps.Size(30, 30), // scaled size
                           origin: new google.maps.Point(0, 0), // origin
                           anchor: new google.maps.Point(15, 15) // anchor


                       }

                       var marker = new google.maps.Marker({
                           position: myLatLng_current,
                           icon: icon_current,
                           map: map_current,
                           title: 'Current position'
                       });


                       //Marker for first position
                       var icon_first = {
                           url: 'img/Icons/greendot.png',
                           scaledSize: new google.maps.Size(30, 30), // scaled size
                           origin: new google.maps.Point(0, 0), // origin
                           anchor: new google.maps.Point(15, 15) // anchor


                       }

                       var marker = new google.maps.Marker({
                           position: myLatLng_first,
                           icon: icon_first,
                           map: map_current,
                           title: 'Start position'
                       });

                       //Marker for last position
                       var icon_last = {
                           url: 'img/Icons/reddot.png',
                           scaledSize: new google.maps.Size(30, 30), // scaled size
                           origin: new google.maps.Point(0, 0), // origin
                           anchor: new google.maps.Point(15, 15) // anchor


                       }


                       var marker = new google.maps.Marker({
                           position: myLatLng_last,
                           map: map_current,
                           icon: icon_last,
                           title: 'Final position'
                       });

                           /*
                       // Apply the line to the map
                       trackPath.setMap(map_current);*/
                   }
                   counter++;
                   if (counter === 1) {
                       clearInterval(interval);
                   }
               }}, 10000);
       },
       // Error
       function (error) {
           console.log(error);
       },
       // Settings
       { enableHighAccuracy: false });

    }

    $scope.stopWatchingRoute = function () {
        clearInterval(interval);
        navigator.geolocation.clearWatch(watch_id);
    }

    $scope.resetCommentsRating = function () {

        //Clear input values
        $scope.data = {
            routeWalkComment: '',
            routeWalkLike: false
        };
        $state.go('menu.myRoutes', {}, { reload: true });
    }


    $scope.sendCommentRating = function () {


            $http({
                method: 'GET',
                url: 'http://46.101.219.139:5000/api/routes/' + tracking_data._id
            }).then(function (response) {
                var latest_tracking_data = response.data;


                //Input new comment
                if ($scope.data.routeWalkComment !== '') {
                    var newCommentList = latest_tracking_data.comments;
                    newCommentList.push({ "userId": userInfo, "comment": $scope.data.routeWalkComment})
                }
                else {
                    newCommentList = newCommentList;
                }


                //input new like if liked and your user id not in score list
                var willAddRating = true;
                var userInfo = listItmeDataService.get().Userdata._id;
                var newLikeList = latest_tracking_data.score;

                for (i = 0; i < newLikeList.length; i++) {
                    if (newLikeList[i].userId == userInfo) {
                        var willAddRating = false;
                        var indexForRemove = i;
                        console.log('false')
                    }
                }
                console.log('likelist', newLikeList)
                console.log('likevalue',$scope.data.routeWalkLike)
                if (willAddRating == true && $scope.data.routeWalkLike == true) {
                    newLikeList.push({ "userId": userInfo, "score": 1 })
                    console.log('true1', newLikeList)
                }
                if (willAddRating == false && $scope.data.routeWalkLike !== true) {
                    newLikeList.splice(indexForRemove, 1);
                    console.log('false0', newLikeList)
                }
                if (willAddRating == false && $scope.data.routeWalkLike == true) {
                    newLikeList = newLikeList;
                    console.log('false else', newLikeList)
                }

                //add userid to walkerslist
                var walksersList = latest_tracking_data.walkersId;
                
                var willAddWalkerId = true;
                for (i = 0; i < walksersList.length; i++) {
                    if (walksersList[i] == userInfo) {
                        var willAddWalkerId = false;
                    }
                }
                if (willAddWalkerId == true) {
                    walksersList.push(userInfo);
                }
                if (willAddWalkerId == false) {
                    walksersList = walksersList;
                }



                //http request
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
                        "walkersId": walksersList,
                        "time": latest_tracking_data.time,
                        "score": newLikeList,
                        "comments": newCommentList,
                        "distance": latest_tracking_data.distance,
                        "_v": latest_tracking_data._v,
                        "__proto__": latest_tracking_data.__proto__
                    }
                }

                $http(req).then(function () {
                    $ionicPopup.alert({
                        title: 'Thanks for walking this route!',
                        template: '<div style="text-align:center"> Your comment and choise of recommendation has been added to this route so that other people can see your thoughts of it. </br> </br> Also, your username has been added to this route so that other people can see that you have walked this route. </div>',
                        okType: 'button-balanced'
                    });
                    $scope.data = {
                        routeWalkComment: '',
                        routeWalkLike: 0
                    };
                    $scope.itemData = latest_tracking_data;
                    $state.go('menu.myRoutes', {}, { reload: true });
                });
            })
        };




    $scope.data = {
        message: ''
    };

    $scope.sendComment = function () {

        var messageFromInput = $scope.data.message;

        if (messageFromInput == '') {
            $ionicPopup.alert({
                title: 'Comment must include text!',
                okType: 'button-assertive'
            });
        }
        else {

            $http({
                method: 'GET',
                url: 'http://46.101.219.139:5000/api/routes/' + tracking_data._id
            }).then(function (response) {
                var latest_tracking_data = response.data;
                console.log('latest_tracking_data')
                console.log(latest_tracking_data)

                var newCommentList = latest_tracking_data.comments;
                newCommentList.push({ "userId": listItmeDataService.get().Userdata._id, "comment": $scope.data.message})

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
                    $state.go('menu.myRoutes', {}, { reload: false });
                });
            })
            };
    }

    $scope.updateItem = function () {

        $http({
            method: 'GET',
            url: 'http://46.101.219.139:5000/api/routes/' + tracking_data._id
        }).then(function (response) {
            var latest_tracking_data = response.data;
            $scope.itemData = latest_tracking_data;

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
   
.controller('recordRouteCtrl', ['$scope', '$state', '$stateParams', '$http', '$ionicPopup','listItmeDataService', '$timeout',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $stateParams, $http, $ionicPopup, listItmeDataService, $timeout) {


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

            //Marker for first position
            var icon_first = {
                url: 'img/Icons/bluecross.png',
                scaledSize: new google.maps.Size(30, 30), // scaled size
                origin: new google.maps.Point(0, 0), // origin
                anchor: new google.maps.Point(15, 15) // anchor


                   }

           var marker = new google.maps.Marker({
               position: myLatLngCurrent,
               icon: icon_first,
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

        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            template: '<ion-list style="text-align:center;">  <ion-spinner icon="bubbles" class="spinner-balanced"> </ion-spinner> &nbsp; <p> Map is loading . . . </p>  </ion-list> ',
            cssClass: 'balanced',
            title: 'Please wait for the map to load!',
            scope: $scope,
        });
        myPopup;
        $timeout(function () {
            myPopup.close(); //close the popup after 25 seconds 
        }, 25000);
        


        watch_id = navigator.geolocation.watchPosition(
       // Success
       function (position) {
           tracking_data.push(position);
           console.log('tracking_data', tracking_data)
           var counter = 0;
           var last_element = tracking_data[tracking_data.length - 1];
           console.log('last_element', last_element)
           var first_element = tracking_data[0];

           //Latest Coordinates
           var myLatLng = new google.maps.LatLng(last_element.coords.latitude, last_element.coords.longitude);
           //First Coordinates
           var myLatLng_first = new google.maps.LatLng(first_element.coords.latitude, first_element.coords.longitude);

           var interval = setInterval(function () {

               if (1 < tracking_data.length) {

                   var trackCoords = []; // google maps lat lng coords for map

                   // Add each GPS entry to array trackCoords
                   for (i = 0; i < tracking_data.length; i++) {
                       trackCoords.push(new google.maps.LatLng(tracking_data[i].coords.latitude, tracking_data[i].coords.longitude));

                   }

                   // Google Map options center at current pos
                   var myOptions = {
                       zoom: 17,
                       draggable: false,
                       scrollwheel: false,
                       disableDoubleClickZoom: true,
                       zoomControl: false,
                       center: trackCoords[trackCoords.length - 1],
                       mapTypeId: google.maps.MapTypeId.WALKING
                   };

                   // Create the Google Map, set options
                   var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);



                   // Plot the GPS entries as a line on the Google Map
                   var trackPath = new google.maps.Polyline({
                       path: trackCoords,
                       strokeColor: "#7253c3",
                       strokeOpacity: 1.0,
                       strokeWeight: 5,
                       map: map
                   });

                   //Marker for first position
                   var icon_current = {
                       url: 'img/Icons/bluecross.png',
                       scaledSize: new google.maps.Size(30, 30), // scaled size
                       origin: new google.maps.Point(0, 0), // origin
                       anchor: new google.maps.Point(15, 15) // anchor


                   }

                   var marker = new google.maps.Marker({
                       position: trackCoords[trackCoords.length - 1],
                       map: map,
                       icon: icon_current,
                       title: 'Current position'
                   });


                   //Marker for first position
                   var icon_first = {
                       url: 'img/Icons/greendot.png',
                       scaledSize: new google.maps.Size(30, 30), // scaled size
                       origin: new google.maps.Point(0, 0), // origin
                       anchor: new google.maps.Point(15, 15) // anchor


                   }

                   var marker = new google.maps.Marker({
                       position: trackCoords[0],
                       icon: icon_first,
                       map: map,
                       title: 'Start position'
                   });
                   /*
                   // Apply the line to the map
                   trackPath.setMap(map);*/

               }
               counter++;
               if (counter === 1) {
                   clearInterval(interval);
               }
           }, 10000);
       },
       // Error
       function (error) {
           console.log(error);
       },
       // Settings
       {enableHighAccuracy: false });

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
        //minutes
        final_time_m = Math.floor(total_time_s / 60);
        routeTimeMin = final_time_m.toFixed(0);
        if (routeTimeMin < 10) {
            routeTimeMin = "00:"+"0" + routeTimeMin;
        }
        if (routeTimeMin > 10) {
            routeTimeMin = "00:" + routeTimeMin;
        }
        $scope.routeTimeMin = routeTimeMin;  //send time to html page
        //seconds
        final_time_s = total_time_s - (final_time_m * 60);
        routeTimeSec = final_time_s.toFixed(0);
        if (routeTimeSec < 10) {
            routeTimeSec = "0" + routeTimeSec;
        }
        $scope.routeTimeSec = routeTimeSec;  //send time to html page
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
        routeTitle: '',
        routeLike: false
    };

    // $scope.getUserData = factory.user();

    $scope.sendRecordedRoute = function () {

        //require title, dont change boolean values
        if ($scope.data.routeTitle == '') {
            $ionicPopup.alert({
                title: 'Please add a title!',
                okType: 'button-assertive'
            });
        }
        // title,  change boolean values
        if ($scope.data.routeTitle !== '') {

        var routeCoords = coordData;
        var userInfo = listItmeDataService.get().Userdata._id
        console.log(routeTimeMin)
        console.log(routeTimeSec)
        var time = routeTimeMin + ":" + routeTimeSec;
            console.log(time)
        
        

        //comment array
        var routeCommentArray = [];
        if ($scope.data.routeComment !== '') {
            routeCommentArray = [{ "userId": userInfo, "comment": $scope.data.routeComment }];
        }
        if ($scope.data.routeComment == '') {
            routeCommentArray = [];
        }

        //like array
        var routeLikesArray = [];
        if ($scope.data.routeLike == true) {
            routeLikesArray = [{"userId": userInfo, "score": 1 }];
        }
        if ($scope.data.routeLike == false) {
            routeLikesArray = [];
        }


        var req = {
            crossDomain: true,
            method: 'POST',
            url: 'http://46.101.219.139:5000/api/routes',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                "title": $scope.data.routeTitle,
                "creatorId": userInfo,
                "coords": routeCoords,
                "walkersId": userInfo,
                "time": time,
                "score": routeLikesArray,
                "comments": routeCommentArray,
                "distance": total_km_rounded
            }
        }

        $http(req).then(function (response) {
            var createdRouteID = response.data._id;
            var newRouteList = listItmeDataService.get().Userdata.routes;
            newRouteList.push(createdRouteID)
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
            var data = listItmeDataService.get();
            var jwt = data.jwt;
            var sendrouteid = {
                crossDomain: true,
                method: 'PATCH',
                url: 'http://46.101.219.139:5000/users/' + userInfo,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': jwt
                },
                data: {
                    "routes": newRouteList
                }
            }

            $http(sendrouteid);

            $state.go('menu.recordRoute', {}, { reload: true }),
            $scope.error = 'Error sharing route.'
        });


    };

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
   
.controller('friendsCtrl', ['$scope', '$state', '$stateParams', '$http', 'listItmeDataService', 'handleUser', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $stateParams, $http, listItmeDataService, handleUser) {

    $scope.getFriendsData = function () {
        var data = listItmeDataService.get();
        var finalList = [];
        angular.forEach(data.Userdata.friends, function (value, key) {                  // for each of the users friends 
                var nameAndKey = handleUser.findName(value, listItmeDataService.get().allUsers)   // get name of friend 
                var numRoutes = listItmeDataService.get().allUsers[nameAndKey.key].routes.length 
                finalList.push([nameAndKey.userName, value, numRoutes])
            })
            console.log(finalList)
            $scope.myData = finalList;

        }

        //console.log("jwt", jwt);
        //var req = {
        //    method: 'GET',
        //    url: 'http://46.101.219.139:5000/users/',
        //    headers: {
        //        'Content-Type': 'application/json',
        //        'Authorization': jwt
        //    }
        //}
        //$http(req).then(function (response) {
        //    $scope.myData = data.Userdata.friends;

        //})
    

    $scope.getFriendsRoutes = function (id) {
        var data = listItmeDataService.get();
        var jwt = data.jwt;

        var friendId = id[1];
        console.log('id:', friendId)
        var req = {
            method: 'GET',
            url: 'http://46.101.219.139:5000/api/routes?creatorId='+friendId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt
            }
        }
        $http(req).then(function (response) {
            listItmeDataService.set('friendsRoutes', response)
            listItmeDataService.set('friendsRoutesName', id[0])
            console.log('response', response)
            $state.go("menu.friendsRoutes")
        })
       
    }


}])


.controller('friendsRoutesCtrl', ['$scope', '$state', '$stateParams', '$http', 'listItmeDataService', 'handleUser', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $stateParams, $http, listItmeDataService, handleUser) {

    $scope.creatorName = listItmeDataService.get().friendsRoutesName;
    $scope.getRouteData = function () {
        var friendsRoutes = listItmeDataService.get().friendsRoutes;
        console.log('friendsRoutes', friendsRoutes)
        $scope.myData = friendsRoutes.data;
        console.log('my data', friendsRoutes.data)
    }

    $scope.getRouteInfo = function (route) {
        var route = route;
        listItmeDataService.set('routeId', route);
        $state.go("menu.myRoutes")

        console.log('routeID', listItmeDataService.get().routeId);


    }

    
}])

.controller('EditFriendsCtrl', ['$scope', '$state', '$stateParams', '$http', 'listItmeDataService', 'handleUser', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $stateParams, $http, listItmeDataService, handleUser, $ionicPopup) {

    $scope.data = {
        'username': '',
    }


    $scope.getFriends = function () {
        var data = listItmeDataService.get();
        var finalList = [];
        angular.forEach(data.Userdata.friends, function (value, key) {                  // for each of the users friends 
            var nameAndKey = handleUser.findName(value, listItmeDataService.get().allUsers)   // get name of friend 
            finalList.push([nameAndKey.userName, value])
        })
        $scope.myData = finalList;
    }
            

    $scope.addFriend = function () {
        var data = listItmeDataService.get();
        var jwt = data.jwt;
        var newFriendsList = data.Userdata.friends;
        var id = handleUser.findId($scope.data.username, listItmeDataService.get().allUsers);

        //check if input already exists in friendlist
        var friendExist = false;
        for (i = 0; i < newFriendsList.length; i++) {
            if (id == newFriendsList[i]) {
                friendExist = true;
            }
        };

        if ($scope.data.username == "") {
            $ionicPopup.alert({
                title: 'Please type in a username',
                //template: '',
                okType: 'button-balanced'
            });
        } else if (typeof id == 'undefined'){
            $ionicPopup.alert({
                title: 'Invalid Username',
                template: 'Usernames are case-sensitive',
                okType: 'button-balanced'
            });
        } else if (friendExist) {
            $ionicPopup.alert({
                title: 'You already have '+ $scope.data.username +' as a friend ',
                //template: '',
                okType: 'button-balanced'
            });
        } else {
            newFriendsList.push(id);
            handleUser.drop()
        var req = {
            crossDomain: true,
            method: 'PATCH',
            url: 'http://46.101.219.139:5000/users/' + data.Userdata._id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt
            },
            data: { 
                "friends": newFriendsList
            }
        }

        $http(req).then(function (response) {
            newFriendsList = response.data.friends;
            $ionicPopup.alert({
                title: $scope.data.username + ' was added as a friend',
                //template: '',
                okType: 'button-balanced'
            });
            $state.go($state.current, {}, {reload: true});

        });
        }
    };

    $scope.deleteFriend = function (item) {
        var data = listItmeDataService.get();
        var jwt = data.jwt;
        var newFriendsList = data.Userdata.friends;
        newFriendsList.splice(newFriendsList.indexOf(item[1]), 1);

        var req = {
            crossDomain: true,
            method: 'PATCH',
            url: 'http://46.101.219.139:5000/users/' + data.Userdata._id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt
            },
            data: {
                "friends": newFriendsList
            }
        }

        $http(req).then(function (response) {
            newFriendsList = response.data.friends;
            $ionicPopup.alert({
                title: item[0] + ' was deleted as a friend',
                //template: '',
                okType: 'button-balanced'
            });
            $state.go($state.current, {}, { reload: true });

        });

    };

}])


.controller('settingsCtrl', ['$scope', '$http', '$state', '$stateParams', 'listItmeDataService', '$ionicPopup',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName

function ($scope, $http, $state, $stateParams, listItmeDataService, $ionicPopup) {

    $scope.data = {
        'currentpassword': '',
        'newpassword': '',
        'confirmnewpassword': ''
    }

    var local = 'local';

    $scope.userData = [listItmeDataService.get().Userdata.username, listItmeDataService.get().Userdata.email];


    //$scope.getSettingsData = function () {
    //    var data = listItmeDataService.get();
    //    var jwt = data.jwt;
    //    var id = data.Userdata._id;

    //    console.log("jwt", data);
    //    var req = {
    //        method: 'GET',
    //        url: 'http://46.101.219.139:5000/users',
    //        headers: {
    //            'Content-Type': 'application/json',
    //            'Authorization': jwt
    //        }
    //    }

    //    $http(req).then(function successCallback(response) {
    //        console.log(response)
    //    },
    //        function errorCallback(response) {
    //            console.log('error', response)
    //        })
    //};
    

    $scope.changePassword = function () {
       
        var req = {
            crossDomain: true,
            method: 'POST',
            url: 'http://46.101.219.139:5000/authentication',
            headers: {
                'Content-Type': 'application/json'
            },
            data: { 'strategy': local, 'username': listItmeDataService.get().Userdata.username, 'password': $scope.data.currentpassword }
        }
        $http(req).then(function () {

        if ($scope.data.newpassword == $scope.data.confirmnewpassword) {
            console.log("inne i första ifsatsen")
            var data = listItmeDataService.get();
            var jwt = data.jwt;
            var id = data.Userdata._id;
            console.log('id', id)
            console.log('jwt', jwt)

            var req = {
                crossDomain: true,
                method: 'PATCH',
                url: 'http://46.101.219.139:5000/users/' + id,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': jwt
                },
                data: { 'password': $scope.data.newpassword }

            }
            $http(req).then(function successCallback() {
                $ionicPopup.alert({
                    title: 'Success!',
                    template: 'Your password was changed',
                    okType: 'button-balanced'
                });
            }, function errorCallback(response) {
                console.log('error', response)
                $ionicPopup.alert({
                    title: 'Error changing password',
                    //template: '',
                    okType: 'button-balanced'
                });

            });

        } else {
            $ionicPopup.alert({
                title: 'The two passwords do not match',
                //template: '',
                okType: 'button-balanced'
            });
        }

        }, function errorCallback() {
                $ionicPopup.alert({
                    title: 'Your current password was incorrect',
                    //template: '',
                    okType: 'button-balanced'
                });
        })
    };
}])



            


.controller('myRealRoutesCtrl', ['$scope', '$state', '$stateParams', '$http', 'listItmeDataService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $stateParams, $http, listItmeDataService) {

    var myUserId = listItmeDataService.get().Userdata._id;
    var myUserName = listItmeDataService.get().Userdata.username;
    $scope.myUserName = listItmeDataService.get().Userdata.username;
    var data = listItmeDataService.get();
    var jwt = data.jwt;

    $scope.getMyRoutes = function () {

        var req = {
            method: 'GET',
            url: 'http://46.101.219.139:5000/api/routes?creatorId=' + myUserId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt
            }
        }
        $http(req).then(function (response) {
            var finalList = [];
            for (i = 0; i < response.data.length; i++) {
                finalList.push([myUserName, response.data[i]])
            }
            $scope.allMyRoutes = finalList;
        })

    }


    $scope.getRouteInfo = function (route) {
        var route = route;
        listItmeDataService.set('routeId', route);
        $state.go("menu.myRoutes")
    }


}])