/*global describe, before, after, beforeEach, afterEach, describe, it */
var fs      = require('fs');
var path    = require('path');
var grunt   = require('grunt');
var assert  = require('assert');
var helpers = require('./helpers');

var opts = grunt.cli.options;
opts.redirect = !opts.silent;

// XXX Conform to coding guidelines, mostly literral spacing stuff

describe('yeoman devbuild', function() {
  before(helpers.directory('.test'));

  before(helpers.gruntfile({
    foo: {
      bar: '<config.baz>'
    }
  }));

 // Handle missing dependencies during test run, we only run compass /
  // manifest related test when necessary binaries are available. This helper
  // defines the respective boolean flag on the mocha test context, and used
  // within some of our tests to conditionnaly go through.
  before(helpers.installed('compass'));
  before(helpers.installed('phantomjs'));

  describe('When I run init app with default prompts', function(done) {
    before(function(done) {
      var yeoman = helpers.run('init --force', opts);
      yeoman
        // enter '\n' for both prompts, and grunt confirm
        .prompt(/would you like/i)
        .prompt(/Do you need to make any changes to the above before continuing?/)
        // check exit code
        .expect(0)
        // run and done
        .end(done);
    });
    before(function(done) {
        // setup the runnable
        this.yeoman = helpers.run('devbuild --no-color', opts)
          .expect(0)
          .end(done);
    });

    it("should create a devbuild directory", function(done) {
      fs.stat('devbuild/', done);
    });
  });
});
