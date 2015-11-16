/**
 * Created by chen.f on 19/01/15.
 */

var appDirectives = angular.module('MilionPixelsApp.sideMenu',[]);

appDirectives.directive('sideMenu', function(){
    return {
        restrict: 'E',
        templateUrl: 'html/sideMenu.html'
    };
});