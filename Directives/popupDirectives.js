/**
 * Created by chen.f on 19/01/15.
 */

var appDirectives = angular.module('MilionPixelsApp.popup',[]);

appDirectives.directive('dynamicPopup',['popupService', function(popupService){
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            scope.popupToShow = popupService.popupObj;

            scope.dialogStyle = {};
            if (attrs.width)
                scope.dialogStyle.width = attrs.width;
            if (attrs.height)
                scope.dialogStyle.height = attrs.height;
            scope.hidePopup = function() {
                popupService.hide();
            };
        },
        templateUrl: 'html/popup.html'
    };
}]);