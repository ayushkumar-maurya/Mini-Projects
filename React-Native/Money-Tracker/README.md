# Money-Tracker
Keep track of income &amp; expenses.

This project aims to create a mobile application which will help users to keep track of their daily expenses and income from various sources.

### Technologies used
1. Mobile App - React Native
2. API - Node.js (Express)
3. DBMS - MySQL


### Database Setup
Database related Scripts are present under folder `Database`.
1. `db.sql` - Create DB.
2. `tables.sql` - Create required Tables.


### API Setup
- Navigate to folder `API\money_tracker_api`.

- Create `.env` file and mention following credentials:
	```
	PORT=
	DB_HOST=
	DB_USERNAME=
	DB_PASSWORD=
	DB_NAME=
	```

- To install all the required packages:
	```
	npm i
	```

- To start API Server:
	```
	node app
	```


### Mobile App Setup
- Navigate to folder `MobileApp\money_tracker`.

- To install all the required packages:
	```
	npm i
	```

- To start the development server:
	```
	npx expo start
	```
