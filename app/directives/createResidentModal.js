angular.module('app').directive('createresidentmodal', function() {
	return {
		restrict: 'E',
		templateUrl: 'views/modals/createResidentModal.html',
		controller: 'CreateResidentController',
		transclude: true,
		scope: {
			cancelExtraAction: '&ngCancelExtraAction',
			createExtraAction: '&ngCreateExtraAction'
		}
	};
});