const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema & model for database
const QuoteSchema = new Schema({

    name : {
        type: String,
        required: [true, 'Name field is required']
    },

    quote : {
        type: String,
        required: [true, 'Name quote is required']
    }

});

/*Create a Collection (table) of specified name
    with specified schema
    const CollectionName = mongoose.model('name', Schema);
*/
const Quote = mongoose.model('quote', QuoteSchema);


// Export to use on other file
module.exports = Quote;

module.exports.addQuote = function(newQuote, res){
    newQuote.save(function(err, doc){
        if(err){
            res.json(err);
        }
        else{
            res.redirect('/');
        }
     }
    
    ); 
}

module.exports.updateTarget = function(req, res){
    Quote.findOneAndUpdate({name: req.body.Ename}, { 
        $set: { name: req.body.name, quote: req.body.quote} }, 
          {sort: {_id: -1},upsert: false }, 
            function(err, result){ if (err){ return res.send(err);} 
               }).then(function(){ res.send(result); });
}

// not using currently since it creates a warning
module.exports.deleteTarget = function(req, res){
    Quote.findOneAndRemove({name: req.body.name},
        function(err, result){
          if (err) {return res.send(500, err);}
          console.log('deleted from database');
          res.redirect('/');
        }).then(function(){
          res.send(result);
        }
        );  
}
