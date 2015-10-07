(function () {

    'use strict';

    angular.module('app.ui')
        .directive('nav', function () {

            //Create the DDO (Directive Definition Object)

            return {
                restrict: 'E',
                templateUrl: 'partials/directives/nav.html',
                controller: 'NavController',
                controllerAs: 'nav'
            };

        });

}());
