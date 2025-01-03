const express = require("express");
const router = express.Router();
const db = require('../database/db_connector.js');

router.get('/', (req, res) => {
    const getQuery = `SELECT Airports.airportID, Airports.cityCode, Airports.city, 
                            IF(Airports.isHub = 1, 'YES', 'NO') AS isHub,
	                        COUNT(assignmentDetails.airportID) AS totalAircraft
                        FROM Airports
                        LEFT JOIN assignmentDetails ON Airports.airportID = assignmentDetails.airportID
                        AND assignmentDetails.isActive = 1
                        GROUP BY Airports.airportID`;
    db.pool.query(getQuery, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        console.log(data);
        return res.json(data);
    });
});

router.post('/', (req, res) => {
    const insertQuery = "INSERT INTO Airports (city, cityCode, isHub) VALUES (?)";
    const values = [
        req.body.city,
        req.body.code,
        req.body.hub
    ];
    db.pool.query(insertQuery, [values], (err, data) => {
        if(err){ 
            console.log(err);
            return res.json(err);
        }
        return res.json("Airport Type Successfully Added");
    });
});

module.exports = router;