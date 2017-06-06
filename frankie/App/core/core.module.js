(function() {
    'use strict';

    angular
        .module('app.core', ['ui.router', 'ngMaterial','angular-jsoneditor'])


        //
        // .config(function($mdThemingProvider) {
        //   $mdThemingProvider.theme('default')
        //     .primaryPalette('blue', {
        //       'default': '500',
        //       'hue-1': '700'
        //     })
        //     .accentPalette('deep-purple', {
        //       'default': 'A400' // use shade 200 for default, and keep all other shades the same
        //     });
        // });

       /* angular.module('app.core').config(function($mdDateLocaleProvider) {
            $mdDateLocaleProvider.formatDate = function(date) {
              var day = date.getDate();
              var monthIndex = date.getMonth();
              var year = date.getFullYear();
              return day + '/' + (monthIndex + 1) + '/' + year;
            };
        });*/

})();