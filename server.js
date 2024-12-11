const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
const path = require('path');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));
app.use((req, res, next) => {
    console.log(`Request for: ${req.url}`);
    next();
});
app.use('/api', (req, res, next) => {
    if (req.url.endsWith('.css') || req.url.endsWith('.js') || req.url.includes('images/')) {
        const filePath = path.join(__dirname, req.url);
        console.log(`Attempting to serve file from: ${filePath}`);
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error(`Error serving file: ${err}`);
                res.status(404).end();
            }
        });
    } else {
        next();
    }
});

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.redirect('/login');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.redirect('/login');
        }
        req.user = user;
        next();
    });
}

app.post('/signup', async (req, res) => {
    try {
        const { email, username, password } = req.body;

        const [existingUsers] = await pool.query(
            'SELECT * FROM users WHERE email = ? OR username = ?',
            [email, username]
        );

        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'Kupal ka boss'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await pool.query(
            'INSERT INTO users (email, username, password) VALUES (?, ?, ?)',
            [email, username, hashedPassword]
        );

        const token = jwt.sign({ userId: result.insertId }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'User created successfully', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Unexpected signup error.' });
    }
});
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const [users] = await pool.query(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );

        if (users.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const user = users[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token, isAdmin: user.isAdmin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred during login' });
    }
});


app.get('*', (req, res) => {
    const filePath = path.join(__dirname, req.url + '.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).sendFile(path.join(__dirname, 'index.html'));
        }
    });
});
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});
app.get('/menu', authenticateToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'Menu.html'));
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Server root directory: ${__dirname}`);
});



s