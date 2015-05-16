var debug = require('debug')('process');
var midi = require('./midi.js');

function parse(input) {
    var str = input.toString('hex');
    var length = str.length;
    var tracks = chunky(str, length);

    for(var t=0;t<4;t++) {
        while(tracks[t].length>0) {
            var first = tracks[t].slice(0,1);
            var second = tracks[t].slice(2,6);
            tracks[t] = tracks[t].slice(6, tracks[t].length);
            midi.convert(first, second);
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