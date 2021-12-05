// ./database/db-connector.js
// From nodejs-starter-app

// Get an instance of mysql we can use in the app
var mysql = require('mysql2')

// Create a 'connection pool' using the provided credentials
 var pool = mysql.createPool({
   connectionLimit : 10,
   host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_evansdr',
    password        : '2582',
     database        : 'cs340_evansdr'
 })
/* var pool = mysql.createPool({
    connectionLimit : 10,
    host            : '127.0.0.1',
    user            : 'root',
    password        : 'root',
    database        : 'Group106'
})*/

// Export it for use in our applicaiton
module.exports.pool = pool;
