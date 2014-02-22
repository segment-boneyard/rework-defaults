
var rework = require('rework');
var defaults = require('..');
var input = read('fixture.css');
var expected = read('fixture.out.css');
var assert = require('assert');

describe('rework-defaults', function(){
  it('should work', function(){
    var out = rework(input).use(defaults({ width: '100px' }));
    assert(expected.trim() == out.toString().trim());
  });
});

function read(name){
  return require('fs')
    .readFileSync('test/fixtures/' + name)
    .toString();
}
