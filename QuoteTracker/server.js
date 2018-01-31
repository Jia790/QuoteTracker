//Express App set up
const express = require('express');

//include body parser for extracting data from request
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

//set up express app
const app = express();

// if not database of 'quotes' does not exist, it will be created
mongoose.connect('mongodb://localhost/quotes');

// set mongoose's Promise to Node.js's Promise
mongoose.Promise = global.Promise; 

// set view engine to look for embedded JavaScript File
app.set('view engine', 'ejs');


//Middleware 
app.use(express.static(__dirname +'/public')); // serves static files such as html, css, image, etc
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//This will make sure the express app use the exported routes
app.use(require('./routes/router'));


//error handling middleware
// it could be a piece of code installed of a module or package
app.use(function(err, req, res, next){
  res.status(422).send({error: err.message});
});

//listen for request
/*Listen for specified port via "process.env.port" 
* or Listen for user defined port
*/
app.listen(process.env.port || 3000,function() {
  console.log('listening on 3000');
});