(function () {

    'use strict';

    angular.module('app')
        .controller('UserEditController', function ($scope, Users, $modalInstance) {

            var vm = this;

            vm.user = _.clone($scope.user);

            vm.close = function close() {

                $modalInstance.close(vm.user);

            };

            vm.dismiss = function dismiss() {

                $modalInstance.dismiss();

            };

        });

}());
