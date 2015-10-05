(function () {

    'use strict';

    angular.module('app')
        .controller('UserController', function (user, Users, $modal, $rootScope, Projects) {

            var vm = this;

            vm.user = user;

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

            vm.projects = Projects.userProj(vm.user);

        });

}());