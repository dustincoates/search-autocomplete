'use strict';

module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['Gruntfile.js', 'tasks/**/*.js', 'lib/**/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
};
