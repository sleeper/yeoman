var fs = require('fs'),
  path = require('path'),
  util = require('util'),
  http = require('http'),
  events = require('events'),
  colors = require('colors'),
  connect = require('connect'),
  WebSocket = require('faye-websocket'),
  open = require('open'),
  WeakMap = require('es6-collections').WeakMap;

module.exports = function(grunt) {

  grunt.registerTask('devbuild', 'generate a devbuild', function() {
    grunt.log.writeln("FRED: devbuild called !!!");
  });



}