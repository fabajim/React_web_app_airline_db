import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../sequelize";
import { PilotModel } from "./PilotModel";
import { AircraftModel } from "./AircraftModel";
import { AirportModel } from "./AirportModel";

export interface AssignmentDetailsAttributes {
    assignmentDetailID: number;
    aircraftID: number;
    pilotID: number | null;
    airportID: number;
    isActive: boolean;

    pilot?: PilotModel;
    aircraft?: AircraftModel;
    airport?: AirportModel;
}

interface AssignmentDetailsCreateAttributes extends Optional<AssignmentDetailsAttributes, 'assignmentDetailID' > {}

export class AssignmentDetailsModel extends Model<AssignmentDetailsAttributes, AssignmentDetailsCreateAttributes>
implements AssignmentDetailsAttributes {
    assignmentDetailID!: number;
    aircraftID!: number;
    pilotID!: number | null;
    airportID!: number;
    isActive!: boolean;

    pilot?: PilotModel;
    aircraft?: AircraftModel;
    airport?: AirportModel;
}

AssignmentDetailsModel.init(
  {
    assignmentDetailID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    aircraftID: {
        type: DataTypes.INTEGER,
        field: 'aircraftID',
        allowNull: false
    },
    pilotID: {
        type: DataTypes.INTEGER,
        field: 'pilotID',
        allowNull: true
    },
    airportID: {
        type: DataTypes.INTEGER,
        field: 'airportID',
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        field: 'isActive',
        allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'AssignmentDetails',
    timestamps: false
  }
);

