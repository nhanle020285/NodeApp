define('routes/adminRoute',[], function () {
    
    
    function route($stateProvider, $urlRouterProvider, $locationProvider) {
        //$locationProvider.hashPrefix('!');
        // For unmatched routes:
        $urlRouterProvider.otherwise('/');
        // states for admin
        $stateProvider
        .state('admin', {
            url: '',
            views: {
                'header': {
                    templateUrl: '/public/admin/views/header.html'
                },
                'content': {
                    templateUrl: '/public/admin/views/home.html'
                },
                'footer': {
                    templateUrl: '/public/admin/views/footer.html'
                }
            }
        })
        .state('admin.user', {
            url: '/user',
            views: {
                'content@': {
                    templateUrl: '/public/admin/views/user.html'
                }
            },
			controller: 'adminUser'
        })
        .state('admin.settings', {
            url: '/setting',
            views : {
                'content@' : {
                    templateUrl: '/public/admin/views/user.html'
                }
            }
        });
    }
    
    route.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
    
    return route;
});



define('services/user',[], function (app) {
    
    function service($resource) {
		return $resource('/admin/users', {
		}, {
			update: {
				method: 'PUT'
			}
		});
    }
    
    service.$inject = ['$resource'];
    
    return service;
 
});

/*
 * header viewmodel associated with the header.html view
 * at the top of the shell.
 * It displays navigation among the main app 'pages'
 */

define('controllers/header',[], function (app) {
    
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

/*
 * header viewmodel associated with the header.html view
 * at the top of the shell.
 * It displays navigation among the main app 'pages'
 */

define('controllers/adminUser',[], function (app) {
    
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

define('admin',['routes/adminRoute',
		'services/user',
        'controllers/header',
        'controllers/adminUser'],
    function (route, userService, headerController, userController) {
        
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

