(function () {

    'use strict';

    angular.module('app')
        .controller('TabsCtrl', function () {

            var vm = this;

            vm.tabs = [
                { title: 'Projects' },
                { title: 'Users' }
            ];

    });

}());
