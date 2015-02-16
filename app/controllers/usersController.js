angular.module('app').controller('UsersController', function($rootScope, $scope, UserService, SessionService, ShiftService, MessageService) {
	
	$scope.users = [];
	$scope.shift = [];
	$scope.working = false;
	$scope.predicate = 'name';
	$scope.reverse = false;

	$scope.load = function() {
		$scope.users = [];
		console.info("Loading users");
		$scope.working = true;
		ShiftService.getOpenShift(function(response) {
				$scope.shift = response[0];

				UserService.getAll(function(response) {
					$scope.users = response;
					$scope.working = false;
				});
			});
	};

	$scope.load();

	$scope.isSelf = function(user) {
		if(SessionService.getUser()) {
			if(user.id_user == SessionService.getUser().id_user) {
				return false;
			} else {
				return true;
			};
		} else {
			return false;
		};
	};

	$scope.onShift = function(user) {
		var on = false;
		if($scope.shift) {
			$scope.shift.users.forEach(function(u) {
				if(user.id_user == u.id_user) {
					on = true;
				};
			});
		}
		return on;
	};

});