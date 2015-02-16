angular.module('app').service('TimerService', function($interval, $state, $cookieStore) {

	var timer;

	this.lockNow = function() {
		lock();
	}

	lock = function() {
		
		if(!$state.is('login') && !$state.is('lockscreen')) {
			$cookieStore.put(3, "locked");
			$state.go("lockscreen");
		}
		
	};

	startTimer = function() {
		if ( angular.isDefined(timer) ) return;
		timer = $interval(lock, 60000);
	}

	stopTimer = function() {
		if (angular.isDefined(timer)) {
			$interval.cancel(timer);
            timer = undefined;
		}
	}

	this.resetTimer = function() {
		reset();
	}

	reset = function() {
		stopTimer();
		startTimer();
	}

	this.init = function() {
		$(document).on('keydown', function() {
		    reset();
		});

		$(document).on('scroll', function() {
		    reset();
		});
		startTimer();
	}

});