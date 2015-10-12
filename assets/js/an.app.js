(function(){
    'use strict';
    
    angular.module('MyApp', [])
    
    .directive('mainmenu', [function () {
        return {
            restrict: 'E',
            templateUrl: 'assets/ngapp/mainmenu.html'
        };
    }])
    
    .directive('maindownload', [function () {
        return {
            restrict: 'E',
            templateUrl: 'assets/ngapp/maindownload.html'
        };
    }])
    
    .directive('footer', [function () {
        return {
            restrict: 'E',
            templateUrl: 'assets/ngapp/footer.html'
        };
    }])
})();