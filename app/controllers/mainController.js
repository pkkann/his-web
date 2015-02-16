angular.module('app').controller('MainController', function($scope, $state, TimerService) {

	$scope.isState = function(state) {
		return $state.is(state);
	}

	$scope.resetTimer = function() {
		TimerService.resetTimer();
	}

	TimerService.init();

});