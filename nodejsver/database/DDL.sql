-- Jianbo Ning and Ellie Evans
-- CS 340 Database Project
-- Game Sales Website


DROP TABLE IF EXISTS `Genres_Games`;
DROP TABLE IF EXISTS `Sales`;
DROP TABLE IF EXISTS `Reviews`;
DROP TABLE IF EXISTS `Genres`;
DROP TABLE IF EXISTS `Games`;
DROP TABLE IF EXISTS `Customers`;


CREATE TABLE `Customers` (
    `CustomerID` int (11) NOT NULL AUTO_INCREMENT,
    `Email` varchar(256) NOT NULL,
    `Password` varchar(16) NOT NULL,
    `Fname` varchar(20) NOT NULL,
    `Lname` varchar(30) NOT NULL,
    `Address` varchar(256) NOT NULL,
    PRIMARY KEY (`CustomerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `Games` (
    `GameID` int(11) NOT NULL AUTO_INCREMENT,
    `GameName` varchar(256) NOT NULL,
    `Price` decimal(9,2) NOT NULL,
    `Description` text NOT NULL,
    PRIMARY KEY(`GameID`)   
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `Genres` (
    `GenreID` int(11) NOT NULL AUTO_INCREMENT,
    `GenreName` varchar(256) NOT NULL,
	`Description` text,
    PRIMARY KEY (`GenreID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `Reviews` (
    `ReviewID` int(11) NOT NULL AUTO_INCREMENT,
    `GameID` int(11) NOT NULL DEFAULT '0',
    `Rating` int(2) NOT NULL,
    `Comment` text NOT NULL,
    `CustomerID` int(100) NOT NULL DEFAULT '0',
    PRIMARY KEY (`ReviewID`),
    CONSTRAINT `Reviews-fk-game` FOREIGN KEY (`GameID`) REFERENCES `Games` (`GameID`) ON UPDATE CASCADE,
    CONSTRAINT `Reviews-fk-customer` FOREIGN KEY (`CustomerID`) REFERENCES `Customers` (`CustomerID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `Sales` (
    `SaleID` int (11) NOT NULL AUTO_INCREMENT,
    `SalePrice` decimal(9,2) NOT NULL,
    `CustomerID` int(11) NOT NULL DEFAULT '0',
    `GameID` int (11) NOT NULL DEFAULT '0',
    PRIMARY KEY(`SaleID`),
    CONSTRAINT `Sales-fk-customer` FOREIGN KEY (`CustomerID`) REFERENCES `Customers` (`CustomerID`) ON UPDATE CASCADE,
    CONSTRAINT `Sales-fk-game` FOREIGN KEY (`GameID`) REFERENCES `Games` (`GameID`) ON UPDATE CASCADE
)  ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `Genres_Games` (
    `GameID` int(11) NOT NULL DEFAULT '0',
    `GenreID` int(11) NOT NULL DEFAULT '0',
    PRIMARY KEY (`GameID`, `GenreID`),
    CONSTRAINT `Genres-Games-fk-game` FOREIGN KEY (`GameID`) REFERENCES `Games` (`GameID`) ON UPDATE CASCADE,
    CONSTRAINT `Genres-Games-fk-genre` FOREIGN KEY (`GenreID`) REFERENCES `Genres` (`GenreID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Sample Data

INSERT INTO Customers (Email, Password, Fname, Lname, Address)
VALUES ("XXX@gmail.com","123498765","le",'wu',"1 world street"),("xxx@qq.com","123498765","kobe","bean","111 love street");

INSERT INTO Games (GameName, Price, Description)
VALUES ("CSGO",19.99,"This game so good"),("League of L",10.99,"Good 5vs5 gmae");

INSERT INTO Reviews (GameID, Rating, Comment, CustomerID)
VALUES(2,3,"Bad",1),(1,6,"mid",1),(2,8,"Good",2);

INSERT INTO Sales (SalePrice, CustomerID, GameID)
VALUES(19.99,1,1),(10.99,2,2);

INSERT INTO Genres (GenreName, Description)
VALUES ("First-Person-Shooter", "Shoot things in first person"),("MOBA","Arena based 5v5 battles");

INSERT INTO Genres_Games
VALUES (1, 1),(2,2);