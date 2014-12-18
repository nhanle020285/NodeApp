'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Role Schema
 */
var RoleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
});

/**
 * Validations
 */
RoleSchema.path('name').validate(function (title) {
    return title.length;
}, 'Name cannot be blank');

mongoose.model('Role', RoleSchema);
