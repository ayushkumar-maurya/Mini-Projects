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


### Generate Secret Key used for Encryption / Decryption purpose.
- Navigate to folder `API`.
- Run `node secret_key.js` to get Secret Key.


### API Setup
- Navigate to folder `API\money_tracker_api`.

- To install all the required packages:
	```
	npm i
	```

- Create `.env` file and mention following credentials:
	```
	PORT=
	SECRET_KEY=
	DB_HOST=
	DB_USERNAME=
	DB_PASSWORD=
	DB_NAME=
	```

- To start API Server:
	```
	node app
	```


### Mobile App Setup
- Navigate to folder `Mobile-App\money_tracker`.

- To install all the required packages:
	```
	npm i
	```

- Create `Base.js` file under path `src\utils` and mention following credentials:
	```
	export const API_URL = '';
	export const SECRET_KEY = '';
	```

- To start the development server:
	```
	npx expo start
	```
