angular.module('app').filter('true_false', function() {
    return function(text, length, end) {
        if (text == 1) {
            return 'Ja';
        }
        return 'Nej';
    }
});