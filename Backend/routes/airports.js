const express = require("express");
const router = express.Router();
const db = require('../database/db_connector.js');

router.get('/', (req, res) => {
    const getQuery = `SELECT airportID, city, cityCode, totalAircraft
                      IF(isHub = 1, 'YES', 'NO')
                      FROM Airports`;
    db.pool.query(getQuery, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

module.exports = router;