(function(){
  var got = require('got');
  var cheerio = require('cheerio');
  var magnet = require('magnet-uri');

  function parseFeed(data) {
    var $ = cheerio.load(data.body, { xmlMode: true });
    var torrents = [];
    $('item').each(function(i, rowElem) {
      var $r = cheerio.load($(rowElem).html(), { xmlMode: true });
      torrents.push({
        title: $r('title').text(),
        link: $r('guid').text(),
        hash: $r('info_hash').text(),
        torrent: $r('enclosure').attr('url'),
        seeds: parseInt($r('seeders').text()),
        leechs: parseInt($r('leechers').text()),
        peers: parseInt($r('seeders').text()) + parseInt($r('leechers').text()),
        size: parseInt($r('size').text()),
        url: $r('link').text(),
        magnetLink: magnet.encode({
            name: $r('title').text(),
            infoHash: $r('hash_info').text(),
            announce: [ // Adding a list of public trackers, that's what
                        // extratorrent.cc does, except we have more
              'udp://tracker.openbittorrent.com:80',
              'udp://tracker.publicbt.com:80',
              'udp://tracker.istole.it:80',
              'udp://tracker.btzoo.eu:80/announce',
              'http://opensharing.org:2710/announce',
              'udp://open.demonii.com:1337/announce',
              'http://announce.torrentsmd.com:8080/announce.php',
              'http://announce.torrentsmd.com:6969/announce',
              'http://bt.careland.com.cn:6969/announce',
              'http://i.bandito.org/announce',
              'http://bttrack.9you.com/announce'
            ]
        })
      });
    });
    return torrents;
  }

  //----------------------------------------------------------------------------//
  // API functions to call all the feeds
  //----------------------------------------------------------------------------//

  var base = "https://extratorrent.cc/";
  module.exports = {};

  module.exports.search = function(query) {
    return got(base + '/rss.xml?type=search&search=' + encodeURIComponent(query))
      .then(parseFeed);
  };

  module.exports.popular = function() {
    return got(base + '/rss.xml?type=popular').then(parseFeed);
  };

  module.exports.today = function() {
    return got(base + '/rss.xml?type=today').then(parseFeed);
  };

  module.exports.yesterday = function() {
    return got(base + '/rss.xml?type=yesterday').then(parseFeed);
  };

  module.exports.category = function(category) {
    return got(base + '/rss.xml?type=last&cid=' + category).then(parseFeed);
  };

  return;
})();
