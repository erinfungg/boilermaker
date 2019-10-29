const express = require("express");
const path = require("path");
const app = express();

//logging middleware
const morgan = require("morgan");
app.use(morgan("dev"));

//bodyparsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//static middleware
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api", require("./api"));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html');
});

// error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(err.status || 500).send(err.message || "Internal server error");
});

const port = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!
app.listen(port, function () {
  console.log("Knock, knock");
  console.log("Who's there?");
  console.log(`Your server, listening on port ${port}`);
});

module.exports = app;
