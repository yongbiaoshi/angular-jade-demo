(function(){
  var app = angular.module("User", ['ngMessages', 'formValidateExt']);

  app.controller('UserController', ['$scope', '$window', '$log', function($scope, win, $log){
    $scope.user = {};
    $scope.users = [];
    $scope.saveUser = function(form){
      if($scope.user) {
        $scope.users.push($scope.user);
        $scope.user = {};
      }
      $scope.resetForm(form);
    };
    $scope.resetForm = function(form){
      form.$setPristine();
    };
  }]);

  app.directive('userList', function() {
    return {
      restrict: 'E',
      templateUrl: '/view/user-list.html',
      replace: true,
      controller: function($scope){

      },
      controllerAs: 'userListCtrl'
    };
  });

  app.directive('userFormAdd', function(){
    return {
      restrict: 'E',
      templateUrl: '/view/user-form-add.html'
    };
  });

})();