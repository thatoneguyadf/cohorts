(function () {

    'use strict';

    angular.module('app')
        .controller('ProjectsController', function (projects, Projects, $modal, $rootScope, Users) {

            var vm = this;

            vm.projects = projects;

            vm.addProject = function addProject() {

                var modalInstance = $modal.open({

                    templateUrl: 'partials/projects/new.html',
                    controller: 'NewProjectCtrl',
                    controllerAs: 'newProject',
                    size: 'md'

                }).result.then(function (res) {

                        Projects.post(res);

                    });

            };

            vm.editProject = function editProject(project) {

                var scope = $rootScope.$new();

                scope.project = project;

                var modalInstance = $modal.open({

                    templateUrl: 'partials/projects/edit.html',
                    controller: 'ProjectEditController',
                    controllerAs: 'projectEditController',
                    size: 'md',
                    scope: scope

                }).result.then(function (res) {

                        Projects.put(res);

                    });

            };

            vm.remove = Projects.del;

            vm.currentUser = Users.currentUser;

        });

}());