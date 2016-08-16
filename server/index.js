const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');
const secret = require('./config/secret');

mongoose.connect(secret.database, function(err){
  if(err) console.log(err);
  else console.log("Connected to DB");
});

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(cors());
// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type ');
//   next();
// });
router(app);

app.listen(3001);
