(function () {

    'use strict';

    angular.module('app')
        .controller('LoginController', function (Users, $state) {

            var vm = this;
            vm.creds = {};
            vm.login = function login(creds) {

                Users.login(creds)
                    .then(function (res) {

                        $state.go('projects');

                    }, function (err) {

                        vm.loginFailed = true;

                    });

            };

        });

}());
