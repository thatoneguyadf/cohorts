(function () {

    'use strict';

    angular.module('app', ['ui.router', 'app.ui', 'ui.bootstrap'])
        .config(function ($stateProvider, $urlRouterProvider) {

            /**
             * Default rout
             */

            $urlRouterProvider.otherwise('/projects');

            /**
             * Define our states
             */

            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'partials/login/index.html',
                    controller: 'LoginController',
                    controllerAs: 'loginController'
                })
                .state('projects', {
                    url: '/projects',
                    templateUrl: 'partials/projects/index.html',
                    controller: 'ProjectsController',
                    controllerAs: 'projectsController',
                    resolve: {
                        users: function (Users) {
                            return Users.get();
                        },
                        projects: function (Projects, users) {
                            return Projects.get();
                        }
                    }
                })
                .state('projects.detail', {
                    url: '/:projectId',
                    templateUrl: 'partials/projects/detail.html',
                    controller: 'ProjectController',
                    controllerAs: 'projectController',
                    resolve: {
                        project: function (Projects, $stateParams, projects) {
                            return Projects.find($stateParams.projectId);
                        }
                    }
                })
                .state('users', {
                    url: '/users',
                    templateUrl: 'partials/users/index.html',
                    controller: 'UsersController',
                    controllerAs: 'usersController',
                    resolve: {
                        users: function (Users) {
                            return Users.get();
                        },
                        projects: function (Projects, users) {
                            return Projects.get();
                        }
                    }
                })
                .state('users.detail', {
                    url: '/:userId',
                    templateUrl: 'partials/users/detail.html',
                    controller: 'UserController',
                    controllerAs: 'userController',
                    resolve: {
                        user: function (Users, $stateParams, users) {
                            return Users.find($stateParams.userId);
                        }
                    }
                });

        });

}());