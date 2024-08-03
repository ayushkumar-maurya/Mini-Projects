-- Creating Table users.
CREATE TABLE users (
	id INT AUTO_INCREMENT,
	email VARCHAR(100) UNIQUE NOT NULL,
	password VARCHAR(128) NOT NULL,
	name VARCHAR(100) NOT NULL,
	mobile_no VARCHAR(20) UNIQUE NOT NULL,
	CONSTRAINT users_pk PRIMARY KEY (id)
);

-- Creating Table sources.
CREATE TABLE sources (
	id INT AUTO_INCREMENT,
	name VARCHAR(15) UNIQUE NOT NULL,
	CONSTRAINT sources_pk PRIMARY KEY (id)
);

-- Creating Table transactions.
CREATE TABLE transactions (
	id INT AUTO_INCREMENT,
	source_id INT NOT NULL,
	description VARCHAR(100),
	amount DOUBLE NOT NULL,
	datetime DATETIME DEFAULT NOW() NOT NULL,
	CONSTRAINT transactions_pk PRIMARY KEY (id),
	CONSTRAINT transactions_fk FOREIGN KEY (source_id) REFERENCES sources(id)
);
