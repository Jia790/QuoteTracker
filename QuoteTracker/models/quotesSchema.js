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
