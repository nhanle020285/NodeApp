'use strict';
 
var bucketList = require('../controllers/bucketList');
 
module.exports = function (app) {
  app.post('/bucketList', bucketList.create);
  app.get('/bucketList', bucketList.all);
};