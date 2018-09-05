const { getError } = require('../utils/lib')

exports.INVALID_CODE = getError('invalid code', 401, 401)
exports.INVALID_TOKEN = getError('invalid token', 401, 401)
exports.LOGIN_FAILED = getError('login failed', 401, 401)
exports.UNAUTHORIZED = getError('unauthorized', 401, 401)