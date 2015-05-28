// Configuration for browserify task(s)
// Compiles JavaScript into single bundle file
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('browserify', {
    server: {
      options: {
        browserifyOptions: {
          debug: true
        },
        watch: true
      },
      files: {
        '<%= yeogurt.tmp %>/scripts/main.js': ['<%= yeogurt.client %>/scripts/main.js']
      }
    },
    dist: {
      options: {
        browserifyOptions: {
          debug: true
        },
        preBundleCB: function(b) {
          // Minify code
          return b.plugin('minifyify', {
            map: 'main.js.map',
            output: 'dist/scripts/main.js.map'
          });
        }
      },
      files: {
        '<%= yeogurt.dist %>/scripts/main.js': ['<%= yeogurt.client %>/scripts/main.js']
      }
    },
  });

};

module.exports = taskConfig;
