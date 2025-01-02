const express = require("express");
const router = express.Router();
const db = require('../database/db_connector.js');

router.get('/', (req, res) => {
    /*
         Only get pilots who are not currently assigned to an assignment 
    */
    const getQuery = `SELECT Pilots.pilotID, fname, lname,  
	                        COUNT(AssignmentDetails.pilotID) AS total
                        FROM Pilots
                        LEFT JOIN AssignmentDetails ON Pilots.pilotID = AssignmentDetails.pilotID
                        AND AssignmentDetails.isActive = 1
                        GROUP BY pilots.pilotID
                        HAVING total = 0`;
    db.pool.query(getQuery, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

module.exports = router;