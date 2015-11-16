/**
 * Created by chen.f on 19/01/15.
 */

var appDirectives = angular.module('MilionPixelsApp.customOnChange',[]);

appDirectives.directive('customOnChange', function(){
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var onChangeHandler = scope.$eval(attrs.customOnChange);
            element.bind('change', onChangeHandler);
        }
    };
});