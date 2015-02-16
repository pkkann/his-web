angular.module('app').directive('createshiftmodal', function() {
	return {
		restrict: 'E',
		templateUrl: 'views/modals/createShiftModal.html',
		controller: 'CreateShiftController',
		transclude: true,
		scope: {
			identify: '=identify',
			loadMethod: '&ngLoadMethod'
		}
	};
});