
`SELECT Pilots.*, COUNT(LicenseDetails.pilotID) as total
FROM Pilots
INNER JOIN LicenseDetails ON LicenseDetails.pilotID = Pilots.pilotID
GROUP BY Pilots.pilotID;`