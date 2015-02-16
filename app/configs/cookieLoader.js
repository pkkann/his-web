angular.module('app').run(function($cookieStore, SessionService, UserService, ShiftService) {
	//$.simplyToast('This website uses cookies', 'info');
	
    var user = $cookieStore.get(1);
    if(user) {
		SessionService.setUserAuthenticated(user);
    };
});