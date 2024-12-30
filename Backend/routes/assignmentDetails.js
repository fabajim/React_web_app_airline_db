const express = require("express");
const router = express.Router();
const db = require('../database/db_connector.js');

router.get('/', (req, res) => {
    const getQuery = `SELECT assignmentDetailID, Pilots.pilotID, Pilots.fname, Pilots.lname, 
                        Aircraft.aircraftID, Aircraft.serialNum
	                    FROM AssignmentDetails
                        INNER JOIN Pilots ON AssignmentDetails.pilotID = Pilots.pilotID
                        INNER JOIN Aircraft ON AssignmentDetails.aircraftID = Aircraft.aircraftID`;
    db.pool.query(getQuery, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

module.exports = router;