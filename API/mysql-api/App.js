const express = require('express')
const app = express()
const port = 3001
const fs = require('fs')
const mysql = require('mysql'); 


// Helper function to deal with some chars we dont like
function strFix(str)
{
  str = str.replace(/,/g, "&#44;");
  str = str.replace(/\(/g, "&#40;");
  str = str.replace(/\)/g, "&#41;");
  str = str.replace(/"/g, "&quot;");
  str = str.replace(/'/g, "&#039;");
  return str;
}

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  }),
app.get('/mysqlapi', (req, res, next) => {
    if ( !req.query.m ){
        res.send("No method provided")
        return
    }
    switch( req.query.m ){
        case "insert" :
            if (insertQuiz(res, req))
                return true;
            else
                res.send("Error adding new quiz");
        break;
        case "select" :
            if (selectQuiz(res, req))
                return true;
            else
                res.send("Error getting quiz data");
        break;
        case "list" :
            if (listQuiz(res))
                return true;
            else
                res.send("Error getting quiz data");
        break;
        default :
        break;
    }
    con.end();
});
/* Handles the insertion of a new quiz into the database
*/
function insertQuiz(res, req){
    /* Format our data for insertion
    * This is a bit of an ugly hack to turn the stringified JSON data into something that works in an SQL Query
    */
    let jsondata = JSON.parse(req.query.data);
    let mysqldata = [];
    
    for (var i=0; i< jsondata.length; i++){
        let d = jsondata[i].map( v => {
            return strFix(v);
        })
        mysqldata.push(d);
    }

    // Connect to the MySQL database
    var con = mysql.createConnection({
        host: "localhost",
        user: "react",
        password: "mypass",
        database: "react_quiz"
    });
    // Run the INSERT query
    con.connect(function(err) {
        if (err){
            throw err;
            return false;
        }
        var sql = mysql.format("INSERT INTO quizzes (name, data, qunum) VALUES (?)", [[req.query.name, JSON.stringify(mysqldata), req.query.qnum]])
        con.query(sql, function (err, result) {
        if (err) {
            throw err;
            return false;
        }
        });
    });
    res.send("Added the new quiz");
    return true;
}
/* Selects a quiz by name from database
*/
function selectQuiz(res, req){
    // Connect to the MySQL database
    var con = mysql.createConnection({
        host: "localhost",
        user: "react",
        password: "mypass",
        database: "react_quiz"
    });
    // Run the INSERT query
    con.connect(function(err) {
        if (err){
            throw err;
            return false;
        }
        var sql = mysql.format("SELECT name,data,qnum from quizzes WHERE id = ? ", [req.query.id])
        con.query(sql, function (err, result) {
        if (err) {
            throw err;
            return false;
        }
        res.send(JSON.stringify(result));
        });
    });
    return true;
}
/* Returns a list of all quiz names
*/
function listQuiz(res){
    // Connect to the MySQL database
    var con = mysql.createConnection({
        host: "localhost",
        user: "react",
        password: "mypass",
        database: "react_quiz"
    });
    // Run the INSERT query
    con.connect(function(err) {
        if (err){
            throw err;
            return false;
        }
        var sql = "SELECT id,name from quizzes";
        con.query(sql, function (err, result) {
        if (err) {
            throw err;
            return false;
        }
        res.send(JSON.stringify(result));
        });
    });
    return true;
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))