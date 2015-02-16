angular.module('app').controller('SetResidentQuarantineController', function($scope, $rootScope, ResidentService, MessageService, DateService) {

	Ladda.bind('button[iden=setButton]');
	$scope.working = false;

	$scope.toggleWorking = function() {
		$scope.working = !$scope.working;
		if(!$scope.working) {
			Ladda.stopAll();
		};
	};

	$scope.resident = [];
	$scope.loadMethod = function() {};
	$scope.mode = 0;

	$rootScope.residentQuarantine = [];

	$rootScope.residentQuarantine.setLoadMethod = function(loadMethod) {
		$scope.loadMethod = loadMethod;
	};

	$rootScope.residentQuarantine.setResident = function(resident) {
		$scope.resident = angular.copy(resident);
		if($scope.resident.quarantine) {
			$scope.mode = 1;
		} else {
			$scope.mode = 0;
			$scope.resident.quarantine = [];
		};
	};

	$scope.set = function() {
		if(!$scope.resident.quarantine.comment) {
			$scope.resident.quarantine.comment = "";
		};
		$scope.resident.quarantine.createdate = DateService.currentDate();
		if($scope.mode == 0) {
			$scope.toggleWorking();
			ResidentService.createQuarantine($scope.resident,
				function() {
					if($scope.loadMethod) {
						$scope.loadMethod();
					};
					MessageService.createSuccess_success("Karantænen");
					$('#setresidentquarantinemodal').modal('hide');
					$scope.toggleWorking();
				},
				function() {
					MessageService.unexpectedError_danger();
					$scope.toggleWorking();
				});
		} else if($scope.mode == 1) {
			$scope.toggleWorking();
			ResidentService.removeQuarantine($scope.resident,
				function() {
					if($scope.loadMethod) {
						$scope.loadMethod();
					};
					MessageService.deleteSuccess_success("Karantænen");
					$('#setresidentquarantinemodal').modal('hide');
					$scope.toggleWorking();
				},
				function() {
					MessageService.unexpectedError_danger();
					$scope.toggleWorking();
				});
		}
	}

});