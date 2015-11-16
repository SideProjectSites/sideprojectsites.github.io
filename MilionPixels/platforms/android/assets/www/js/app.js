/**
 * Created by chen.f on 21/09/14.
 */
'use strict'

angular.module('WatchDogApp',[
        'WatchDogApp.services',
        'WatchDogApp.controllers',
        'ngRoute',
        'ngAnimate',
        'ngTouch'
    ]).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when("/login",{templateUrl:"html/login.html",controller:"loginController"}).
            when("/main",{templateUrl:"html/main.html",controller:"loginController"}).
            otherwise({redirectTo: '/login'});
    }]);
