angular.module('app').directive('createusermodal', function() {
	return {
		restrict: 'E',
		templateUrl: 'views/modals/createUserModal.html',
		controller: 'CreateUserController',
		transclude: true,
		scope: {
			cancelExtraAction: '&ngCancelExtraAction',
			createExtraAction: '&ngCreateExtraAction',
			users: '=users'
		}
	};
});