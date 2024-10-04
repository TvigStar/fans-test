# How to Run the Project

## 1. Clone the Repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/TvigStar/fans-test.git
```

## 2. Create a `.env` File

Create a new `.env` file by copying from the provided `.env.example`:

```bash
cp .env.example .env
```
This will create a `.env` file with the default settings needed to run the project. You can adjust any configuration values as needed.

## 3. Run the Project

You have two options for running the project: using Docker or running manually.

### Option 1: Run with Docker (Recommended)

This option will spin up the application along with a MySQL database using Docker.

1. Ensure Docker is installed and running on your system.
2. Run the following command to build and start the services:

   ```bash
   docker-compose up --build
   ```

This command will set up the MySQL database and NestJS application. The services will be accessible on port 3000.

### Option 2: Run Manually

1. **Install Dependencies**

   First, make sure you have Node.js installed. Install the project dependencies by running:

   ```bash
   npm install
   ```

2. **Set Up the Database**

   Ensure you have MySQL installed and running. Create a new database and update the `.env` file with the correct database credentials.

3. **Start the Application**

   Run the application using the command:

   ```bash
   npm run start:dev
   ```

The application will start and listen on port 3000 by default.

## 4. Import Postman Collection to Test the API

To test the API endpoints, follow these steps:

1. **Import the Postman File**
    - Locate the Postman collection file in the project directory (e.g., `/postman/API.postman_collection.json`).
    - Open Postman, go to **File > Import**, and select the `.json` file.

2. **Test the API Endpoints**
    - Start with the **SignUp** endpoint to create a new user.
    - Use the **SignIn** endpoint to log in and obtain a token.
    - Copy the token from the response and paste it into the **Authorization** tab under the **Users** folder in Postman (select **Bearer Token** type).
    - You can now test the **Create User**, **Get Users**, and **Get User by ID** endpoints.

### Endpoints Overview

- **POST**: `http://localhost:3000/api/v1/auth/signup` - Sign up a new user.
- **POST**: `http://localhost:3000/api/v1/auth/login` - Log in to obtain a token.
- **POST (auth required)**: `http://localhost:3000/api/v1/add-user` - Create a new user.
- **GET (auth required)**: `http://localhost:3000/api/v1/all-users` - Get a list of all users.
- **GET (auth required)**: `http://localhost:3000/api/v1//get-user/:id` - Get a user by their ID.
- 
## 5. Summary

- **Clone** the repository and **create a `.env` file**.
- **Run with Docker** or **manually install dependencies** and start the project.
- **Use Postman** to test the API endpoints by importing the collection and following the steps provided.

Feel free to reach out if you encounter any issues or have questions!

