(function () {

    'use strict';

    angular.module('app.ui')
        .directive('projectTable', function () {

            //Create the DDO (Directive Definition Object)

            return {
                restrict: 'E',
                templateUrl: 'partials/directives/projects-table.html',
                scope: {
                    projects: '=',
                    edit: '=',
                    remove: '='
                }
            };

        });

}());
