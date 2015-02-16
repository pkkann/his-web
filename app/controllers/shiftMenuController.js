angular.module('app').controller('ShiftMenuController', function($scope, $rootScope, ShiftService, SessionService, $state, DateService, MessageService) {

	$scope.loading = false;
	$scope.anyOpen = false;
	$scope.onShift = false;
	$scope.isLeader = false;
	$scope.isAdmin = false;
	$scope.shift = [];

	$scope.load = function() {
		$scope.loading = true;
		$scope.onShift = false;
		$scope.isLeader = false;
		$scope.isAdmin = false;
		ShiftService.getOpenShift(
			function(response) {
				var loggedInUser = SessionService.getUser();
				if(loggedInUser.administrator == 1) {
					$scope.isAdmin = true;
				};
				if(response.length > 0) {
					$scope.shift = response[0];

					$scope.shift.users.forEach(function(user) {
						if(user.id_user == loggedInUser.id_user) {
							$scope.onShift = true;
						};
					});
					if($scope.shift.leader.id_user == loggedInUser.id_user) {
						$scope.isLeader = true;
					};
					
					$scope.anyOpen = true;
				} else {
					$scope.anyOpen = false;
				};
				$scope.loading = false;
			});
	};

	$scope.reload = function() {
		$scope.load();
	};

	$scope.reload();

});