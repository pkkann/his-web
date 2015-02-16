angular.module('app').controller('ShiftsController', function($scope, $rootScope, ShiftService) {

	$scope.shifts = [];
	$scope.working = false;
	$scope.predicate = 'id_shift';
	$scope.reverse = true;
	$scope.anyOpen = false;

	$scope.loadShifts = function() {
		$scope.shifts = [];
		$scope.anyOpen = false;
		console.info("Loading shifts");
		$scope.working = true;
		ShiftService.getAll(function(response) {
			$scope.shifts = response;

			$scope.shifts.forEach(function(shift) {
				if(shift.closedate == "00/00/0000 00:00") {
					$scope.anyOpen = true;
				};
			});
			$scope.constructUsersStrings();
			$scope.constructEnrollmentsStrings();
			$scope.working = false;
		});
	};

	$scope.loadShifts();

	$scope.constructUsersStrings = function() {
		$scope.shifts.forEach(function(shift) {
			var usersString = "";
			shift.users.forEach(function(user) {
				usersString += user.name + ", ";
			});
			shift.usersString = usersString;
		});
	};

	$scope.constructEnrollmentsStrings = function() {
		$scope.shifts.forEach(function(shift) {
			var enrollmentsString = "Total: " + shift.enrollments.length;
			
			shift.enrollmentsString = enrollmentsString;
		});
	};

	$scope.isOpen = function(shift) {
		if(shift.closedate == "00/00/0000 00:00") {
			return true;
		} else {
			return false;
		};
	};

	$scope.closedateConvert = function(date) {
		if(date == "00/00/0000 00:00") {
			return "Igang";
		} else {
			return date;
		}
	}



});