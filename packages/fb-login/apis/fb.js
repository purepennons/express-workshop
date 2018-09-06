const axios = require('axios');

const ENV = require('../constants/env');
const {
  INVALID_CODE,
  LOGIN_FAILED,
  INVALID_TOKEN,
  UNKNOWN,
} = require('../constants/error');

exports.getToken = async code => {
  if (!code) throw INVALID_CODE;
  const url = `https://graph.facebook.com/v3.1/oauth/access_token?client_id=${
    ENV.FB_CLIENT_ID
  }&redirect_uri=${ENV.FB_REDIRECT_URL}&client_secret=${
    ENV.FB_CLIENT_SECRET
  }&code=${code}`;
  try {
    return await axios.get(url);
  } catch (err) {
    throw LOGIN_FAILED;
  }
};

exports.verifyToken = async token => {
  if (!token) throw INVALID_TOKEN;
  const url = `https://graph.facebook.com/debug_token?input_token=${token}&access_token=${
    ENV.FB_APP_TOKEN
  }`;
  try {
    return await axios.get(url);
  } catch (err) {
    throw INVALID_TOKEN;
  }
};

exports.getMe = async token => {
  if (!token) throw INVALID_TOKEN;
  const url = `https://graph.facebook.com/v3.1/me?access_token=${token}`
  try {
    return await axios.get(url)
  } catch(err) {
    throw UNKNOWN
  }
};
