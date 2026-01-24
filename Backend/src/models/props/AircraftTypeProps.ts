export interface AircraftTypeInfoProps {
    make: string;
    model: string;
}

export interface AircraftTypeProps {
    aircraftID: number;
    serialNum: string;
    lastService: Date;
    totalHourFlown: number;
    typeInfo: AircraftTypeInfoProps;
}