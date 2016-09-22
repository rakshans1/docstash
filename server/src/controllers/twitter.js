import events from 'events';
import sentiment from 'sentiment';
import Twitter from 'twitter';
import secret from '../config/secret';

const twitter = new events.EventEmitter();
export default twitter;
twitter.tweetCount = 0;
twitter.tweets = [];
twitter.tweetTotalSentiment = 0;
twitter.monitoringPhrase = '';
var stream = null;

//Auth twitter
var client = new Twitter({
  consumer_key: secret.twitter.TWITTER_CONSUMER_KEY,
  consumer_secret: secret.twitter.TWITTER_CONSUMER_SECRET,
  access_token_key: secret.twitter.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: secret.twitter.TWITTER_ACCESS_TOKEN_SECRET
});


//Get the phrase and do sentiment on it
twitter.sentimentTwitter = (req, res, next) => {
  const tweet = req.body.tweet;
  sentiment(tweet, (err, result) => {
    var response = 'sentiment(' + tweet + ') === ' + result.score;
    console.log(response);
    res.send(response);
  });
}

twitter.watchTwitter = (req, res, next) => {
  if (stream ) stream.destroy();
  const tweet = req.body.tweet;
  twitter.monitoringPhrase = tweet;
  stream = client.stream('statuses/filter', {track: tweet});
  stream.on('data', (data) => {
    if (data.lang === 'en') {
      sentiment(data.text, (err, result) => {
        twitter.tweetCount++;
        twitter.tweetTotalSentiment += result.score;
        twitter.tweets.unshift(data.text);
        if (twitter.tweets.length === 10) twitter.tweets.pop()
        twitter.emit("update");
      });
    }
  });
  stream.on('error', function(err) {
    console.log(err);
  });
  setTimeout(() => stream.destroy(), 5000 * 60);
  res.send("ok");
}
