import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';

export class AirportModel extends Model {
  declare airportID: number;
  declare city: string;
  declare cityCode: string;
  declare isHub: number;
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