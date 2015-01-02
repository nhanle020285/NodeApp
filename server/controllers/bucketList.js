'use strict';
 
/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  BucketList = mongoose.model('BucketList');
 
/**
 * Create an Bucket List
 */
exports.create = function(req, res) {
  var bucketList = new BucketList(req.body);
 
  bucketList.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.jsonp(bucketList);
    }
  });
};

exports.all = function(req, res) {
  BucketList.find().exec(function(err, bucketList) {
    if (err) {
      console.log(err);
    } else {
      res.jsonp(bucketList);
    }
  });
};