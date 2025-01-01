const express = require("express");
const router = express.Router();
const db = require('../database/db_connector.js');

router.get('/', (req, res) => {
    const getQuery = `SELECT assignmentDetailID, Pilots.pilotID, Pilots.fname, Pilots.lname, 
                        Aircraft.aircraftID, Aircraft.serialNum,
                        Airports.airportID, Airports.cityCode,
                        IF(isActive = 1, 'YES', 'NO') AS isActive
	                    FROM AssignmentDetails
                        INNER JOIN Pilots ON AssignmentDetails.pilotID = Pilots.pilotID
                        INNER JOIN Aircraft ON AssignmentDetails.aircraftID = Aircraft.aircraftID
                        INNER JOIN Airports ON AssignmentDetails.airportID = Airports.airportID`;
    db.pool.query(getQuery, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

module.exports = router;