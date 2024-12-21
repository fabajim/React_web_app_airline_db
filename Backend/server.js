const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const newPilot = require('./modules/addpilot.js') 

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
app.post('/addPilot', async (req, res) => {
    // get incoming data
    const values = [
        req.body.fname,
        req.body.lname,
        req.body.email,
        req.body.phone,
    ]
    try {
        const sql1 =  await newPilot.insertPilot(db, values);
        const sql2 = await newPilot.insertLicenseDetail(db, [sql1.insertId, req.body.license, req.body.date]);
        return res.json("Insert Successful");
    } catch(err) {
        console.log(err);
        return res.json(err);
    }
});

app.post('/addAircraft', (req, res) => {
    const insertQuery = "INSERT INTO Aircraft (lastService, totalHourFlown, aircraftTypeID) VALUES (?)";
    let hour = parseInt(req.body.hours);
    let typeID = parseInt(req.body.type);
    const values = [
        req.body.serviced,
        hour,
        typeID
    ]
    db.pool.query(insertQuery, [values], (err, data) => {
        if(err) return res.json(err);
        return res.json("Success: New Aircraft Added")
    })
});

app.post('/addType', (req, res) => {
    const insertQuery = "INSERT INTO AircraftTypes (model, totalSeating, licenseID) VALUES (?)";
    const values = [
        req.body.model,
        req.body.seating,
        req.body.license
    ]
    db.pool.query(insertQuery, [values], (err, data) => {
        if(err) return res.json(err);
        return res.json("Aircraft Type Successfully Added")
    })
})

//Delete
app.delete('/deletePilot/:id', (req, res) => {
    const deleteQuery = "DELETE FROM Pilots WHERE pilotID = ?";
    const id = req.params.id;
    db.pool.query(deleteQuery, [id], (err, data) => {
        if(err) return res.json(err);
        return res.json("Pilot Deleted")
    })
})

app.delete('/deleteAircraft/:id', (req, res) => {
    const delQuery = "DELETE FROM Aircraft WHERE aircraftID = ?";
    const id = req.params.id;
    db.pool.query(delQuery, [id], (err, data) => {
        if(err) return res.json(err);
        return res.json("Aircraft Successfully Deleted")
    })
})

app.delete('/deleteAircraftType/:id', (req, res) => {
    const delQuery = "DELETE FROM AircraftTypes WHERE aircraftTypeID = ?";
    const id = req.params.id;
    db.pool.query(delQuery, [id], (err, data) => {
        if(err) return res.json(err);
        return res.json("Aircraft Type Successfully Deleted")
    })
})

//Update
app.put('/updatePilot/:id', (req, res) => {
    const updateQuery = "UPDATE Pilots set fname = ?, lname = ?, totalLicense= ? WHERE pilotID = ?";
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

app.put('/updateAircraft/:id', (req, res) => {
    const updateQuery = "UPDATE Aircraft set lastService = ?, totalHourFlown = ? WHERE aircraftID = ?";
    const id = req.params.id;
    const value = [
        req.body.date,
        req.body.hours,
        id
    ]
    db.pool.query(updateQuery, value, (err, data) => {
        if(err) return res.json(err);
        return res.json("Aircraft Updated")
    })
})

// read
app.get('/pilots', (req, res) => {
    const pilots = "SELECT Pilots.*, COUNT(LicenseDetails.pilotID) as totalLicense \n"+
                    "FROM Pilots \n"+
                    "INNER JOIN LicenseDetails ON Pilots.pilotID = LicenseDetails.pilotID \n"+
                    "GROUP BY Pilots.pilotID";
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

app.get('/getLicenses', (req, res) => {
    const getQuery = "SELECT * FROM Licenses";
    db.pool.query(getQuery, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
})

app.get('/pilotLicense/:pilotId', (req, res) => {
    const id = req.params.pilotId
    console.log(id)
    const getDetails = `SELECT licenseType, dateReceived, Licenses.licenseID
                        FROM LicenseDetails
                        INNER JOIN Licenses ON LicenseDetails.licenseID = Licenses.licenseID
                        WHERE LicenseDetails.pilotID = ${id}`;
    db.pool.query(getDetails, (err, data) => {
        if (err){
            console.log(err); 
            return res.json(err); }
        return res.json(data);
    });
})

app.get('/aircraft', (req, res) => {
    const aircraft = 
                    "SELECT aircraftID, lastService, totalHourFlown, model, AircraftTypes.aircraftTypeID \n"+
                    "FROM Aircraft \n"+
                    "INNER JOIN AircraftTypes ON Aircraft.aircraftTypeID = AircraftTypes.aircraftTypeID";
    db.pool.query(aircraft, (err, data)=> {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/getAircraft/:id', (req, res) => {
    const getQuery = "SELECT lastService, totalHourFlown FROM Aircraft WHERE aircraftID = ?";
    const id = req.params.id;
    db.pool.query(getQuery, [id], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

// get aircraft id an model form Aircraft
app.get('/IdAndModel', (req, res) => {
    const getQuery = "SELECT aircraftTypeID, model FROM AircraftTypes";
    db.pool.query(getQuery, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/aircraftType', (req, res) => {
    const readTable = "SELECT * FROM AircraftTypes";
    db.pool.query(readTable, (err, data) =>{
        if(err) return res.json(err);
        return res.json(data)
    })
})

app.get('/getType/:id', (req, res) => {
    const typeQuery = "SELECT * FROM AircraftTypes WHERE aircraftTypeID = ?";
    const id = req.params.id;
    db.pool.query(typeQuery, [id], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.listen(8081, ()=>{
    console.log("Listening on port 8081");
})

