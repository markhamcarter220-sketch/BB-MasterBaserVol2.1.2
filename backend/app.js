// Auto-wired Production Middleware (added by AI)
const express = require('express');
const rateLimiter = require('./middleware/rateLimiter');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/mongo');
require('dotenv').config();

connectDB();

const app = express();

app.use(express.json());
app.use(logger);
app.use(rateLimiter);

// ... Your routes here

// Error handler (last middleware)
app.use(errorHandler);

module.exports = app;
const path = require('path');

// Serve static files from frontend/dist
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Handle unknown routes by serving the frontend app
app.get('*', (req, res) => {
res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
