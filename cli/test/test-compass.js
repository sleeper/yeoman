/*global describe, before, after, beforeEach, afterEach, describe, it */
var fs      = require('fs');
var path    = require('path');
var grunt   = require('grunt');
var assert  = require('assert');
var helpers = require('./helpers');
var compass = require('../tasks/compass.js');

var opts = grunt.cli.options;
opts.redirect = !opts.silent;

// XXX Conform to coding guidelines, mostly literral spacing stuff
describe('compass', function() {
  before(helpers.directory('.test'));

  it("should reference images from application root", function() {
    // Setup test environment:
    //  - copy needed fixtures: mainly a scss file referencing an image
    //  - create needed Gruntfile config to target this file
      grunt.log.muted = false;
      compass.call(grunt, grunt);
      helpers.gruntfile({'compass': {  dist: {
        options: {
          css_dir: 'temp/styles',
          sass_dir: 'app/styles',
          images_dir: 'app/images',
          javascripts_dir: 'temp/scripts',
          force: true
        }
      }});

      grunt.config.init();
//      grunt.config('compass-handler', {html: "index.html"});
      grunt.file.copy(path.join(__dirname,"fixtures/compass.html"), "index.html");
      grunt.task.run('compass');
      grunt.task.start();
      // Grunt config related to concat should have been changed
      var concat_config = grunt.config('concat');
      // Actually the fixture index.html requires to concat stuff in '/scripts/plugins.js' ...
      // As this references a local file, the concat config should have a key named
      // 'scripts/plugins.js' (i.e. *without* the leading /)
      assert.ok('scripts/plugins.js' in concat_config);    

  });
});

