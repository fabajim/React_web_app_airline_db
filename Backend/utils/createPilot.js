function insertPilot(db, values) {
    return new Promise((resolve, reject) =>{
        const sql = `INSERT INTO Pilots (fname, lname, email, phoneNumber) 
                     VALUES (?)`;
        db.pool.query(sql, [values], (err, data) => {
            if(err){
                console.log(err)
                return reject(err);
            }
            //console.log(resolve(data));
            return resolve(data);
        })
    })
}



function insertLicenseDetail(db, values) {
    return new Promise((resolve, reject) =>{
        const sql = `INSERT INTO LicenseDetails (pilotID, licenseID, dateReceived) 
                     VALUES (?)`;
        db.pool.query(sql, [values], (err, data) => {
            if(err){
                console.log(err)
                return reject(err);
            }
            return resolve(data);
        })
    })
}

module.exports = {insertPilot, insertLicenseDetail}

