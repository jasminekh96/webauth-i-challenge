exports.seed = function(knex) {
	// Deletes ALL existing entries
	// Inserts seed entries
	return knex('users').insert([
		{ username: 'Penni', password: 'Penni' },
		{ username: 'Buddha', password: 'Buddha' },
		{ username: 'Ryan', password: 'Ryan' },
	]);
};
