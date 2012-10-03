/*global describe, before, after, beforeEach, afterEach, describe, it */
var fs      = require('fs');
var path    = require('path');
var grunt   = require('grunt');
var assert  = require('assert');
var helpers = require('./helpers');
var usemin = require('../tasks/usemin.js');

var opts = grunt.cli.options;
opts.redirect = !opts.silent;

// XXX Conform to coding guidelines, mostly literral spacing stuff
grunt.log.writeln("FRED: " + grunt.task.searchDirs.length);
describe('usemin', function() {
  before(helpers.directory('.test'));
  describe('replace helper', function() {
    it("should take into account path", function() {
      usemin.call(grunt,grunt);
      content = grunt.file.read("./fixtures/usemin.html");
      grunt.helper('replace',content, /<img[^\>]+src=['"]([^"']+)["']/gm);
    });
  });
});

