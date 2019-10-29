"use strict";

const router = require("express").Router();

//routes
router.use("/users", require("./users")); // matches all requests to /api/users/

router.use((req, res, next) => {
	const err = new Error("API route not found!");
	err.status = 404;
	next(err);
});

module.exports = router;
