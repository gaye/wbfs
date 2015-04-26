webfs
=====

Implementation of a basic subset of node's fs v0.12 api for the web with
some [caveats](#caveats).

[![Build Status](https://travis-ci.org/gaye/webfs.png?branch=master)](https://travis-ci.org/gaye/webfs)

Run the integration tests [in your browser](https://gaye.github.io/webfs/test/integration/).

### Usage

```js
var co = require('co');
var fs = require('webfs');

co(function*() {
  yield webfs.mkdir('/poems');

  var haiku = `An old silent pond...
               A frog jumps into the pond,
               Splash! Silence again.`

  // Write the haiku to a file.
  yield fs.writeFile('/poems/basho_matsuo.txt', haiku);

  // Oops! The author forgot to sign it.
  yield fs.appendFile('/poems/basho_matsuo.txt', ' -Basho');

  // Rename the poem file.
  yield fs.rename('/poems/basho_matsuo.txt', '/poems/frog_haiku.txt');

  // Spring cleaning! Rename the poems directory to 'haikus'.
  yield fs.rename('/poems', '/haikus');

  // Read the contents of the haikus directory.
  var list = yield fs.readdir('/haikus');
  console.log(list);  // ['frog_haiku.txt']

  // Read the frog poem file.
  var data = yield fs.readFile('/haikus/frog_haiku.txt');
  console.log(data);  // ${haiku} -Basho

  // Delete the frog poem.
  yield fs.unlink('/haikus/frog_haiku.txt');
  list = yield webfs.readdir('/haikus');
  console.log(list);  // []

  // Delete the haikus directory.
  yield fs.rmdir('/haikus');
  try {
    yield webfs.readdir('/haikus');
  } catch (error) {
    console.log(error.message);  // /haikus: No such file or directory
  }
});
```

### Caveats

This is only known to work in Firefox currently since support for
indexedDB as well as es6 features such as promises, generators, proxies,
arrow functions, destructuring, and template strings is assumed.

#### Invocation style

+ No synchronous methods are implemented.
+ Asynchronous methods use promises instead of callbacks.

#### File permissions

+ Neither file permissions nor the methods that let you interact with
  them such as `chown()`, `chmod()`, and `access()` are implemented.
+ Methods that take an optional `mode` argument in the nodejs api do not
  honor the `mode` (since there are no file permissions).

#### Buffers and streams

+ There are no buffers. The `write()`, `readFile()`, `writeFile()`, and
  `appendFile()` methods all coerce values to strings.
+ `createReadStream()`, `ReadStream`, `createWriteStream()`, and
  `WriteStream` are not implemented.

#### fs.exists()

+ `exists()` is not implemented since it is slated for deprecation in
  the nodejs api as of v0.12.

#### FSWatcher

+ `watch()` and `FSWatcher` are not implemented.
