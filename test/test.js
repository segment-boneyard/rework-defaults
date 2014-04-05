
var rework = require('rework');
var defaults = require('..');
var input = read('fixture.css');
var expected = read('fixture.out.css');
var assert = require('assert');

describe('rework-defaults', function(){
  it('should work', function(){
    var out = rework(input).use(defaults({ width: '100px' }));
    var actual = out.toString().trim();
    if (actual == expected) return;
    var err = new Error('Error');
    err.actual = actual;
    err.expected = expected;
    err.showDiff = true;
    throw err;
  });
});

function read(name){
  return require('fs')
    .readFileSync('test/fixtures/' + name)
    .toString()
    .trim();
}
