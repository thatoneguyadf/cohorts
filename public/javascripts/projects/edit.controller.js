(function () {

    'use strict';

    angular.module('app')
        .controller('ProjectEditController', function ($scope, Projects, Users, $modalInstance) {

            var vm = this;

            vm.users = Users.users;

            vm.project = _.clone($scope.project);

            vm.close = function close() {

                $modalInstance.close(vm.project);

            };

            vm.dismiss = function dismiss() {

                $modalInstance.dismiss();

            };

        });

}());
