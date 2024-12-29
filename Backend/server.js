const express = require('express');
const cors = require('cors');

// create app
const app = express();
app.use(cors());
app.use(express.json());

//connect to mysql
const db = require('./database/db_connector.js');
 
//routes
const pilotRoute = require('./routes/pilots.js');
const licenseRoute = require('./routes/licenses.js');
const licenseDetailsRoute = require('./routes/licenseDetails.js');

// api routes
app.use('/pilots', pilotRoute);
app.use('/license', licenseRoute);
app.use('/licenseDetails', licenseDetailsRoute);

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

app.get('/', (req, res)=>{
    return res.send("Hello From Backend!");
});

app.listen(8081, ()=>{
    console.log("Listening on port 8081");
})

