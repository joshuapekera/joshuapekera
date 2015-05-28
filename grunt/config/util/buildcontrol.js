// Configuration for Build Control task(s)
// Deploys the dist directory to a production branch
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('buildcontrol', {
    options: {
      dist: ['<%= yeogurt.dist %>'],
      commit: true,
      push: true,
      message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
    },
    pages: {
      options: {
        remote: 'git@github.com:joshuapekera/joshuapekera.git',
        branch: 'gh-pages'
      }
    },
    deploy: {
      options: {
        remote: 'git@github.com:joshuapekera/joshuapekera.git',
        branch: 'production'
      }
    }
  })
}

module.exports = taskConfig;
