angular
  .module('THS700app', ['ngRoute', 'ngAnimate'])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/connection', { templateUrl: 'connection.html', controller: connectionCntrll })
      .when('/main', { templateUrl: 'banner.html', controller: bannerCntrll })
      .otherwise({redirectTo: '/main'});
    $locationProvider
      .html5Mode(false); // cannot use html5 because of Angular-routing
  });
