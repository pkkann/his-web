angular.module('app').service('GuestService', function($http) {
	var site = "http://localhost:8888/his-web-prototype3B/interfaces/sql2/guest/";

	this.create = function(guest, successFunc, failFunc) {
		var page = "insertGuest.php";

		var data = {
			'name' : guest.name,
			'address' : guest.address,
			'birthday' : guest.birthday,
			'createdate' : guest.createdate
		}

		$http.post(site + page, data).success(function(response) {
			if(response[0] == 0) {
				successFunc();
			} else {
				failFunc();
			};
		});
	};

	this.createQuarantine = function(guest, successFunc, failFunc) {
		var page = "insertGuestQuarantine.php";

		var data = {
			'id_guest' : guest.id_guest,
			'comment' : guest.quarantine.comment,
			'createdate' : guest.quarantine.createdate
		}

		$http.post(site + page, data).success(function(response) {
			if(response[0] == 0) {
				successFunc();
			} else {
				failFunc();
			};
		});
	};

	this.removeQuarantine = function(guest, successFunc, failFunc) {
		var page = "deleteGuestQuarantine.php";

		var data = {
			'id_quarantine' : guest.quarantine.id_quarantine
		}

		$http.post(site + page, data).success(function(response) {
			if(response[0] == 0) {
				successFunc();
			} else {
				failFunc();
			};
		});
	};

	this.createEnrollment = function(shift, guest, resident, successFunc, failFunc) {
		var page = "insertGuestEnrollment.php";

		var data = {
			'shift_id' : shift.id_shift,
			'guest_id' : guest.id_guest,
			'resident_id' : resident.id_resident,
			'createdate' : guest.enrollment.createdate
		}

		$http.post(site + page, data).success(function(response) {
			console.log("Create " + response);
			if(response[0] == 0) {
				successFunc();
			} else {
				failFunc();
			};
		});
	};

	this.removeEnrollment = function(guest, successFunc, failFunc) {
		var page = "deleteGuestEnrollment.php";

		var data = {
			'id_enrollment' : guest.enrollment.id_enrollment
		}

		$http.post(site + page, data).success(function(response) {
			console.log("Remove " + response);
			if(response[0] == 0) {
				successFunc();
			} else {
				failFunc();
			};
		});
	};

	this.save = function(guest, successFunc, failFunc) {
		var page = "updateGuest.php";

		var data = {
			'id_guest' : guest.id_guest,
			'name' : guest.name,
			'address' : guest.address,
			'birthday' : guest.birthday
		}

		$http.post(site + page, data).success(function(response) {
			if(response[0] == 0) {
				successFunc();
			} else {
				failFunc();
			};
		});
	};

	this.delete = function(guest, successFunc, failFunc) {
		var page = "deleteGuest.php";

		data = {
			'id_guest' : guest.id_guest
		}

		$http.post(site + page, data).success(function(response) {
			if(response[0] == 0) {
				successFunc();
			} else {
				failFunc();
			};
		});
	};

	this.getAll = function(shift, callback) {
		var page = "getAllGuests.php";

		if(shift) {
			var data = {
				'id_shift' : shift.id_shift
			}
		} else {
			var data = {}
		}

		$http.post(site + page, data).success(function(response) {
			callback(response);
		});
	};
});