(function () {

    'use strict';

    angular.module('app')
        .controller('UsersController', function (users, Users, $modal, $rootScope) {

            var vm = this;

            vm.users = users;

            vm.addUser = function addUser() {

                var modalInstance = $modal.open({

                    templateUrl: 'partials/users/new.html',
                    controller: 'NewUserCtrl',
                    controllerAs: 'newUser',
                    size: 'md'

                }).result.then(function (res) {

                        Users.post(res);

                    });

            };

            vm.editUser = function editUser(user) {

                var scope = $rootScope.$new();

                scope.user = user;

                var modalInstance = $modal.open({

                    templateUrl: 'partials/users/edit.html',
                    controller: 'UserEditController',
                    controllerAs: 'userEditController',
                    size: 'md',
                    scope: scope

                }).result.then(function (res) {

                        Users.put(res);

                    });

            };

            vm.remove = Users.del;

            vm.currentUser = Users.currentUser;

        });

}());