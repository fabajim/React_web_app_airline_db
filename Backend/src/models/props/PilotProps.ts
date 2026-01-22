/**
 *  Interface for Pilot model properties.
 *  @member pilotID?: number
 *  @member fname: string
 *  @member lname: string
 *  @member email: string
 *  @member phoneNumber: string
 */
export interface PilotProps {
  pilotID?: number;      // optional for new pilots before DB insert
  fname: string;
  lname: string;
  email: string;
  phoneNumber: string;
}