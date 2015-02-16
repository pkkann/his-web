angular.module('app').controller("DeleteUserController", function($scope, $rootScope, UserService, MessageService) {

	Ladda.bind('button[iden=deleteButton]');
	$scope.working = false;
	$scope.user = [];
	$scope.loadMethod = function() {};

	$scope.toggleWorking = function() {
		$scope.working = !$scope.working;
		if(!$scope.working) {
			Ladda.stopAll();
		};
	};

	$scope.delete = function() {
		$scope.toggleWorking();
		UserService.delete($scope.user,
			function() {
				$('#deleteusermodal').modal('hide');
				if($scope.loadMethod) {
					$scope.loadMethod();
				};
				MessageService.deleteSuccess_success("Brugeren");
				$scope.toggleWorking();
			},
			function() {
				MessageService.unexpectedError_danger();
				$scope.toggleWorking();
			});
	};

	$rootScope.deleteUser = [];
	$rootScope.deleteUser.setUser = function(user) {
		$scope.user = angular.copy(user);
	};

	$rootScope.deleteUser.setLoadMethod = function(loadMethod) {
		$scope.loadMethod = loadMethod;
	};

});