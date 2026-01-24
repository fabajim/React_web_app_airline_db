import { AircraftTypeInfo } from "../dtos/aircraft/AircraftDto";
import { AircraftTypeProps } from "./props/AircraftTypeProps";

export class Aircraft {
    constructor(private props: AircraftTypeProps) {}

    get aircraftId(): number {
        return this.props.aircraftID;
    }

    get serialNumber(): string {
        return this.props.serialNum;
    }

    get lastServiceDate(): Date {
        return this.props.lastService;
    }

    get hoursFlown(): number {
        return this.props.totalHourFlown;
    }

    get make(): string {
        return this.props.typeInfo.make
    }

    get model(): string {
        return this.props.typeInfo.model
    }

    getTypeInfo(): AircraftTypeInfo {
        return this.props.typeInfo;
    }

}