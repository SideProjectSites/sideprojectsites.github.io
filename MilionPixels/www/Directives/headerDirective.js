/**
 * Created by chen.f on 19/01/15.
 */

var appDirectives = angular.module('MilionPixelsApp.myHeader',[]);

appDirectives.directive('myHeader', function(){
    return {
        restrict: 'E',
        templateUrl: 'html/myHeader.html',
        controller:'headerController'
    };
});