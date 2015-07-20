'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      js: {
        options: {
          separator: ';',
          banner: '/*! app.js v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        files: {
          'assets/js/app.js': [
            "js/head.js",
            "js/*.controller.js",
            "js/*.route.js",
            "js/foot.js"
          ]
        }
      },
      less: {
        files: {
          'tmp/app.less': [
            'less/config.less',
            'less/global.less',
            'less/page/**/*.html.less'
          ]
        }
      }
    },

    uglify: {
      options: {
        banner: '/*! app.js v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        files: {
          'assets/js/app.min.js': ['assets/js/app.js']
        }
      }
    },


    less: {
      development: {
        files: [
          {
            expand: true,
            cwd: 'tmp',
            src: ['app.less'],
            dest: 'assets/css',
            ext: '.css'
          }
        ]
      }
    },

    copy: {
      options: {},
      dist: {
        files: {
          'assets/app.js': ['lib/purple.js']
        }
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'assets/css',
          src: ['*.css', '!*.min.css'],
          dest: 'assets/css',
          ext: '.min.css'
        }]
      }
    },

    qunit: {
      files: ['test/**/*.html']
    },

    jshint: {
      files: ['Gruntfile.js', 'lib/purple.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },

    watch: {
      files: ['Gruntfile.js', 'js/**/*.js', 'less/**/*.less'],
      tasks: ['concat', 'uglify', 'copy', 'less', 'cssmin']
    }


  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

};