import { PilotLicense } from "../../models/props/PilotProps";

export interface PilotDto {
    pilotId: number;
    fname: string;
    lname: string;
    email: string;
    phoneNumber: string;
    licenses?: PilotLicense[];
}