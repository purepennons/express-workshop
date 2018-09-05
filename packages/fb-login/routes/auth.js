const router = require('express').Router({ mergeParams: true });

const authHandlers = require('../handlers/auth');

router.get('/login', authHandlers['/login'].get);
router.get('/logout', authHandlers['/logout'].get);

module.exports = router;
