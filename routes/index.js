const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')
const _ = require('lodash');

router.get('/', (req, res) => {
	if(req.isAuthenticated())
		res.redirect("/dashboard")
	else
		res.redirect("/home")
})

router.get('/home', (req, res) => {
	res.render("home")
})


router.get('/dashboard', ensureAuthenticated ,(req, res) => {
	res.render("dashboard", {
		fullName: _.capitalize(req.user.firstName) + " " + _.capitalize(req.user.lastName)
	})
})

module.exports = router