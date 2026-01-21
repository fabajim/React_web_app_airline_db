import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";

export class LicenseModel extends Model {
    declare licenseId: number;
    declare licenseType: string;
    declare hoursNeeded: number;
}

LicenseModel.init({
    licenseId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    licenseType: DataTypes.STRING,
    hoursNeeded: DataTypes.INTEGER
}, {
    sequelize,
    tableName: 'Licenses',
    timestamps: false
});