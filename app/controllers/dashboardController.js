angular.module('app').controller('DashboardController', function(SessionService, $scope, ShiftService, DateService) {

	$scope.getLoggedInUser = function() {
		return SessionService.getUser();
	};

});