const router = require('express').Router();

const authRouter = require('../auth/auth-router');
const usersRouter = require('../routings/users-router');

function logger(req, res, next) {
	console.log(`${req.method} to ${req.originalUrl} at ${new Date()}`);
	next();
}

router.use(logger);
router.use('/auth', authRouter);
router.use('/users', usersRouter);

router.get('/', (req, res) => {
	res.send(`<h1>She works!</h1>`);
});

module.exports = router;
