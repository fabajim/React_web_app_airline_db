import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../sequelize';

interface PilotAttributes {
  pilotID: number;
  fname: string;
  lname: string;
  email: string;
  phoneNumber: string;
}

interface PilotCreationAttributes extends Optional<PilotAttributes, 'pilotID'> {}

export class PilotModel extends Model<PilotAttributes, PilotCreationAttributes>
  implements PilotAttributes {
  public pilotID!: number;
  public fname!: string;
  public lname!: string;
  public email!: string;
  public phoneNumber!: string;
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