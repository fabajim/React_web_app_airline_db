import { License } from "../models/License";

export interface ILicenseRepository {
    findAll(): Promise<License[]>;
}