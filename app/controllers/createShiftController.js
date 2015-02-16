angular.module('app').controller('CreateShiftController', function($scope, $state, UserService, DateService, ShiftService, MessageService) {

	var createButton = Ladda.create( document.getElementById('createButton') );
	$scope.working = false;

	$scope.predicate = 'name';
	$scope.reverse = false;

	$scope.toggleWorking = function() {
		$scope.working = !$scope.working;
		if($scope.working) {
			createButton.start();
		} else {
			createButton.stop();
		};
	};

	$scope.allUsers = [];
	$scope.addedUsers = [];

	$scope.allUsers.loading = true;
	$scope.addedUsers.loading = true;

	$scope.loadUsers = function() {
		UserService.getAll(function(response) {
			$scope.allUsers = response;
			$scope.allUsers.loading = false;
			$scope.addedUsers.loading = false;
		});
	};

	$scope.loadUsers();

	$scope.addUser = function() {
		if($scope.allUsers.selected) {
			$scope.addedUsers.push($scope.allUsers.selected);
			$scope.allUsers.splice($scope.allUsers.indexOf($scope.allUsers.selected), 1);
			$scope.allUsers.selected = undefined;
		}
	};

	$scope.removeUser = function() {
		if($scope.addedUsers.selected) {
			$scope.allUsers.push($scope.addedUsers.selected);
			$scope.addedUsers.splice($scope.addedUsers.indexOf($scope.addedUsers.selected), 1);
			$scope.addedUsers.selected = undefined;
		}
	};


	$scope.create = function() {
		$scope.toggleWorking();
		var shift = [];
		shift.createdate = DateService.currentDate();
		shift.closedate = "";
		shift.users = $scope.addedUsers;
		shift.leader = $scope.addedUsers.leader;
		ShiftService.create(shift,
			function() {
				if($scope.loadMethod) {
					$scope.loadMethod();
				};
				MessageService.success("Vagten blev oprettet successfuldt");
				$('#' + $scope.identify).modal('hide');
				$scope.reset();
				$scope.toggleWorking();
			},
			function() {
				MessageService.unexpectedError_danger();
				$scope.toggleWorking();
			});
	};

	$scope.reset = function() {
		$scope.allUsers = [];
		$scope.addedUsers = [];

		$scope.allUsers.loading = true;
		$scope.addedUsers.loading = true;

		$scope.loadUsers();
	};

});