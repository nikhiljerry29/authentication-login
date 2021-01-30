const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", (req, res) => {
	res.redirect("/home")
})

app.get("/home", (req,res)  => {
	res.render("home")
})

app.get("/login", (req,res)  => {
	res.render("login")
})

app.get("/register", (req,res)  => {
	res.render("register")
})

const port = 8080;
app.listen(8080, () => {
	console.log("Server Started on port :: " + port)
})