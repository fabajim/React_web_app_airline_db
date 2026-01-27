import { License } from "../models/License";

export interface ILicenseRepository {
    findAll(): Promise<License[]>;
    getById(id: number): Promise<License | null>;
}