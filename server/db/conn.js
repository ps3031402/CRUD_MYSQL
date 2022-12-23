const mysql = require('mysql2');


const conn = mysql.createConnection({
    user : process.env.DB_USER,
    host : process.env.DB_HOST,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE
});

conn.connect( (err) => {
    if(!err){
        console.log('Database connected');
    }
    else{
        throw err;
    }
});

module.exports = conn;