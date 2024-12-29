const express = require("express");
const router = express.Router();
const db = require('../database/db_connector.js');

router.get('/', (req, res) => {
    const readTable = `SELECT aircraftTypeID, make, model, totalSeating, licenseType, Licenses.licenseID 
                       FROM AircraftTypes
                       INNER JOIN Licenses ON AircraftTypes.licenseID = Licenses.licenseID`;
    db.pool.query(readTable, (err, data) =>{
        if(err) return res.json(err);
        return res.json(data);
    });
});

router.get('/:id', (req, res) => {
    const typeQuery = "SELECT * FROM AircraftTypes WHERE aircraftTypeID = ?";
    const id = req.params.id;
    db.pool.query(typeQuery, [id], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

router.post('/', (req, res) => {
    const insertQuery = "INSERT INTO AircraftTypes (make, model, totalSeating, licenseID) VALUES (?)";
    const values = [
        req.body.make,
        req.body.model,
        req.body.seating,
        req.body.license
    ];
    db.pool.query(insertQuery, [values], (err, data) => {
        if(err){ 
            console.log(err);
            return res.json(err);
        }
        return res.json("Aircraft Type Successfully Added");
    });
});

router.delete('/:id', (req, res) => {
    const delQuery = "DELETE FROM AircraftTypes WHERE aircraftTypeID = ?";
    const id = req.params.id;
    db.pool.query(delQuery, [id], (err, data) => {
        if(err) return res.json(err);
        return res.json("Aircraft Type Successfully Deleted");
    });
});

module.exports = router;