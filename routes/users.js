const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const passport = require('passport')

router.get('/login', (req, res) => {
	res.render("login")
})

router.get('/register', (req, res) => {
	res.render('register')
})

router.get('/logout', (req, res) => {
	req.logout()
	req.flash('success_msg', 'You are logged out !!')
	res.redirect('/users/login')
})

router.post('/login', (req, res, next) =>{
	passport.authenticate('local', {
		successRedirect: '/dashboard',
		failureRedirect: '/users/login',
		failureFlash: true
	})(req, res, next);
})

router.post('/register', (req, res) => {
	let errorMsg = []
	const { firstName, lastName, emailAddress, password } = req.body;
	User.findOne({ emailAddress }).then(foundUser => {
		if(foundUser) {
			errorMsg.push({ existingUserMsg: "Email is already registered!!"})
			res.render('register', {errorMsg})
		}
		else {
			const newUser = new User ({
				firstName,
				lastName,
				emailAddress,
				password
			})
			bcrypt.genSalt(Number(process.env.SALTROUNDS), (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					newUser.password = hash
					newUser.save()
					.then(user => {
						req.flash('success_msg', 'You are now registered and can login!')
						res.redirect('/users/login')
					})
					.catch(err => console.log(err))
				})
			})
		}
	})
})

module.exports = router