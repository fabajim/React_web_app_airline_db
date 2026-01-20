/**
 *  AirportQueryObject.ts
 * 
 *  Optional airport queries to allow for a flexible search depending on 
 *  the city, airport code, or if it is an airline hub.
 */

export interface AirportQueryObject {
    city?: string;
    cityCode?: string;
    isHub?: number; 
}