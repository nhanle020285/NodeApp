/*
 * header viewmodel associated with the header.html view
 * at the top of the shell.
 * It displays navigation among the main app 'pages'
 */

define([], function (app) {
    'use strict';
    function controller($scope, userSV) {
		userSV.query(function(users) {
            $scope.users = users;
        });
		
/*         $scope.users = {
            firstName: 'Nhan',
            lastName: 'Le',
            account: 'nhan.le.hoang@precio.se',
            roles: 'admin, member'
        }; */
    }
    
    controller.$inject = ['$scope'];
	controller.$inject = ['userSV'];
    
    return controller;
 
});
