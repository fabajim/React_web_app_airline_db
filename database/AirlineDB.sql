SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

DROP DATABASE IF EXISTS AirlineDB;
CREATE DATABASE AirlineDB;
USE AirlineDB;

CREATE TABLE Licenses (
    licenseID int NOT NULL AUTO_INCREMENT,
    yearsValid int,
    totalHourNeeded int,
    PRIMARY KEY (licenseID)
);

CREATE TABLE Airports (
    airportID int NOT NULL AUTO_INCREMENT,
    city varchar(45) NOT NULL,
    totalAircraft int,
    isHub tinyint(1),
    PRIMARY KEY (airportID)
);

CREATE TABLE Pilots (
    pilotID int NOT NULL AUTO_INCREMENT,
    fname varchar(50),
    lname varchar(50),
    totalLicense INT,
    PRIMARY KEY (pilotID)
);

CREATE TABLE AircraftTypes (
    aircraftTypeID int NOT NULL AUTO_INCREMENT,
    model varchar(100),
    totalSeating int,
    licenseID int,
    PRIMARY KEY (aircraftTypeID),
    FOREIGN KEY (licenseID) REFERENCES Licenses(licenseID)
);

CREATE TABLE Aircraft (
    aircraftID int NOT NULL AUTO_INCREMENT,
    lastService date NOT NULL,
    totalHourFlown INT NOT NULL,
    aircraftTypeID INT,
    PRIMARY KEY (aircraftID),
    UNIQUE (aircraftID),
    FOREIGN KEY (aircraftTypeID) REFERENCES AircraftTypes(aircraftTypeID)
);

CREATE TABLE AssignmentDetails (
    assignmentDetailID int AUTO_INCREMENT NOT NULL,
    aircraftID int NOT NULL,
    pilotID int,
    airportID int NOT NULL,
    PRIMARY KEY (assignmentDetailID),
    FOREIGN KEY (airportID) REFERENCES Airports(airportID)
    ON DELETE CASCADE,
    FOREIGN KEY (aircraftID) REFERENCES Aircraft(aircraftID)
    ON DELETE CASCADE,
    FOREIGN KEY (pilotID) REFERENCES Pilots(pilotID)
    ON DELETE SET NULL
);

CREATE TABLE LicenseDetails (
    licenseDetailsID int NOT NULL AUTO_INCREMENT,
    pilotID int NOT NULL,
    licenseID int NOT NULL,
    dateReceived date,
    PRIMARY KEY (licenseDetailsID),
    FOREIGN KEY (pilotID) REFERENCES Pilots(pilotID) ON DELETE CASCADE,
    FOREIGN KEY (licenseID) REFERENCES Licenses(licenseID)
    ON DELETE CASCADE
);


INSERT into Aircraft (lastService, totalHourFlown, aircraftTypeID) VALUES ('2024-07-13', 27, 1), ('2024-04-27', 300, 2), ('2025-01-03', 12, 3);

INSERT into AircraftTypes (model, totalSeating, licenseID) VALUES ("Boeing Max 8", 160, 1), ("Airbus c130", 120, 2), ("Boeing Max 7", 180, 3);

INSERT into Airports (city, totalAircraft, isHub) VALUES ("Los Angeles", 56, 1), ("Chicago", 87, 1), ("San Francisco", 12, 0);

Insert into Pilots (fname, lname, totalLicense) VALUES ("Frank", "Johnson", 3), ("Michelle", "Jacobs", 2), ("Andrew", "Garfield", 1);

INSERT into Licenses (yearsValid, totalHourNeeded) VALUES (3, 200), (5, 600), (1, 120);

INSERT into AssignmentDetails (aircraftID, pilotID, airportID) VALUES (1, 2, 3), (2, 3, 1), (3, 1, 2);

INSERT into LicenseDetails (pilotID, licenseID, dateReceived) VALUES (1, 3, '2023-06-11'), (2, 2, '2022-01-9'), (3, 1, '2024-02-02');

SET FOREIGN_KEY_CHECKS=1;
COMMIT;