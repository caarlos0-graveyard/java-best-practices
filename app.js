var app = angular.module('app', ['ngRoute', 'ngAnimate'])

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

app.directive('pager', function () {
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: './templates/pager.html',
    replace: true,
    scope: {
      previousPath: '@',
      previousTxt: '@',
      nextPath: '@',
      nextTxt: '@'
    }
  }
})

app.factory('pages', function ($http) {
  return $http.get('./pages.json')
})

app.controller('wikiController', function ($scope, $routeParams, pages) {
  $scope.pages = []
  $scope.templateUrl = './pages/' + $routeParams.name + '.md'
  $scope.previousPage = {}
  $scope.nextPage = {}

  function populateLinks(json, url) {
    for (var i = 0, l = json.length; i < l; i++) {
      var data = json[i]
      if (data.link && data.link === url) {
        $scope.previousPage = json[i - 1]
        $scope.nextPage = json[i + 1]
      } else if (data.links) {
        populateLinks(data.links, url)
      }
    }
  }

  pages.success(function (data) {
    $scope.pages = data
    var path = $routeParams.name
    if (path) {
      populateLinks(data, '#' + path)
    }
  })
})

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl : 'pages/home.html',
      controller: 'wikiController'
    })
    .when('/:name*', {
      templateUrl: './templates/markdown.html',
      controller: 'wikiController'
    })
})
