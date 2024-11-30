# TaskEndPoint API

A simple task manager API built with Express.js for TaskFlow's MVP (Minimum Viable Product). This API allows users to create, update, delete, retrieve, and filter tasks.

---

## Features

- **Create Tasks:** Add new tasks with a title, description, and default status (`pending`).
- **Retrieve All Tasks:** Fetch all tasks with their details.
- **Update Task Status:** Modify the status of a specific task (`pending` or `completed`).
- **Delete Tasks:** Remove tasks by their unique ID.
- **Filter Tasks by Status:** Retrieve tasks filtered by their status (`pending` or `completed`).
- **Data Persistence:** Tasks are saved in a JSON file for persistence.

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jaiswalkishan09/task_end_point.git
   cd task_end_point
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the server:

   ```bash
   npm start
   ```

4. The server will start on [http://localhost:3000](http://localhost:3000).

---

## API Endpoints

### 1. **Create a Task**

- **URL:** `POST /tasks`
- **Request Body:**
  ```json
  {
    "title": "Your Task Title",
    "description": "Task Description"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Task created successfully",
    "task": {
      "id": "unique-id",
      "title": "Your Task Title",
      "description": "Task Description",
      "status": "pending"
    }
  }
  ```

### 2. **Get All Tasks**

- **URL:** `GET /tasks`
- **Response:**
  ```json
  [
    {
      "id": "unique-id",
      "title": "Task Title",
      "description": "Task Description",
      "status": "pending"
    }
  ]
  ```

### 3. **Update a Task**

- **URL:** `PUT /tasks/:id`
- **Request Body:**
  ```json
  {
    "status": "completed"
  }
  ```
- **Response (Success):**
  ```json
  {
    "message": "Task updated successfully",
    "task": {
      "id": "unique-id",
      "title": "Task Title",
      "description": "Task Description",
      "status": "completed"
    }
  }
  ```
- **Response (Error):**
  ```json
  {
    "error": "Task not found"
  }
  ```

### 4. **Delete a Task**

- **URL:** `DELETE /tasks/:id`
- **Response (Success):**
  ```json
  {
    "message": "Task deleted successfully"
  }
  ```
- **Response (Error):**
  ```json
  {
    "error": "Task not found"
  }
  ```

### 5. **Filter Tasks by Status**

- **URL:** `GET /tasks/status/:status`
- **Response:**
  ```json
  [
    {
      "id": "unique-id",
      "title": "Task Title",
      "description": "Task Description",
      "status": "pending"
    }
  ]
  ```

## Technologies Used

- **Node.js**
- **Express.js**
- **UUID Library** (for generating unique IDs)

---

## Future Enhancements

- Add user authentication.
- Use a database like MongoDB or PostgreSQL for data storage.
- Add task deadlines and priorities.
- Implement sorting and pagination.

---
