-- CS-340 Project Step 4
-- Group 106: Jianbo Ning, Ellie Evans

SELECT * FROM  'Reviews';
SELECT * FROM  'Customers';
SELECT * FROM  'Sales';
SELECT * FROM  'Games';

INSERT INTO 'Reviews'('GameID','CustomerID','Rating','Comment','ReviewID')
VALUES (:GameID_input,:CustomerID_input,:Rating_input,:Comment_input,:ReviewID_input);

INSERT INTO 'Customers'('CustomerID','Email','Fname','Lname','Address')
VALUES(:CustomerID_input,:Email_input,:Fname_input,:Lname_inpit,:Address_input);

INSERT INTO 'Sales'('SalesNumber','SalesPrice','CustomerID','GameID')
VALUES(:SalesNumber_input,:SalesPrice_input,:CustomerID_input,:GameID_input);

INSERT 'Games'('GameID','GenreName','Price','GameName','Description')
VALUES(:GameID_input,:GenreName_input,:Price_input,:GameName_input,:Description_input);

UPDATE 'Review'
SET 'Rating' = :Rating_input,
	'Comment' = :Comment_input,
WHERE 'GameID' = :GameID_input;

DELETE FROM 'Reviews'
WHERE 'ReviewID' = :ReviewID_input;


UPDATE 'Games'
SET 'GameName' = :GameName_input,
	'Price'= :Price_input,
	'Description' = :Description_input;
WHERE 'GameID' = :GameID_input;


DELETE FROM 'Games'
WHERE 'GameID' = :GameID_input;


