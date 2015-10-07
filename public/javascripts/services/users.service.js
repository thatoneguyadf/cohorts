(function () {

    'use strict';

    angular.module('app')
        .service('Users', function ($http, User, $state) {

            var vm = this;

            vm.currentUser = null;

            vm.currentUserToken = null;

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
             * Get out users from the server
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

            /**
             * Updating users on the databse
             *
             * @param userCopy
             * @returns {*}
             */

            vm.put = function put(userCopy) {

                var data = {
                    first_name: userCopy.first_name,
                    last_name: userCopy.last_name,
                    email: userCopy.email
                };

                return $http.put('/users/' + userCopy._id, data)
                    .then(function (res) {
                        var p = vm.find(userCopy._id);

                        _.merge(p, userCopy);

                    }, function (err) {

                        console.log(err);

                        //TODO: handle when we can't update a project

                    });

            };

            /**
             * Deleting users
             *
             * @param user
             */

            vm.remove = function remove(user) {
                _.remove(vm.users, user);
            };

            vm.del = function del(user) {

                return $http.delete('/users/' + user._id)
                    .then(function (res) {

                        vm.remove(user);

                        $state.go('users');

                    }, function (err) {

                        console.log(err);

                        //TODO: handle when we can't delete a projects

                    });

            };

            /**
             * Create a new user in the database
             *
             * @param user
             * @returns {*}
             */

            vm.post = function post(user) {

                return $http.post('/users/', user)
                    .then(function (res) {
                        vm.users.push(res.data);
                    });

            };

            /**
             * log in a user
             *
             * @param creds
             * @returns {*}
             */

            vm.login = function login(creds) {

              return $http.post('/login', creds)
                  .then(function (res) {

                      vm.currentUser = res.data.user;
                      vm.currentUserToken = res.data.token;
                      window.localStorage.appUser = JSON.stringify({user: vm.currentUser, token: vm.currentUserToken});

                  });

            };

            /**
             * Is current user logged in?
             *
             * @returns {boolean}
             */

            vm.isLoggedIn = function isLoggedIn() {

                return !!vm.currentUser;

            };

            vm.logout = function logout() {

                vm.currentUser = null;
                vm.currentUserToken = null;
                window.localStorage.appUser = '';

                $state.go('login');

            };

        });

}());
