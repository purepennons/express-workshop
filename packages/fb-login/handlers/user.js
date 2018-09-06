const { asyncWrapper } = require('../utils/lib');
const { getMe } = require('../apis/fb');

exports['/:userId'] = {
  get: (req, res, next) => {
    return res.render('user', { id: req.userId, name: 'unknown' });
  }
};

exports['/me'] = {
  get: asyncWrapper(async (req, res, next) => {
    const token = req.token;
    try {
      const { data: user } = await getMe(token);
      return res.render('user', user)
    } catch (err) {
      const code = err.code || 500;
      const httpCode = err.httpCode || 500;
      return res.status(httpCode).json({
        status: 'error',
        message: err.message,
        code,
        httpCode
      });
    }
  })
};
