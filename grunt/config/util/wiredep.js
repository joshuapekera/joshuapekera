// Configuration for Wiredep task(s)
// Injects Bower packages into your source code.
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('wiredep', {
    app: {
      options: {
        ignorePath: /client\/|\.\.\//g,
        // Make sure everything has an absolute path (starts with '/')
        fileTypes: {
          swig: {
            block: /(([ \t]*)<!--\s*bower:*(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endbower\s*-->)/gi,
            detect: {
              js: /<script.*src=['"]([^'"]+)/gi,
              css: /<link.*href=['"]([^'"]+)/gi
            },
            replace: {
              js: '<script src="/{{filePath}}"></script>',
              css: '<link rel="stylesheet" href="/{{filePath}}" />'
            }
          }
        },
        // packages to ignore
        exclude: [
          'bower_components/modernizr/',
          'bower_components/bootstrap/dist/css',
          'bower_components/fontawesome/css',
        ],
        overrides: {
        }
      },
      src: [
        '<%= yeogurt.client %>/templates/layouts/base.swig'
      ]
    },
    styles: {
      src: ['<%= yeogurt.client %>/styles/**/*.less'],
      ignorePath: /client/g,
    }
  });

};

module.exports = taskConfig;
