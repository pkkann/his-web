angular.module('app').controller('ResidentsController', function($scope, $log, $filter, $state, SessionService, ResidentService, ShiftService, DateService, MessageService) {

	$scope.residents = [];
	$scope.shift = [];
	$scope.anyOpen = false;
	$scope.onShift = false;
	$scope.isAdmin = false;
	$scope.working = false;
	$scope.predicate = 'name';
	$scope.reverse = false;

	$scope.load = function() {
		$scope.residents = [];
		console.info("Loading residents");
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
			ResidentService.getAll($scope.shift, function(response) {
				$scope.residents = response;
				$scope.working = false;
			});
			$scope.isAdmin = SessionService.getIsAdmin();
		});
	};

	$scope.load();

	$scope.getQuarantineMode = function(resident) {
		if(resident.quarantine) {
			return 1;
		} else {
			return 0;
		};
	}

	$scope.getQuarantineTitle = function(resident) {
		if(resident.quarantine) {
			return "Slet karantæne";
		} else {
			return "Opret karantæne";
		};
	}

	$scope.getEnrollMode = function(resident) {
		if(resident.enrollment) {
			return 1;
		} else {
			return 0;
		};
	};

	$scope.getEnrollTitle = function(resident) {
		if(resident.enrollment) {
			return "Slet indskrivning";
		} else {
			return "Opret indskrivning";
		};
	};

	$scope.setEnroll = function(resident) {
		var res = angular.copy(resident);
		if(res.enrollment) {
			$('#workingmodal').modal('show');
			ResidentService.removeEnrollment($scope.shift, res,
				function() {
					MessageService.deleteSuccess_success("Indskrivningen");
					$scope.load();
					$('#workingmodal').modal('hide');
				},
				function() {
					MessageService.unexpectedError_danger();
					$('#workingmodal').modal('hide');
				});
		} else if(!res.enrollment) {
			if(!res.quarantine) {
				$('#workingmodal').modal('show');
				res.enrollment = [];
				res.enrollment.createdate = DateService.currentDate();
				ResidentService.createEnrollment($scope.shift, res,
					function() {
						MessageService.createSuccess_success("Indskrivningen");
						$scope.load();
						$('#workingmodal').modal('hide');
					},
					function() {
						MessageService.unexpectedError_danger();
						$('#workingmodal').modal('hide');
					});
			} else {
				MessageService.danger("Beboeren har karantæne og kan derfor ikke indskrives");
			}
		};
	};

});