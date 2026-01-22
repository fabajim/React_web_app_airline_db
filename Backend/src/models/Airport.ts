import { AirportProps } from "./props/AirportProps";

export class Airport {

    constructor(private props: AirportProps) {}

    public get airportID(): number | undefined {
        return this.props.airportID;
    }

    public get city(): string {
        return this.props.city;
    }

    public get cityCode(): string {
        return this.props.cityCode;
    }

    public get isHub(): number {
        return this.props.isHub;
    }

    public set city(value: string) {
        this.props.city = value;
    }

    public set cityCode(value: string) {
        this.props.cityCode = value;
    }

    public set isHub(value: number) {
        this.props.isHub = value;
    }
}