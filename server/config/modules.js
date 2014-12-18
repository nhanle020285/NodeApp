'use strict';

module.exports = function(app, passport, db) {
    //load shopping cart
    require('shoppingcart')(app, passport, db);
    require('admin')(app, passport, db);
}