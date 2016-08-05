const auth = require('./controllers/auth');
const passportConfig  = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false });
const requireSignIn = passport.authenticate('local', {session: false });

module.exports = function(app) {
  app.get('/', requireAuth, (req, res) => {
    res.send('hi');
  });
  app.post('/signin', requireSignIn, auth.signin);
  app.post('/signup', auth.signup);
}
