const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { readCsv, appendCsv, writeCsv } = require('./utils/csvDb');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Game State
let gameState = {
  periodId: "",
  timer: 60,
  history: [],
  manualResult: null // Set by Admin
};

// Generate initial Period ID
const generatePeriodId = () => {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, "");
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${date}${hours}${minutes}`;
};

gameState.periodId = generatePeriodId();
gameState.history = readCsv('history.csv').slice(0, 10);

// Result Logic
const getResultForNumber = (num) => {
  let color = [];
  if (num === 0) color = ["red", "violet"];
  else if (num === 5) color = ["green", "violet"];
  else if ([1, 3, 7, 9].includes(num)) color = ["green"];
  else color = ["red"];
  
  const size = num >= 5 ? "Big" : "Small";
  return { number: num, colors: color, size };
};

// Game Loop
setInterval(() => {
  gameState.timer--;

  if (gameState.timer <= 0) {
    // Generate Result
    const winningNumber = gameState.manualResult !== null 
      ? gameState.manualResult 
      : Math.floor(Math.random() * 10);
    
    const resultDetails = getResultForNumber(winningNumber);
    const result = {
      periodId: gameState.periodId,
      resultNumber: winningNumber,
      resultColor: resultDetails.colors.join('/'),
      size: resultDetails.size,
      timestamp: new Date().toISOString()
    };
    
    // Save to history.csv
    appendCsv('history.csv', result);
    
    // Broadcast
    io.emit('gameResult', {
        ...result,
        number: result.resultNumber,
        colors: resultDetails.colors
    });

    // Reset periodic state
    gameState.timer = 60;
    gameState.periodId = generatePeriodId();
    gameState.manualResult = null; // Clear manual result
  }

  io.emit('timerUpdate', {
    timer: gameState.timer,
    periodId: gameState.periodId
  });
}, 1000);

// --- AUTH ROUTES ---
app.post('/api/auth/signup', async (req, res) => {
    const { name, email, phone, password, upi_id, ifsc_code, bank_holder_name } = req.body;
    const users = readCsv('users.csv');
    
    if (users.find(u => u.email === email || u.phone === phone)) {
        return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        id: users.length + 1,
        name,
        email,
        phone,
        password: hashedPassword,
        balance: 1000, 
        upi_id,
        ifsc_code,
        bank_holder_name,
        role: 'USER'
    };

    appendCsv('users.csv', newUser);
    
    const token = jwt.sign({ id: newUser.id, role: newUser.role }, process.env.JWT_SECRET);
    const userToReturn = { 
        id: newUser.id, 
        name: newUser.name, 
        email: newUser.email,
        phone: newUser.phone,
        balance: newUser.balance, 
        role: newUser.role,
        upi_id: newUser.upi_id,
        ifsc_code: newUser.ifsc_code,
        bank_holder_name: newUser.bank_holder_name
    };
    
    res.json({ message: "Account created successfully", token, user: userToReturn });
});

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body; // 'email' holds whatever the user typed (identifier)
    const users = readCsv('users.csv');
    const user = users.find(u => u.email === email || u.phone === email);
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
    const userToReturn = { 
        id: user.id, 
        name: user.name, 
        email: user.email,
        phone: user.phone,
        balance: user.balance, 
        role: user.role,
        upi_id: user.upi_id,
        ifsc_code: user.ifsc_code,
        bank_holder_name: user.bank_holder_name
    };
    
    res.json({ token, user: userToReturn });
});

// Auth Middleware
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: "No token provided" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: "Invalid token" });
        req.userId = decoded.id;
        next();
    });
};

app.get('/api/auth/me', verifyToken, (req, res) => {
    const users = readCsv('users.csv');
    const user = users.find(u => u.id == req.userId);
    
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        phone: user.phone, 
        balance: user.balance, 
        role: user.role, 
        upi_id: user.upi_id,
        ifsc_code: user.ifsc_code,
        bank_holder_name: user.bank_holder_name
    });
});

// --- USER & ADMIN ROUTES ---
app.get('/api/history', (req, res) => {
    res.json(readCsv('history.csv').slice(-10).reverse());
});

app.post('/api/admin/set-result', verifyToken, (req, res) => {
    const { number } = req.body;
    gameState.manualResult = parseInt(number);
    res.json({ message: `Next result set to ${number}` });
});

app.get('/api/admin/users', verifyToken, (req, res) => {
    res.json(readCsv('users.csv'));
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Wingo Pro Server running on port ${PORT}`);
});
