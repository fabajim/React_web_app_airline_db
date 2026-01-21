import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../sequelize';

export interface AirportAttributes {
  airportID: number;
  city: string;
  cityCode: string;
  isHub: number;
}

interface AirportCreationAttributes extends Optional<AirportAttributes, 'airportID'> {}

export class AirportModel extends Model<AirportAttributes, AirportCreationAttributes> 
implements AirportAttributes {
  public airportID!: number;
  public city!: string;
  public cityCode!: string;
  public isHub!: number;
}

AirportModel.init({
  airportID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  city: DataTypes.STRING,
  cityCode: DataTypes.STRING,
  isHub: DataTypes.INTEGER
}, {
  sequelize, 
  tableName: 'Airports',
  timestamps: false
});