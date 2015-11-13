(function(){
  var app = angular.module("User", []);

  app.controller('UserController', ['$scope', '$window', '$log', function($scope, win, $log){
    $scope.user = {};
    $scope.users = [];
    $scope.saveUser = function(){
      if($scope.user) {
        $scope.users.push($scope.user);
        $scope.user = {};
      }
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

})();