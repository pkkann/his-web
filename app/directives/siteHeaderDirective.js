angular.module('app').directive('siteHeader', function() {
	return {
		restrict: 'E',
		templateUrl: 'templates/header.html',
		controller: 'TemplateController'
	};
});