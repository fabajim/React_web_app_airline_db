import { LicenseProps } from "./props/LicenseProps";

export class License {

    constructor(private props: LicenseProps) {}

    public get licenseId(): number {
        return this.props.licenseId;
    }

    public get licenseType(): string {
        return this.props.licenseType;
    }

    public set licenseType(value: string) {
        this.props.licenseType = value;
    }

    public get hoursNeeded(): number {
        return this.props.hoursNeeded;
    }
    
    public set hoursNeeded(value: number) {
        this.props.hoursNeeded = value;
    }
}