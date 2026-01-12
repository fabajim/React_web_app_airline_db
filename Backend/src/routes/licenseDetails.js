const express = require("express");
const router = express.Router();
const db = require('../database/db_connector.js');

router.get('/:pilotId', (req, res) => {
    const id = req.params.pilotId
    const getDetails = `SELECT licenseType, licenseDetailsID, dateReceived, Licenses.licenseID
                        FROM LicenseDetails
                        INNER JOIN Licenses ON LicenseDetails.licenseID = Licenses.licenseID
                        WHERE LicenseDetails.pilotID = ${id}`;
    db.pool.query(getDetails, (err, data) => {
        if (err){
            console.log(err); 
            return res.json(err); }
        return res.json(data);
    });
});

router.post('/', (req, res) => {
    const insertSQL = `INSERT INTO LicenseDetails (pilotID, licenseID, dateReceived) VALUES (?)`
    const values = [
        req.body.strPilotID,
        req.body.type,
        req.body.date
    ]
    db.pool.query(insertSQL, [values], (err, data) => {
        if(err) {
            console.log(err);
             return res.json(err);
        }
        return res.json("Success: New License Detail Added");
    });
});

router.delete('/:id', (req, res) => {
    const delQuery = "DELETE FROM LicenseDetails WHERE licenseDetailsID = ?";
    const id = req.params.id;
    db.pool.query(delQuery, [id], (err, data) => {
        if(err) return res.json(err);
        return res.json("License Successfully Deleted");
    });
});

module.exports = router;