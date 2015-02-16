angular.module('app').service('DateService', function() {

	var today;
	var dd;
	var mm;
	var yyyy;
	var hh;
	var mi;
	var ss;

	$update = function() {
		today = new Date();
		dd = today.getDate();
		mm = today.getMonth()+1;
		yyyy = today.getFullYear();

		hh = today.getHours();
		mi = today.getMinutes();
		ss = today.getSeconds();

		if(dd<10) {
			dd='0'+dd
		} 

		if(mm<10) {
			mm='0'+mm
		}

		if(hh<10) {
			hh='0'+hh
		}

		if(mi<10) {
			mi='0'+mi
		}

		if(ss<10) {
			ss='0'+ss
		}
	}

	this.currentDate = function() {
		$update();

		return yyyy+'-'+mm+'-'+dd+' '+hh+':'+mi+':'+ss;
	};

	this.currentDateNoFormat = function() {
		$update();

		return ''+dd+mm+yyyy+hh+mi+ss;
	};

	this.isDateValid = function(date) {
		var dates = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

		var bits = date.split('-');
		var date = bits[0];
		var month = bits[1];
		var year = bits[2];

		if(month > 12 || month < 1) {
			return false;
		};

		if(date > dates[month - 1] || date < 1) {
			return false;
		};

		return true;
	};

	this.isDateValidOnlyMonth = function(date) {

		var bits = date.split('-');
		var month = bits[0];
		var year = bits[1];

		if(month > 12 || month < 1) {
			return false;
		};

		var currentDate = new Date();
		currentDate.setDate(1);

		var workingDate = new Date();
		workingDate.setDate(1);
		workingDate.setMonth(month - 1);
		workingDate.setYear(year);

		if(workingDate < currentDate) {
			return false;
		};

		return true;
	};

	this.getAge = function(dateString) {
	    var today = new Date();
	    var birthDate = new Date(dateString);
	    var age = today.getFullYear() - birthDate.getFullYear();
	    var m = today.getMonth() - birthDate.getMonth();
	    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
	        age--;
	    }
	    return age;
	};

});