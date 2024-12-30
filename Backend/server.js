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

// api routes
app.use('/pilots', pilotRoute);
app.use('/license', licenseRoute);
app.use('/licenseDetails', licenseDetailsRoute);
app.use('/aircraft', aircraftRoute);
app.use('/aircraftType', aircraftTypeRoute);
app.use('/airports', airportsRoute);

app.get('/', (req, res)=>{
    return res.send("Hello From Backend!");
});

app.listen(8081, ()=>{
    console.log("Listening on port 8081");
})

