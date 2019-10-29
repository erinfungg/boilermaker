"use strict";

const express = require("express");
const path = require("path");
const app = express();
const morgan = require("morgan");
const session = require("express-session");
const passport = require("passport");

// configure and create our database store
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const dbStore = new SequelizeStore({ db: db });

//logging middleware

app.use(morgan("dev"));

//bodyparsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// sync so that our session table gets created
dbStore.sync();

//session middlewares
app.use(
	session({
		secret: process.env.SESSION_SECRET || "a wildly insecure secret",
		resave: false,
		saveUninitialized: false
	})
);

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//serialize/deserialize user
passport.serializeUser((user, done) => {
	try {
		done(null, user.id);
	} catch (err) {
		done(err);
	}
});

passport.deserializeUser((id, done) => {
	User.findById(id)
		.then(user => done(null, user))
		.catch(done);
});

//static middleware
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api", require("./api"));
// authentication router
app.use("/auth", require("./api/auth"));

app.get("*", function(req, res) {
	res.sendFile(path.join(__dirname, "../public/index.html"));
});

// error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(err.status || 500).send(err.message || "Internal server error");
});

module.exports = app;
