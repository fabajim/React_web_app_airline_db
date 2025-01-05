const express = require("express");
const router = express.Router();
const db = require('../database/db_connector.js');

router.get('/', (req, res) => {
    const getQuery = `SELECT assignmentDetailID, Pilots.pilotID, Pilots.fname, Pilots.lname, 
                        Aircraft.aircraftID, Aircraft.serialNum,
                        Airports.airportID, Airports.cityCode,
                        IF(isActive = 1, 'YES', 'NO') AS isActive
	                    FROM AssignmentDetails
                        LEFT JOIN Pilots ON AssignmentDetails.pilotID = Pilots.pilotID
                        LEFT JOIN Aircraft ON AssignmentDetails.aircraftID = Aircraft.aircraftID
                        LEFT JOIN Airports ON AssignmentDetails.airportID = Airports.airportID
                        ORDER BY isActive DESC`;
    db.pool.query(getQuery, (err, data) => {
        if (err) return res.json(err);
        console.log(data);
        return res.json(data);
    });
});

router.get('/:id', (req, res) => {
    const getAssignment = "SELECT * FROM AssignmentDetails WHERE assignmentDetailID = ?";
    const id = req.params.id;
    db.pool.query(getAssignment, [id], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

router.post('/', (req, res) => {
    const values = [
        req.body.aircraft,
        req.body.pilot,
        req.body.airport,
        1
    ];
    const addAssignment = `INSERT into AssignmentDetails (aircraftID, pilotID, airportID, isActive) 
                            VALUES (?)`;
    db.pool.query(addAssignment, [values], (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data);
    })
})

router.put('/:id', (req, res) => {
    const updateQuery = `UPDATE AssignmentDetails SET isActive = ?
                            WHERE assignmentDetailID = ?`;
    const value = [0, req.params.id];
    db.pool.query(updateQuery, value, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data);
    });
});

module.exports = router;