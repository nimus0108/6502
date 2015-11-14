var stack = [];
var sp = 0x00;
var pc = 0x600;
var accumulator = 0x00;
var xResister = 0x00;
var yResister = 0x00;

function ADC(carry){
    accumulator += carry;
}