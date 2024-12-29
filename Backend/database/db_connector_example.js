const mysql = require('mysql');
require("dotenv").config();
const PW = process.env.EXAMPLE;

//connection pool
const pool = mysql.createConnection({
    connectionLimit : 10,
    host            : '',
    user            : '',
    password        : PW,
    database        : ''
});

module.exports.pool = pool;