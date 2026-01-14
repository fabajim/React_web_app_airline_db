import { AirportProps } from "../props/AirportProps";

export class Airport {
    private readonly _airportID?: number | undefined;
    private _city: string;
    private _cityCode: string;
    private _isHub: number;

    constructor(props: AirportProps) {
        this._airportID = props.airportID;
        this._city = props.city;
        this._cityCode = props.cityCode;
        this._isHub = props.isHub;
    }

    public get airportID(): number | undefined {
        return this._airportID;
    }

    public get city(): string {
        return this._city;
    }

    public get cityCode(): string {
        return this._cityCode;
    }

    public get isHub(): number {
        return this._isHub;
    }

    public set city(value: string) {
        this._city = value;
    }

    public set cityCode(value: string) {
        this._cityCode = value;
    }

    public set isHub(value: number) {
        this._isHub = value;
    }
}