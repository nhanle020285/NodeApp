'use strict';
console.log(process.env);
var paths = {
    js: ['*.js', 'server/**/*.js', 'public/**/*.js', 'test/**/*.js', '!test/coverage/**', '!public/system/lib/**'],
    html: ['public/**/views/**/*.html', 'server/views/**/*.html'],
    css: ['public/**/css/**/*.css', '!public/system/lib/**']
};

module.exports = function(grunt) {

    if (process.env.NODE_ENV !== 'production') {
        require('time-grunt')(grunt);
    }

    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        assets: grunt.file.readJSON('server/config/assets.json'),
        watch: {
            js: {
                files: paths.js,
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            html: {
                files: paths.html,
                options: {
                    livereload: true
                }
            },
            css: {
                files: paths.css,
                tasks: ['csslint'],
                options: {
                    livereload: true
                }
            }
        },
		requirejs: {
            options: {
				baseUrl: "./public/admin",
				mainConfigFile: "./public/admin/requirejsConfig.js",
                paths: {
                    'appFiles': './app'
                },
                removeCombined: true,
                out: './public/admin/requirejs-admin-combined.js',
                optimize: 'none',
                name: 'admin'
            },
            dev:{
                options:{
                    optimize:'none'
                }
            },
            release:{
                options:{
                    optimize:'uglify'
                }
              }
        },
        jshint: {
            all: {
                src: paths.js,
                options: {
                    jshintrc: true
                }
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            production: {
                files: '<%= assets.main.js %>'
            }
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            all: {
                src: paths.css
            }
        },
		less: {
		  dev: {
			options: {
			  paths: ["public/admin/css"]
			},
			files: {
			  "public/admin/css/admin.css": "public/admin/css/admin.less"
			}
		  },
		  production: {
			options: {
			  paths: ["public/admin/css"],
			  cleancss: true,
			  modifyVars: {
				imgPath: '"http://mycdn.com/path/to/images"',
				bgColor: 'red'
			  }
			},
			files: {
			  "public/admin/css/admin.css": "public/admin/css/admin.less"
			}
		  }
		},
        cssmin: {
            combine: {
                files: '<%= assets.main.css %>'
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    args: [],
                    ignore: ['public/**', 'node_modules/**'],
                    ext: 'js,html',
                    nodeArgs: ['--debug'],
                    delayTime: 1,
                    env: {
                        PORT: require('./server/config/config').port
                    },
                    cwd: __dirname
                }
            }
        },
        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        },
        mochaTest: {
            options: {
                reporter: 'spec',
                require: 'server.js'
            },
            src: ['test/mocha/**/*.js']
        },
        env: {
            test: {
                NODE_ENV: 'test'
            }
        },
        karma: {
            unit: {
                configFile: 'test/karma/karma.conf.js'
            }
        }
    });

    //Load NPM tasks
    require('load-grunt-tasks')(grunt);
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-less');
    //Default task(s).
    if (process.env.NODE_ENV === 'production') {
        grunt.registerTask('default', ['requirejs:release', 'less:production', 'cssmin', 'uglify', 'concurrent']);
    } else {
        grunt.registerTask('default', ['requirejs:dev','jshint', 'less:dev', 'csslint', 'concurrent']);
    }

    //Test task.
    grunt.registerTask('test', ['env:test', 'mochaTest', 'karma:unit']);

    // For Heroku users only.
    // Docs: https://github.com/linnovate/mean/wiki/Deploying-on-Heroku
    grunt.registerTask('heroku:production', ['cssmin', 'uglify']);
};
