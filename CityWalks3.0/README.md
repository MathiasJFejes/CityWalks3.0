# CityWalks application (front-end)

A walking application using Apache Cordova, Ionic Framework, AngularJS and javascript. Currently supporting iOS, Android and Windows 10.

## Table of Contents
 - [Requirements](#requirements)
 - [Getting Started](#getting-started)
 - [File Structure of App](#file-structure-of-app)

## Getting Started

With Visual Studio:
* Install Visual Studio with the Code Cordova extension (cordova-tools) 
* Clone this repository.
* Open the ionic-typescript-blank.sln in Visual Studio.
* Open Task Runner window by pressing Ctrl+Alt+Bkspce. 
** Note: It is important that the task runner window be open in VS while building the project. You can also use "gulp watch" task to enable live reload in browser based debugging scenarios.    
* Install npm packages by going to your Solution Explorer -> Dependencies -> npm and clicking on 'Restore Packages'. 
* Once packages are restored, build the project and deploy it on Ripple or an android emulator.  
* Success


## File Structure of App

```
ionic-typescript-blank/
├── app/                               * Working directory for TypeScript files
│   └── app.ts                         * Main Application configuration
│
├── node_modules/                      * Node dependencies
|
├── platforms/                         * Cordova generated native platform code
|
├── plugins/                           * Cordova native plugins go
|
├── resources/                         * Images for splash screens and icons
|
├── typings/                           * Contains all typings for this project
|
├── www/                               * Folder that is copied over to platforms www directory
│   │   
│   ├── js/                            * Contains transpiled JS files from TS files
│   │    └── app.js                 
│   │
│   ├── css/                           * Compiled CSS
│   │
│   ├── img/                           * App images
│   │
│   ├── lib/                           * Dependencies from bower install 
│   │
│   └── index.html                     * Main entry point
|
├── .editorconfig                      * Defines coding styles between editors
├── .gitignore                         * Example git ignore file
├── config.xml                         * Cordova configuration file
├── gulpfile.js                        * Contains gulp tasks for compiling ts files, scss files and more..
├── ionic.project                      * Ionic configuration file
├── package.json                       * Our javascript dependencies
├── ionic-typescript-blank.sln         * VS solution
├── ionic-typescript-blank.jsproj        
├── ionic-typescript-blank.jsproj.user     
└── README.md                          * This file
```

