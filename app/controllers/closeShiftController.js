angular.module('app').controller('CloseShiftController', function($scope, $rootScope, $state, ShiftService, MessageService, DateService) {

	Ladda.bind('button[iden=closeButton]');
	$scope.working = false;
	$scope.shift = [];
	$scope.loadMethod = function() {};

	$scope.toggleWorking = function() {
		$scope.working = !$scope.working;
		if(!$scope.working) {
			Ladda.stopAll();
		};
	};

	$scope.closeShift = function() {
		$scope.toggleWorking();
		$scope.shift.closedate = DateService.currentDate();

		ShiftService.closeShift($scope.shift,
			function() {
				$('#closeshiftmodal').modal('hide');
				if($scope.loadMethod) {
					$scope.loadMethod();
				};
				MessageService.success("Vagten blev afsluttet successfuldt");
				$scope.toggleWorking();
			},
			function() {
				MessageService.unexpectedError_danger();
				$scope.toggleWorking();
			});
	};

	$rootScope.closeShift = [];
	$rootScope.closeShift.setShift = function(shift) {
		$scope.shift = angular.copy(shift);
	};

	$rootScope.closeShift.setLoadMethod = function(loadMethod) {
		$scope.loadMethod = loadMethod;
	}

});