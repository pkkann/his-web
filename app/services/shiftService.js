angular.module('app').service('ShiftService', function($http) {

	var site = "http://localhost:8888/his-web-prototype3B/interfaces/sql2/shift/";

	this.create = function(shift, successFunc, failFunc) {
		var page = "insertShift.php";

		var users = [];
		shift.users.forEach(function(user) {
			var u = {
				'id_user' : user.id_user,
				'name' : user.name,
				'email' : user.email,
				'phone' : user.phone,
				'username' : user.username,
				'password' : user.password,
				'administrator' : user.administrator,
				'createdate' : user.createdate
			}
			users.push(u);
		});

		var data = {
			'createdate' : shift.createdate,
			'closedate' : shift.closedate,
			'leader' : shift.leader,
			'users' : users
		}

		$http.post(site + page, data).success(function(response) {
			if(response[0] == 0) {
				successFunc();
			} else {
				failFunc();
			};
		});
	};

	this.save = function(shift, successFunc, failFunc) {
		var page = "updateShift.php";

		var users = [];
		shift.users.forEach(function(user) {
			var u = {
				'id_user' : user.id_user,
				'name' : user.name,
				'email' : user.email,
				'phone' : user.phone,
				'username' : user.username,
				'password' : user.password,
				'administrator' : user.administrator,
				'createdate' : user.createdate
			}
			users.push(u);
		});

		var data = {
			'id_shift' : shift.id_shift,
			'leader' : shift.leader,
			'users' : users
		}

		$http.post(site + page, data).success(function(response) {
			if(response[0] == 0) {
				successFunc();
			} else {
				failFunc();
			};
		});
	};

	this.closeShift = function(shift, successFunc, failFunc) {
		var page = "closeShift.php";

		var data = {
			'id_shift' : shift.id_shift,
			'closedate' : shift.closedate
		}
		$http.post(site + page, data).success(function(response) {
			if(response[0] == 0) {
				successFunc();
			} else {
				failFunc();
			};
		});
	};

	this.reopenShift = function(shift, successFunc, failFunc) {
		var page = "reopenShift.php";

		var data = {
			'id_shift' : shift.id_shift
		}
		$http.post(site + page, data).success(function(response) {
			if(response[0] == 0) {
				successFunc();
			} else {
				failFunc();
			};
		});
	};

	this.getOpenShift = function(callback) {
		var page = "getOpenShift.php";

		$http.post(site + page).success(function(response) {
			callback(response);
		});
	};

	this.isShiftOpen = function(yes, no) {
		var page = "getOpenShift.php";

		$http.post(site + page).success(function(response) {
			if(response.length > 0) {
				yes();
			} else {
				no();
			};
		});
	};
	
	this.getAll = function(callback) {
		var page = "getAllShifts.php";

		$http.post(site + page).success(function(response) {
			callback(response);
		});
	};
	
});