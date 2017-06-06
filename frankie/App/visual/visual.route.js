(function() {
  angular
    .module('visual')
    .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {

      $stateProvider
      .state('visual', {
        url: "/visual",
        templateUrl: "visual/visual.html",
        controller: 'visualController',
        controllerAs: 'vi'
      });
    }
}());