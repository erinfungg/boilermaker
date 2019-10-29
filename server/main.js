"use strict";

const { db } = require("./db");
const app = require("./index");
const port = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!

db.sync() // sync our database
	.then(function() {
		app.listen(port, function() {
			console.log("Knock, knock");
			console.log("Who's there?");
			console.log(`Your server, listening on port ${port}`);
		});
	});
