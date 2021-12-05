// App.js
// Obtained from the nodejs-starter-app.

/*
    SETUP
*/
const path = require('path');
var db = require('./database/db-connector')
var express = require('express');   // We are using the express library for the web server
var app = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
const {engine} = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.
app.use(express.static(path.join(__dirname, '/public')));

PORT = 33489;                 // Set a port number at the top so it's easy to change in the future

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/Customers', function (req, res) {
  let query1 = "SELECT * FROM Customers;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('Customers', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })
});

app.get('/Genres', function (req, res) {
  res.render('Genres');
});

app.get('/Sales', function (req, res) {
  res.render('Sales');
});

app.get('/Reviews', function (req, res) {
  res.render('Reviews');
});


app.get('/Games', function (req, res) {

  let sql;
  let gameName = req.query.gameName;
  if (gameName === undefined){
      sql = `SELECT * FROM Games;`;
  }else{
      sql = `SELECT * FROM Games WHERE GameName LIKE "${gameName}%"`;
  }

  queryAll(res,sql);
});

function queryAll(res, sql=`SELECT * FROM Games;`){
  db.pool.query(sql, function (error, rows) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      db.pool.query(`select * from Genres`, function (error1, genreRow) {
        db.pool.query(`select GameName,GenreName from Genres_Games a JOIN Games b ON a.GameID=b.GameID JOIN Genres c ON a.GenreID=c.GenreID`, function (error3, genreGameRow) {
          res.render('Games', {
            data: rows,
            dataStr: JSON.stringify(rows),
            genreData: genreRow,
            genreDataStr: JSON.stringify(genreRow),
            genreGameData: genreGameRow
          });
        })
      })
    }
  })

}

app.post('/update-game', function (req, res) {
  let data = req.body;
  let price = parseFloat(data.Price)
  if (isNaN(price)) {
    price = 'NULL'
  }

  let sql = `update Games set GameName='${data.GameName}', Price=${price}, Description='${data.Description}' where GameID = '${data.GameID}'`

  db.pool.query(sql, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    }else{
      queryAll(res)
    }
  })
});

app.post('/delete-game', function (req, res) {
  let data = req.body;

  let sql = `delete from Games where GameID = '${data.GameID}'`

  db.pool.query(sql, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    }else{
      queryAll(res)
    }
  })
});

app.post('/insert-game-form', function (req, res) {

  let data = req.body;

  let price = parseFloat(data.Price)
  if (isNaN(price)) {
    price = 'NULL'
  }

  query1 = `INSERT INTO Games (GameName, Price, Description) VALUES ('${data.GameName}', '${price}', '${data.Description}')`
  //console.log(query1);
  db.pool.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      query2 = `SELECT * FROM Games;`;
      db.pool.query(query2, function (error, rows, fields) {
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

app.post('/add-game-genre', function (req, res) {
  let data = req.body;

  let sql = `INSERT INTO genres_games (GameID, GenreID) VALUES ('${data.GameID}','${data.GenreID}')`;
  db.pool.query(sql, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.status(400).send(error.sqlMessage)
    } else {
      queryAll(res);
    }
  })
});

app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
  console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
