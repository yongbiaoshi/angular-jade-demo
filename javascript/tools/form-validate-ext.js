(function(){
  var app = angular.module('formValidateExt', []);
  app.directive('emailOrMobile', function(){
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel){
        var MOBILE_REGEXP = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        var validator = function(value){
          var validity = ngModel.$isEmpty(value) || EMAIL_REGEXP.test(value) || MOBILE_REGEXP.test(value);
          ngModel.$setValidity('emailOrMobile', validity);
          return validity ? value : undefined;
        };
        // ngModel.$formatters.push(validator);
        ngModel.$parsers.push(validator);
      }
    };
  });
  app.directive('equalsTo', [function(){
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel){
        if(!attrs.equalsTo) return undefined;
        var aArray = attrs.equalsTo.split('.');
        //inheritedData方法 - 获取到当前元素$scope所关联的数据对象
        var otherNgModel = element.inheritedData("$formController")[attrs.equalsTo];
        ngModel.$parsers.push(function(value){
          ngModel.$setValidity("equalsTo", value === otherNgModel.$viewValue);
          return value;
        });

        otherNgModel.$parsers.push(function(value){
          var v = value === ngModel.$viewValue;
          ngModel.$setValidity('equalsTo', v);
          return value;
        });
      }
    };
  }]);
}
)();