angular.module('THS700app', ['ngRoute', 'ngAnimate'],
  function ($routeProvider, $locationProvider) {
    $routeProvider.when('/connection', {
      templateUrl: 'connection.html',
      controller: connectionCntrll
    });

    $routeProvider.when('/', {
      templateUrl: 'banner.html',
      controller: bannerCntrll
    });

    // configure html5 to get links working on jsfiddle
    $locationProvider.html5Mode(true);
  });

function MainCntl($route, $routeParams, $location) {
  this.$route = $route;
  this.$location = $location;
  this.$routeParams = $routeParams;

  console.log('$route');
  console.log($route);
  console.log('$routeParams');
  console.log($routeParams);
  console.log('$location');
  console.log($location);
}
