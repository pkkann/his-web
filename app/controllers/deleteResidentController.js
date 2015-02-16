angular.module('app').controller('DeleteResidentController', function(ResidentService, $rootScope, $scope, MessageService) {

	Ladda.bind('button[iden=deleteButton]');
	$scope.working = false;
	$scope.resident = [];
	$scope.loadMethod = function() {};

	$scope.toggleWorking = function() {
		$scope.working = !$scope.working;
		if(!$scope.working) {
			Ladda.stopAll();
		};
	};

	$scope.delete = function() {
		$scope.toggleWorking();
		ResidentService.delete($scope.resident,
			function() {
				$('#deleteresidentmodal').modal('hide');
				if($scope.loadMethod) {
					$scope.loadMethod();
				}
				MessageService.deleteSuccess_success("Beboeren");
				$scope.toggleWorking();
			},
			function() {
				MessageService.unexpectedError_danger();
				$scope.toggleWorking();
			});
	};
	$rootScope.deleteResident = [];
	$rootScope.deleteResident.setResident = function(resident) {
		$scope.resident = angular.copy(resident);
	};

	$rootScope.deleteResident.setLoadMethod = function(loadMethod) {
		$scope.loadMethod = loadMethod;
	};

});