const mongoose = require('mongoose');
const logger = require('../utils/logger');

/**
 * Establish a connection to MongoDB using Mongoose. The connection URI is
 * taken from the MONGO_URI environment variable, or falls back to a
 * reasonable default for local development. Returns a promise that
 * resolves when the connection is successful or rejects on error.
 */
async function connectDb() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/betterbets';
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info(`Connected to MongoDB at ${uri}`);
  } catch (err) {
    logger.error('MongoDB connection error', err);
    throw err;
  }
}

module.exports = connectDb;