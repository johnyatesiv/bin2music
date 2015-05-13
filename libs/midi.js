var debug = require('debug')('midi');

//docs on the file format: http://faydoc.tripod.com/formats/mid.htm

function convert(first, second) {
    var octave = null;
    var note = null;
    var command = null;
    var output = null;

    if(typeof second == 'integer') {
        octave = second;
    } else {
        octave = 4;
    }

    //TODO need to determine if the note is on/off and whatever
    //TODO need to assign each track a channel upon instantiation somehow

    if(!isNaN(first) || first == 'a') {
        output = hexify(getnote(first, octave));
    } else {
        output = hexify(getcommand(first, octave));
    }

    //TODO here is where everything stops, need to pass the args to the various functions as hex and write

    if(output != null) {
        write(output);
        return true;
    } else {
        debug('error in generating a command in the midi lib');
        throw new Error();
    }
}

function hexify(val) {
    return val;
}

function getnote(note, octave) {
    return (notes[note] + 12*octave);

}

function getcommand(first, octave) {
    return commands[first](first, octave);
}

//note "at" usually means "after touch"

function headers() {
//    "The header chunk appears at the beginning of the file, " +
//    "and describes the file in three ways. The header chunk always looks like:"
//    "4D 54 68 64 00 00 00 06 ff ff nn nn dd dd"

//    ff ff is the file format. There are 3 formats:
//    0	-	single-track
//    1	-	multiple tracks, synchronous
//    2	-	multiple tracks, asynchronous
//    Single track is fairly self-explanatory - one track only.
//    Synchronous multiple tracks means that the tracks will all be vertically synchronous,
//    or in other words, they all start at the same time,
//    and so can represent different parts in one song.
//    Asynchronous multiple tracks do not necessarily start at the same time,
//    and can be completely asynchronous.
//     nn nn is the number of tracks in the midi file.
//     dd dd is the number of delta-time ticks per quarter note. (More about this later)

}

function write(data) {
    var file = 'output.mid';
}

function endtrack() {
    write('FF2F00');
}

var noteoff = function(channel, note, velocity) {
    return '8'+channel+note+velocity;
}

var noteon = function(channel, note, velocity) {
    return '9'+channel+note+velocity;
}

var keyat = function(channel, note, velocity) {
    return 'A'+channel+note+velocity;
}

var controlchange = function(channel, controller, value) {
    return 'B'+channel+controller+value;
}

var programchange = function(channel, program) {
    return 'C'+channel+program;
}

var channelat = function(channel, newchannel) {
    return 'D'+channel+newchannel;
}

var pitchwheel = function(channel, bottom, top) {
    return 'E'+channel+bottom+top;
}

//meta events
//all meta events start with FF followed by the command xx, the length nn and the data dd
var settracksequencenum = function(seq_num) {
    return 'FF0002'+seq_num;
}

var textevent = function(text) {
    //nn here is byte length
    return 'FF01nn'+text;
}

var copyrighttext = function(text) {
    return 'FF02nn'+text;
}

var sequencetrackname = function(text) {
    return 'FF03nn'+text;
}

var trackinstrumentname = function(text) {
    return 'FF04nn'+text;
}

var lyric = function(text) {
    return 'FF05nn'+text;
}

var marker = function(text) {
    return 'FF06nn'+text;
}

var cuepoint = function(text) {
    return 'FF07nn'+text;
}

var settempo = function(tempo) {
    //tempo arg is microseconds per quarter note so convert to BPM
    //should be 24 bits
    return 'FF5103'+tempo;
}

var settimesignature = function(numerator, denominator) {
    //ccbb from the spec should mostly be 4 and 32
    return 'FF5804'+numerator+denominator+'0420'; //<-- not sure this is right
}

var keysignature = function(key, mode) {
    //mode in the musical sense, short hand for major = 0/minor = 1
    //key actually represents the number of sharps and flats
    return 'FF5902'+key+mode;
}

var sequencerinfo = function(bytes2send, data) {
    return 'FF7F'+bytes2send+data;
}

//some necessary maps

var notes =  {
    0: 0, //c
    1: 1, //c#
    2: 2, //d
    3: 3, //d#
    4: 4, //e
    5: 5, //f
    6: 6, //g
    7: 7, //g#
    8: 8, //a
    9: 9, //a#
    A: 10 //b
};

var commands = {
    b: noteon,
    c: noteoff,
    d: keyat,
    e: channelat,
    f: noteoff
};

var midi = {};

midi.convert = convert;
midi.endtrack = endtrack;
module.exports = midi;
