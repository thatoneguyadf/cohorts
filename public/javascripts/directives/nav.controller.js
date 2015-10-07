(function () {

    'use strict';

    angular.module('app')
        .controller('NavController', function (Users, $rootScope) {

            var vm = this;

            vm.user = null;

            $rootScope.$on('$stateChangeStart', function () {

                if (Users.currentUser) {

                    vm.user = Users.currentUser.first_name + ' ' + Users.currentUser.last_name;

                }

            });

            vm.logout = function logout() {

                vm.user = null;

                Users.logout();

            };

        });

}());
