angular.module('THS700app', ['ngRoute', 'ngAnimate'],
  function ($routeProvider, $locationProvider) {
    $routeProvider.when('/connection', {
      templateUrl: 'connection.html',
      controller: connectionCntrll
    });

    // configure html5 to get links working on jsfiddle
    $locationProvider.html5Mode(true);
  });

function MainCntl($route, $routeParams, $location) {
  this.$route = $route;
  this.$location = $location;
  this.$routeParams = $routeParams;
}


function serialCntrll($scope) {
  $scope.main = { title: 'THS700 Console',
    logoURL: 'images/THS700_banner.png' }
}

function connectionCntrll($scope) {
  $scope.main = { title: 'THS700 Console',
    logoURL: 'images/THS700_banner.png' }
}