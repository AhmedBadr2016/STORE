# Storefront Backend Project

## Getting Started

- To get started, clone this repo and run yarn in your terminal at the project root.
- npm run init -y
- npm i m-zanaty-web-utils
- yern add bcrypt
- yern add --dev @types/bcrypt
- yern add jsonwebtoken
- yern add --dev @types/jsonwebtoken
- Your application must has .env file in the repo, and contain the following:

PORT = 3000
ENV=dev
// set the connection information
POSTGRS_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=our_store
POSTGRES_DB_TEST=store
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
BCRYPT_PASSWORD=ahmed2016
SALT_ROUNDS=10
TOKEN_SECRET= ahmedbadr

- You have to create two databases with the values you set in POSTGRES_DB, POSTGRES_TEST_DB. For example to connect the psql, use the following sql :

- CREATE USER shopping_user WITH PASSWORD 'password123';
- CREATE DATABASE our_store;
- \c shopping
- GRANT ALL PRIVILEGES ON DATABASE our_store TO shopping_user;

## overviow

### 1. DB Creation and Migrations

- To create the database and migrations. Add the dotenv and db-migrate `npx db-migrate up` that we used in the course and setup your Postgres database.
- To test database run `npm run test`.

### 2. API endpointd

- Check REQUIREMENTS.md.

### 3. Authentication

- On user creation or successful autentication , user is provided a token, make sure to add this as bearer token in authentication for routes that require authentication to work correctly

### 4. QA and README.md

- To format run `npm run format`
- To lint run `npm run lint`
- To fix the linting `npm run lint:fix`
- To test database `npm run test`

### 5. local host ports

- Run `npm run start` to start the application
- server is running on port 3000
- go to http://localhost:3000/user/sign_up and create new user
- go to http://localhost:3000/user/sign_in and open your user
- go to http://localhost:3000/user/sign_in/order and create new order
- go to http://localhost:3000/user/sign_up and create new user
- go to http://localhost:3000/user/sign_in/order/:id/products and add products to your order
- go to http://localhost:3000/order_product/:id and show all products of your order' id
