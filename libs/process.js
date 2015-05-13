var processor = {};
var debug = require('debug')('process');

function parse(input) {
    var str = input.toString('hex');
    for(var i=0;i<str.length;i++) {
        debug(str[i]+' - ');
    }
}

function map(bytes) {
    switch(bytes) {

    }
}

processor.parse = parse;
module.exports = processor;