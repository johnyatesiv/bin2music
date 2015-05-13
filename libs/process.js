var debug = require('debug')('process');
var midi = require('./midi.js');

function parse(input) {
    var str = input.toString('hex');
    var length = str.length;
    var tracks = chunky(str, length);

    for(var t=0;t<4;t++) {

        for(var i=0;i<tracks[t].length;i++) {
            midi.convert(tracks[t][i], tracks[t][i+1]);
            i++;
        }

        midi.endtrack();
    }
}

function chunky(str, length) {
    var tracks = [];
    var quarter = length/4;

    for(var part=0;part<4;part++) {
        tracks[part] = str.substr(part*quarter, (part+1)*quarter);
    }

    return tracks;
}

var processor = {};

processor.parse = parse;
module.exports = processor;