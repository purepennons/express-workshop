const router = require('express').Router({ mergeParams: true });

const userHandlers = require('../handlers/user');
const { authCheck, permissionCheck } = require('../middlewares/authCheck');

router.get(
  '/:userId',
  [authCheck, permissionCheck],
  userHandlers['/:userId'].get
);

module.exports = router;
