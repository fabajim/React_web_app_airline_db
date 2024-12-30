const express = require("express");
const router = express.Router();
const db = require('../database/db_connector.js');

router.get('/', (req, res) => {
    const aircraft = "SELECT aircraftID, serialNum, lastService, totalHourFlown, model, AircraftTypes.aircraftTypeID \n"+
                     "FROM Aircraft \n"+
                     "INNER JOIN AircraftTypes ON Aircraft.aircraftTypeID = AircraftTypes.aircraftTypeID";
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

router.post('/', (req, res) => {
    const insertQuery = "INSERT INTO Aircraft (serialNum, lastService, totalHourFlown, aircraftTypeID) VALUES (?)";
    let hour = parseInt(req.body.hours);
    let typeID = parseInt(req.body.type);
    const values = [
        req.body.serial,
        req.body.serviced,
        hour,
        typeID
    ];
    db.pool.query(insertQuery, [values], (err, data) => {
        if(err) return res.json(err);
        return res.json("Success: New Aircraft Added");
    });
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