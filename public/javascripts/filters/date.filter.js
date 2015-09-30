(function () {

    'use strict';

    angular.module('app')
        .filter('niceDate', function () {

            return function (timeStamp, format) {

                format = format || 'MMMM Do, YYYY';
                var m = moment(timeStamp);

                return m.format(format);

            };

        });

}());
