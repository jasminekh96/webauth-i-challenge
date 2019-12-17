const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const sessions = require('express-session');
const KnexSessionStore = require('connect-session-knex')(sessions);

const knex = require('../database/dbConfig');

const sessionConfiguration = {
	//session storage options
	name             : 'pickles', //default would be sid
	secret           : 'keep it secret, keep it safe', //used for encryption (must be an environment variable)
	saveUnintialized : true, //has implications with GDPR laws
	resave           : false,
	//how to store the session

	store            : new KnexSessionStore({
		//do not forget the new keyword
		knex, //imported from dbconfig.js
		createtable   : true,
		clearInterval : 1000 * 60 * 10,
		sidfieldname  : 'sid',

		//optional
		tablename     : 'sessions',
	}),

	//cookie options
	cookie           : {
		maxAge   : 1000 * 60 * 10, //the cookie will be good for 10 mins in milliseconds
		secure   : false, //if false the cooke is sent over http, if true only sent over https
		httpOnly : true, //if true JS cannot access the cookie
	},
};

module.exports = (server) => {
	server.use(helmet());
	server.use(express.json());
	server.use(cors());
	server.use(sessions(sessionConfiguration));
};
