const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
var cors = require('cors');
const  requestController = require('./controllers/requestController');
const app = express();
app.use(cors());

const requestsRoutes = require('./routes/requestsRoutes');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
/**bodyParser.json(options)
* Parses the text as JSON and exposes the resulting object on req.body.
*/


mongoose.connect('mongodb://localhost/test').then(() => {
	requestController.addDummyData();
	console.log('connected to databse successfully');
}).catch(() => {
	console.log('connected to databse failed');
});

app.use("/api/v1/requests",requestsRoutes);

// middleware to handle the global error response
app.use(function(error, req, res, next) {
  res.json({"success": false, "message": error.message });
});

//to export the express js app
module.exports = app;






