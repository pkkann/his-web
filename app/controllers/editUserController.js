angular.module('app').controller('EditUserController', function($scope, $rootScope, UserService, MessageService) {

	Ladda.bind('button[iden=saveButton]');
	$scope.working = false;

	$scope.toggleWorking = function() {
		$scope.working = !$scope.working;
		if(!$scope.working) {
			Ladda.stopAll();
		};
	};

	$scope.user = [];
	$scope.loadMethod = function() {};

	$rootScope.editUser = [];
	$rootScope.editUser.setUser = function(user) {
		$scope.user = angular.copy(user);
	};

	$rootScope.editUser.setLoadMethod = function(loadMethod) {
		$scope.loadMethod = loadMethod;
	};

	$scope.reset = function() {
		$scope.form.inputName.$dirty = false;
		$scope.form.inputEmail.$dirty = false;
		$scope.form.inputPhone.$dirty = false;
	};

	$scope.validate = function() {
		var validate = 0;
		if($scope.form.$invalid) {
			validate = 1;
		};
		return validate;
	};

	$scope.save = function() {
		var validate = $scope.validate();
		$scope.toggleWorking();
		if(validate == 0) {
			UserService.save($scope.user,
				function() {
					$scope.toggleWorking();
					if($scope.loadMethod) {
						$scope.loadMethod();
					};
					$('#editusermodal').modal('hide');
					$scope.reset();
					MessageService.editSuccess_success("Brugeren");
				},
				function() {
					MessageService.unexpectedError_danger();
					$scope.toggleWorking();
				});
		} else if(validate == 1) {
			MessageService.allFields_danger();
			$scope.toggleWorking();
		};
	};

});