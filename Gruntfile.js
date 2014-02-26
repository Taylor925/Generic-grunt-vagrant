	'use strict';

	module.exports = function(grunt){
		
		grunt.initConfig({

			pkg: grunt.file.readJSON('package.json'),

			project:{
				src: 'src',
				build: 'build',
				assets: '<%= project.src %>/assets',
				css: [
					'<%= project.assets %>/sass/main.scss'
				],
				js: [
					'<%= project.assets %>/js/*.js'
				]
			},
			tag: {
				  banner: '/*!\n' +
				          ' * <%= pkg.name %>\n' +
				          ' * <%= pkg.title %>\n' +
				          ' * <%= pkg.url %>\n' +
				          ' * @author <%= pkg.author %>\n' +
				          ' * @version <%= pkg.version %>\n' +
				          ' * Copyright <%= pkg.copyright %>. <%= pkg.license %> licensed.\n' +
				          ' */\n'
			},
			sass: {
				dev: {
					options: {
						style: 'expanded',
						banner: '<%= tag.banner %>',
						compass: true
					},
					files: {
						'src/css/style.css': '<%= project.css %>'
					}
				},
				dist: {
					options: {
						style: 'compressed',
						compass: true
					},
					files: {
						'build/css/style.min.css': '<%= project.css %>'
					}
				}
			},

			uglify: {
				options: {
					banner: '/* <%=pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
				},
				build: {
					src: 'src/js/<%= pkg.name %>.js',
					dest: 'js/<%= pkg.name %>.min.js'
				}
			},
			imagemin: {
			    png: {
			      options: {
			        optimizationLevel: 7
			      },
			      files: [
			        {
			          // Set to true to enable the following options…
			          expand: true,
			          // cwd is 'current working directory'
			          cwd: 'src/assets/img',
			          src: ['**/*.png'],
			          // Could also match cwd line above. i.e. project-directory/img/
			          dest: 'img/',
			          ext: '.png'
			        }
			      ]
			    },
			    jpg: {
			    	options: {
			    		progressive: true		    		
			    	},
			    	files: [
			    		{
			    			expand: true,
							cwd: 'src/assets/img',
							src: ['**/*.jpg'],
							dest: 'src/img/',
							ext: '.jpg'
			    		}
			    	]
			    },
			    gif: {
			    	files: [
			    		{
				    		expand: true,
				    		cwd: 'src/assets/img',
				    		src: ['**/*.gif'],
				    		dest: 'src/img/',
				    		ext: '.gif'
			    	    }
			    	]
			    }
			},

			/*copy: {
				main:{					
					files: [
						{expand: true, src: ['img/*'], dest: 'build/oadr/'},
						{expand: true, src: ['css/*'], dest: 'build/oadr/'},
						{expand: true, flatten: true, src: ['src/scss/*'], dest: 'build/oadr/scss'},
						{expand: true, src: ['*.html','!archer-template.html'], dest: 'build/oadr/'}
					]
				},
			},
			'useminPrepare':{
				options: {
					dest: 'build/oadr'
				},
				html: ['account-creation-business.html', 'billing-information-business.html', 'confirmation-business-no-ship.html','confirmation-business-ship.html']

			},
			usemin: {
				html: ['build/oadr/account-creation-business.html','build/oadr/billing-information-business.html', 'build/oadr/confirmation-business-no-ship.html','build/oadr/confirmation-business-ship.html']
			},*//

			watch: {
				options: {
					spawn: false,
					livereload: true,
				},
				sass: {
					files: '<%= project.src %>/scss/{,*/}*.{scss,sass}',
					tasks: ['sass:dev'],
					options: {
						livereload: true,
					},
				},
				html: {
					files: '*.html',
				}
			},

		});

		//plugins
		require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

		grunt.registerTask('dev', ['sass:dev','watch']);
	}

}
