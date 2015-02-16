angular.module('app').service('SessionService', function($cookieStore, ShiftService){
    var user;

    this.setUserAuthenticated = function(userToAuthenticate){
        user = userToAuthenticate;
        if(user) {
            $cookieStore.put(1, userToAuthenticate);
        } else {
            $cookieStore.remove(1);
        };
    };

    this.reSetUser = function(userToReSet) {
        this.setUserAuthenticated(null);
        this.setUserAuthenticated(userToReSet);
    };

    this.getAuthenticated = function(){
        if(user) {
            return true;
        } else {
            return false;
        };
    };

    this.getIsAdmin = function() {
        if(user) {
            if(user.administrator == 0) {
                return false;
            } else {
                return true;
            };
        } else {
            return false;
        };
    };

    this.onShift = function(yes, no) {
        if(user) {
            var shift = [];
            ShiftService.getOpenShift(function(response) {
                if(response.length > 0) {
                    shift = response[0];
                    var answer = false;
                    shift.users.forEach(function(u) {
                        if(u.id_user == user.id_user) {
                            answer = true;
                        };
                    });
                    if(answer) {
                        yes();
                    } else {
                        no();
                    };
                } else {
                    no();
                };
            });
        } else {
            no();
        };
    };

    this.getUser = function() {
    	return user;
    };
});