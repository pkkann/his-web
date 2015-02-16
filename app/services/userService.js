angular.module('app').service('UserService', function($http) {

	var site = "http://localhost:8888/his-web-prototype3B/interfaces/sql2/user/";

	this.create = function(user, successFunc, failFunc) {
		var page = "insertUser.php";

		var data = {
			'name' : user.name,
			'email' : user.email,
			'phone' : user.phone,
			'username' : user.username,
			'password' : user.password,
			'administrator' : user.administrator,
			'createdate' : user.createdate
		}

		$http.post(site + page, data).success(function(response) {
			if(response[0] == 0) {
				successFunc();
			} else {
				failFunc();
			};
		});
	};

	this.save = function(user, successFunc, failFunc) {
		var page = "updateUser.php";

		var data = {
			'id_user' : user.id_user,
			'name' : user.name,
			'email' : user.email,
			'phone' : user.phone,
			'username' : user.username,
			'password' : user.password,
			'administrator' : user.administrator,
			'createdate' : user.createdate
		}

		$http.post(site + page, data).success(function(response) {
			if(response[0] == 0) {
				successFunc();
			} else {
				failFunc();
			};
		});
	}

	this.delete = function(user, successFunc, failFunc) {
		var page = "deleteUser.php";

		data = {
			'id_user' : user.id_user
		}

		$http.post(site + page, data).success(function(response) {
			if(response[0] == 0) {
				successFunc();
			} else {
				failFunc();
			};
		});
	};

	this.getBy_username_password = function(username, password, callback) {
		var page = "getUserByUsernamePassword.php";

		var data = {
			'username' : username,
			'password' : password
		}

		$http.post(site + page, data).success(function(response) {
			callback(response);
		});
	};

	this.getAll = function(callback) {
		var page = "getAllUsers.php";

		$http.post(site + page).success(function(response) {
			callback(response);
		});
	};
});