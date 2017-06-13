(function() {
    'use strict';

    angular
        .module('components')
        .factory('toolbarFactory', toolbarFactory)
        .directive('uncToolbar', toolbar);


    function toolbarFactory(){
      var stack = [];
      var service = {
        addStack : addStack,
        getStack : getStack,
        getCount : getCount,
        deleteStack : deleteStack
      }

      function addStack(element){
        stack.push(element);
      }

      function getStack(){
        stack.pop();//dos veces porque la ultima cargada es la pagina actual
        return stack.pop();
      }

      function getCount(){
        return stack.length;
      }

      function deleteStack(){
        stack = [];
      }

      return service;

    }

    /* @ngInject */
    function toolbar() {
        var directive = {
            restrict: 'E',
            templateUrl: 'components/toolbar.directive.html',
            controller: ToolbarController,
            controllerAs: 'vm',
            scope: {
              text:"@text",
              back: "@",
              state: "@",
              cbSidebar:"="
            },
            bindToController: true,
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {

        }
    }

    ToolbarController.$inject = ['$state', '$mdToast', '$scope', 'toolbarFactory'];

    /* @ngInject */
    function ToolbarController($state, $mdToast, $scope, toolbarFactory) {

      var vm = this;

      vm.fullname = null;
      vm.description = null;
      vm.initialCapitalLetter = null;

      vm.showApps = showApps;
      vm.showProfile = showProfile;
      vm.closeSession = closeSession;
      vm.goBack = goBack;

      vm.toggle = function(){
        vm.cbSidebar=!vm.cbSidebar;
      }

      activate();

      function activate() {
        // yacareFactory.getSessionId()
        //   .then(function (tutorID) {
        //     tutorID=tutorID.data.userId;
        //     yacareFactory.getLegalGuardianById(tutorID)
        //     .then(function (response) {
        //       vm.description = response.data.personalInformation.identityDocuments.mainIdentity.identityNumber;
        //       vm.fullname = response.data.personalInformation.surnames+ ", " + response.data.personalInformation.firstName + " " + response.data.personalInformation.otherNames;
        //       vm.initialCapitalLetter = response.data.personalInformation.surnames[0][0];
        //       $scope.$apply();
        //     });
        //   });

          toolbarFactory.addStack(vm.state);
          // vm.back = toolbarFactory.getStack();
      }

      function goBack() {
        // if(vm.back)
        //   $state.go(vm.back);
        if(toolbarFactory.getCount() > 1){
          $state.go(toolbarFactory.getStack());
        }
      }

      function closeSession() {
        toolbarFactory.deleteStack();
        /*yacareFactory.logout().then(
          function(response){
            $state.go(
              'login'
            );
          },
          function(err){
            $mdToast.show(
              $mdToast.simple()
                .textContent('Error al cerrar sesion')
                .position('bottom left')
                .hideDelay(3000)
            );
          }
        );*/
      }

      // muestra la tarjeta de modulos
      function showApps() {
        if(angular.element( document.querySelector( '#apps-card' ) ).css('display') === 'block'){
            clickedOutsideApps({target:null});
            return;
        }
        angular.element( document.querySelector( '#apps-card' ) ).css('display', 'block');
        angular.element( document.querySelector( '#arrow-up-apps' ) ).css('display', 'block');
        document.addEventListener('click', clickedOutsideApps);
      }

      // oculta la tarjeta de modulos cuando se clickea fuera de ella
      function clickedOutsideApps(event) {
        if(event.target === document.getElementById('display-apps-button') ||
           event.target === document.getElementById('apps-icon')){
          return;
        }
        angular.element( document.querySelector( '#apps-card' ) ).css('display', 'none');
        angular.element( document.querySelector( '#arrow-up-apps' ) ).css('display', 'none');
        document.removeEventListener('click', clickedOutsideApps);
      }

      //no cerrar la tarjeta de modulos si se clickeo dentro
      document.getElementById('apps-card').addEventListener('click', function(event){
        event.stopPropagation();
      });

      // muestra la tarjeta de perfil
      function showProfile(event) {
        if(angular.element( document.querySelector( '#profile-card' ) ).css('display') === 'block'){
            clickedOutsideProfile({target:null});
            return;
        }
        angular.element( document.querySelector( '#profile-card' ) ).css('display', 'block');
        angular.element( document.querySelector( '#arrow-up-profile' ) ).css('display', 'block');
        document.addEventListener('click', clickedOutsideProfile);
      }

      // oculta la tarjeta de perfil cuando se clickea fuera de ella
      function clickedOutsideProfile(event) {
        if(event.target === document.getElementById('display-profile-button') ||
           event.target === document.getElementById('profile-icon')){
          return;
        }
        angular.element( document.querySelector( '#profile-card' ) ).css('display', 'none');
        angular.element( document.querySelector( '#arrow-up-profile' ) ).css('display', 'none');
        document.removeEventListener('click', clickedOutsideProfile);
      }

      //no cerrar la tarjeta de perfil si se clickeo dentro
      document.getElementById('profile-card').addEventListener('click', function(event){
        event.stopPropagation();
      });
    }
})();
