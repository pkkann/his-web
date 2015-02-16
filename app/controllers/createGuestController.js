angular.module('app').controller('CreateGuestController', function($scope, $rootScope, GuestService, DateService, MessageService) {

	$scope.guest = [];
	$scope.loadMethod = function() {};

	Ladda.bind('button[iden=createButton]');
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

	$scope.create = function() {
		$scope.toggleWorking();
		var validate = $scope.validate();
		$scope.guest.createdate = DateService.currentDate();
		if(validate == 0) {
			GuestService.create($scope.guest,
				function() {
					MessageService.createSuccess_success("Gæsten");
					if($scope.loadMethod) {
						$scope.loadMethod();
					}
					$('#createguestmodal').modal('hide');
					$scope.toggleWorking();
					$scope.reset();
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

	$rootScope.createGuest = [];
	$rootScope.createGuest.setLoadMethod = function(loadMethod) {
		$scope.loadMethod = loadMethod;
	};

});