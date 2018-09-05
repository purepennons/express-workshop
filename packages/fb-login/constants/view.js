const env = require('./env');

exports.FB_DIALOG_URL = `https://www.facebook.com/v3.1/dialog/oauth?client_id=${
  env.FB_CLIENT_ID
}&redirect_uri=${env.FB_REDIRECT_URL}`;
