/**
 * Created by chen.f on 21/09/14.
 */
'use strict'

angular.module('WatchDogApp.services',[]).
    factory('authenticationAPIService', function($http){
        var authenticationAPI = {};

        authenticationAPI.login = function() {
            console.log("Going to login...");
            return $http({
                method: 'GET',
                url:'http://scapi1717472.gamingo.com/RocketTools/Login?Token=vegasuser&AppUserID=123&userName=RocketToolsUser&password=Rocket12345'
            })
        }

        return authenticationAPI;
    });