'use strict';

module.exports = function(app) {

    // Home route
    var index = require('../controllers/shoppingCart');

    app.get('/shopping', index.render);
};
