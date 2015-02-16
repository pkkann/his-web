angular.module('app').controller('ChangePasswordController', function($scope, $rootScope, SessionService, UserService, MessageService, GeneratorService) {

	Ladda.bind('button[iden=changeButton]');
	$scope.working = false;
	$scope.loadMethod = function() {};
	$scope.user = [];
	$scope.newUser = [];
	$scope.admin = false;

	$scope.toggleWorking = function() {
		$scope.working = !$scope.working;
		if(!$scope.working) {
			Ladda.stopAll();
		};
	};

	$scope.reset = function() {
		$scope.user = [];
		$scope.newUser = [];
		$scope.admin = false;
	};

	$scope.validate = function() {
		if($scope.form.$invalid) {
			return 1;
		};
		if(!$scope.admin) {
			if($scope.user.password != $scope.newUser.currentPass) {
				return 2;
			};
		}
		if($scope.newUser.newPass != $scope.newUser.newPass2) {
			return 3;
		};
		return 0;
	};
	
	$scope.changePass = function() {
		$scope.toggleWorking();
		var validate = $scope.validate();
		if(validate == 0) {
			$scope.user.password = $scope.newUser.newPass;
			UserService.save($scope.user,
				function() {
					if($scope.isProfile) {
						SessionService.reSetUser($scope.user);
					};
					MessageService.passwordChanged_success();
					if($scope.loadMethod) {
						$scope.loadMethod();
					};
					$('#changepasswordmodal').modal('hide');
					$scope.reset();
					$scope.toggleWorking();
				},
				function() {
					MessageService.unexpectedError_danger();
					$scope.toggleWorking();
				});
		} else if(validate == 1) {
			MessageService.allFields_danger();
			$scope.toggleWorking();
		} else if(validate == 2) {
			MessageService.currentPass_danger();
			$scope.toggleWorking();
		} else if(validate == 3) {
			MessageService.newPassNotSame_danger();
			$scope.toggleWorking();
		};
	};

	$rootScope.changePassword = [];
	$rootScope.changePassword.setUser = function(user) {
		$scope.user = angular.copy(user);
	};

	$rootScope.changePassword.setLoadMethod = function(loadMethod) {
		$scope.loadMethod = loadMethod;
	};

	$rootScope.changePassword.setAdmin = function(admin) {
		$scope.admin = admin;
	};

});