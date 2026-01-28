export interface AssignmentDetailsDto {
    assignmentId: number;

    pilotId: number | null;
    pilotName: string | null;

    aircraftId: number;
    aircraftSerial: string;

    airportId: number;
    airportCode: string;

    isActive: boolean;
}