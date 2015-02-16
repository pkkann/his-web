angular.module('app').controller('EditResidentController', function($scope, $rootScope, ResidentService, DateService, MessageService) {

	$scope.working = false;
	$scope.resident = [];
	$scope.loadMethod = function() {};
	$rootScope.editResident = [];
	$scope.groupOpen = [true, false, false];

	Ladda.bind('button[iden=saveButton]');

	$scope.toggleWorking = function() {
		$scope.working = !$scope.working;
		if(!$scope.working) {
			Ladda.stopAll();
		} else {
			$scope.groupOpen = [false, false, false];
		};
	};

	$rootScope.editResident.setResident = function(resident) {
		$scope.resident = angular.copy(resident);
		if(!$scope.resident.fromoutside) {
			var splitAddress = $scope.resident.address.split('-');
			$scope.resident.block = splitAddress[0];
			$scope.resident.number = splitAddress[1];
		}
		var splitBirthday = $scope.resident.birthday.split('/');
		$scope.resident.birthDate = parseFloat(splitBirthday[0]);
		$scope.resident.birthMonth = parseFloat(splitBirthday[1]);
		$scope.resident.birthYear = parseFloat(splitBirthday[2]);
	};

	$rootScope.editResident.setLoadMethod = function(loadMethod) {
		$scope.loadMethod = loadMethod;
	};

	$scope.reset = function() {
		$scope.groupOpen = [true, false, false];

		$scope.form.inputBarcode.$dirty = false;
		$scope.form.inputName.$dirty = false;
		$scope.form.inputBlock.$dirty = false;
		$scope.form.inputAddress.$dirty = false;
		$scope.form.inputNumber.$dirty = false;
		$scope.form.inputBirthDate.$dirty = false;
		$scope.form.inputBirthMonth.$dirty = false;
		$scope.form.inputBirthYear.$dirty = false;
	};

	$scope.validate = function() {
		if($scope.form.$valid) {

			//Birthday
			var birthday = $scope.resident.birthYear+'-'+$scope.resident.birthMonth+'-'+$scope.resident.birthDate;
			var birthdayValid = DateService.isDateValid(birthday);
			$scope.resident.birthday = birthday;

			//Address
			if(!$scope.resident.fromoutside) {
				$scope.resident.address = $scope.resident.block+'-'+$scope.resident.number;
			};

			//Phone
			if(!$scope.resident.phone) {
				$scope.resident.phone = "";
			};

			//Email
			if(!$scope.resident.email) {
				$scope.resident.email = "";
			};
			if(!birthdayValid) {
				return 3;
			};
			if(!$scope.resident.hoene && !$scope.resident.fromoutside) {
				if($scope.resident.barcode.length != 8) {
					return 4;
				}
			} else {
				$scope.resident.barcode = "";
			}

			return 0;
		} else {
			return 1;
		};
	};

	$scope.save = function() {
		var validate = $scope.validate();
		$scope.toggleWorking();
		if(validate == 0) {
			ResidentService.save($scope.resident,
				function() {
					$scope.toggleWorking();
					if($scope.loadMethod) {
						$scope.loadMethod();
					};
					$('#editresidentmodal').modal('hide');
					$scope.reset();
					MessageService.editSuccess_success("Beboeren");
				},
				function() {
					MessageService.unexpectedError_danger();
					$scope.toggleWorking();
				});
		} else if(validate == 1) {
			MessageService.allFields_danger();
			$scope.toggleWorking();
		} else if(validate == 3) {
			$scope.groupOpen = [false, false, true];
			MessageService.danger("Fødselsdags datoen kan ikke godkendes");
			$scope.toggleWorking();
		} else if(validate == 4) {
			$scope.groupOpen = [false, true, false];
			MessageService.danger("Barkoden skal være på 8 tegn");
			$scope.toggleWorking();
		};

	};

});