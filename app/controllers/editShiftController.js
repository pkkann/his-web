angular.module('app').controller('EditShiftController', function($scope, $rootScope, ShiftService, UserService, MessageService) {

	var saveButton = Ladda.create( document.getElementById('saveButton') );
	$scope.working = false;

	$scope.predicate = 'name';
	$scope.reverse = false;

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

	$scope.shift = [];
	$scope.loadMethod = function() {};

	$rootScope.editShift = [];
	$rootScope.editShift.setShift = function(shift) {
		$scope.shift = angular.copy(shift);
		$scope.addedUsers = $scope.shift.users;
		$scope.allUsers = $scope.removeFromArray($scope.addedUsers, $scope.allUsers);

		$scope.addedUsers.forEach(function(element) {
			if(element.id_user == $scope.shift.leader.id_user) {
				$scope.addedUsers.leader = element;
			};
		});

	};

	$scope.removeFromArray = function(arrayToRemove, array) {
		for	(i = 0; i < array.length; i++) {
			var eI = array[i];
			for	(e = 0; e < arrayToRemove.length; e++) {
				var eE = arrayToRemove[e];
				if(eI.id_user == eE.id_user) {
					array.splice(i, 1);
				}
			}
		}
		return array;
	};

	$rootScope.editShift.setLoadMethod = function(loadMethod) {
		$scope.loadMethod = loadMethod;
	};

	$scope.toggleWorking = function() {
		$scope.working = !$scope.working;
		if($scope.working) {
			saveButton.start();
		} else {
			saveButton.stop();
		};
	};

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

	$scope.save = function() {
		$scope.toggleWorking();
		$scope.shift.users = $scope.addedUsers;
		$scope.shift.leader = $scope.addedUsers.leader;
		ShiftService.save($scope.shift,
			function() {
				if($scope.loadMethod) {
					$scope.loadMethod();
				}
				MessageService.success("Vagten blev gemt successfuldt");
				$('#editshiftmodal').modal('hide');
				$scope.toggleWorking();
			},
			function() {
				MessageService.unexpectedError_danger();
				$scope.toggleWorking();
			});
	};

});