import { PilotProps } from "../props/PilotProps"

export class Pilot {
    private readonly pilotID?: number;
    private fname: string;
    private lname: string;
    private email: string;
    private phoneNumber: string;

    constructor(props: PilotProps){
        this.pilotID = props.pilotID;
        this.fname = props.fname;
        this.lname = props.lname;
        this.email = props.email;
        this.phoneNumber = props.phoneNumber;
    }

    get id(): number | undefined {
        return this.pilotID;
    }

    get firstName(): string {
        return this.fname;
    }

    get lastName(): string {
        return this.lname;
    }

    get pilotEmail(): string {
        return this.email;
    }

    get pilotPhoneNumber(): string {
        return this.phoneNumber;
    }
}