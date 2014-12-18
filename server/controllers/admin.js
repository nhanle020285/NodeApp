'use strict';

var mongoose = require('mongoose'),
    user = mongoose.model('User')
	
exports.render = function ( req, res ) {

    res.render( 'admin');
};

exports.allUsers = function ( req, res ) {

    user.find().sort('name').populate('ref_roles', 'name').exec(function(err, users) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(users);
        }
    });
};
