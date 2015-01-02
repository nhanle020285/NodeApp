/*
 * header viewmodel associated with the header.html view
 * at the top of the shell.
 * It displays navigation among the main app 'pages'
 */

define([], function (app) {
    'use strict';
    function controller($scope, $location) {
        var headerStates = [
            { name: 'Users', sref: 'admin.user', link: '#!/user' }
           ,{ name: 'Settings', sref: 'admin.settings', link: '#!/setting'}
        ];
        
        $scope.homeSref = 'app.home';
        $scope.isSelected = isSelected;
        $scope.states = headerStates;
        
        function isSelected(state) {
            var path = $location.path().toLowerCase() || '/home';
            var roots = state.roots;
            if (roots) {
                for (var i = roots.length; i--;) {
                    if (-1 < path.indexOf(roots[i])) { return true; }
                }
            }
            return false;
        }
    }
    
    controller.$inject = ['$scope', '$location'];
    
    return controller;
 
});
