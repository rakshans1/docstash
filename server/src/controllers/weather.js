import request from 'request';
import secret from '../config/secret';

export const weather = (city, done) => {
  const API_KEY = secret.weather_API_KEY
  const URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}&q=${city}`;
  request.get(URL, (err, resp) => {
    if (err) return done(err);
    done(null, resp.body);
  });
}

export default  (req, res) => {
  const city = req.body.city
  weather(city, (err, data) => {
    if (err) return res.status(422).send({error: 'No Weather data found'});
    res.status(200).send(data);
  });
}
