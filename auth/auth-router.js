const bcrypt = require('bcryptjs');
const router = require('express').Router();
const Users = require('../routings/users-model');

router.post('/register', (req, res) => {
	const user = req.body;

	//hash
	const hash = bcrypt.hashSync(user.password, 8);

	//override plain text
	user.password = hash;

	Users.add(user)
		.then((saved) => {
			res.status(201).json(saved);
		})
		.catch((error) => {
			res.status(500).json({ errorMessage: 'cannot create at this time' });
		});
});

router.post('/login', (req, res) => {
	let { username, password } = req.body;

	Users.findBy({ username })
		.first()
		.then((user) => {
			if (user && bcrypt.compareSync(password, user.password)) {
				//save a session to return cookies
				req.session.user = user;
				res.status(200).json({ message: `Welcome ${user.username}.` });
			} else {
				res.status(401).json({ errorMessage: 'You shall not pass!' });
			}
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

router.get('/logout', (req, res) => {
	if (req.session) {
		req.session.destroy((error) => {
			if (error) {
				res.status(500).json({ message: 'unable to logout' });
			} else {
				res.status(200).json({ message: 'logged out' });
			}
		});
	} else {
		res.status(200).end();
	}
});

module.exports = router;
