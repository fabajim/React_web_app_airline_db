export interface PilotProps {
  pilotID?: number;      // optional for new pilots before DB insert
  fname: string;
  lname: string;
  email: string;
  phoneNumber: string;
}