module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		less: {
			options: {
			  //paths: [],
			  yuicompress: true
			},
			dist: {
				files: {
				  "assets/css/<%= pkg.name %>.css": "assets/less/<%= pkg.name %>.less"
				}
			}
		},
		concat: {
			/*
			js: {
				options: {
					separator: ';'
				},
				src: ['assets/js/libs/*.js', 'assets/js/helpers/*.js', 'assets/js/app/*.js'],
				dest: 'assets/js/<%= pkg.name %>.js'
			},
			*/
			css : {
				options: {},
				src: ['assets/css/*.css'],
				dest: 'assets/css/<%= pkg.name %>.min.css'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					//'assets/js/<%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
					'assets/js/<%= pkg.name %>.min.js': ['assets/js/<%= pkg.name %>.js']
				}
			}
		},
		jshint: {
		  files: ['assets/js/**/*.js'],
		  options: {
			// options here to override JSHint defaults
			globals: {
				jQuery: true,
				console: true,
				module: true,
				document: true
			}
		  }
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
	//grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');

	// execute
	grunt.registerTask('default', ['uglify', 'less', 'concat:css']);
};