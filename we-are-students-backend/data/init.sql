CREATE DATABASE test;

use test;

CREATE TABLE studentinformation (
	`RollNumber` INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    `Name` varchar(25) NOT NULL,
    `Class` int(11) NOT NULL,
    `Address` varchar(50) NOT NULL
);