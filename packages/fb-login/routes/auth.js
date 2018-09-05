const router = require('express').Router({ mergeParams: true });

const authHandlers = require('../handlers/auth');

router.get('/login', authHandlers['/login'].get);

module.exports = router;
