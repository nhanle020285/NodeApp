'use strict';

var admin = require('../controllers/admin');

module.exports = function(app) {

    // Home route
    var index = require('../controllers/admin');

    app.get('/admin', index.render);
	app.get('/admin/users', admin.allUsers);
};
