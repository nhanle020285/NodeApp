
define([], function (app) {
    'use strict';
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
