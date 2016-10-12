
angular.module("areacapp", [ 'ui.router','ui.bootstrap.tabs', 'ui.bootstrap', 'ui.bootstrap.collapse', 'ui.bootstrap.rating', 'ui.bootstrap.tabs', 'ui.bootstrap.modal','ui.bootstrap.datepicker','ui.bootstrap.datepickerPopup', 'nvd3'])
//'ngAnimate', <-- da alcuni problemi

.run(['$anchorScroll', function($anchorScroll) {
  $anchorScroll.yOffset = 50;   // always scroll by 50 extra pixels
}])

.config(function($stateProvider, $urlRouterProvider) {


 
  $urlRouterProvider.otherwise("/home");
  // Now set up the states
  $stateProvider
  .state('app', {
      abstract : true,
      sticky : true,
      cache: true,
      controller: 'AppCtrl',
      views : {
        'app' : {
          template : '<div ui-view></div>'
        }
      }
    })
  .state('app.home', {
    url: "/home",
    cache: true,
    templateUrl: "html/home.html",
    controller: 'HomeCtrl'
  })
  .state('app.report', {
    url: "/report",
    cache: true,
    templateUrl: "html/report.html",
    controller: 'ReportCtrl'
  })  
  .state('app.ingressi_b', {
      url: "/ingressi_b",
      cache: true,
      templateUrl: "html/ingressi_b.html",
      controller: 'HomeCtrl'
    })  
  .state('app.api', {
      url: "/api",
      cache: true,
      templateUrl: "html/api.html",
      controller: 'ApiCtrl'
    })
  .state('app.credits', {
      url: "/credits",
      cache: true,
      templateUrl: "html/credits.html",
      controller: 'CreditsCtrl'
    })


  })
    
.run(function(){
    console.log("Avvio")
})

