import request from 'request'


export default  (req, res) => {
  const city = req.body.city
  const API_KEY = 'ccdc65429545e5b39a567101fb13659d'
  const URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}&q=${city}`;
  console.log(URL);
  request.get(URL, (err, resp) => {
    if (err) return res.status(422).send({error: 'No Weather data found'});
    res.status(200).send(resp.body);
  });
}
