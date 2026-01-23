import { LicenseDetailsProps } from "./props/LicenseDetailsProps";

export class LicenseDetails {
    constructor(private props: LicenseDetailsProps) {}

    get licenseDetailID(): number {
        return this.props.licenseDetailsID;
    }

    get pilotID(): number {
        return this.props.pilotID;
    }

    get licenseID(): number {
        return this.props.licenseID;
    }

    get dateReceivedOn(): Date {
        return this.props.dateReceived;
    }
}