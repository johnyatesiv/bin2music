const config = require('./config.js');
const debug = require('debug')('app');
const io = require('socket.io');
const fs = require('fs');
const midi = require('./libs/midi.js');
const processor = require('./libs/process.js');

const output = '';

function start() {
    if(process.argv.length == 2) {
        read(process.argv[1]);
    } else {
        debug('incorrect number of arguments passed - just need one file path.');
    }
}

function read(path) {
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
