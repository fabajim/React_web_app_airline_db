/** 
 *  PilotQueryObjects.ts 
 * 
 *  Pilot search query interface. 
 *  Used to filter a pilot by first and or last name
 */

export interface PilotQueryObject {
    fname?: string;
    lname?: string;
}