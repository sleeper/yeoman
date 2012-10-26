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

  it("should reference images from application root", function(done) {
    // Setup test environment:
    //  - copy needed fixtures: mainly a scss file referencing an image
    //  - create needed Gruntfile config to target this file
      grunt.log.muted = false;
      compass.call(grunt, grunt);
      grunt.file.mkdir("app");
      grunt.file.mkdir("temp");
      grunt.file.mkdir("app/images");
      grunt.file.mkdir("app/scss");
      helpers.gruntfile({'compass': {  dist: {
        options: {
          css_dir: 'temp/styles',
          sass_dir: 'app/scss',
          images_dir: 'app/images',
          javascripts_dir: 'temp/scripts',
          force: true
        }
      }}});

      grunt.config.init();
//      grunt.config('compass-handler', {html: "index.html"});
      grunt.config('compass', {dist: {
        options: {
           css_dir: 'temp/styles',
          sass_dir: 'app/scss',
          images_dir: 'app/images',
          javascripts_dir: 'temp/scripts',
          force: true
        }}});
      grunt.file.copy(path.join(__dirname,"fixtures/compass.scss"), "app/scss/compass.scss");
      grunt.task.run('compass');
      grunt.task.start();
      // Let's have a look at the generated file
      var content = grunt.file.read("temp/styles/compass.css"); 
      assert.ok( content.match(/background-image:\s+image-url("\/images\/glyphicons-halflings.png");/g) )
  });
});

