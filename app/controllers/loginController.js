angular.module('app').controller('LoginController', function($scope, $state, UserService, SessionService, MessageService) {

	var loginButton = Ladda.create( document.getElementById('loginButton') );
	$scope.working = false;

	$scope.toggleWorking = function() {
		$scope.working = !$scope.working;
		if($scope.working) {
			loginButton.start();
		} else {
			loginButton.stop();
		};
	};

	$scope.user = [];

	$scope.validate = function() {
		return 0;
	};
	
	$scope.login = function() {
		$scope.toggleWorking();
		var validate = $scope.validate();
		if(validate == 0) {
			UserService.getBy_username_password($scope.user.username, $scope.user.password,
				function(response) {
					if(response.length > 0) {
						SessionService.setUserAuthenticated(response[0]);
						$state.go("shiftmenu");
						$scope.toggleWorking();
					} else {
						MessageService.danger("Brugernavn eller adgangskode er forkert");
						$scope.toggleWorking();
					};
				});
		};
	};

});