module.exports = function(grunt) {
	 grunt.initConfig({
	 	//watch file
	             watch: {
		             jade: {
		                          files: ['views/**'],
			                          options: {
			                          livereload: true
		                          }
		             },
		             js: {
		                          files: ['public/js/**', 'models/**/*.js', 'schemas/**/*.js'],
		                          //tasks: ['jshint'],
		                          options: {
			                          livereload: true
		                          }
		             },
	             },
	             //restart app.js
	             nodemon: {
		             dev: {
		                         options: {
			                          file: 'app.js',
			                          args: [],
			                          ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
			                          watchedExtensions: ['js'],
			                          watchedFolders: ['./'],
			                          debug: true,
			                          delayTime: 1,
			                          env: {
			                                       PORT: 3000
			                          },
			                          cwd: __dirname
			             }
		             }
	            },
	            //speedUp task
	            concurrent: {
		             tasks: ['nodemon', 'watch'],
		             options: {
		                          logConcurrentOutput: true
		             }
	            }
	})
             //watch file
	grunt.loadNpmTasks('grunt-contrib-watch');
	//restart app.js
	grunt.loadNpmTasks('grunt-nodemon');
	//speedUp task
	grunt.loadNpmTasks('grunt-concurrent');

	//aviod warning TO FORCE TASK
	grunt.option('force', true);
	//default task
	grunt.registerTask('default', ['concurrent'])
}
