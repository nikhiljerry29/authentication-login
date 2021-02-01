require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const mongooseUrl = process.env.MONGOURI;
mongoose.connect(mongooseUrl, { useNewUrlParser: true , useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	emailAddress: String,
	password: String
})

const Users = new mongoose.model("user", userSchema);

app.get("/", (req, res) => {
	res.redirect("/home")
})

app.get("/home", (req,res)  => {
	res.render("home")
})

app.get("/login", (req,res)  => {
	res.render("login")
})

app.post("/login", (req,res) => {
	const email = req.body.emailAddress
	const password = req.body.password
	Users.findOne({emailAddress: req.body.emailAddress}, (err, foundUser) => {
		if(foundUser.password === password)
			res.render("successfulLogin",{
				fullName: foundUser.firstName + " " + foundUser.lastName
			})
		else
			res.render("unsuccessfulLogin")
	})
})

app.get("/register", (req,res)  => {
	res.render("register")
})

app.post("/register", (req,res) => {
	const newUser = new Users ({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		emailAddress: req.body.emailAddress,
		password: req.body.password
	})
	newUser.save()

	res.redirect('/login')
})

const port = 8080;
app.listen(8080, () => {
	console.log("Server Started on port :: " + port)
})