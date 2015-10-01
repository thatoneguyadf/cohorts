(function () {

    'use strict';

    angular.module('app.ui')
        .directive('userTable', function () {

            //Create the DDO (Directive Definition Object)

            return {
                restrict: 'E',
                templateUrl: 'partials/directives/users-table.html',
                scope: {
                    users: '=',
                    edit: '=',
                    remove: '='
                }
            };

        });

}());
