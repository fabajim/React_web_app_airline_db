import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../sequelize';
import { AircraftTypeModel } from './AircraftTypeModel';

export interface AircraftAttributes {
    aircraftID: number;
    serialNum: string,
    lastService: Date,
    totalHourFlown: number,
    aircraftTypeID: number,
    typeInfo?: AircraftTypeModel;
}

interface AircraftCreateAttributes extends Optional<AircraftAttributes, 'aircraftID'> {}

export class AircraftModel extends Model<AircraftAttributes, AircraftCreateAttributes>
implements AircraftAttributes {
    public aircraftID!: number;
    public serialNum!: string;
    public lastService!: Date;
    public totalHourFlown!: number;
    public aircraftTypeID!: number;

    public typeInfo!: AircraftTypeModel;
}

AircraftModel.init({
    aircraftID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    serialNum: { type: DataTypes.STRING },
    lastService: DataTypes.DATE,
    totalHourFlown: DataTypes.INTEGER,
    aircraftTypeID: DataTypes.INTEGER,
}, {
    sequelize,
    tableName: 'Aircraft',
    timestamps: false
});