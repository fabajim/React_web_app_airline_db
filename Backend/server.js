const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

// create app
const app = express();
app.use(cors());

//connect to mysql
const db = require('./db_connector');

app.get('/', (req, res)=>{
    return res.send("Hello From Backend!");
});

// create
app.post('/addPilot', (req, res) => {

});


// read
app.get('/pilots', (req, res) => {
    const pilots = "SELECT * FROM Pilots";
    db.pool.query(pilots, (err, data)=> {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/aircraft', (req, res) => {
    const aircraft = "SELECT * FROM Aircraft";
    db.pool.query(aircraft, (err, data)=> {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.listen(8081, ()=>{
    console.log("Listening on port 8081");
})

