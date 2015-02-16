angular.module('app').controller('ProfileController', function($scope, SessionService, UserService, MessageService) {

	var saveButton = Ladda.create( document.getElementById('saveButton') );
	$scope.working = false;
	
	$scope.user = angular.copy(SessionService.getUser());
	$scope.origUser = angular.copy($scope.user);
	

	$scope.toggleWorking = function() {
		$scope.working = !$scope.working;
		if($scope.working) {
			saveButton.start();
		} else {
			saveButton.stop();
		};
	};

	$scope.reload = function() {
		$scope.user = angular.copy(SessionService.getUser());
		$scope.origUser = angular.copy($scope.user);
	};

	$scope.changed = function() {
		if(angular.equals($scope.user, $scope.origUser)) {
			return false;
		} else {
			return true;
		};
	};

	$scope.validate = function() {
		if($scope.form.$invalid) {
			return 1;
		};
		return 0;
	};

	$scope.save = function() {
		$scope.toggleWorking();
		var validate = $scope.validate();
		if(validate == 0) {
			UserService.save($scope.user,
				function() {
					SessionService.reSetUser($scope.user);
					$scope.user = angular.copy(SessionService.getUser());
					$scope.origUser = angular.copy($scope.user);
					MessageService.saveSuccess_success("Profilen");
					$scope.toggleWorking();
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