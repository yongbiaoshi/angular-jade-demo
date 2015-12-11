(function(){
  var app = angular.module("User", ['ngMessages', 'formValidateExt']);

  app.controller('UserController', ['$scope', '$window', '$log', '$http', function($scope, win, $log, $http){
    $scope.users = [];
    $http.get('/javascript/data/user-list.json').success(function(data){
      $scope.users = data;
    });
    $scope.saveUser = function(user){
      if(user) {
        $scope.users.push(user);
      }
    };
  }]);

  app.controller('UserViewController', ['$scope', '$http', function($scope, $http){
    $scope.queryUser = {};
    $http.get('/javascript/data/user-list.json').success(function(data){
      $scope.users = data;
    });
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

  app.directive('userFindForm', function(){
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/view/user-find-form.html'
    };
  });

  app.directive('userFormAdd', function(){
    return {
      restrict: 'E',
      scope: true,
      replace: true,
      templateUrl: '/view/user-form-add.html',
      controller: ['$scope', function($scope){
        $scope.resetForm = function(){
          $scope.userForm.$setPristine();
          $scope.user = {};
        };
      }]
    };
  });

  app.directive('userFormAddHorizontal', function(){
    return {
      restrict: 'E',
      scope: true,
      replace: true,
      templateUrl: '/view/user-form-add-horizontal.html',
      controller: ['$scope', function($scope){
        $scope.resetForm = function(){
          $scope.userForm.$setPristine();
          $scope.user = {};
        };
      }]
    };
  });

})();