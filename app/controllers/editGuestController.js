angular.module('app').controller('EditGuestController', function($scope, $rootScope, GuestService, DateService, MessageService) {

	$scope.guest = [];
	$scope.loadMethod = function() {};

	Ladda.bind('button[iden=saveButton]');
	$scope.working = false;

	$scope.toggleWorking = function() {
		$scope.working = !$scope.working;
		if(!$scope.working) {
			Ladda.stopAll();
		};
	};

	$scope.getAge = function() {
		var birthday = $scope.guest.birthMonth+'/'+$scope.guest.birthDate+'/'+$scope.guest.birthYear;
		var age = DateService.getAge(birthday);
		if(age > 0) {
			return age;
		} else {
			return 0;
		}
	};

	$scope.reset = function() {
		$scope.form.inputName.$dirty = false;
		$scope.form.inputAddress.$dirty = false;
		$scope.form.inputBirthDate.$dirty = false;
		$scope.form.inputBirthMonth.$dirty = false;
		$scope.form.inputBirthYear.$dirty = false;
		$scope.guest = [];
	};

	$scope.validate = function() {

		//Birthday
		var birthday = $scope.guest.birthYear+'-'+$scope.guest.birthMonth+'-'+$scope.guest.birthDate;
		var birthdayValid = DateService.isDateValid(birthday);
		$scope.guest.birthday = birthday;

		if($scope.form.$invalid) {
			return 1;
		}

		if(!birthdayValid) {
			return 2;
		};

		return 0;
	}

	$scope.save = function() {
		$scope.toggleWorking();
		var validate = $scope.validate();
		$scope.guest.createdate = DateService.currentDate();
		if(validate == 0) {
			GuestService.save($scope.guest,
				function() {
					MessageService.editSuccess_success("Gæsten");
					if($scope.loadMethod) {
						$scope.loadMethod();
					}
					$('#editguestmodal').modal('hide');
					$scope.toggleWorking();
				},
				function() {
					MessageService.unexpectedError_danger();
					$scope.toggleWorking();
				});
		} else if(validate == 1) {
			MessageService.allFields_danger();
			$scope.toggleWorking();
		} else if(validate == 2) {
			MessageService.danger("Fødselsdags datoen kan ikke godkendes");
			$scope.toggleWorking();
		}
	};

	$rootScope.editGuest = [];
	$rootScope.editGuest.setLoadMethod = function(loadMethod) {
		$scope.loadMethod = loadMethod;
	};
	$rootScope.editGuest.setGuest = function(guest) {
		$scope.guest = angular.copy(guest);
		var split = $scope.guest.birthday.split('/');
		$scope.guest.birthDate = parseFloat(split[0]);
		$scope.guest.birthMonth = parseFloat(split[1]);
		$scope.guest.birthYear = parseFloat(split[2]);
	};

});