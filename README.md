# Task Management Application

A Node.js application that manages tasks with real-time notifications using MongoDB, Redis, and WebSocket.

## Features

- **Task Management**: Add, complete, and delete tasks.
- **Real-time Notifications**: Receive updates on tasks through WebSocket.
- **Caching**: Utilize Redis for efficient data retrieval.

## Prerequisites

Before running this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (running locally or remotely)
- [Redis](https://redis.io/) (running locally or remotely)

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/UtsavGohel/task-management-redis.git
   cd task-management-redis
   
2. **Install Dependencies**

   ```bash
   npm install
   
3. **Install Dependencies**

   ```bash
   MONGODB_URI=mongodb://localhost:27017/taskdb
   REDIS_URL=redis://localhost:6379

4. **Install Dependencies**

   ```bash
   mongod
   redis-server

5. **Start the Node.js Application**

   ```bash
   npm run start

7. **Open Your Browser**

   ```bash
   Visit this to use the application.
   http://localhost:3000

9. **Contribution**

    ```bash
    Feel free to fork the repository, make changes, and create a pull request. Contributions are welcome!
