module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
        build: {
            src: 'app.js', 
            dest: 'app.min.js',
            }
        },
        cssmin: {
            build: {
                src: 'public/style.css',
                dest: 'public/style.min.css',
            }
        }
    });
  
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default task(s).
    grunt.registerTask('default', ['uglify']);
    grunt.registerTask('default', ['cssmin']);
  
  
  };