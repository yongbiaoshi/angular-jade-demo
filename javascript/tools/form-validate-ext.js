(function(){
  var app = angular.module('formValidateExt', []);
  app.directive('emailOrMobile', function(){
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ctrl){
        var MOBILE_REGEXP = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        ctrl.$validators.emailOrMobile = function(modelValue, viewValue){
          if (ctrl.$isEmpty(modelValue)) {
            // consider empty models to be valid
            return true;
          }
          if (MOBILE_REGEXP.test(viewValue) || EMAIL_REGEXP.test(viewValue)) {
            // it is valid
            return true;
          }
          // it is invalid
          return false;
        };
/*        var validator = function(value){
          var validity = ctrl.$isEmpty(value) || EMAIL_REGEXP.test(value) || MOBILE_REGEXP.test(value);
          ctrl.$setValidity('emailOrMobile', validity);
          return validity ? value : undefined;
        };
        // ctrl.$formatters.push(validator);
        ctrl.$parsers.push(validator);*/
      }
    };
  });
  app.directive('equalsTo', [function(){
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ctrl){
        if(!attrs.equalsTo) return undefined;
        var aArray = attrs.equalsTo.split('.');
        //inheritedData方法 - 获取到当前元素$scope所关联的数据对象
        var otherCtrl = element.inheritedData("$formController")[attrs.equalsTo];
        ctrl.$validators.equalsTo = function(modelValue, viewValue){
          var r = ctrl.$isEmpty(modelValue) || modelValue === otherCtrl.$viewValue;
          //恢复初始状态
          if(ctrl.$isEmpty(viewValue)){
            ctrl.$setPristine();
          }
          return r;
        };
        otherCtrl.$validators.equalsTo = function(modelValue, viewValue){
          var r = modelValue === ctrl.$viewValue;
          ctrl.$setValidity('equalsTo', r);
          return true;
        };
      /*ctrl.$parsers.push(function(value){
          ctrl.$setValidity("equalsTo", value === otherCtrl.$viewValue);
          return value;
        });
        otherCtrl.$parsers.push(function(value){
          var v = value === ctrl.$viewValue;
          ctrl.$setValidity('equalsTo', v);
          return value;
        });
      */
      }
    };
  }]);
}
)();