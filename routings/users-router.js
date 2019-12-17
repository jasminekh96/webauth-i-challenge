const router = require('express').Router();

const Users = require('./users-model');
const restricted = require('../auth/restricted-middleware');

router.get('/', restricted, (req, res) => {
	Users.find()
		.then((users) => {
			res.json(users);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: 'Failed to get users' });
		});
});

module.exports = router;
