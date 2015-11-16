/**
 * Created by chen.f on 21/09/14.
 */
angular.module('MilionPixelsApp',[
        'MilionPixelsApp.services',
        'MilionPixelsApp.controllers',
        'MilionPixelsApp.popup',
        'MilionPixelsApp.sideMenu',
        'MilionPixelsApp.myHeader',
        'MilionPixelsApp.customOnChange',
        'ngRoute',
        'ngAnimate'
    ]).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when("/home",{templateUrl:"html/home.html",controller:"homeController",title: 'Home'}).
            when("/buyPixels",{templateUrl:"html/buyPixels.html",controller:"buyPixelsController",title: 'Buy your own Pixels!'}).
            when("/manageServers",{templateUrl:"html/manageServers.html",controller:"serversManagerController",title: 'Manage Servers'}).
            when("/monitoring",{templateUrl:"html/monitoring.html",controller:"monitoringController",title: 'Monitoring'}).
            otherwise({redirectTo: '/home'});
    }])
    .run(function(homeAPIService, $rootScope, $location) {
        $rootScope.$on('$routeChangeStart', function(evt) {
        });

        $rootScope.$on("$routeChangeSuccess", function(event, currentRoute, previousRoute) {
            $rootScope.title = currentRoute.title;
        });
    });
