const express = require("express");
const router = express.Router();
const db = require('../database/db_connector.js');

router.get('/:sn', (req, res) => {
    /*
        get the license required for this aircraft
    */
    const serialNum = req.params.sn;
    const getQuery = `SELECT licenseID FROM aircraftTypes
                        INNER JOIN aircraft ON aircraftTypes.aircraftTypeID = aircraft.aircraftTypeID
                        AND aircraft.serialNum = ?`;
    db.pool.query(getQuery, [serialNum], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

module.exports = router;