import { PilotModel } from './models/PilotModel';
import { LicenseModel } from './models/LicenseModel';
import { LicenseDetailModel } from './models/LicenseDetailModel';
import { AircraftModel } from './models/AircraftModel';
import { AircraftTypeModel } from './models/AircraftTypeModel';
import { AssignmentDetailsModel } from './models/AssignmentDetailsModel';
import { AirportModel } from './models/AirportModel';

export const setupAssociations = (): void => {

    // Pilot <-> License (many to many)
  PilotModel.belongsToMany(LicenseModel, {
    through: LicenseDetailModel,
    foreignKey: 'pilotID',
    otherKey: 'licenseID',
    as: 'licenses'
  });

  LicenseModel.belongsToMany(PilotModel, {
    through: LicenseDetailModel,
    foreignKey: 'licenseID',
    otherKey: 'pilotID',
    as: 'pilots'
  });

  LicenseDetailModel.belongsTo(PilotModel, { foreignKey: 'pilotID' });
  LicenseDetailModel.belongsTo(LicenseModel, { foreignKey: 'licenseID' });

  // Aircraft <-> Aircraft Type M:N
  AircraftModel.belongsTo(AircraftTypeModel, {
    foreignKey: 'aircraftTypeID',
    as: 'typeInfo'
  });

  AircraftTypeModel.hasMany(AircraftModel, {
    foreignKey: 'aircraftTypeID',
    as: 'aircraft'
  });

  // Pilot <-> Aircraft <-> Airport (AssignmentDetails)
  PilotModel.hasMany(AssignmentDetailsModel, { 
    foreignKey: 'pilotID',
    as: 'assignments' 
  });
  AssignmentDetailsModel.belongsTo(PilotModel, { 
    foreignKey: 'pilotID',
    as: 'pilot' 
  });

  AircraftModel.hasMany(AssignmentDetailsModel, { 
    foreignKey: 'aircraftID',
    as: 'assignments' 
  });
  AssignmentDetailsModel.belongsTo(AircraftModel, { 
    foreignKey: 'aircraftID',
    as: 'aircraft' 
  });

  AirportModel.hasMany(AssignmentDetailsModel, { 
    foreignKey: 'airportID',
    as: 'assignments' 
  });
  AssignmentDetailsModel.belongsTo(AirportModel, { 
    foreignKey: 'airportID',
    as: 'airport' 
  });
};