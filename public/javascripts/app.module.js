(function () {

    'use strict';

    angular.module('app', ['ui.router', 'app.ui', 'ui.bootstrap'])
        .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

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
                    },
                    data: {
                        requireLogin: true
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
                    },
                    data: {
                        requireLogin: true
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
                    },
                    data: {
                        requireLogin: true
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
                    },
                    data: {
                        requireLogin: true
                    }
                });

            /**
             * Config the http interceptor
             */

            $httpProvider.interceptors.push(function ($injector) {
                return {
                    request: function (config) {

                        var Users = $injector.get('Users');
                        if (Users.isLoggedIn()) config.headers.Authorization = 'Token ' + Users.currentUserToken;
                        return config;

                    }
                };
            });
        })
        .run(function ($rootScope, Users, $state) {

            $rootScope.$on('$stateChangeStart', function (event, toState) {

                if (window.localStorage.appUser) {

                    var currentUser = JSON.parse(window.localStorage.appUser);

                    Users.currentUser = currentUser.user;
                    Users.currentUserToken = currentUser.token;

                }

                if (toState.data && toState.data.requireLogin) {

                    if (!Users.isLoggedIn()) {

                        event.preventDefault();
                        $state.go('login');

                    }

                }

            });

        });

}());