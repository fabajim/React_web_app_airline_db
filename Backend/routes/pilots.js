const express = require("express");
const router = express.Router();
const db = require('../database/db_connector.js');
const newPilot = require('../utils/createPilot.js');

router.get('/', (req, res) => {
    const pilots = "SELECT Pilots.*, COUNT(LicenseDetails.pilotID) as totalLicense \n"+
                    "FROM Pilots \n"+
                    "INNER JOIN LicenseDetails ON Pilots.pilotID = LicenseDetails.pilotID \n"+
                    "GROUP BY Pilots.pilotID";
    db.pool.query(pilots, (err, data)=> {
        if(err) return res.json(err);
        return res.json(data);
    });
});

router.get('/:id', (req, res) => {
    const pilotQuery = "SELECT * FROM Pilots WHERE pilotID = ?";
    const id = req.params.id;
    db.pool.query(pilotQuery, [id], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

router.post('/', async (req, res) => {
    // get incoming data
    const values = [
        req.body.fname,
        req.body.lname,
        req.body.email,
        req.body.phone,
    ]
    try {
        const sql1 =  await newPilot.insertPilot(db, values);
        const sql2 = await newPilot.insertLicenseDetail(db, [sql1.insertId, req.body.license, req.body.date]);
        return res.json("Insert Successful");
    } catch(err) {
        console.log(err);
        return res.json(err);
    }
});

router.put('/:id', (req, res) => {
    const updateQuery = "UPDATE Pilots set fname = ?, lname = ?, email= ?, phoneNumber = ? WHERE pilotID = ?";
    const id = req.params.id;
    const values = [
        req.body.fname,
        req.body.lname,
        req.body.email,
        req.body.number,
        id
    ]
    db.pool.query(updateQuery, values, (err, data) => {
        if(err) {
            console.log(err);
            return res.json(err);
        }
        return res.json("Pilot Updated");
    });
});

router.delete('/:id', (req, res) => {
    const deleteQuery = "DELETE FROM Pilots WHERE pilotID = ?";
    const id = req.params.id;
    db.pool.query(deleteQuery, [id], (err, data) => {
        if(err) return res.json(err);
        return res.json("Pilot Deleted");
    });
});

module.exports = router;