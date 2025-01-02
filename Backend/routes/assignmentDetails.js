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

module.exports = router;