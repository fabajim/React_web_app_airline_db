SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

DROP DATABASE IF EXISTS AirlineDB;
CREATE DATABASE AirlineDB;
USE AirlineDB;

CREATE TABLE Airports (
    airportID int NOT NULL AUTO_INCREMENT,
    city varchar(45) NOT NULL,
    cityCode varchar(10) NOT NULL,
    isHub tinyint(1),
    PRIMARY KEY (airportID)
);

CREATE TABLE Licenses (
    licenseID   INT NOT NULL AUTO_INCREMENT,
    licenseType varchar(50) NOT NULL,
    hoursNeeded INT, 
    PRIMARY KEY (licenseID)
);

CREATE TABLE Pilots (
    pilotID int NOT NULL AUTO_INCREMENT,
    fname varchar(20) NOT NULL,
    lname varchar(20) NOT NULL,
    email varchar(50) NOT NULL,
    phoneNumber varchar(15) NOT NULL,
    PRIMARY KEY (pilotID)
);

CREATE TABLE AircraftTypes (
    aircraftTypeID int NOT NULL AUTO_INCREMENT,
    make varchar(50),
    model varchar(100),
    licenseID INT NOT NULL,
    totalSeating int,
    PRIMARY KEY (aircraftTypeID),
    FOREIGN KEY (licenseID) REFERENCES Licenses(licenseID)
);

CREATE TABLE Aircraft (
    aircraftID int NOT NULL AUTO_INCREMENT,
    serialNum VARCHAR(20) NOT NULL UNIQUE,
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
    isActive tinyint NOT NULL,
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
    FOREIGN KEY (licenseID) REFERENCES Licenses(licenseID) ON DELETE CASCADE
);


INSERT into Airports (city, cityCode, isHub) VALUES ("Los Angeles", "LAX", 1), ("New York", "JFK", 1), ("San Francisco", "SFO", 0);

INSERT into Licenses (licenseType, hoursNeeded) VALUES ("Student License", 75), ("Recreational License", 30), ("Private Pilot", 40), ("Commercial", 250), ("Transportation", 1500);

INSERT into AircraftTypes (make, model, totalSeating, licenseID) VALUES ("Boeing", "Max 8", 160, 5), ("Airbus", "A320", 180, 5), ("Cessna", "408 SkyCourier", 0, 4);

INSERT into Aircraft (serialNum, lastService, totalHourFlown, aircraftTypeID) VALUES ('B101A7', '2024-07-13', 27, 1), ('A320156', '2024-04-27', 300, 2), ('C956SC5', '2025-01-03', 12, 3);

Insert into Pilots (fname, lname, email, phoneNumber) VALUES ("Leela", "Turanga", "LeeTuran@airlinedb.com", "(555) 555-7894"), ("Joseph", "Cooper", "JosCoop@airlinedb.com", "(555) 555-1245"), ("Steven", "Miller", "StevMill@airlinedb.com", "(555) 555-3636");

INSERT into AssignmentDetails (aircraftID, pilotID, airportID, isActive) VALUES (1, 2, 3, 1), (2, 3, 1, 1), (3, 1, 2, 0);

INSERT into LicenseDetails (pilotID, licenseID, dateReceived) VALUES (1, 5, '2023-06-11'), (2, 4, '2022-01-9'), (3, 5, '2024-02-02');

SET FOREIGN_KEY_CHECKS=1;
COMMIT;