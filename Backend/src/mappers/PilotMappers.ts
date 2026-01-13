import { PilotDto } from "../dtos/Pilot/PilotDto";
import { Pilot } from "../models/Pilot";

export class PilotMappers {
    static toPilotDto(pilot: Pilot): PilotDto {
        return {
            pilotId: pilot.id!,
            fname: pilot.firstName,
            lname: pilot.lastName,
            email: pilot.pilotEmail,
            phoneNumber: pilot.pilotPhoneNumber
        };
    }

    static toPilotDtoList(pilots: Pilot[]): PilotDto[] {
        return pilots.map(p => this.toPilotDto(p));
    }
}