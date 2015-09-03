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
          'public/styles/main.css': 'styles/main.scss',
          'public/styles/reset.css': 'styles/reset.scss'
        }
      }
    },

    uglify: {
      assemble: {
        files: {
          'public/scripts/minified.js': [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/typeahead.js/dist/typeahead.jquery.js',
            'bower_components/handlebars/handlebars.js',
            'bower_components/algoliasearch/dist/algoliasearch.js',
            'bower_components/algoliasearch-helper/dist/algoliasearch.helper.js',
            'lib/search_autocomplete.js'
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('assemble', ['sass', 'uglify']);
  grunt.registerTask('default', ['jshint', 'sass', 'uglify']);
};
