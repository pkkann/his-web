angular.module('app').controller('ReopenShiftController', function($scope, $rootScope, ShiftService, MessageService) {

	Ladda.bind('button[iden=reopenButton]');
	$scope.working = false;
	$scope.shift = [];
	$scope.loadMethod = function() {};

	$scope.toggleWorking = function() {
		$scope.working = !$scope.working;
		if(!$scope.working) {
			Ladda.stopAll();
		};
	};

	$scope.reopenShift = function() {
		$scope.toggleWorking();

		ShiftService.reopenShift($scope.shift,
			function() {
				$('#reopenshiftmodal').modal('hide');
				if($scope.loadMethod) {
					$scope.loadMethod();
				};
				MessageService.success("Vagten blev genåbnet successfuldt");
				$scope.toggleWorking();
			},
			function() {
				MessageService.unexpectedError_danger();
				$scope.toggleWorking();
			});
	};

	$rootScope.reopenShift = [];
	$rootScope.reopenShift.setShift = function(shift) {
		$scope.shift = angular.copy(shift);
	};

	$rootScope.reopenShift.setLoadMethod = function(loadMethod) {
		$scope.loadMethod = loadMethod;
	}

});