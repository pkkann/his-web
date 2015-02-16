angular.module('app').controller('InfoResidentController', function($scope, $rootScope) {

	$scope.resident = [];
	
	$rootScope.infoResident = [];
	$rootScope.infoResident.setResident = function(resident) {
		$scope.resident = resident;
	};

});