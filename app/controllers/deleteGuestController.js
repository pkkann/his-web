angular.module('app').controller("DeleteGuestController", function($scope, $rootScope, GuestService, MessageService) {

	Ladda.bind('button[iden=deleteButton]');
	$scope.working = false;
	$scope.guest = [];
	$scope.loadMethod = function() {};

	$scope.toggleWorking = function() {
		$scope.working = !$scope.working;
		if(!$scope.working) {
			Ladda.stopAll();
		};
	};

	$scope.delete = function() {
		$scope.toggleWorking();
		GuestService.delete($scope.guest,
			function() {
				$('#deleteguestmodal').modal('hide');
				if($scope.loadMethod) {
					$scope.loadMethod();
				};
				MessageService.deleteSuccess_success("Gæsten");
				$scope.toggleWorking();
			},
			function() {
				MessageService.unexpectedError_danger();
				$scope.toggleWorking();
			});
	};

	$rootScope.deleteGuest = [];
	$rootScope.deleteGuest.setGuest = function(guest) {
		$scope.guest = angular.copy(guest);
	};

	$rootScope.deleteGuest.setLoadMethod = function(loadMethod) {
		$scope.loadMethod = loadMethod;
	};

});