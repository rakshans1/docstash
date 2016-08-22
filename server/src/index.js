import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import router from './router';
import mongoose from 'mongoose';
import secret from './config/secret';

//remove if not cool
import esm from 'express-status-monitor';

mongoose.connect(secret.database, function(err){
  if(err) console.log(err);
  else console.log("Connected to DB");
});

const app = express();
app.use(esm());
app.use(morgan('dev'));
app.use(bodyParser.json({ type: '*/*' }));
// app.use(function(req, res, next) {
//    res.header('Access-Control-Allow-Origin', '*');		   res.header('Access-Control-Allow-Origin', '*');
//    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');		   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//    res.header('Access-Control-Allow-Headers', 'Content-Type ');		   res.header('Access-Control-Allow-Headers', 'Content-Type ');
//    next();		   next();
//   });
app.use(cors());
router(app);

app.listen(secret.port);
