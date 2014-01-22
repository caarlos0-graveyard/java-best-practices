var app = angular.module('app', ['ngRoute'])

app.directive("markdown", function ($compile, $http) {
  var converter = new Showdown.converter()
  return {
    restrict: 'E',
    replace: true,
    link: function (scope, element, attrs) {
      if ("src" in attrs) {
        $http.get(attrs.src).then(function (data) {
          element.html(converter.makeHtml(data.data))
        })
      } else {
        element.html(converter.makeHtml(element.text()))
      }
    }
  }
})

app.directive('pager', function ($compile) {
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: 'templates/pager.html',
    replace: true,
    scope: {
      previousPath: '@',
      previousTxt: '@',
      nextPath: '@',
      nextTxt: '@'
    }
  }
})

app.controller('mainController', function ($scope, $routeParams) {
  $scope.templateUrl = './pages/' + $routeParams.name + '.html'
})

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl : 'pages/home.html'
    })
    .when('/:name*', {
      template: '<article ng-include="templateUrl"></article>',
      controller: 'mainController'
    })
})
