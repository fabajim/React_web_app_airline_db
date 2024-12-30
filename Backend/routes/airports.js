const express = require("express");
const router = express.Router();
const db = require('../database/db_connector.js');

router.get('/', (req, res) => {
    const getQuery = `SELECT airportID, city, cityCode, totalAircraft,
                      IF(isHub = 1, 'YES', 'NO') AS isHub
                      FROM Airports`;
    db.pool.query(getQuery, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        console.log(data);
        return res.json(data);
    });
});

module.exports = router;