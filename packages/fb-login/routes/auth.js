const router = require('express').Router({ mergeParams: true });

const authHandlers = require('../handlers/auth');

router.get('/login', authHandlers['/login'].get);
router.post('/logout', authHandlers['/logout'].post);

module.exports = router;
