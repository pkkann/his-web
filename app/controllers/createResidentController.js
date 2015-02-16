angular.module('app').controller('CreateResidentController', function($timeout, $scope, ResidentService, UserService, DateService, MessageService) {
	$('#myWizard').wizard();

	$('#myWizard').on('finished.fu.wizard', function (evt, data) {
		$scope.create();
	});

	$scope.working = false;

	$scope.toggleWorking = function(end) {
		$scope.working = !$scope.working;
		if($scope.working) {
			$('#createresidentmodal').modal('hide');
			$('#createresidentloading').modal('show');
			$scope.progress = 100;
		} else {
			$('#createresidentloading').modal('hide');
			if(!end) {
				$('#createresidentmodal').modal('show');
			};
		};
	};

	$scope.resident = [];

	$scope.init = function() {
		$scope.resident = [];
		$scope.resident.name = "";
		$scope.resident.address = "";
		$scope.resident.block = "";
		$scope.resident.number = "";
		$scope.resident.birthday = "";
		$scope.resident.birthDate = "";
		$scope.resident.birthMonth = "";
		$scope.resident.birthYear = "";
		$scope.resident.phone = "";
		$scope.resident.email ="";
		$scope.resident.hoene = 0;
		$scope.resident.reserve = 0;
		$scope.resident.oneone = 0;
		$scope.resident.fromoutside = 0;
		$scope.resident.barcode = "";
		$scope.resident.createdate = "";
	};

	$scope.init();

	$scope.reset = function() {
		$scope.sub = false;

		$scope.form.inputBarcode.$dirty = false;
		$scope.form.inputName.$dirty = false;
		$scope.form.inputBlock.$dirty = false;
		$scope.form.inputAddress.$dirty = false;
		$scope.form.inputNumber.$dirty = false;
		$scope.form.inputBirthDate.$dirty = false;
		$scope.form.inputBirthMonth.$dirty = false;
		$scope.form.inputBirthYear.$dirty = false;

		$('#myWizard').wizard('selectedItem', {
		    step: 1
		});

		$scope.init();
	};

	$scope.cancel = function() {
		if($scope.cancelExtraAction) {
			$scope.cancelExtraAction();
		};
	};

	$scope.getAge = function() {
		var birthday = $scope.resident.birthMonth+'/'+$scope.resident.birthDate+'/'+$scope.resident.birthYear;
		var age = DateService.getAge(birthday);
		if(age > 0) {
			return age;
		} else {
			return 0;
		}
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
			}

			return 0;
		} else {
			return 1;
		};
	};

	$scope.create = function() {
		var validate = $scope.validate();
		if(validate == 0) {
			$scope.toggleWorking();
			$scope.resident.createdate = DateService.currentDate();
			ResidentService.create($scope.resident,
				function() {
					MessageService.createSuccess_success("Beboeren");
					if($scope.createExtraAction) {
						$scope.createExtraAction();
					};
					$scope.reset();
					$scope.toggleWorking(true);
				},
				function() {
					MessageService.unexpectedError_danger();
					$scope.toggleWorking();
				});
		} else if(validate == 1) {
			MessageService.allFields_danger();
		} else if(validate == 3) {
			MessageService.danger("Fødselsdags datoen kan ikke godkendes");
		} else if(validate == 4) {
			MessageService.danger("Barkoden skal være på 8 tegn");
		};
		
	};

});