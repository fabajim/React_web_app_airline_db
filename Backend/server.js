const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

// create app
const app = express();
app.use(cors());
app.use(express.json());

//connect to mysql
const db = require('./db_connector');

app.get('/', (req, res)=>{
    return res.send("Hello From Backend!");
});

// create
app.post('/addPilot', (req, res) => {
    // get incoming data
    const insertQuery = "INSERT INTO Pilots (fname, lname, totalCertificate) VALUES (?)";
    let cert = parseInt(req.body.certs);
    if (isNaN(cert)){ cert = 0 }
    const values = [
        req.body.fname,
        req.body.lname,
        cert
    ]
    db.pool.query(insertQuery, [values], (err, data) => {
        if(err) return res.json(err);
        return res.json("New Pilot Added");
    })
});

//Delete
app.delete('/deletePilot/:id', (req, res) => {
    const deleteQuery = "DELETE FROM Pilots WHERE pilotID = ?";
    const id = req.params.id;
    db.pool.query(deleteQuery, [id], (err, data) => {
        if(err) return res.json(err);
        return res.json("Pilot Deleted")
    })
})

//Update
app.put('/updatePilot/:id', (req, res) => {
    const updateQuery = "UPDATE Pilots set fname = ?, lname = ?, totalCertificate= ? WHERE pilotID = ?";
    const id = req.params.id;
    let cert = parseInt(req.body.certs);
    if (isNaN(cert)){ cert = 0 }
    const values = [
        req.body.fname,
        req.body.lname,
        cert,
        id
    ]
    db.pool.query(updateQuery, values, (err, data) => {
        if(err) return res.json(err);
        return res.json("Pilot Updated");
    })
})


// read
app.get('/pilots', (req, res) => {
    const pilots = "SELECT * FROM Pilots";
    db.pool.query(pilots, (err, data)=> {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/getPilot/:id', (req, res) => {
    const pilotQuery = "SELECT * FROM Pilots WHERE pilotID = ?";
    const id = req.params.id;
    db.pool.query(pilotQuery, [id], (err, data) => {
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

