const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const User = require('../models/User')

module.exports = (passport) => {
	passport.use (
		new LocalStrategy({ usernameField: 'emailAddress' }, (emailAddress, password, done) => {
			User.findOne({emailAddress})
			.then(user => {
				if(!user) {
					return done(null, false, { message: 'That email is not registered'})
				}

				bcrypt.compare(password, user.password, (err, foundUser)=> {
					if (err) throw err
						if (foundUser)
							return done(null, user)
						else
							return done(null, false, { message: 'Password incorrect'})
					})
			})
			.catch(err => console.log(err))
		})
		)
	
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});
}