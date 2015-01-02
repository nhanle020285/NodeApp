'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Article Schema
 */
var PermissionSchema = new Schema({
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
PermissionSchema.path('name').validate(function (title) {
    return title.length;
}, 'Name cannot be blank');

mongoose.model('Permission', PermissionSchema);
