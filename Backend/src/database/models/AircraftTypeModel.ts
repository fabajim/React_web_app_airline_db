import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../sequelize";

export interface AircraftTypeAttributes {
    aircraftTypeID: number;
    make: string;
    model: string;
    licenseID: number;
    totalSeating: number;
}

interface AircraftTypeCreateAttributes extends Optional<AircraftTypeAttributes, 'aircraftTypeID'> {}

export class AircraftTypeModel extends Model<AircraftTypeAttributes, AircraftTypeCreateAttributes>
implements AircraftTypeAttributes {
    public aircraftTypeID!: number;
    public make!: string;
    public model!: string;
    public licenseID!: number;
    public totalSeating!: number;
}

AircraftTypeModel.init({
    aircraftTypeID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    make: DataTypes.STRING,
    model: DataTypes.STRING,
    licenseID: DataTypes.INTEGER,
    totalSeating: DataTypes.INTEGER
}, {
    sequelize,
    tableName: 'AircraftTypes',
    timestamps: false
});