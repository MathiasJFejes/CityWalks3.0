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
   
.controller('loginCtrl', ['$scope', '$stateParams', '$state', '$http', 'listItmeDataService', 
// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $http, listItmeDataService) {

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
            data: { 'strategy': local, 'username': $scope.data.email, 'email': $scope.data.email, 'password': $scope.data.password }
            
        }
        $http(req).then(function (response) {
            var jwt = response;
            console.log('response jwt', jwt);
            listItmeDataService.set(jwt),
            console.log('dataService', 
            listItmeDataService.get(jwt)),
            $state.go('menu.createRoute')});
        

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


.controller('EditFriendsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 