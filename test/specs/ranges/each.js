/*!***************************************************
 * mark.js
 * https://github.com/julmot/mark.js
 * Copyright (c) 2014–2017, Julian Motz
 * Released under the MIT license https://git.io/vwTVl
 *****************************************************/
'use strict';
describe('mark with range each callback', function() {
  var $ctx, $elements, ranges;
  beforeEach(function(done) {
    loadFixtures('ranges/each.html');

    $elements = $();
    $ctx = $('.ranges-each');
    ranges = [];
    new Mark($ctx[0]).markRanges([
      {start: 14, length: 5},
      {start: 58, length: 5}
    ], {
      'each': function(node, range) {
        $elements = $elements.add($(node));
        ranges.push(range);
      },
      'done': done
    });
  });

  it('should call the each callback for each range element', function() {
    expect($elements).toHaveLength(2);
  });
  it('should pass the correct parameters', function() {
    var textOpts = ['ipsum', 'elitr'];
    $elements.each(function() {
      expect($.inArray($(this).text(), textOpts)).toBeGreaterThan(-1);
    });
    expect(ranges).toEqual([
      {start: 14, length: 5},
      {start: 58, length: 5}
    ]);
  });
});
