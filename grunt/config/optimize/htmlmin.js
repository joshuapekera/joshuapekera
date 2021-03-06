// Configuration for HTMLMin task(s)
// Minifies HTML files
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('htmlmin', {
    dist: {
      options: {
        collapseBooleanAttributes: true,
        conservativeCollapse: true,
        removeCommentsFromCDATA: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        collapseWhitespace: false
      },
      files: [{
        expand: true,
        cwd: '<%= yeogurt.dist %>/',
        src: [
          '*.html', 'templates/**/*.html'
        ],
        dest: '<%= yeogurt.dist %>/'
      }]
    }
  });

};

module.exports = taskConfig;
