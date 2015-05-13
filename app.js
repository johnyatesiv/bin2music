//dependencies
var config = require('./config.js');
var debug = require('debug')('app');
var io = require('socket.io');
var fs = require('fs');
var midi = require('./libs/midi.js');
var processor = require('./libs/process.js');

//vars
var output;

//functions

function start() {
    if(process.argv.length == 2) {
        read(process.argv[1]);
    } else {
        debug('incorrect number of arguments passed - just need one file path.');
    }
}

function read(path) {
    //may need to specify encoding
    fs.readFile(path, 'hex', function(err, data) {
        if(err) {
            debug('file read error: '+err);
        } else {
            if(data.length < config.max_length) {
                processor.parse(data);
            } else {
                debug('a file of this length is not supported currently, sorry!');
            }
        }
    });
}

start();