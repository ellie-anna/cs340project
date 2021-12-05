// App.js
// Obtained from the nodejs-starter-app.

/*
    SETUP
*/
const path = require('path');
var db = require('./database/db-connector').pool
var dbSync = require('./database/db-connector').pool.promise()
var express = require('express'); // We are using the express library for the web server
var app = express(); // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
const {
  engine
} = require('express-handlebars');
var exphbs = require('express-handlebars'); // Import express-handlebars
app.engine('.hbs', engine({
  extname: ".hbs"
})); // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs'); // Tell express to use the handlebars engine whenever it encounters a *.hbs file.
app.use(express.static(path.join(__dirname, '/public')));

PORT = 33489; // Set a port number at the top so it's easy to change in the future

/*
    ROUTES
*/
// app.js

app.get('/', function (req, res) {
  res.render('index'); // Render the index.hbs file, and also send the renderer
});

app.get('/Games', async function (req, res) {
  let query1 = "SELECT * FROM Games;"; // Define our query

  let genreData = await dbSync.query("select * from Genres")
  let gameData = await dbSync.query("select * from Games")
  let ggData = await dbSync.query("select * from Genres_Games")

  res.render('Games', {
    data: {
      games: gameData[0],
      genres: genreData[0],
      gg: ggData[0]
    }
  }); // Render the index.hbs file, and also send the renderer
  // an object where 'data' is equal to the 'rows' we
});

app.post('/update-game-form', function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  // Create the query and run it on the database
  const query1 = `update Games set GameName = "${data.GameName}", Description = "${data.Description}", Price = "${data.Price}" where GameID = ${data.GameID}`;
  db.query(query1, function (error, rows, fields) {

    // Check to see if there was an error
    if (error) {

      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error)
      res.sendStatus(400);
    }

    // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
    // presents it on the screen
    else {
      res.redirect('/Games');
    }
  })
})

app.post('/delete-game-form', function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  // Create the query and run it on the database
  const query1 = `delete from Games where GameID = ${data.GameID}`;
  db.query(query1, function (error, rows, fields) {

    // Check to see if there was an error
    if (error) {

      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error)
      res.sendStatus(400);
    }

    // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
    // presents it on the screen
    else {
      res.redirect('/Games');
    }
  })
})

app.get('/Customers', function (req, res) {
  let query1 = "SELECT * FROM Customers;"; // Define our query

  db.query(query1, function (error, rows, fields) { // Execute the query

    res.render('Customers', {
      data: rows
    }); // Render the index.hbs file, and also send the renderer
  }) // an object where 'data' is equal to the 'rows' we
});

app.get('/Genres', function (req, res) {
  let query1 = "SELECT * FROM Genres;"; // Define our query

  db.query(query1, function (error, rows, fields) { // Execute the query

    res.render('Genres', {
      data: rows
    }); // Render the index.hbs file, and also send the renderer
  }) // an object where 'data' is equal to the 'rows' we
}); // received back from the query

app.get('/Reviews', async (req, res) => {
  let customerData = await dbSync.query("select * from Customers");
  let gameData = await dbSync.query("select * from Games");
  let reviewData = await dbSync.query("select * from Reviews");

  res.render('Reviews', {
    data: {
      customers: customerData[0],
      games: gameData[0],
      reviews: reviewData[0]
    }

  });
});

app.get('/Sales', async (req, res) => {
  let salesData = await dbSync.query("select * from Sales");
  let customerData = await dbSync.query("select * from Customers");
  let gameData = await dbSync.query("select * from Games");

  res.render('Sales', {
    data: {
      sales: salesData[0],
      customers: customerData[0],
      games: gameData[0]
    }
  });
});

app.get('/index', function (req, res) {
  res.render('index'); // Render the index.hbs file, and also send the renderer
});

// From nodejs-starter-app
app.post('/insert-game-form', function (req, res) {
  let data = req.body;

  let price = parseFloat(data.Price)
  if (isNaN(price)) {
    price = 'NULL'
  }

  query1 = `INSERT INTO Games (GameName, Price, Description)
            VALUES ('${data.GameName}', '${price}', '${data.Description}')`
  //console.log(query1);
  db.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      query2 = `SELECT *
                FROM Games;`;
      db.query(query2, function (error, rows, fields) {
        if (error) {
          console.log(error);
          res.sendStatus(400);
        } else {
          res.send(rows);
        }
      })
    }
  })

});

app.post('/insert-review-form', function (req, res) {
  let data = req.body;
  query1 = `INSERT INTO Reviews (GameID, CustomerID, Rating, Comment)
              VALUES ('${data.GameID}', '${data.CustomerID}', '${data.Rating}', '${data.Comment}')`
  db.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      query2 = `SELECT *
                  FROM Reviews;`;
      db.query(query2, function (error, rows, fields) {
        if (error) {
          console.log(error);
          res.sendStatus(400);
        } else {
          res.redirect('/Reviews');
        }
      })
    }
  })

})

app.post('/update-review-form', function (req, res) {
  let data = req.body;
  query1 = `UPDATE Reviews
            SET Rating = '${data.Rating}', Comment = '${data.Comment}'
            WHERE ReviewID = '${data.ReviewID}'`
  //console.log(query1);
  db.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      query2 = `SELECT *
                FROM Reviews;`;
      db.query(query2, function (error, rows, fields) {
        if (error) {
          console.log(error);
          res.sendStatus(400);
        } else {
          res.redirect('/Reviews');
        }
      })
    }
  })

})

app.post('/delete-review-form', function (req, res) {
  let data = req.body;
  query1 = `DELETE FROM Reviews
            WHERE ReviewID = '${data.ReviewID}'`
  //console.log(query1);
  db.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      query2 = `SELECT *
                FROM Reviews;`;
      db.query(query2, function (error, rows, fields) {
        if (error) {
          console.log(error);
          res.sendStatus(400);
        } else {
          res.redirect('/Reviews');
        }
      })
    }
  })
})

app.post('/insert-sale-form', function (req, res) {
  let data = req.body;
  query1 = `INSERT INTO Sales (GameID, CustomerID, SalePrice)
              VALUES ('${data.GameID}', '${data.CustomerID}', '${data.SalePrice}')`
  //console.log(query1);
  db.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      query2 = `SELECT *
                  FROM Sales;`;
      db.query(query2, function (error, rows, fields) {
        if (error) {
          console.log(error);
          res.sendStatus(400);
        } else {
          res.redirect('/Sales');
        }
      })
    }
  })

})

app.post('/insert-genre-form', function (req, res) {
  let data = req.body;
  query1 = `INSERT INTO Genres (GenreName, Description)
              VALUES ('${data.GenreName}', '${data.Description}')`
  //console.log(query1);
  db.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      query2 = `SELECT *
                  FROM Genres;`;
      db.query(query2, function (error, rows, fields) {
        if (error) {
          console.log(error);
          res.sendStatus(400);
        } else {
          res.redirect('/Genres');
        }
      })
    }
  })

})

app.post('/search-game-form', function (req, res) {
  let data = req.body;
  let query1 = `SELECT *
                FROM Games
                WHERE GameName LIKE '%${data.GameName}%';`;
  db.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.send(rows);
    }
  })
})

// From nodejs-starter-app
app.post('/insert-customer-form', function (req, res) {

  let data = req.body;


  query1 = `INSERT INTO Customers (Email, Password, Fname, Lname, Address) VALUES ('${data.Email}', '${data.Password}', '${data.Fname}', '${data.Lname}', '${data.Address}')`
  //console.log(query1);
  db.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.redirect('/Customers');
    }
  })

});

// From nodejs-starter-app
app.post('/insert-game-genre', function (req, res) {

  let data = req.body;


  query1 = `INSERT INTO Genres_Games(GameID, GenreID) VALUES (${data.GameID}, ${data.GenreID})`
  //console.log(query1);
  db.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.redirect('/Games');
    }
  })

});

/*
    LISTENER
*/
app.listen(PORT, function () { // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
  console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});