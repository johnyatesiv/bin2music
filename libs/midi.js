
var midi = {};

//docs on the file format: http://faydoc.tripod.com/formats/mid.htm

var notes =  {
    'c' : 0,
    'c#': 1,
    'd': 2,
    'd#': 3,
    'e': 4,
    'f': 5,
    'g': 6,
    'g#': 7,
    'a': 8,
    'a#': 9,
    'b': 10
}

function convert(instructions) {
    for(data in instructions) {
        debug(data+' '+instructions[data]);
    }
}

function getnote(note, octave) {
    return (notes[note] + 12*octave);

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

function tracks() {

}

function endtrack() {
    return 'FF2F00';
}

function noteoff(channel, note, velocity) {
    return '8'+channel+note+velocity;
}

function noteon(channel, note, velocity) {
    return '9'+channel+note+velocity;
}

function keyat(channel, note, velocity) {
    return 'A'+channel+note+velocity;
}

function controlchange(channel, controller, value) {
    return 'B'+channel+controller+value;
}

function programchange(channel, program) {
    return 'C'+channel+program;
}

function channelat(channel, newchannel) {
    return 'D'+channel+newchannel;
}

function pitchwheel(channel, bottom, top) {
    return 'E'+channel+bottom+top;
}

//meta events
//all meta events start with FF followed by the command xx, the length nn and the data dd
function settracksequencenum(seq_num) {
    return 'FF0002'+seq_num;
}

function textevent(text) {
    //nn here is byte length
    return 'FF01nn'+text;
}

function copyrighttext(text) {
    return 'FF02nn'+text;
}

function sequencetrackname(text) {
    return 'FF03nn'+text;
}

function trackinstrumentname(text) {
    return 'FF04nn'+text;
}

function lyric(text) {
    return 'FF05nn'+text;
}

function marker(text) {
    return 'FF06nn'+text;
}
function cuepoint(text) {
    return 'FF07nn'+text;
}

function settempo(tempo) {
    //tempo arg is microseconds per quarter note so convert to BPM
    //should be 24 bits
    return 'FF5103'+tempo;
}

function settimesignature(numerator, denominator) {
    //ccbb from the spec should mostly be 4 and 32
    return 'FF5804'+numerator+denominator+'0420'; //<-- not sure this is right
}

function keysignature(key, mode) {
    //mode in the musical sense, short hand for major = 0/minor = 1
    //key actually represents the number of sharps and flats
    return 'FF5902'+key+mode;
}

function sequencerinfo(bytes2send, data) {
    return 'FF7F'+bytes2send+data;
}

midi.convert = convert;
module.exports = midi;
