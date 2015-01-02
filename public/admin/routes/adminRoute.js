define([], function () {
    'use strict';
    
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

