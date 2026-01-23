import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../sequelize';

export interface LicenseDetailsAttributes {
  licenseDetailsID: number;
  pilotID: number;
  licenseID: number;
  dateReceived: Date;
}

interface LicenseDetailCreationAttributes extends Optional<LicenseDetailsAttributes, 'licenseDetailsID'> {}

export class LicenseDetailModel extends Model<LicenseDetailsAttributes, LicenseDetailCreationAttributes>
implements LicenseDetailsAttributes {
  public licenseDetailsID!: number;
  public pilotID!: number;
  public licenseID!: number;
  public dateReceived!: Date;
}

LicenseDetailModel.init(
  {
    licenseDetailsID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    pilotID: {
      type: DataTypes.INTEGER,
      field: 'pilotID',
      allowNull: false
    },
    licenseID: {
      type: DataTypes.INTEGER,
      field: 'licenseID',
      allowNull: false
    },
    dateReceived: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'LicenseDetails',
    timestamps: false
  }
);