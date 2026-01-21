import { LicenseProps } from "../props/LicenseProps";

export class License {
    private readonly _licenseId: number;

    private _licenseType: string;

    private _hoursNeeded: number;


    constructor(props: LicenseProps) {
        this._licenseId = props.licenseId;
        this._licenseType = props.licenseType;
        this._hoursNeeded = props.hoursNeeded;
    }

    public get licenseId(): number {
        return this._licenseId;
    }

    public get licenseType(): string {
        return this._licenseType;
    }

    public set licenseType(value: string) {
        this._licenseType = value;
    }

    public get hoursNeeded(): number {
        return this._hoursNeeded;
    }
    
    public set hoursNeeded(value: number) {
        this._hoursNeeded = value;
    }
}