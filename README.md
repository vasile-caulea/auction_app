
# Demo Web Application - Charity Auctions App

## Description
This project is a demo web application that implements functionality for a charity auctions web application. It has the following components:

- **Backend**: Implemented with NestJS, provides APIs for auctions and users.
- **Frontend**: Developed with Angular, offers a user interface to interact with auctions and user profiles.

## Installation

### Prerequisites
Ensure the following software is installed on your machine:
- Node.js (version 16.x or higher)
- npm (comes with Node.js)
- Angular CLI (for frontend): `npm install -g @angular/cli`
- Docker

### Steps to Install
1. Clone or extract the project archive to your desired location.
2. Navigate to the backend directory and install dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Configure the environment variables by creating a `.env` file in the `backend` directory, that contains a line with "JWT_SECRET=<secret>".
4. Navigate to the frontend directory and install dependencies:
   ```bash
   cd frontend
   npm install
   ```

## Running the Application

### Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Start the backend server:
   ```bash
   npm run start:dev
   ```

### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Start the Angular development server:
   ```bash
   ng serve
   ```
3. Open your browser and navigate to `http://localhost:4200` to access the application.

## Dependencies and Libraries
- **Backend**:
  - NestJS Framework
  - JSON Web Token (JWT) for authentication
  - TypeORM for database interactions
- **Frontend**:
  - Angular Framework
  - Angular Material for UI components

## Usage
1. Access the application at `http://localhost:4200`.
2. Register or log in to your account.
3. Create, view and manage auctions and bid to auctions.

## Additional Notes
- Ensure that the database is properly configured and running before starting the backend server.
- For this project a docker container with mongodb was used.
- use **docker-compose.yml** file to set up the container using the following command

```bash
docker-compose up -d
```
