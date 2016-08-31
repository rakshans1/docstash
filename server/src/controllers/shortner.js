import Shortner from '../models/shortnerModel';
import randomstring from 'randomstring';
import secret from '../config/secret';

function validateUrl(url) {
  let re =/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  return re.test(url);
}

export  const post =  (req, res, next) => {
  const url = req.body.url;

  if (!validateUrl(url)){
    return res.status(422).send({error: 'Invalid Url'});
  }

  Shortner.findOne({url: url}, (err, existingUrl) => {
    if (err) return  next(err);

    if (existingUrl) {
      return res.status(200).send({shortner: existingUrl.shortUrl });
    }
    const uniqueID = randomstring.generate({length: 8,charset: 'alphabetic'});
    const shortner = new Shortner();
    shortner.shortUrl = `${secret.domain}/s/${uniqueID}`;
    shortner.url = url;

    shortner.save((err) => {
      if (err) return next(err);
        res.json({shortner: shortner.shortUrl});
    });
  });
}

export const get = (req, res, next) => {
  const hash = req.params.hash;
  const url  = `${secret.domain}/s/${hash}`;
  Shortner.findOne({shortUrl: url}, (err, existingUrl) => {
    if (err) return  next(err);

    if (existingUrl) {
      return res.redirect(existingUrl.url);
    } else {
        res.status(422).send({error: "Link in not available in shortner"});
    }
  });
}
