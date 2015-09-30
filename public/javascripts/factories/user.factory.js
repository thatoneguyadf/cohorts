(function () {

    'use strict';

    angular.module('app')
        .factory('User', function () {

            function User(data) {

                _.merge(this, {
                    first_name: '',
                    last_name: '',
                    email: ''
                }, data || {});

            }

            User.prototype = {

                fullName: function fullName() {
                    return this.first_name + ' ' + this.last_name;
                }

            };

            return User;

        });

}());