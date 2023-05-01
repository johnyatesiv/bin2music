const debug = require('debug')('process');
const midi = require('./midi.js');

function parse(input) {
    const str = input.toString('hex');
    const length = str.length;
    const tracks = chunky(str, length);

    for(var t=0;t<4;t++) {
        while(tracks[t].length>0) {
            const first = tracks[t].slice(0,1);
            const second = tracks[t].slice(2,6);
            tracks[t] = tracks[t].slice(6, tracks[t].length);
            midi.convert(first, second);
        }

        midi.endtrack();
    }
}

function chunky(str, length) {
    const tracks = [];
    const quarter = length/4;

    for(var part=0;part<4;part++) {
        tracks[part] = str.substr(part*quarter, (part+1)*quarter);
    }

    return tracks;
}

const processor = {};

processor.parse = parse;
module.exports = processor;
