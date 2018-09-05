exports['/:userId'] = {
  get: (req, res, next) => {
    return res.render('user', { userId: req.userId });
  }
};
