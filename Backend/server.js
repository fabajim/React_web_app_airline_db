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
const aircraftRoute = require('./routes/aircraft.js');

// api routes
app.use('/pilots', pilotRoute);
app.use('/license', licenseRoute);
app.use('/licenseDetails', licenseDetailsRoute);
app.use('/aircraft', aircraftRoute);

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


app.delete('/deleteAircraftType/:id', (req, res) => {
    const delQuery = "DELETE FROM AircraftTypes WHERE aircraftTypeID = ?";
    const id = req.params.id;
    db.pool.query(delQuery, [id], (err, data) => {
        if(err) return res.json(err);
        return res.json("Aircraft Type Successfully Deleted")
    })
})



//Update




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

