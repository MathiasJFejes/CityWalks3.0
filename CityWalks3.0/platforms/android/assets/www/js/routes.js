angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('cityWalks', {
    url: '/page1',
    templateUrl: 'templates/cityWalks.html',
    controller: 'cityWalksCtrl'
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('login', {
    url: '/page0',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/page9',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('requestResetPassword', {
    url: '/page11',
    templateUrl: 'templates/requestResetPassword.html',
    controller: 'requestResetPasswordCtrl'
  })

  .state('confirmResetPassword', {
    url: '/page13',
    templateUrl: 'templates/confirmResetPassword.html',
    controller: 'confirmResetPasswordCtrl'
  })

  .state('menu.nearbyRoutes', {
    url: '/page3',
    views: {
      'side-menu21': {
        templateUrl: 'templates/nearbyRoutes.html',
        controller: 'nearbyRoutesCtrl'
      }
    }
  })

  .state('menu.createRoute', {
    url: '/page2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/createRoute.html',
        controller: 'createRouteCtrl'
      }
    }
  })

  .state('menu.topRoutes', {
    url: '/page4',
    views: {
      'side-menu21': {
        templateUrl: 'templates/topRoutes.html',
        controller: 'topRoutesCtrl'
      }
    }
  })

  .state('menu.myRoutes', {
    url: '/page10',
    views: {
      'side-menu21': {
        templateUrl: 'templates/myRoutes.html',
        controller: 'myRoutesCtrl'
      }
    }
  })

  .state('menu.myRealRoutes', {
      url: '/page77',
      views: {
          'side-menu21': {
              templateUrl: 'templates/myRealRoutes.html',
              controller: 'myRealRoutesCtrl'
          }
      }
  })

  .state('menu.settings', {
    url: '/page12',
    views: {
      'side-menu21': {
        templateUrl: 'templates/settings.html',
        controller: 'settingsCtrl'
      }
    }
  })

  .state('menu.recordRoute', {
    url: '/page14',
    views: {
      'side-menu21': {
        templateUrl: 'templates/recordRoute.html',
        controller: 'recordRouteCtrl'
      }
    }
  })

  .state('menu.createdRoute', {
    url: '/page15',
    views: {
      'side-menu21': {
        templateUrl: 'templates/createdRoute.html',
        controller: 'createdRouteCtrl'
      }
    }
  })

  .state('menu.friends', {
    url: '/page16',
    views: {
      'side-menu21': {
        templateUrl: 'templates/friends.html',
        controller: 'friendsCtrl'
      }
    }
  })

  .state('menu.EditFriends', {
     url: '/page44',
     views: {
         'side-menu21': {
          templateUrl: 'templates/EditFriends.html',
          controller: 'EditFriendsCtrl'
      }
    }
  })

  .state('menu.friendsRoutes', {
      url: '/page45',
      views: {
          'side-menu21': {
              templateUrl: 'templates/friendsRoutes.html',
              controller: 'friendsRoutesCtrl'
          }
      }
  })


$urlRouterProvider.otherwise('/page0')

  

});