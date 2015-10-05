(function (){

    'use strict';

    angular.module('app')
        .service('Projects', function ($http, $state, Users) {

            var vm = this;

            /**
             * Our main project storage.
             *
             * @type {Array}
             */

            vm.projects = [];

            /**
             * Find a project with a given Id
             *
             * @param projectId
             * @returns {*}
             */

            vm.find = function find(projectId) {
                return _.find(vm.projects, {_id: projectId});
            };

            vm.userProj = function projects(user) {
                return _.find(vm.projects, {user: user});
            };

            /**
             * Get out projects from the server
             *
             * @returns {*}
             */

            vm.get = function get() {
                return $http.get('/projects')
                    .then(function (res) {

                        vm.projects.splice(0);
                        res.data.forEach(function (project) {
                            project.user = Users.find(project.user);
                            vm.projects.push(project);
                        });

                        return vm.projects;

                    });
            };

            /**
             * Updating projects on the databse
             *
             * @param projectCopy
             * @returns {*}
             */

            vm.put = function put(projectCopy) {

                var data = {title: projectCopy.title, user: projectCopy.user._id, detail: projectCopy.detail};

                return $http.put('/projects/' + projectCopy._id, data)
                    .then(function (res) {
                        var p = vm.find(projectCopy._id);

                        _.merge(p, projectCopy);

                    }, function (err) {

                        //TODO: handle when we can't update a project

                    });

            };

            /**
             * Deleting projects
             *
             * @param project
             */

            vm.remove = function remove(project) {
                _.remove(vm.projects, project);
            };

            vm.del = function del(project) {

                return $http.delete('/projects/' + project._id)
                    .then(function (res) {

                        vm.remove(project);

                        $state.go('projects');

                    }, function (err) {

                        //TODO: handle when we can't delete a projects

                    });

            };

            /**
             * Create a new project in the database
             *
             * @param project
             * @returns {*}
             */

            vm.post = function post(project) {

                return $http.post('/projects/', project)
                    .then(function (res) {
                        res.data.user = Users.find(res.data.user);
                        vm.projects.push(res.data);
                    });

            };

        });

}());