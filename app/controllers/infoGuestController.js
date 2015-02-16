angular.module('app').controller('InfoGuestController', function($scope, $rootScope) {

	$scope.guest = [];
	
	$rootScope.infoGuest = [];
	$rootScope.infoGuest.setGuest = function(guest) {
		$scope.guest = guest;
	};

});