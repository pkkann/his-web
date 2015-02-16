angular.module('app').controller('CreateUserController', function($scope, UserService, MessageService, DateService) {

	Ladda.bind('button[iden=createButton]');
	$scope.working = false;

	$scope.toggleWorking = function() {
		$scope.working = !$scope.working;
		if(!$scope.working) {
			Ladda.stopAll();
		};
	};

	$scope.user = [];

	$scope.init = function() {
		$scope.user = [];
		$scope.user.name = "";
		$scope.user.email = "";
		$scope.user.phone = "";
		$scope.user.username = "";
		$scope.user.password = "";
		$scope.user.pass = "";
		$scope.user.pass2 = "";
		$scope.user.administrator = 0;
		$scope.user.createDate = "";
	};

	$scope.init();

	$scope.reset = function() {
		$scope.form.inputName.$dirty = false;
		$scope.form.inputEmail.$dirty = false;
		$scope.form.inputPhone.$dirty = false;
		$scope.form.inputUsername.$dirty = false;
		$scope.form.inputPass.$dirty = false;
		$scope.form.inputPass2.$dirty = false;
		$scope.init();
	};

	$scope.validate = function() {
		var validate = 0;
		if($scope.form.$invalid) {
			validate = 1;
		};
		if($scope.user.pass != $scope.user.pass2) {
			vaidate = 2;
		};
		$scope.users.forEach(function(user) {
			if(user.username == $scope.user.username) {
				validate = 3;
			};
		});
		return validate;
	};

	$scope.create = function() {
		var validate = $scope.validate();
		$scope.toggleWorking();
		if(validate == 0) {
			$scope.user.createdate = DateService.currentDate();
			$scope.user.password = $scope.user.pass;
			UserService.create($scope.user,
				function() {
					$scope.reset();
					if($scope.createExtraAction) {
						$scope.createExtraAction();
					};
					MessageService.createSuccess_success("Brugeren");
					$('#createusermodal').modal('hide');
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
			MessageService.newPassNotSame_danger();
			$scope.toggleWorking();
		} else if(validate == 3) {
			MessageService.danger("Brugernavnet er ikke ledigt");
			$scope.toggleWorking();
		};
	};

});