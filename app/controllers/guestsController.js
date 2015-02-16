angular.module('app').controller('GuestsController', function($scope, ShiftService, GuestService, SessionService) {

	$scope.guests = [];
	$scope.shift = [];
	$scope.anyOpen = false;
	$scope.onShift = false;
	$scope.isAdmin = false;
	$scope.working = false;
	$scope.predicate = 'name';
	$scope.reverse = false;

	$scope.load = function() {
		$scope.guests = [];
		console.info("Loading guests");
		$scope.working = true;
		ShiftService.getOpenShift(function(response) {
			if(response.length > 0){
				$scope.shift = response[0];
				$scope.anyOpen = true;
				for (var i = 0; i < $scope.shift.users.length; ++i) {
					var user = $scope.shift.users[i];
					if(user.id_user == SessionService.getUser().id_user) {
						$scope.onShift = true;
						break;
					}
				}
			};
			GuestService.getAll($scope.shift, function(response) {
				$scope.guests = response;
				$scope.working = false;
			});
			$scope.isAdmin = SessionService.getIsAdmin();
		});
	};

	$scope.load();

	$scope.getQuarantineMode = function(guest) {
		if(guest.quarantine) {
			return 1;
		} else {
			return 0;
		};
	}

	$scope.getQuarantineTitle = function(guest) {
		if(guest.quarantine) {
			return "Slet karantæne";
		} else {
			return "Opret karantæne";
		};
	}

	$scope.getEnrollMode = function(guest) {
		if(guest.enrollment) {
			return 1;
		} else {
			return 0;
		};
	};

	$scope.getEnrollTitle = function(guest) {
		if(guest.enrollment) {
			return "Slet indskrivning";
		} else {
			return "Opret indskrivning";
		};
	};

});