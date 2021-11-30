// App.js
// Obtained from the nodejs-starter-app.

/*
    SETUP
*/
const path = require('path');
var db      = require('./database/db-connector')
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.
app.use(express.static(path.join(__dirname, '/public')));

PORT        = 33489;                 // Set a port number at the top so it's easy to change in the future

/*
    ROUTES
*/
// app.js

app.get('/', function(req, res)
//    {
//        res.render('index');
//    });

//app.get('/Customers', function(req, res)
    {  
        let query1 = "SELECT * FROM Games;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('Games', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query
/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});