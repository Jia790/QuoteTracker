const express = require('express'); //include express

//we can mount router handler on to this variable.
const router = express.Router();




/*
//Connecting to MongoDB
const MongoClient = require('mongodb').MongoClient;
var db;
MongoClient.connect('mongodb://localhost/quotes', function(err, client){
    if(err){
        return console.log(err);
    }
    db = client.db('quotes');
});*/

const Quote = require('../models/quotesSchema');

//C.R.U.D handler

/*
router.get('/', function(req, res){
    db.collection('quotes').find().toArray((err, result) => {
        if (err) return console.log(err)
        // renders index.ejs
        res.render('index.ejs', {quotes: result})
      })
});
*/


/** GET route handler */
//request to get data base on parameter
router.get('/', function(req, res, next){


  Quote.find({}).then(function(quotes){
    console.log("showing all quotes");
    res.render('index.ejs', {quotesList: quotes})
  }).catch(next);
    

}
);

router.get('/quotes', function(req, res){
  res.redirect('/');
});

/** POST route handler */
/** Add new item in database */
router.post('/quotes', function(req, res, next){
    
  new Quote({
    name : req.body.name,
    quote: req.body.quote,
    
    }).save(function(err, doc){
    if(err){
        res.json(err);
    }
    else{
        res.redirect('/');
    }
 }

); 
  
  /*db.collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err)
        console.log(req.body.quote)
        console.log('saved to database')
        res.redirect('/')
      })*/
});


/** PUT route handler */
/** Update item in database */
router.put('/update', function(req, res){

  Quote.findOneAndUpdate({name: req.body.Ename}, { 
    $set: { name: req.body.name, quote: req.body.quote} }, 
      {sort: {_id: -1},upsert: false }, 
        function(err, result){ if (err){ return res.send(err)} 
           }).then(function(){ res.redirect('/') }).catch(next);
    
    
        /*db.collection('quotes')
    .findOneAndUpdate({name: req.body.Ename}, {
      $set: {
        name: req.body.name,
        quote: req.body.quote
      }
    }, {
      sort: {_id: -1},
      upsert: true
    }, (err, result) => {
      if (err) return res.send(err)
      res.redirect('/')
      //res.send(result)
    })*/
  })

/** DELETE route handler */
/** Update item in database */
/* The ":" means it is a parameter */

router.delete('/delete', function(req, res, next){

  Quote.findOneAndRemove({name: req.body.name},
    function(err, result){
      if (err) return res.send(500, err)
      console.log('deleted from database');
      res.redirect('/')
    }).then(function(){
      //res.redirect('/')
    }
    ).catch(next)

  /*
    db.collection('quotes').findOneAndDelete({name: req.body.name},
    function(err, result){
      if (err) return res.send(500, err)
      res.send({message: 'Message Deleted'})
      console.log('deleted from database')
    })*/
  })

  /* After all routes are mounted and created
  You can now export it*/
  module.exports = router;
