angular.module('app').controller('TemplateController', function($rootScope, $scope, $state, SessionService, ShiftService, DateService, MessageService, TimerService) {

	$('[data-toggle="tooltip"]').tooltip();

	$scope.anyOpen = false;
	$scope.onShift = false;

	$rootScope.$on('$stateChangeStart', 
	function(event, toState, toParams, fromState, fromParams){
		$scope.load();
	});

	$scope.load = function() {
		ShiftService.getOpenShift(function(response) {
			if(response.length > 0) {
				$scope.anyOpen = true;
				$scope.onShift = false;
				if(SessionService.getUser()) {
					response[0].users.forEach(function(user) {
						if(user.id_user == SessionService.getUser().id_user) {
							$scope.onShift = true;
						};
					});
				}
			} else {
				$scope.anyOpen = false;
				$scope.onShift = false;
			};
		});
	};

	$scope.load();

	$scope.loggedIn = function() {
		return SessionService.getAuthenticated();
	};

	$scope.loggedInUserIsAdmin = function() {
		return SessionService.getIsAdmin();
	};

	$scope.getLoggedInUser = function() {
		return SessionService.getUser();
	};

	$scope.logout = function() {
		SessionService.setUserAuthenticated(null);
		$state.go('login');
	};

	$scope.isState = function(state) {
		return $state.is(state);
	};

	$scope.lockScreen = function() {
		TimerService.lockNow();
	}

});