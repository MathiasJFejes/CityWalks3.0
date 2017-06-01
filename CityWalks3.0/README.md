# CityWalks application (front-end)

A walking application using Apache Cordova, Ionic Framework, AngularJS and JavaScript. Currently supporting iOS, Android and Windows 10.

## Table of Contents
 - [Getting Started](#getting-started)
 - [File Structure of the CityWalks application](#file-structure-of-app)

## Getting Started

With Visual Studio:
* Install Visual Studio with the Code Cordova extension (cordova-tools) 
* Clone this repository.
* Open the CityWalks3.0.sln in Visual Studio.
* Open Task Runner window by pressing Ctrl+Alt+Bkspce.    
* Install npm packages by going to your Solution Explorer -> Dependencies -> npm and clicking on 'Restore Packages'. 
* Once packages are restored, build the project.
* The project can then be deployed on Ripple or an android emulator. 
* The project can also be deployed on a physical device: 
* - Android: Install and open Android Studio, connect a Android device with USB-debugging set to true. Choose "Device" in the deploy options. The project can then be deployed on the Android Device. 
* - iOS: Follow the instructions on https://ionicframework.com/docs/intro/deploying/ at the iOS part.
* - Windows: Follow the instructions on https://ionicframework.com/docs/resources/platform-setup/windows-setup.html


## File Structure of the CityWalks application

```
CityWalks3.0/
├── node_modules/                      * Node dependencies
|
├── platforms/                         * Cordova generated native platform code
|
├── plugins/                           * Cordova native plugins go here (Geolocation etc.)
|
├── resources/                         * Images for splash screens and icons
|
├── SCSS/                              * The app’s SASS file, customizes Ionic without adding a myriad of CSS overrides
|
├── www/                               * WWW directory, where most of the CityWalks app is developed and build.
│   │   
│   ├── js/                            * Contains JS files
│   │    └── app.js                     ** Contains the Angular run and config methods
│   │    └── controller.js              ** JS functions and Angular controllers for the states 
│   │    └── directives.js              ** Directives goes here (only contains a directive that highlights the current side menu tab)
│   │    └── routes.js                  ** Various states which the app can be in, each state's controller can be found in controller.js
│   │    └── services.js                ** Contains the custom Angular services and factories for the CityWalks application
│   │
│   ├── css/                           * Compiled CSS
│   │
│   ├── img/                           * App images and map icons
│   │
│   ├── lib/                           * Ionic and other libraries. Dependencies from bower install, angular, ionic, ionicrouter 
│   │
│   ├── templates/                     * HTML templates
│   │    └── confirmResetPassword.html    ** Confirm and reset the password page
│   │    └── createRoute.html             ** Create route form places or level page
│   │    └── EditFriends.html             ** Edit friends, add or remove page
│   │    └── friends.html                 ** Show the friends page
│   │    └── friendsRoutes.html           ** The friends routes page
│   │    └── login.html                   ** Login page
│   │    └── menu.html                    ** Template for the side-menu 
│   │    └── myRealRoutes.html            ** All the routes of the in user page
│   │    └── myRoutes.html                ** (CONFUSING NAME! Really "RouteInfo") Information and small map for all routes
│   │    └── nearbyRoutes.html            ** Shows nearby routes and a map with the position and other nearby routes
│   │    └── recordRoute.html             ** Record route page, share route page
│   │    └── requestResetPassword.html    ** Request and reset the password page
│   │    └── settings.html                ** The settings page
│   │    └── signup.html                  ** The signup page
│   │    └── topRoutes.html               ** (CONFUSING NAME! Really "FindRoutes") Search and sort through the routes page
│   │
│   └── index.html                     * Main entry point
|
├── .editorconfig                      * Defines coding styles between editors
├── .gitignore                         * Example git ignore file
├── config.xml                         * Cordova configuration file
├── gulpfile.js                        * Contains gulp tasks for compiling ts files, scss files and more..
├── ionic.project                      * Ionic configuration file
├── package.json                       * Our javascript dependencies
├── CityWalks3.0.sln                   * VS solution
├── CityWalks3.0.jsproj        
├── CityWalks3.0.jsproj.user     
└── README.md                          * This file
```

