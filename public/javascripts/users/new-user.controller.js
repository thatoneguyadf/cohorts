(function () {

    'use strict';

    angular.module('app')
        .controller('NewUserCtrl', function ($modalInstance) {

            var vm = this;

            vm.user = {};

            vm.close = function close() {

                $modalInstance.close(vm.user);

            };

            vm.dismiss = function dismiss() {

                $modalInstance.dismiss();

            };

        });

}());
