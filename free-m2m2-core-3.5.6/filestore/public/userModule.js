define(['angular', 'require'], function(angular, require) {
'use strict';

var userModule = angular.module('userModule', ['maUiApp']);

userModule.component('myIdleDetector', {
    bindings: {
        delay: '<?',
        state: '@?'
    },
    controller: ['$timeout', '$state', '$document', function($timeout, $state, $document) {
        const goToState = () => {
            $state.go(this.state);
        };
        
        let t;
        const restartTimer = () => {
            $timeout.cancel(t);
            t = $timeout(goToState, this.delay);
        };
        
        restartTimer();
        $document.on('mousemove', restartTimer);
        $document.on('touchmove', restartTimer);
        $document.on('keydown', restartTimer);
    }]
});

return userModule;

}); // define