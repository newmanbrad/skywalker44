angular.module('F1FeederApp.controllers', []).

/* Drivers controller */
controller('driversController', function($scope, ergastAPIservice) {
    $scope.nameFilter = null;
    $scope.driversList = [];

    $scope.searchFilter = function (driver) {
        var re = new RegExp($scope.nameFilter, 'i');
        return !$scope.nameFilter || re.test(driver.Driver.givenName) || re.test(driver.Driver.familyName);
    };

    /* callback for ng-click 'deleteUser': */
    $scope.deleteDriver = function (driverId) {
        ergastAPIservice.delete({ id: driverId });
    };

    ergastAPIservice.getDrivers().success(function (response) {
        //Digging into the response to get the relevant data
        $scope.driversList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    });
}).

/* Create driver controller */
controller('createDriverController', ['$scope','ergastAPIservice','$location', function($scope, ergastAPIservice, $location) {

    /* callback for ng-click 'updateDriver': */
    $scope.createNewDriver = function () {
        ergastAPIservice.create($scope.driver);
        $location.path('/drivers');
    };

}]).


/* Driver controller */
controller('driverController', function($scope, $routeParams, ergastAPIservice) {
    $scope.id = $routeParams.id;
    $scope.races = [];
    $scope.driver = null;

    ergastAPIservice.getDriverDetails($scope.id).success(function (response) {
        $scope.driver = response.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
    });

    ergastAPIservice.getDriverRaces($scope.id).success(function (response) {
        $scope.races = response.MRData.RaceTable.Races;
    });
});