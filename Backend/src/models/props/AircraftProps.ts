export interface AircraftTypeInfoProps {
    make: string;
    model: string;
}

export interface AircraftProps {
    aircraftID: number;
    serialNum: string;
    lastService: Date;
    totalHourFlown: number;
    typeInfo: AircraftTypeInfoProps;
}