angular.module('app').controller('SetGuestQuarantineController', function($scope, $rootScope, GuestService, MessageService, DateService) {

	Ladda.bind('button[iden=setButton]');
	$scope.working = false;

	$scope.toggleWorking = function() {
		$scope.working = !$scope.working;
		if(!$scope.working) {
			Ladda.stopAll();
		};
	};

	$scope.guest = [];
	$scope.loadMethod = function() {};
	$scope.mode = 0;

	$rootScope.guestQuarantine = [];

	$rootScope.guestQuarantine.setLoadMethod = function(loadMethod) {
		$scope.loadMethod = loadMethod;
	};

	$rootScope.guestQuarantine.setGuest = function(guest) {
		$scope.guest = angular.copy(guest);
		if($scope.guest.quarantine) {
			$scope.mode = 1;
		} else {
			$scope.mode = 0;
			$scope.guest.quarantine = [];
		};
	};

	$scope.set = function() {
		if(!$scope.guest.quarantine.comment) {
			$scope.guest.quarantine.comment = "";
		};
		$scope.guest.quarantine.createdate = DateService.currentDate();
		if($scope.mode == 0) {
			$scope.toggleWorking();
			GuestService.createQuarantine($scope.guest,
				function() {
					if($scope.loadMethod) {
						$scope.loadMethod();
					};
					MessageService.createSuccess_success("Karantænen");
					$('#setguestquarantinemodal').modal('hide');
					$scope.toggleWorking();
				},
				function() {
					MessageService.unexpectedError_danger();
					$scope.toggleWorking();
				});
		} else if($scope.mode == 1) {
			$scope.toggleWorking();
			GuestService.removeQuarantine($scope.guest,
				function() {
					if($scope.loadMethod) {
						$scope.loadMethod();
					};
					MessageService.deleteSuccess_success("Karantænen");
					$('#setguestquarantinemodal').modal('hide');
					$scope.toggleWorking();
				},
				function() {
					MessageService.unexpectedError_danger();
					$scope.toggleWorking();
				});
		}
	}

});