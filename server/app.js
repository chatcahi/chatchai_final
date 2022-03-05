const express = require('express');
const path = require('path');
const body = require('body-parser');
//const app = express();
const mysql = require('mysql');

var fs = require('fs');
var http = require('http');
var https = require('https');
//var privateKey  = fs.readFileSync(path.resolve('server/key.pem', 'utf8'));
var privateKey  = fs.readFileSync(__dirname+'/key.pem', 'utf8');
var certificate = fs.readFileSync(__dirname+'/cert.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};
const app = express();
var httpsServer = https.createServer(credentials, app);
app.use(body());
app.use(express.static(path.resolve(__dirname, '..', 'build')));






const db = mysql.createConnection({
    host: '172.25.192.1',
    user: 'name1478',
    password: '123456789',
    database: 'shirt'
});
// show data
app.get('/data', function(req,res){
    console.log("Hello in /data ");
    let sql = 'SELECT * FROM `users` ORDER by size;';
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.json(result);
    });
    console.log("after query");
});

//delete
app.put('/delete', function(req, res) {
    var sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql,[req.body.idkey],function (error, results) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});

//edit
app.put('/data', function(req, res) {
    var sql = 'UPDATE users SET, id = ?, name = ? , size = ?,email = ?, quantity = ?';
    db.query(sql,[req.body.idkey,req.body.name,req.body.size,req.body.email,req.body.quantity],function (error, results) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});

//insert
app.post('/data', function(req, res){
    console.log(req.body);
    let data = {
        id:req.body.idkey,
        name:req.body.name,
        size:req.body.size,
        quantity:req.body.quantity,
        email:req.body.email,
    };
    let sql = 'INSERT INTO users SET ?';
    db.query(sql, data, (err, result)=>{
        if(err){
            console.log(err);
            console.log("ID is Primarykey!!!!!");
            console.log("Enter the id again..");
        }else{
            console.log(result);
        }
    });
});


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});




//module.exports = app;
module.exports = httpsServer;
