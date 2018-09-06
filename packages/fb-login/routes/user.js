const router = require('express').Router({ mergeParams: true });

const userHandlers = require('../handlers/user');
const { authCheck } = require('../middlewares/authCheck');

router.get('/me', [authCheck], userHandlers['/me'].get);
router.get('/:userId', [authCheck], userHandlers['/:userId'].get);

module.exports = router;
