var expect = require('chai').expect;
var fspath = require('../../lib/fspath');

suite('fspath', function() {
  test('#getDirectory', function() {
    expect(fspath.getDirectory('/path/to/exile')).to.equal('/path/to');
  });

  test('#newChildPath', function() {
    expect(
      fspath.newChildPath(
        '/path/to/exile',
        '/path/to',
        '/new/path/to'
      )
    ).to.equal('/new/path/to/exile');
  });
});
