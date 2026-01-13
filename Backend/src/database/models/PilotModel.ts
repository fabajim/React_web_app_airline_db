import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';

export class PilotModel extends Model {
  declare pilotID: number;
  declare fname: string;
  declare lname: string;
  declare email: string;
  declare phoneNumber: string;
}

PilotModel.init({
  pilotID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  fname: DataTypes.STRING,
  lname: DataTypes.STRING,
  email: DataTypes.STRING,
  phoneNumber: DataTypes.STRING
}, {
  sequelize,
  tableName: 'Pilots',
  timestamps: false
});