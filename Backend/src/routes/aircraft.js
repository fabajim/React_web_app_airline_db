const express = require("express");
const router = express.Router();
const db = require('../database/db_connector.js');
const newAircraft = require('../utils/createAircraft.js');

router.get('/', (req, res) => {
    const aircraft = `SELECT Aircraft.aircraftID, serialNum, lastService, totalHourFlown, model, 
                            AircraftTypes.aircraftTypeID,
                            Airports.cityCode AS location
                        FROM Aircraft
                        INNER JOIN AircraftTypes ON Aircraft.aircraftTypeID = AircraftTypes.aircraftTypeID
                        INNER JOIN AssignmentDetails ON Aircraft.aircraftID = AssignmentDetails.aircraftID
                            AND AssignmentDetails.isActive = 1
                        INNER JOIN Airports ON airports.airportID = AssignmentDetails.airportID
                            AND AssignmentDetails.aircraftID = Aircraft.aircraftID`;
    db.pool.query(aircraft, (err, data)=> {
        if(err) return res.json(err);
        return res.json(data);
    });
});

router.get('/:id', (req, res) => {
    const getQuery = "SELECT serialNum, lastService, totalHourFlown FROM Aircraft WHERE aircraftID = ?";
    const id = req.params.id;
    db.pool.query(getQuery, [id], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

router.post('/', async (req, res) => {
    let hour = parseInt(req.body.hours);
    let typeID = parseInt(req.body.type);
    const values = [
        req.body.serial,
        req.body.serviced,
        hour,
        typeID
    ];
    try {
        const sql1 = await newAircraft.insertAircraft(db, values);
        const sql2 = await newAircraft.insertAssignmentDetail(db, [sql1.insertId, null, req.body.airport, 1]);
        return res.json("Insert Successful");
    } catch(err) {
        console.log(err);
        return res.json(err);
    }
});

router.delete('/:id', (req, res) => {
    const delQuery = "DELETE FROM Aircraft WHERE aircraftID = ?";
    const id = req.params.id;
    db.pool.query(delQuery, [id], (err, data) => {
        if(err) return res.json(err);
        return res.json("Aircraft Successfully Deleted");
    });
});

router.put('/:id', (req, res) => {
    const updateQuery = "UPDATE Aircraft set lastService = ?, totalHourFlown = ? WHERE aircraftID = ?";
    const id = req.params.id;
    const value = [
        req.body.date,
        req.body.hours,
        id
    ];
    db.pool.query(updateQuery, value, (err, data) => {
        if(err) return res.json(err);
        return res.json("Aircraft Updated");
    })
});

module.exports = router;