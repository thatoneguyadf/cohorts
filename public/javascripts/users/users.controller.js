(function () {

    'use strict';

    angular.module('app')
        .controller('UsersController', function (users, Users, $modal, $rootScope) {

            var vm = this;

            vm.users = users;

            vm.addProject = function addProject() {

                var modalInstance = $modal.open({

                    templateUrl: 'partials/users/new.html',
                    controller: 'NewProjectCtrl',
                    controllerAs: 'newProject',
                    size: 'md'

                }).result.then(function (res) {

                        Users.post(res);

                    });

            };

            vm.editProject = function editProject(project) {

                var scope = $rootScope.$new();

                scope.project = project;

                var modalInstance = $modal.open({

                    templateUrl: 'partials/users/edit.html',
                    controller: 'ProjectEditController',
                    controllerAs: 'projectEditController',
                    size: 'md',
                    scope: scope

                }).result.then(function (res) {

                        Users.put(res);

                    });

            };

            vm.remove = Users.del;

        });

}());