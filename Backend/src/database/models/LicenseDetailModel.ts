import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';

export class LicenseDetailModel extends Model {
  declare licenseDetailsID: number;
  declare pilotID: number;
  declare licenseID: number;
  declare dateReceived: Date;
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