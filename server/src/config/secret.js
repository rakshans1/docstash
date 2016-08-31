export default {
  // database: 'mongodb://root:12345678@ds153845.mlab.com:53845/docstash',
  database: process.env.DB || 'mongodb://localhost:27017/docstash',
  client: process.env.Client || 'http://localhost:3000',
  domain: process.env.DOMAIN || 'http://localhost:3001',
  port: process.env.PORT || 3001,
  secret: "Rakshan*&^",
  emailPass: "docstash123456",
  google: {
    clientID: '890396309082-adjjpv7socoicge1tvpij9d82upl0hpm.apps.googleusercontent.com',
    clientSecret: 'h6WkT7qC-q3DGzDwCtdr-_J0',
    callbackURL: '/auth/google/callback'
  },
  facebook: {
    FACEBOOK_APP_ID: '547856348746149',
    FACEBOOK_SECRET_KEY: 'cd6e86597d505b126d2d67f863c5f7cc',
    FACEBOOK_CALLBACK_URL: '/auth/facebook/callback'
  }
};
