const { getToken, verifyToken } = require('../apis/fb');
const { INVALID_TOKEN, INVALID_CODE } = require('../constants/error');
const { asyncWrapper } = require('../utils/lib');

const subHandlers = {
  parseToken: async token => {
    const { data: info } = await verifyToken(token);
    if (!info || !info.data || !info.data.is_valid) {
      throw INVALID_TOKEN;
    }
    return info.data;
  },

  setAuth: (user_id, token, info, req) => {
    const { db } = req.app.locals;
    db.set(user_id, { token, info });
    req.session.token = token;
    req.session.info = info;
  }
};

exports['subHandlers'] = subHandlers;

exports['/login'] = {
  get: asyncWrapper(async (req, res, next) => {
    const { code } = req.query;
    const { db, clearSession } = req.app.locals;
    try {
      if (!code) throw INVALID_CODE;
      const { data: token } = await getToken(code);
      const { access_token, token_type, expires_in } = token;
      if (!access_token) throw INVALID_TOKEN;
      const info = await subHandlers.parseToken(access_token);

      // setup user info
      const { user_id } = info;
      subHandlers.setAuth(user_id, token, info, req);

      return res.redirect(`/user/${user_id}`);
    } catch (err) {
      const info = req.session.info;
      const userId = info && info.user_id ? info.user_id : null;
      clearSession(userId, req);
      return res.redirect('/');
    }
  })
};

exports['/logout'] = {
  get: (req, res, next) => {
    const { clearSession } = req.app.locals;
    const info = req.session.info;
    const userId = info && info.user_id ? info.user_id : null;
    clearSession(userId, req);
    return res.redirect('/');
  }
};
