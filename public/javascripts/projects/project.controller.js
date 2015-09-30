(function () {

    'use strict';

    angular.module('app')
        .controller('ProjectController', function (project, Projects, $modal, $rootScope) {

            var vm = this;

            vm.project = project;

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

        });

}());