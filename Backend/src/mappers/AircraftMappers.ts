import { AircraftDto, AircraftTypeInfo } from "../dtos/aircraft/AircraftDto";
import { Aircraft } from "../models/Aircraft";

export class AircraftMappers {
    static toAircraftDto(aircraft: Aircraft): AircraftDto {
        const aircraftType: AircraftTypeInfo = {
            make: aircraft.make,
            model: aircraft.model
        }

        return {
            aircraftID: aircraft.aircraftId,
            serialNumber: aircraft.serialNumber,
            lastService: aircraft.lastServiceDate,
            totalHourFlown: aircraft.hoursFlown,
            typeInfo: aircraftType
        };
    }

    static toAircraftDtoList(aircraft: Aircraft[]): AircraftDto[] {
        return aircraft.map(a => this.toAircraftDto(a));
    }
}