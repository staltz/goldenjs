module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['jquery.golden.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    uglify: {
      options: {
        banner: '/* <%= pkg.name %> v<%= pkg.version %> jQuery plugin <%= pkg.homepage %> */\n'
      },
      dist: {
        files: {
          'jquery.golden.min.js': 'jquery.golden.js'
        }
      }
    },
    copy: {
      files: {
        expand: true,
        cwd: './',
        src: ['*golden*.js'],
        dest: 'docs/js/'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.registerTask('default', ['jshint', 'uglify', 'copy']);
};