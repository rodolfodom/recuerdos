SET NAMES 'UTF8MB4';
DROP DATABASE IF EXISTS memories;
CREATE DATABASE IF NOT EXISTS memories DEFAULT CHARACTER SET UTF8MB4;
USE memories;

CREATE TABLE roles(
    roleID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(20) UNIQUE NOT NULL
    );

CREATE TABLE users(
    userID CHAR(36) PRIMARY KEY NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    fatherLastName VARCHAR(50) NOT NULL,
    motherLastName VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    roleID INT NOT NULL,
    FOREIGN KEY (roleID) REFERENCES roles(roleID)
);

CREATE TABLE directories(
    directoryID CHAR(36) PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    containerDirectoryID CHAR(36) NOT NULL,
    userID CHAR(36) NOT NULL,
    FOREIGN KEY (containerDirectoryID) REFERENCES directories(directoryID),
    FOREIGN KEY (userID) REFERENCES users(userID)
);

CREATE TABLE images(
    imageID CHAR(36) PRIMARY KEY NOT NULL,
    name VARCHAR(100) NOT NULL,
    directoryID CHAR(36) NOT NULL,
    uploadDate DATETIME NOT NULL,
    url VARCHAR(255) NOT NULL,
    FOREIGN KEY (directoryID) REFERENCES directories(directoryID)
);

