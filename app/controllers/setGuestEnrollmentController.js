angular.module('app').controller('SetGuestEnrollmentController', function($scope, $rootScope, GuestService, ResidentService, ShiftService, SessionService, MessageService, DateService) {

	$scope.residents = [];
	$scope.guest = [];
	$rootScope.guestEnrollment = [];
	$scope.loadMethod = function() {};
	$scope.mode = 0;
	$scope.working = false;
	$scope.loading = false;
	$scope.onShift = false;
	$scope.anyOpen = false;
	$scope.shift = [];
	$scope.isAdmin = false;
	$scope.predicate = 'name';
	$scope.reverse = false;

	Ladda.bind('button[iden=setButton]');

	$scope.toggleWorking = function() {
		$scope.working = !$scope.working;
		if(!$scope.working) {
			Ladda.stopAll();
		};
	};

	$scope.load = function() {
		console.log("LOL");
		$scope.residents = [];
		$scope.loading = true;
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
			ResidentService.getAllEnrolled($scope.shift, function(response) {
				$scope.residents = response;
				$scope.loading = false;
			});
			$scope.isAdmin = SessionService.getIsAdmin();
		});
	};

	$rootScope.guestEnrollment.setLoadMethod = function(loadMethod) {
		$scope.loadMethod = loadMethod;
	}

	$rootScope.guestEnrollment.setGuest = function(guest) {
		$scope.guest = angular.copy(guest);
		if($scope.guest.enrollment) {
			$scope.mode = 1;
		} else {
			$scope.load();
			$scope.mode = 0;
			$scope.guest.enrollment = [];
		}
	}

	$scope.set = function() {
		if($scope.mode == 0) {
			// Insert
			$scope.toggleWorking();
			$scope.guest.enrollment.createdate = DateService.currentDate();
			GuestService.createEnrollment($scope.shift, $scope.guest, $scope.residents.selected,
				function() {
					if($scope.loadMethod) {
						$scope.loadMethod();
					}
					MessageService.createSuccess_success("Indskrivningen");
					$('#setguestenrollmentmodal').modal('hide');
					$scope.toggleWorking();
				},
				function() {
					MessageService.unexpectedError_danger();
					$scope.toggleWorking();
				});
		} else if($scope.mode == 1) {
			//Delete
			$scope.toggleWorking();
			GuestService.removeEnrollment($scope.guest,
				function() {
					if($scope.loadMethod) {
						$scope.loadMethod();
					}
					MessageService.deleteSuccess_success("Indskrivningen");
					$('#setguestenrollmentmodal').modal('hide');
					$scope.toggleWorking();
				},
				function() {
					MessageService.unexpectedError_danger();
					$scope.toggleWorking();
				});
		}
	};

});