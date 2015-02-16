angular.module('app').service('MessageService', function() {

	this.createSuccess_success = function(string) {
		$.simplyToast(string + ' blev oprettet successfuldt', 'success');
	};

	this.editSuccess_success = function(string) {
		$.simplyToast(string + ' blev gemt successfuldt', 'success');
	};

	this.deleteSuccess_success = function(string) {
		$.simplyToast(string + ' blev slettet successfuldt', 'success');
	};

	this.saveSuccess_success = function(string) {
		$.simplyToast(string + ' blev gemt successfuldt', 'success');
	};

	this.allFields_danger = function() {
		$.simplyToast('Alle felter med * skal udfyldes', 'danger');
	};

	this.unexpectedError_danger = function() {
		$.simplyToast('Der skete en uventet fejl', 'danger');
	};

	this.passwordChanged_success = function() {
		$.simplyToast('Adgangskoden blev ændret', 'success');
	};

	this.currentPass_danger = function() {
		$.simplyToast('Nuværende adgangskode er forkert', 'danger');
	};

	this.newPassNotSame_danger = function() {
		$.simplyToast('De to nye adgangskoder er ikke ens', 'danger');
	};

	this.danger = function(string) {
		$.simplyToast(string, 'danger');
	};

	this.success = function(string) {
		$.simplyToast(string, 'success');
	};

	this.warning = function(string) {
		$.simplyToast(string, 'warning');
	};

	this.info = function(string) {
		$.simplyToast(string, 'info');
	};

});