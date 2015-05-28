// `grunt build`
// Builds out an optimized site through (but not limited to) minification of CSS and HTML,
// as well as uglification and optimization of Javascript, and compression of images.

'use strict';

var taskConfig = function(grunt) {
  grunt.registerTask('build', 'Build a production ready version of your site.', function(target) {

    grunt.task.run([
      'clean:dist',
      'injector',
      'wiredep',
      'copy:dist',
      'concurrent',
      'useminPrepare',
      'concat:generated',
      'cssmin',
      'autoprefixer:dist',
      'usemin',
      'htmlmin:dist',
      'uglify',
      'clean:tmp'
    ]);

    if (target === 'deploy') {
      return grunt.task.run(['buildcontrol:deploy'])
    }
  })
}

module.exports = taskConfig;
