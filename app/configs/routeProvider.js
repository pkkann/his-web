angular.module('app').config(function($urlRouterProvider, $stateProvider) {
	$urlRouterProvider.otherwise('/shiftmenu');

	for(var state in window.routes) {
		$stateProvider.state(state, window.routes[state]);
	};
}).run(function($rootScope, SessionService, ShiftService, $state, $cookieStore) {
	$rootScope.$on("$locationChangeStart", function(event, next, current) {
		for(var i in window.routes) {
			if(next.indexOf(i) != -1) {
				if($cookieStore.get(3) && window.routes[i].name != "lockscreen") {
					event.preventDefault();
					$state.go('lockscreen');
				} else if(window.routes[i].requireLogin && !SessionService.getAuthenticated()) {
					event.preventDefault();
					$state.go('login');
				} else if(window.routes[i].requireAdmin && !SessionService.getIsAdmin()) {
					event.preventDefault();
					$state.go('error-admin');
				} else if(window.routes[i].name != "shiftmenu" && window.routes[i].name != "login") {
					ShiftService.isShiftOpen(
						function() {
							if(!SessionService.getIsAdmin()) {
								SessionService.onShift(
									function() {

									},
									function() {
										event.preventDefault();
										$state.go('error-shift');
									});
							};
						},
						function() {
							if(!SessionService.getIsAdmin()) {
								event.preventDefault();
								$state.go('error-shift');
							};
						});
				};
			};
		};
	});
});