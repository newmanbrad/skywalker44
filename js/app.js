angular.module('F1FeederApp', [
    'F1FeederApp.services',
    'F1FeederApp.controllers',
    'ngRoute'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when("/drivers", {templateUrl: "partials/drivers.html", controller: "driversController"}).
    when("/drivers/:id", {templateUrl: "partials/driver.html", controller: "driverController"}).
    when("/create", {templateUrl: "partials/create.html", controller: "createDriverController"}).
    otherwise({redirectTo: '/drivers'});
}]);