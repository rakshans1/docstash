import request from 'request';


export default (req, res) => {
  const URL = req.body.url;
  request({
    method: "GET", url: URL, gzip: true, encoding: null //buffer!
  }, (err, resp, body) => {
    if (err) return res.status(404).send({error: 'Invalid URL'});
  });
}
