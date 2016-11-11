import {Wit} from 'node-wit';
import secret from '../config/secret';
import {weather} from '../controllers/weather';
import User from '../models/user';
import units from '../util/units';

const client = new Wit({accessToken: secret.WIT});



export const message = (message,name, email, done) => {
  client.message(message, {})
  .then((data) => {
    check(data, name, email, done);
  })
  .catch(console.error);
}

function check(data, name, email, done) {
  if (data.entities.intent) {
    switch(data.entities.intent[0].value) {
      case 'weather':
        return witWeather(data, done);
      case 'about':
        return about(done);
      case 'greeting':
        return greeting(name, done);
      case 'storage':
        return storage(name, email, done);
      default:
        return witdefault(done);
    }
  } else {
    witdefault(done);
  }
}

function witWeather(data, done) {
  const city = data.entities.location[0].value;
  weather(city, (err, data) => {
    const cityData = JSON.parse(data);
    const temp = Math.floor(cityData.list[0].main.temp - 273);
    const todayweather = cityData.list[0].weather[0].description
    done(`It is ${temp}°C in ${city} and ${todayweather}`);
  });
}
function about(done) {
  done('My name is Docstash Bot');
}
function greeting(name, done) {
  done(`Hello, ${name}`);
}

function witdefault(done) {
  done('Sorry, I did not understand your request');
}
function storage(name, email, done) {
  User.findOne({email: email}, (err, existingUser) => {
    if (err) return done('Can\'t calculate your storage at moment.')
    const storage = units(existingUser.storage)
    done(`You have used ${storage} out of 10 GB`);
  });
}
