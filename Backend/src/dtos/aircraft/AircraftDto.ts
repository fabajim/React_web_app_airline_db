export interface AircraftTypeInfo {
    make: string;
    model: string;
}

export interface AircraftDto {
    aircraftID: number;
    serialNumber: string;
    lastService: Date;
    totalHourFlown: number;
    typeInfo: AircraftTypeInfo;
}