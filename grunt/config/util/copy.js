// Configuration for Copy task(s)
// Copies specified folders/files to specified destination
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('copy', {
    server: {
      files: [{
          expand: true,
          cwd: '<%= yeogurt.client %>/',
          dest: '<%= yeogurt.tmp %>',
          src: [
            'styles/styleguide.md'
          ]}, {
          expand: true,
          flatten: true,
          cwd: '<%= yeogurt.client %>/',
          dest: '<%= yeogurt.tmp %>/fonts/',
          src: [
            'fonts/*.{woff,otf,ttf,eot,svg}',
            'bower_components/fontawesome/**/*.{woff,woff2,ttf,eot,svg}',
          ]}
        ]
    },
    dist: {
      files: [{
        expand: true,
        cwd: '<%= yeogurt.client %>/',
        dest: '<%= yeogurt.dist %>/',
        src: [
          'dashboard/**/*.*',
          'styles/styleguide.md',
          'docs/styleguide/public/images',
          'images/**/*.{webp}',
          '!*.js',
          '*.{ico,png,txt}'
        ]}, {
        expand: true,
        flatten: true,
        cwd: '<%= yeogurt.client %>/',
        dest: '<%= yeogurt.dist %>/fonts/',
        src: [
          'fonts/*.{woff,otf,ttf,eot,svg}',
          'bower_components/fontawesome/**/*.{woff,woff2,ttf,eot,svg}',
        ]
      }]
    },
  });

};

module.exports = taskConfig;
