/**
 * Created by chen.f on 21/09/14.
 */
'use strict'


angular.module('WatchDogApp.controllers',[]).

    controller('loginController', ['$scope', '$rootScope', '$window', '$location','authenticationAPIService', function ($scope, $rootScope, $window, $location,authenticationAPIService) {
        $scope.login = authenticationAPIService.login().success(function(response){
            console.log(response);
        });

        $scope.slide = '';
        $rootScope.back = function() {
            $scope.slide = 'slide-right';
            $window.history.back();
        }
        $rootScope.go = function(path){
            console.log("going to path:" + path);
            $scope.slide = 'slide-left';
            $location.url(path);
        }
    }]).

    controller('mainController', function($scope){
    });

