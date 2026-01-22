import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";
import { LicenseDetailModel } from "./LicenseDetailModel";

export class LicenseModel extends Model {
    declare licenseId: number;
    declare licenseType: string;
    declare hoursNeeded: number;
    declare LicenseDetailModel?: LicenseDetailModel;
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