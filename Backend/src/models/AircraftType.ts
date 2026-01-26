import { AircraftTypeProps } from "./props/AircraftTypeProps";

export class AircraftType {
    constructor(private props: AircraftTypeProps) {}

    get aircraftTypeId(): number {
        return this.props.aircraftTypeID;
    }

    get make(): string {
        return this.props.make;
    }

    get model(): string {
        return this.props.model;
    }

    get licenseNeeded(): number {
        return this.props.licenseID;
    }

    get totalSeating(): number {
        return this.props.totalSeating;
    }
}