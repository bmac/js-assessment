module.exports = function(grunt) {

var previous_force_state = grunt.option('force');

grunt.registerTask('force',function(set){
    if (set === 'on') {
        grunt.option('force',true);
    }
    else if (set === 'off') {
        grunt.option('force',false);
    }
    else if (set === 'restore') {
        grunt.option('force',previous_force_state);
    }
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
          force: true,
          reporter: 'json',
          captureFile: 'out.json'
        },
        src: ['tests/runner.js']
      }
    },
    reporter: {
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

  grunt.registerTask('default', [ 'jshint', 'force:on', 'mochaTest', 'force:restore', 'reporter' ]);
  grunt.registerTask('develop', [ 'server', 'watch' ]);
};
