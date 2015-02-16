angular.module('app').service('GeneratorService', function() {

	getKey = function(number) {
		switch(number) {
			case "1": return "a";
			case "2": return "b";
			case "3": return "c";
			case "4": return "d";
			case "5": return "e";
			case "6": return "f";
			case "7": return "g";
			case "8": return "h";
			case "9": return "i";
		};
	};

	this.generateKeyFromNumbers = function(numbers) {
		var arr = numbers.split("");
		var newKey = "";
		for (index = 0; index < arr.length; ++index) {
		    var number = arr[index];
		    var key = getKey(number);
		    newKey += key;
		}
		return newKey;
	};

	


});