const express = require('express');
const cors = require('cors');

// create app
const app = express();
app.use(cors());
app.use(express.json());
 
//routes
const pilotRoute = require('./routes/pilots.js');
const licenseRoute = require('./routes/licenses.js');
const licenseDetailsRoute = require('./routes/licenseDetails.js');
const aircraftRoute = require('./routes/aircraft.js');
const aircraftTypeRoute = require('./routes/aircraftTypes.js');
const airportsRoute = require('./routes/airports.js');
const assignmentsRoute = require('./routes/assignmentDetails.js');
const filterPilot = require('./routes/filterPilot.js');
const filterYes = require('./routes/assignmentsFilterYes.js');
const filterNo = require('./routes/assignmentsFilterNo.js');

// api routes
app.use('/pilots', pilotRoute);
app.use('/filterPilot', filterPilot);
app.use('/license', licenseRoute);
app.use('/licenseDetails', licenseDetailsRoute);
app.use('/aircraft', aircraftRoute);
app.use('/aircraftType', aircraftTypeRoute);
app.use('/airports', airportsRoute);
app.use('/assignmentDetails', assignmentsRoute);
app.use('/assignmentCurrent', filterYes);
app.use('/assignmentPast', filterNo);

app.get('/', (req, res)=>{
    return res.send("Hello From Backend!");
});

app.listen(8081, ()=>{
    console.log("Listening on port 8081");
})

