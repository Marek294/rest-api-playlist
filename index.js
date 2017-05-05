/**
 * Created by Mario on 04.05.2017.
 */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// set up express app
const app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(bodyParser.json());

// initialize routes
app.use('/api', require('./routes/api'));

// error handling middleware
app.use(function(err, req, res, next) {
   res.status(422).send({
       error: err.message
   });
});

// listen for requests
const port = process.env.port || 4000;
app.listen(port, function() {
    console.log("Server start listening at port " + port);
});