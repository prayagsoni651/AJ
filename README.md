# 🎮 Wingo Betting Platform (AJ)

A full-stack, real-time betting platform built with modern technologies. This project features a seamless Wingo game experience, secure authentication, and a real-time dashboard for administrators.

## 🚀 Key Features

-   **User Authentication**: Secure registration and login using JWT and Bcrypt encryption.
-   **Real-time Gameplay**: Instant game updates and results using Socket.io.
-   **Admin Dashboard**: Manage users, monitor platform stats (revenue, active users), and control game results.
-   **Responsive Design**: Modern, glassmorphism UI built with Tailwind CSS and Framer Motion for smooth animations.
-   **Database Management**: Robust data handling with Prisma and PostgreSQL.

## 🛠️ Technology Stack

### Frontend
-   **React** (v19)
-   **Vite** (Next-gen frontend tool)
-   **Tailwind CSS** (Styling)
-   **Framer Motion** (Animations)
-   **Socket.io-client** (Real-time communication)
-   **Lucide React** (Icons)

### Backend
-   **Node.js & Express**
-   **Socket.io** (Websocket server)
-   **Prisma ORM** (Database interaction)
-   **JWT (JSON Web Token)** (Secure authentication)
-   **Bcrypt.js** (Password hashing)

## 💡 Real-Time Problems Solved

1.  **Low-Latency Game Sync**: Synchronizing game intervals (1 min, 3 min, etc.) across all connected clients simultaneously using WebSockets.
2.  **Scalable State Management**: Handling real-time bets, results, and user balances without page reloads.
3.  **Secure Admin Control**: Ensuring only authorized administrators can manually override game results or manage user funds.
4.  **Optimized UI Performance**: Preventing layout shifts and ensuring smooth transitions during high-frequency data updates.

## ⚙️ Installation & Setup

### 1. Prerequisites
-   Node.js installed
-   PostgreSQL database (or any Prisma-supported DB)
-   Git

### 2. Clone the Repository
```bash
git clone https://github.com/prayagsoni651/AJ.git
cd AJ
```

### 3. Backend Setup
1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure environment variables:
    Create a `.env` file and add:
    ```env
    DATABASE_URL="your_db_connection_string"
    JWT_SECRET="your_secret_key"
    PORT=5000
    ```
4.  Initialize the database:
    ```bash
    npx prisma generate
    npx prisma db push
    ```
5.  Start the server:
    ```bash
    npm run dev  # (Make sure nodemon is configured in scripts if using dev)
    # or
    node src/index.js
    ```

### 4. Frontend Setup
1.  Navigate to the client directory:
    ```bash
    cd ../client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

## 📂 Project Structure
```text
wingo-game/
├── client/          # Vite + React Frontend
│   ├── src/         # Application components and logic
│   └── public/      # Static assets
└── server/          # Node.js + Express Backend
    ├── src/         # API routes and controllers
    ├── prisma/      # Database schema
    └── database/    # Local storage or history logs
```

## 📝 License
This project is for educational/demo purposes.
