function insertAircraft(db, values) {
    return new Promise((resolve, reject) =>{
        const sql = `INSERT INTO Aircraft (serialNum, lastService, totalHourFlown, aircraftTypeID) 
                     VALUES (?)`;
        db.pool.query(sql, [values], (err, data) => {
            if(err){
                console.log(err);
                return reject(err);
            }
            //console.log(resolve(data));
            return resolve(data);
        });
    });
}

function insertAssignmentDetail(db, values) {
    return new Promise((resolve, reject) =>{
        const sql = `INSERT INTO AssignmentDetails (aircraftID, pilotID, airportID, isActive) 
                     VALUES (?)`;
        db.pool.query(sql, [values], (err, data) => {
            if(err){
                console.log(err);
                return reject(err);
            }
            return resolve(data);
        });
    });
}

module.exports = {insertAircraft, insertAssignmentDetail}