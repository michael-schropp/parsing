var fs = require('fs');

var path = 'output.json';
console.log('Loading a web page');
var page = require('webpage').create();
var url = 'http://www.deezer.com/us/show/53118';
page.open(url, function (status) {
  //Page is loaded!
  var title = page.evaluate(function() {
    return window.PLAYER_INIT;
  });
  console.log('content is ' + JSON.stringify(title['track']['data']));
  fs.write(path, JSON.stringify(title['track']['data']), 'w');

  phantom.exit();
});
    