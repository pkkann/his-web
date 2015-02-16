angular.module('app').directive('changepasswordmodal', function() {
	return {
		restrict: 'AE',
		templateUrl: 'views/modals/changePasswordModal.html',
		controller: 'ChangePasswordController',
		replace: true,
		scope: {
			inUser: '=user',
			isProfile: '=profile',
			identify: '=identify',
			admin: '=admin',
			loadMethod: '&ngLoadMethod'
		}
	};
});