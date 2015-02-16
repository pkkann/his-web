angular.module('app').service('ResidentService', function($http) {
	var site = "http://localhost:8888/his-web-prototype3B/interfaces/sql2/resident/";

	this.create = function(resident, successFunc, failFunc) {
		var page = "insertResident.php";

		var data = {
			'name' : resident.name,
			'address' : resident.address,
			'birthday' : resident.birthday,
			'phone' : resident.phone,
			'email' : resident.email,
			'hoene' : resident.hoene,
			'reserve' : resident.reserve,
			'oneone' : resident.oneone,
			'fromoutside' : resident.fromoutside,
			'barcode' : resident.barcode,
			'createdate' : resident.createdate
		}

		$http.post(site + page, data).success(function(response) {
			if(response[0] == 0) {
				successFunc();
			} else {
				failFunc();
			};
		});
	};

	this.createQuarantine = function(resident, successFunc, failFunc) {
		var page = "insertResidentQuarantine.php";

		var data = {
			'id_resident' : resident.id_resident,
			'comment' : resident.quarantine.comment,
			'createdate' : resident.quarantine.createdate
		}

		$http.post(site + page, data).success(function(response) {
			if(response[0] == 0) {
				successFunc();
			} else {
				failFunc();
			};
		});
	};

	this.removeQuarantine = function(resident, successFunc, failFunc) {
		var page = "deleteResidentQuarantine.php";

		var data = {
			'id_quarantine' : resident.quarantine.id_quarantine
		}

		$http.post(site + page, data).success(function(response) {
			if(response[0] == 0) {
				successFunc();
			} else {
				failFunc();
			};
		});
	};

	this.createEnrollment = function(shift, resident, successFunc, failFunc) {
		var page = "insertResidentEnrollment.php";

		var data = {
			'id_shift' : shift.id_shift,
			'id_resident' : resident.id_resident,
			'createdate' : resident.enrollment.createdate
		}

		$http.post(site + page, data).success(function(response) {
			if(response[0] == 0) {
				successFunc();
			} else {
				failFunc();
			};
		});
	};

	this.removeEnrollment = function(shift, resident, successFunc, failFunc) {
		var page = "deleteResidentEnrollment.php";

		var data = {
			'id_enrollment' : resident.enrollment.id_enrollment
		}

		$http.post(site + page, data).success(function(response) {
			if(response[0] == 0) {
				successFunc();
			} else {
				failFunc();
			};
		});
	};

	this.save = function(resident, successFunc, failFunc) {
		var page = "updateResident.php";

		var data = {
			'id_resident' : resident.id_resident,
			'name' : resident.name,
			'address' : resident.address,
			'birthday' : resident.birthday,
			'phone' : resident.phone,
			'email' : resident.email,
			'hoene' : resident.hoene,
			'reserve' : resident.reserve,
			'oneone' : resident.oneone,
			'fromoutside' : resident.fromoutside,
			'barcode' : resident.barcode
		}

		$http.post(site + page, data).success(function(response) {
			if(response[0] == 0) {
				successFunc();
			} else {
				failFunc();
			};
		});
	};

	this.delete = function(resident, successFunc, failFunc) {
		var page = "deleteResident.php";

		data = {
			'id_resident' : resident.id_resident
		}

		$http.post(site + page, data).success(function(response) {
			if(response[0] == 0) {
				successFunc();
			} else {
				failFunc();
			};
		});
	};

	this.getAllEnrolled = function(shift, callback) {
		var page = "getAllEnrolledResidents.php";

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

	this.getAll = function(shift, callback) {
		var page = "getAllResidents.php";

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