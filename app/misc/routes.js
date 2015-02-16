window.routes =
{
	"login": {
    	url: '/login',
        templateUrl: 'views/login.html', 
        controller: 'LoginController as loginCtrl', 
        requireLogin: false,
        requireAdmin: false
    },
    "dashboard": {
        url: '/dashboard',
        templateUrl: 'views/dashboard.html', 
        controller: 'DashboardController as dashboardCtrl', 
        requireLogin: true,
        requireAdmin: false
    },
    "residents": {
    	url: '/residents',
        templateUrl: 'views/residents.html', 
        controller: 'ResidentsController as residentsCtrl', 
        requireLogin: true,
        requireAdmin: false
    },
    "guests": {
        url: '/guests',
        templateUrl: 'views/guests.html', 
        controller: 'GuestsController as guestsCtrl', 
        requireLogin: true,
        requireAdmin: false
    },
    "users": {
        url: '/users',
        templateUrl: 'views/users.html', 
        controller: 'UsersController as usersCtrl', 
        requireLogin: true,
        requireAdmin: true
    },
    "profile": {
        url: '/profile',
        templateUrl: 'views/profile.html', 
        controller: 'ProfileController as profileCtrl', 
        requireLogin: true,
        requireAdmin: false
    },
    "shifts": {
        url: '/shifts',
        templateUrl: 'views/shifts.html', 
        controller: 'ShiftsController as shiftsCtrl', 
        requireLogin: true,
        requireAdmin: true
    },
    "shiftmenu": {
        url: '/shiftmenu',
        templateUrl: 'views/shiftmenu.html', 
        controller: 'ShiftMenuController as shiftMenuCtrl', 
        requireLogin: true,
        requireAdmin: false
    },
    "error-admin": {
        url: '/error-admin',
        templateUrl: 'views/error-admin.html', 
        requireLogin: false,
        requireAdmin: false
    },
    "error-shift": {
        url: '/error-shift',
        templateUrl: 'views/error-shift.html', 
        requireLogin: false,
        requireAdmin: false
    },
    "error-shiftleader": {
        url: '/error-shiftleader',
        templateUrl: 'views/error-shiftleader.html', 
        requireLogin: false,
        requireAdmin: false
    },
    "lockscreen": {
        url: '/lockscreen',
        templateUrl: 'views/lockscreen.html',
        controller: 'LockscreenController as lsCtrl',
        requireLogin: true,
        requireAdmin: false
    }

};