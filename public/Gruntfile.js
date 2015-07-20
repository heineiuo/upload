'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      indexjs: {
        options: {
          separator: ';',
          banner: '/*! index.js v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n'
        },
        files: {
          'tmp/main/index.js': [
            "src/main/js/init/init.js",
            "src/main/js/lib/*.js",
            "src/main/js/controller/*.js",
            "src/main/js/page/*.js",
            "src/main/js/index.js"
          ]
        }
      },

      indexvendorjs: {

        options: {
          banner: '/*! vendor.js includes jquery,underscore,purple <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n'
        },

        files: {
          'tmp/main/vendor.js': [
            "src/main/vendor/jquery-2.1.4.min.js",
            "src/main/vendor/underscore-1.8.3.js",
            "src/main/vendor/purple-0.6.0.debug.min.js"
          ]
        }
      },


      indexless: {
        files: {
          'tmp/main/index.less': [
            'src/main/less/config.less',
            'src/main/less/global/*.less',
            'src/main/less/page/*.less'
          ]
        }
      }
    },

    jst: {
      compile: {
        options: {
          processName: function(filepath) {
            return filepath.replace('src/main/template/','')
              .replace('.html', '')
          },
          templateettings: {
            interpolate : /\{\{(.+?)\}\}/g
          },
          processContent: function(src) {
            return src.replace(/(^\s+|\s+$)/gm, '').replace(/\n+/gm, '');
          }
        },
        files: {
          "tmp/main/template.js": ["src/main/template/**/*.html"]
        }
      }
    },





    // work in tmp


    uglify: {
      indexjs: {
        options: {
          banner: '/*! index.js v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n',
          compress: {
            drop_console: true
          }
        },

        files: {
          'tmp/main/index.min.js': ['tmp/main/index.js']
        }
      },


      template: {
        options: {
          banner: '/*! template.js v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n',
          compress: {
            drop_console: true
          }
        },
        files: {
          'tmp/main/template.min.js': ['tmp/main/template.js']
        }

      }
    },

    less: {
      development: {
        files: {
          'tmp/main/index.css': ['tmp/main/index.less']
        }
      }
    },


    cssmin: {
      target: {
        files: {
          'tmp/main/index.min.css': ['tmp/main/index.css']
        }
      }
    },

    clean: {
      js: ["assets/**/*.js"],
      css: ["assets/**/*.css"]
    },



    // work in assets

    copy: {
      options: {},
      dist: {
        files: {
          'assets/main/vendor.js': ['tmp/main/vendor.js'],
          'assets/main/index.js': ['tmp/main/index.min.js'],
          'assets/main/index.css': ['tmp/main/index.min.css'],
          'assets/main/template.js': ['tmp/main/template.min.js']
        }
      }
    },

    watch: {
      files: ['./Gruntfile.js', 'src/**/*.js', 'src/**/*.less', 'src/**/*.html'],
      tasks: ['concat', 'jst', 'uglify', 'less', 'cssmin', 'clean', 'copy']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jst');


};