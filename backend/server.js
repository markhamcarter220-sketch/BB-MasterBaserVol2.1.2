require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');
const logger = require('./utils/logger');
const connectDB = require('./config/mongo');

const PORT = process.env.PORT || 8080;

async function startServer() {
  try {
    await connectDB();
    const server = http.createServer(app);
    server.listen(PORT, () => {
      logger.info(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    logger.error('Server failed to start:', err);
    process.exit(1);
  }
}

startServer();