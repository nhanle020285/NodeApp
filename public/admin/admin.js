define(['routes/adminRoute',
		'services/user',
        'controllers/header',
        'controllers/adminUser'],
    function (route, userService, headerController, userController) {
        'use strict';
        var adminModule = angular.module('lhn_admin', ['ngCookies', 'ngResource', 'ui.router', 'ui.bootstrap']);

        adminModule.config(route)
					.config(['$locationProvider',
						function($locationProvider) {
							   $locationProvider.hashPrefix('!');
							}
					]);
		adminModule.factory('userSV', userService);
        adminModule.controller('header', headerController);
        adminModule.controller('user', userController);
		
    }
);

(function(){
	require(['admin'], function(){
		angular.element(document).ready(function() {
			//Fixing facebook bug with redirect
			if (window.location.hash === '#_=_') window.location.hash = '#!';

			//Then init the app
			angular.bootstrap(document, ['lhn_admin']);

		});
	});
}());
