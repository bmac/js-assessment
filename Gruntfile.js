var fs = require('fs'),
    exec = require('child_process').exec;


module.exports = function(grunt) {

  // ugly hack
  grunt.registerTask('outputMocha',function(set){
    var done = this.async();
    exec('./node_modules/mocha/bin/mocha -R json tests/runner.js',function(err,stdout,stderr){
      fs.writeFile('out.json', stdout, function() {
        done();
      });
    });
  });



  grunt.initConfig({
    jshint: {
      all: [
        'app/**/*.js',
        'tests/app/**/*.js',
        'tests/runner.js',
        'Gruntfile.js',
        '!app/bestPractices.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    watch: {
      scripts: {
        files: 'app/**/*.js',
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['tests/runner.js']
      }
    },
    reporter: {
      options: {
        pattern: 'app/*.js'
      },
      all: {}
    }
  });

  grunt.registerTask('server', 'Start a custom web server.', function() {
    var server = require('./server/server.js');
    server({ port : 4444, dev : true });
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-training-reporter');

  grunt.registerTask('default', [ 'jshint', 'outputMocha', 'reporter', 'mochaTest' ]);
  grunt.registerTask('develop', [ 'server', 'watch' ]);
};
