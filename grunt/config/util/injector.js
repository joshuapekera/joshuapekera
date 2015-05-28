// Configuration for Injector task(s)
// Injects Link/Import statements in to specified files
'use strict';

var _str = require('underscore.string');

var taskConfig = function(grunt) {

  grunt.config.set('injector', {
    options: {

    },
    // Inject application script files into index.html (doesn't include bower)
    swig: {
      options: {
        transform: function(filePath) {
          filePath = filePath.replace('/client/templates/', '../');
          var fileName = filePath.substring(filePath.lastIndexOf('/')+1).slice(0, -5);
          return '{% import "' + filePath + '" as ' + _str.camelize(fileName) + ' %}';
        },
        starttag: '{# [injector:swig] #}',
        endtag: '{# [endinjector] #}'
      },
      files: {
        '<%= yeogurt.client %>/templates/layouts/base.swig': [
          '<%= yeogurt.client %>/templates/modules/*.swig',
        ]
      }
    },
    // Inject component less into main.less
    less: {
      options: {
        transform: function(filePath) {
          filePath = filePath.replace('/client/styles/', '');
          return '@import \'' + filePath + '\';';
        },
        starttag: '// [injector]',
        endtag: '// [endinjector]'
      },
      files: {
        '<%= yeogurt.client %>/styles/main.less': [
          '<%= yeogurt.client %>/styles/**/*.less',
          '!<%= yeogurt.client %>/styles/main.less'
        ]
      }
    },
  });

};

module.exports = taskConfig;
