CREATE DATABASE IF NOT EXISTS `memories`;
USE `memories`;

CREATE TABLE IF NOT EXISTS `Roles` (
    `roleID` INTEGER AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL UNIQUE,
    PRIMARY KEY (`roleID`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `Users` (
    `userID` CHAR(36) BINARY NOT NULL,
    `firstName` VARCHAR(255) NOT NULL,
    `fatherLastName` VARCHAR(255) NOT NULL,
    `motherLastName` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `confirmated` TINYINT(1) NOT NULL DEFAULT false,
    `token` CHAR(36) BINARY UNIQUE,
    `roleID` INTEGER NOT NULL,
    PRIMARY KEY (`userID`),
    FOREIGN KEY (`roleID`) REFERENCES `Roles` (`roleID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `Directories` (
    `directoryID` CHAR(36) BINARY NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `userID` CHAR(36) BINARY NOT NULL,
    `containerDirectoryID` CHAR(36) BINARY NOT NULL,
    PRIMARY KEY (`directoryID`),
    FOREIGN KEY (`userID`) REFERENCES `Users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`containerDirectoryID`) REFERENCES `Directories` (`directoryID`) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE (`name`, `userID`, `containerDirectoryID`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `Images` (
    `imageID` CHAR(36) BINARY NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `directoryID` CHAR(36) BINARY NOT NULL,
    PRIMARY KEY (`imageID`),
    FOREIGN KEY (`directoryID`) REFERENCES `Directories` (`directoryID`) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE (`name`, `directoryID`)
) ENGINE=InnoDB;
