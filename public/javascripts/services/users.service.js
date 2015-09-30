(function () {

    'use strict';

    angular.module('app')
        .service('Users', function ($http, User) {

            var vm = this;

            /**
             * Our main user storage.
             *
             * @type {Array}
             */

            vm.users = [];

            vm.find = function find(userId) {
                return _.find(vm.users, {_id: userId});
            };

            /**
             * Get out projects from the server
             *
             * @returns {*}
             */
            
            vm.get = function get() {
                return $http.get('/users')
                    .then(function (res) {
                        vm.users.splice(0);

                        res.data.forEach(function (user) {
                            vm.users.push(new User(user));
                        });

                        return vm.users;

                    });
            };

        });

}());
