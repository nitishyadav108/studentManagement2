# 🎓 Student Management System (Node.js)

A **Student Management System** built using **Node.js, Express, EJS**, and **MySQL** that allows users to **add, view, update, and manage student records** efficiently.

This project demonstrates:
- CRUD operations
- RESTful routing
- Partial updates using PATCH
- Clean backend logic
- Learning progression from **in-memory storage** to **database-based persistence**

---

## 📌 Project Overview

This project is intentionally developed in **two versions** to clearly showcase backend learning progression.

### 🔹 Version 1: Memory-Based Student Management System
- Uses a **JavaScript array** to store student data
- No database required
- Focuses on Express routing, CRUD logic, and PATCH requests
- Data resets on server restart

🔗 Repository:  
https://github.com/nitishyadav108/studentManagement

---

### 🔹 Version 2: Database-Based Student Management System (Current Repo)
- Uses **MySQL** for persistent data storage
- Implements real-world backend patterns
- Secure SQL queries using placeholders
- Partial updates using PATCH + `IFNULL()`

🔗 Repository:  
https://github.com/nitishyadav108/studentManagement2

---

## 🚀 Features

* ➕ Add new students
* 📋 View all students
* ✏️ Edit student details
* ♻️ Update **only selected fields** (PATCH functionality)
* 🗑️ Delete student records
* 🧠 Proper handling of empty fields
* 🔒 Safe SQL queries using placeholders
* 🎯 Clean and simple project structure

---

## 🛠️ Tech Stack

| Technology          | Description            |
| ------------------- | ---------------------- |
| **Node.js**         | Backend runtime        |
| **Express.js**      | Web framework          |
| **MySQL**           | Relational database    |
| **EJS**             | Template engine        |
| **mysql2**          | MySQL client for Node  |
| **UUID**            | Unique student IDs     |
| **Method-Override** | Enables PATCH & DELETE |
| **HTML / CSS**      | Frontend styling       |

---

## 📂 Project Structure

```text
studentManagement2/
│
├── views/              # EJS templates
│   ├── home.ejs
│   ├── add.ejs
│   └── edit.ejs
│
├── public/             # Static files
│   └── style.css
│
├── index.js            # Main server file
├── package.json
├── package-lock.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 🔹 1️⃣ Clone the Repository

```bash
git clone https://github.com/nitishyadav108/studentManagement2.git
cd studentManagement2
```

---

### 🔹 2️⃣ Install Dependencies

```bash
npm install
```

---

### 🔹 3️⃣ Setup MySQL Database

Create database:

```sql
CREATE DATABASE student_management;
USE student_management;
```

Create table:

```sql
CREATE TABLE student (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(50),
  course VARCHAR(50),
  english INT,
  maths INT,
  science INT
);
```

---

### 🔹 4️⃣ Configure Database Connection

Update MySQL credentials in `index.js`:

```js
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "your_password",
  database: "student_management"
});
```

---

### 🔹 5️⃣ Start the Server

```bash
nodemon index.js
```

or

```bash
node index.js
```

Server runs on:

```
http://localhost:8080
```

---

## 🔁 Routes Overview

| Method | Route            | Description            |
| ------ | ---------------- | ---------------------- |
| GET    | `/home`          | View all students      |
| GET    | `/home/new`      | Add student form       |
| POST   | `/home`          | Add new student        |
| GET    | `/home/:id/edit` | Edit student form      |
| PATCH  | `/home/:id`      | Update selected fields |
| DELETE | `/home/:id`      | Delete student         |

---

## 🧠 Partial Update Logic (PATCH)

This project correctly implements **PATCH** using:

```sql
column = IFNULL(?, column)
```

### Why this works

* Empty fields are converted to `null`
* `IFNULL()` keeps the previous value
* Only the provided fields are updated

✅ Prevents accidental data overwrite
✅ Matches real-world API behavior

---

## 🧪 Example PATCH Request

```json
{
  "course": "BTech",
  "maths": 85
}
```

✔ Updates only `course` and `maths`
✔ Other fields remain unchanged

---

## 📌 Key Learnings

* Difference between **PUT vs PATCH**
* Handling empty form inputs safely
* Node.js + MySQL integration
* Secure SQL queries using placeholders
* CRUD application design
* RESTful routing concepts

---

## 👨‍💻 Author

**Nitish Yadav**
Aspiring **Full-Stack Web Developer**

* GitHub: [@nitishyadav108](https://github.com/nitishyadav108)

---

## ⭐ Support

If you find this project helpful:

* ⭐ Star the repository
* 🍴 Fork it
* 🧠 Learn and build on top of it

---
