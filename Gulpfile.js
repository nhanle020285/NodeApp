'use strict';

var gulp = require('gulp');

console.log('NODE_ENV: ' + process.env.NODE_ENV);
console.log('__dirname: ' + __dirname);
require('gulp-grunt')(gulp, {
    base: require('path').join(__dirname, 'Gruntfile.js')
});

gulp.task('default', function() {
    // run complete grunt tasks
    gulp.run('default1');
});
