angular.module('app').controller('LockscreenController', function($scope, $state, $cookieStore, UserService, SessionService, MessageService) {

	var unlockButton = Ladda.create( document.getElementById('unlockButton') );
	$scope.working = false;

	$scope.toggleWorking = function() {
		$scope.working = !$scope.working;
		if($scope.working) {
			unlockButton.start();
		} else {
			unlockButton.stop();
		};
	};

	$scope.user = SessionService.getUser();
	$scope.lockUser = [];

	$scope.unlock = function() {
		if($scope.lockUser.password == $scope.user.password) {
			$cookieStore.remove(3);
			$state.go('dashboard');
		} else {
			MessageService.danger("Adgangskoden er forkert");
			$scope.lockUser.password = "";
		};
	};

	$scope.logout = function() {
		$cookieStore.remove(3);
		SessionService.setUserAuthenticated(null);
		$state.go('login');
	};

});