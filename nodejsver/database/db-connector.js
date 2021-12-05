// ./database/db-connector.js
// From nodejs-starter-app

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_evansdr',
    password        : '2582',
    database        : 'cs340_evansdr'
    // host            : 'localhost',
    // user            : 'root',
    // password        : 'root',
    // database        : 'cs340_evansdr'
})

// Export it for use in our applicaiton
module.exports.pool = pool;
