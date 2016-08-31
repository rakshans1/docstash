/*eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import router from './router';
import mongoose from 'mongoose';
import secret from './config/secret';

//remove if not cool
import esm from 'express-status-monitor';

//db options
let options = {
                server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
              };
mongoose.Promise = global.Promise;
mongoose.connect(secret.database, options, function(err){
  if(err) console.log(err);
  if ( process.env.NODE_ENV !== 'test') {
     console.log("Connected to DB");
  }
});

const app = express();

//don't show the log when it is test
if ( process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}



app.use(esm());
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
   res.header('Access-Control-Allow-Headers', 'X-Requested-With,Origin,Content-Type, Authorization');
   if ('OPTIONS' === req.method) {
        res.send(200);
    }
    else {
        next();
    }
 });
app.disable('x-powered-by');

router(app);

app.listen(secret.port);

export default app; // for testing
