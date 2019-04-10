var mongoose = require('mongoose');
var fs = require('fs');

//connect to the database
//remember to change the database name
mongoose.connect('mongodb://localhost/travis', { useNewUrlParser: true});

//load all the model files
var models_path = __dirname + "/../models"

// for each file in the path
fs.readdirSync(models_path).forEach(function(file){
    //check if it is a js file, if so load it
    if(file.indexOf('.js') > 0){
        //load each model file
        require(models_path + '/'+ file);
    }
})