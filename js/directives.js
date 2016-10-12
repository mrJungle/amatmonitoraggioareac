angular.module("areacapp")
.directive('appNavbar', [function () {
    return {
        restrict: 'A',
        templateUrl : 'html/navbar.html',
        replace : true,
        link: function (scope, iElement, iAttrs) {
            
        }
    };
}])

.directive('appFooter', [function () {
    return {
        restrict: 'A',
        templateUrl : 'html/footer.html',
        replace : true,
        link: function (scope, iElement, iAttrs) {
            
        }
    };
}])

.directive('scrollPosition', function($window) {
  return {
    scope: {
      pos: '=scrollPosition'
    },
    link: function(scope, element, attrs) {
      var windowEl = angular.element($window);
      var handler = function() {
        scope.pos = windowEl.scrollTop();
      }
      windowEl.on('scroll', scope.$apply.bind(scope, handler));
      handler();
    }
  };
});

;




