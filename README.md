# Invoice Tracker Application

This project is a simple Invoice Tracker application built using a combination of **React**, **Redux**, **NestJS**, **Prisma**, and **Postgres**. It provides functionality for managing invoices, user authentication, and viewing total amounts via a user-friendly UI.

## Features
- User Authentication (Login)
- Invoice Management (Create, View, Calculate Totals)
- Modals for invoice details and total amount viewing
- Seed data to get started quickly
- Dockerized deployment for ease of use

## Prerequisites
- **Docker** and **Docker Compose** installed
- **Node.js** and **npm** installed locally

## Project Setup

### 1. Clone the Repository
```sh
git clone <repository-url>
cd invoice-tracker
```

### 2. Install Dependencies
Install server and client dependencies:
```sh
npm install
```

### 3. Seed the Database
To populate the database with some initial data, run:
```sh
npx prisma migrate dev
ts-node prisma/seed.ts
```

### 4. Run with Docker
Use Docker Compose to run the services.
```sh
docker-compose up
```
This will start both the backend server and a Postgres database.

### 5. Access the Application
- The backend API is available at http://localhost:3000
- The frontend (React) is available at http://localhost:5173

## Running the Project
### Compile and Run
```sh
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Environment Variables
Create a .env file in the root of the project with the following:
```env
DATABASE_URL=postgres://user:password@localhost:5432/invoicedb
```
## Usage
### User Workflow
1. Login: After starting the application, the first screen is the login screen where users provide their credentials.
2. Main Page: After logging in, users are taken to the "Main Blank" page.
3. Invoices Page: From the main page, users click a button to navigate to the invoice management page, where they can view individual invoices or click to view the total amount of all invoices.

### Features in More Detail
- Authentication: Users must log in using the login page. Valid credentials will allow users to proceed to the main page.
- Invoice List: Users can see a list of all invoices and click any invoice to view its details.
- Total Invoice Amount: Users can click a button to view the total amount of all invoices, which is shown in a modal popup.

### Technologies Used
- React: Frontend framework
- Redux Toolkit: State management
- NestJS: Backend framework for scalable server-side applications
- Prisma: ORM to interact with the database
- Postgres: Relational database
- Docker: Containerization for easy setup and deployment

### Development Details
- Backend is built using NestJS with Prisma for database operations.
- Frontend is built using React with Redux Toolkit for state management.
- The application is fully containerized using Docker, making setup and deployment straightforward.

### Seeding Data
The initial data is seeded into the database using a script. It creates:

- A default user (test_email@example.com). password: "password"
- Several invoices associated with the user for testing purposes.

### Deployment
 The application is fully Dockerized and can be deployed easily using Docker Compose. If you wish to run it without Docker, make sure you have a Postgres database setup and update the .env file accordingly.

### License
This project is licensed under the MIT License.
```css
This way, all of the `README.md` content is clearly presented inside a markdown block. You can use it as a reference for how to structure the document.
```
