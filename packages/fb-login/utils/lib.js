exports.getError = (message, code, httpCode) => {
  const error = new Error(message)
  error['code'] = code || '500'
  error['httpCode'] = httpCode || '500'
  return error
}

exports.asyncWrapper = asyncFunc => {
  return function(req, res, next) {
    asyncFunc(req, res, next).catch(err => res.status(500).end())
  }
}