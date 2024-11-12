# SubmissioX - Assignment Submission Portal

## Overview

SubmissioX is an assignment submission portal designed to handle user and admin workflows. It allows **users** to upload assignments and **admins** to review, accept, or reject them. The project is built with **Node.js**, **Express.js**, **MongoDB**, and **JWT Authentication**.

## Features

- **Users** can:
  - Register and log in.
  - Upload assignments with an admin tagged to them.
- **Admins** can:
  - Register and log in.
  - View assignments tagged to them.
  - Accept or reject assignments.
- Proper input validation and error handling.
- JSON Web Token (JWT) based authentication for secure endpoints.

## Technologies Used

- **Backend**:
  - [Node.js](https://nodejs.org/) - JavaScript runtime environment.
  - [Express.js](https://expressjs.com/) - Web framework for Node.js.
  - [MongoDB](https://www.mongodb.com/) - NoSQL database.
  - [Mongoose](https://mongoosejs.com/) - MongoDB object modeling for Node.js.
  - [JWT (JSON Web Token)](https://jwt.io/) - Authentication and access control.
  - [Bcrypt](https://www.npmjs.com/package/bcrypt) - Password hashing.

- **Frontend**:
  - The frontend is a static HTML page served via an HTTP server or Nginx, located in the `public/` directory.
  
- **Dev Tools**:
  - [Docker](https://www.docker.com/) - Containerization of the application.
  - [Docker Compose](https://docs.docker.com/compose/) - For orchestrating the app, database, and Nginx.
  - [Nginx](https://www.nginx.com/) - Used as a reverse proxy for serving frontend and backend.
  
## Project Structure

```plaintext
SubmissioX/
├── public/                          # Frontend assets (HTML, CSS, JS)
│   ├── index.html                   # User login, registration, and assignment upload page
│   ├── admin.html                   # Admin page for reviewing assignments
│   ├── styles.css                   # Custom styles for the frontend
│   └── scripts.js                   # JavaScript to handle API calls and form submissions
├── src/                             # Backend source files
│   ├── config/                      # Configuration files
│   │   └── db.js                    # MongoDB connection configuration
│   ├── controllers/                 # Handles business logic
│   │   ├── authController.js        # Handles user/admin authentication
│   │   ├── assignmentController.js  # Handles assignment operations (upload, accept/reject)
│   ├── middleware/                  # Middleware for authentication and error handling
│   │   ├── authMiddleware.js        # JWT authentication middleware
│   │   └── roleMiddleware.js        # Middleware to check if the user is an admin
│   ├── models/                      # Mongoose models for the database
│   │   ├── User.js                  # User model (user and admin roles)
│   │   └── Assignment.js            # Assignment model
│   ├── routes/                      # Express route definitions
│   │   ├── userRoutes.js            # Routes for user-related actions (register, login, upload)
│   │   ├── adminRoutes.js           # Routes for admin-related actions (view assignments, accept/reject)
│   ├── utils/                       # Utility functions
│   │   └── validateInput.js         # Validation utility for incoming data
│   └── server.js                    # Main Express server setup
├── tests/                           # Test cases for the application
│   └── assignment.test.js           # Tests for the assignment submission functionality
├── .env                             # Environment variables (DB URI, JWT secret)
├── Dockerfile                       # Dockerfile to containerize the backend
├── nginx/
│   └── nginx.conf                   # Nginx configuration for reverse proxying frontend and backend
├── docker-compose.yml               # Docker Compose setup for backend, frontend, and MongoDB
├── .gitignore                       # Ignoring node_modules, .env, and other sensitive files
├── package.json                     # Node.js dependencies and scripts
└── README.md                        # Project documentation
```
## Environment Variables

Ensure you set the following environment variables in a .env file at the root of the project:

```bash
PORT=3000
DB_URI=mongodb://<username>:<password>@<mongo_url>/<database_name>
JWT_SECRET=your_jwt_secret
```

## Installation and Setup
```bash
Prerequisites
Node.js installed on your system.
MongoDB for database.
Docker (if using Docker for containerization).
Docker Compose for running the application and database containers.
```

## Steps to Run the Project

1. Clone the Repository
   
```bash
git clone https://github.com/yourusername/submissiox.git
cd submissiox
```

2. Install Dependencies

```bash
npm install

```

3. Set Up MongoDB
   
```bash
If you have MongoDB installed locally, ensure it's running. Alternatively, you can use the Docker setup, which will spin up a MongoDB instance.
```

4. Run the Application

## Using Node.js Directly

```bash
npm start

```

This will start the backend server on port 3000 by default.

## Using Docker

You can also use Docker and Docker Compose to run the application along with MongoDB:
```bash
docker-compose up --build
```

This command will start the backend, MongoDB, and Nginx containers.

Access the backend API at 
```bash 
 http://localhost:3000
 ```

Access the frontend at
```bash 
http://localhost:8080
```

5. Run the Frontend Server

If you're running the frontend manually, you can serve it using a static HTTP server like http-server or through Docker.

```bash 
cd public
http-server -p 8080

 ```
If using Docker Compose, the frontend will already be served via Nginx at port 8080.



## Running Tests

If you have test cases written (such as tests/assignment.test.js), you can run them using:

```bash 
npm test

 ```

## API Endpoints

User Endpoints
```bash 
POST /register - Register a new user.
POST /login - User login.
POST /upload - Upload an assignment.
GET /admins - Fetch all admins.
 ```

Admin Endpoints
```bash 
POST /register - Register a new admin.
POST /login - Admin login.
GET /assignments - View assignments tagged to the admin.
POST /assignments/:id/accept - Accept an assignment.
POST /assignments/:id/reject - Reject an assignment.

```


## Docker and Nginx Setup
```bash
The Docker Compose setup includes:
Backend: The Node.js Express server.
MongoDB: NoSQL database.
Nginx: Acts as a reverse proxy for both frontend and backend services.
```

The nginx/nginx.conf file configures Nginx to proxy requests appropriately between the frontend and backend.




## License

This project is licensed under the MIT License.


### Steps Summary:
1. **Clone the repository.**
2. **Install dependencies using `npm install`.**
3. **Run the backend using `npm start` or Docker Compose.**
4. **Serve the frontend using `http-server` or through Docker.**
5. **Access the API and frontend via the appropriate URLs.**

Let me know if you need any other details!
