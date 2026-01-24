export interface CreateAircraftDto {
    serialNum: string;
    lastService: Date;
    totalHourFlown: number;
    aircraftTypeID: number;
}