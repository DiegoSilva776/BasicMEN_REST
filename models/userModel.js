/**
 * This model holds the core information of a tutorial (Memex).
 * 
 * A Mongoose.Schema, maps the schema of the model to a collection on MongoDB.
 * The exports command make the model usable within the application.
 */



// DEPENDENCIES
//-------------
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


// MODEL DEFINITION
//-----------------
/**
 * User.
 * 
 * Creates a model based on the User schema, a model is the actual class based 
 * upon a database schema. A model is equal to a type of document.
 */
var UserSchema = new mongoose.Schema({
    email : {
        type     : String,
        unique   : true,
        required : true
    },
    password : {
        type     : String,
        required : true
    },
    name       : String,
    facebookId : String,
    createdAt  : String,
    updatedAt  : String,
    profilePic : Buffer
});


// TRIGGERS AND PROCEDURES
//------------------------
// update the hash value of the user password in case it changes
UserSchema.pre('save', function(callback) {
    var user = this;

    // break out if the password hasn't changed
    if(user.isModified('password')){
        
        // password changed so we need to hash it
        bcrypt.genSalt(5, function(err, salt) {
            if(err){
                return callback(err);    
            }
    
            // if there was no error hash the user password
            bcrypt.hash(user.password, salt, null, function(err, hash) {
                if(err){ 
                    return callback(err);
                }
                
                user.password = hash;
                callback();
            });
        });
    }else{
        return callback();
    }
});


// MODEL BINDING
//--------------
// Exports Mongoose model to be used within the application
module.exports = mongoose.model('User', UserSchema);