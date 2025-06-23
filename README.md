
#  Roadmap App

A web-based application built with **React 19**, **Vite**, and **Tailwind CSS**. This app serves as a roadmap tracking or planning tool. It's styled with modern Tailwind plugins and supports fast development via Vite's dev server.

## ✨ Features

### 🧭 Roadmap Management  
- Create, view, and manage roadmap entries (e.g., learning paths, project timelines, tasks).
- Organize roadmap items by category or status.

### 🧑‍💼 User Authentication  
- Secure signup and login using **JWT**.
- Passwords are encrypted with **bcryptjs**.

### ⚡ Fast Frontend  
- Built with **React 19** and powered by **Vite** for ultra-fast dev experience.

### 🎨 Clean and Responsive UI  
- Styled with **Tailwind CSS 4**, supporting responsive design.
- Enhanced form and typography with official Tailwind plugins.

### 🔌 RESTful API Integration  
- Built using **Express 5** for scalable server-side logic.
- Uses **MongoDB** via **Mongoose** for data modeling.

### 🔐 Environment Configuration  
- Environment variables managed with `.env` using **dotenv**.

### 🌐 CORS Enabled  
- Enables safe client-server interaction in development mode.

---


## 🧩 Tech Stack

### 🖥️ Frontend (`client/`)
- **React 19**
- **Vite 6**
- **Tailwind CSS 4**
- **Axios** – for HTTP requests
- **ESLint** – for linting and code quality

#### Tailwind Plugins
- `@tailwindcss/forms` – Forms styling
- `@tailwindcss/typography` – Typography formatting

#### Dev Tools
- `@vitejs/plugin-react`
- PostCSS, Autoprefixer

---

### 🌐 Backend (`server/`)
- **Node.js**
- **Express 5**
- **MongoDB** with **Mongoose**
- **JWT** (jsonwebtoken) – for authentication
- **BcryptJS** – for password hashing
- **dotenv** – for environment variables
- **CORS** – to enable cross-origin requests

#### Dev Tools
- **nodemon** – for auto-reloading during development

---
##  Getting Started
### 📦 Prerequisites
- Node.js ≥ 18
- MongoDB instance (local or hosted)

---
## Create a .env file in server

- PORT=5000
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_secret_key

---
## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/roadmap-app.git
cd roadmap-app

cd client
npm install
npm run dev

The frontend will start on: http://localhost:5173


cd server
npm install
npm run dev

The backend will run on: http://localhost:5000 
