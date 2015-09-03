'use strict';

module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['Gruntfile.js', 'tasks/**/*.js', 'lib/**/*.js']
    },

    watch: {
      src: {
        files: ['lib/*.js', 'styles/**/*.scss'],
        tasks: ['assemble']
      }
    },

    sass: {
      dist: {
        files: {
          'styles/main.css': 'styles/main.scss'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('assemble', ['sass']);
  grunt.registerTask('default', ['jshint', 'sass']);
};
