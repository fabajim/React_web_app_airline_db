import express, { NextFunction, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import 'reflect-metadata';


//const express = require('express');
const cors = require('cors');

// create app
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware to catch global json parser errors from Invalid JSON format
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError && 'body' in err) {
        return res.status(400).json({ message: `Invalid JSON format` });
    }
    next(err);
});

 
//routes
// const pilotRoute = require('./routes/pilots.js');
// const licenseRoute = require('./routes/licenses.js');
// const licenseDetailsRoute = require('./routes/licenseDetails.js');
// const aircraftRoute = require('./routes/aircraft.js');
// const aircraftTypeRoute = require('./routes/aircraftTypes.js');
// const airportsRoute = require('./routes/airports.js');
// const assignmentsRoute = require('./routes/assignmentDetails.js');
// const filterPilot = require('./routes/filterPilot.js');
// const filterYes = require('./routes/assignmentsFilterYes.js');
// const filterNo = require('./routes/assignmentsFilterNo.js');
// const aircraftLicense = require('./routes/aircraftLicense.js');

import pilotRouter from './routes/PilotRouts';
import airportRouter from './routes/AirportRoutes';
import licenseRouter from './routes/LicenseRoute';
import { initDatabase } from './database';
import licenseDetailsRouter from './routes/LicenseDetailsRout';
import aircraftRouter from './routes/AircraftRouts';
import assignmentsRouter from './routes/AssignmentsRouts';


app.use('/api/pilots', pilotRouter);
app.use('/api/airports', airportRouter);
app.use('/api/licenses', licenseRouter);
app.use('/api/licenseDetails', licenseDetailsRouter)
app.use('/api/aircraft', aircraftRouter);
app.use('/api/assignments', assignmentsRouter);

// api routes
// app.use('/pilots', pilotRoute);
// app.use('/filterPilot', filterPilot);
// app.use('/license', licenseRoute);
// app.use('/licenseDetails', licenseDetailsRoute);
// app.use('/aircraft', aircraftRoute);
// app.use('/aircraftType', aircraftTypeRoute);
// app.use('/airports', airportsRoute);
// app.use('/assignmentDetails', assignmentsRoute);
// app.use('/assignmentCurrent', filterYes);
// app.use('/assignmentPast', filterNo);
// app.use('/aircraftLicense', aircraftLicense);


async function startServer() {
  try {
    await initDatabase();   
    app.listen(8081, () => {
      console.log('Server running on port 8081');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

