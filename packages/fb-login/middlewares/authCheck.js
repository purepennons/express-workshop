const { asyncWrapper } = require('../utils/lib');
const { subHandlers } = require('../handlers/auth');
const { INVALID_TOKEN, UNAUTHORIZED } = require('../constants/error');

exports.authCheck = asyncWrapper(async (req, res, next) => {
  const { clearSession } = req.app.locals;
  const token = req.session.token;

  try {
    if (!token) {
      throw INVALID_TOKEN;
    }
    const { access_token } = token;
    const updatedInfo = await subHandlers.parseToken(access_token);

    // setup user info
    const { user_id } = updatedInfo;
    subHandlers.setAuth(user_id, token, updatedInfo, req);
    req.userId = user_id;

    next();
  } catch (err) {
    console.log('authCheck failed');
    const info = req.session.info;
    const userId = info && info.user_id ? info.user_id : null;
    clearSession(userId, req);
    res.status(err.httpCode || 500);
    return res.redirect('/auth/login');
  }
});

exports.permissionCheck = asyncWrapper(async (req, res, next) => {
  const reqUserId = req.body.userId || req.query.userId || req.params.userId;
  const userId = req.userId;

  try {
    if (userId !== reqUserId) {
      throw UNAUTHORIZED;
    }

    req.userId = reqUserId;

    next();
  } catch (err) {
    console.log('permissionCheck failed');
    return res.status(err.httpCode || 500).send(err.message);
  }
});
