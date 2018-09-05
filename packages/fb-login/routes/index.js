const Router = require('express').Router;
const { FB_DIALOG_URL } = require('../constants/view');

const authRouter = require('./auth');
const userRouter = require('./user');

const rootRouter = new Router();

rootRouter.get('/', (req, res, next) => {
  res.render('index', { fbDialogURL: FB_DIALOG_URL });
});
rootRouter.use('/auth', authRouter);
rootRouter.use('/user', userRouter);

module.exports = rootRouter;
