
const dotenv = require('dotenv');
dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'development';
const isProd = NODE_ENV === 'production';

const oddsApiKey = process.env.ODDS_API_KEY;

if (isProd && (!oddsApiKey || oddsApiKey === 'DUMMY_KEY')) {
  console.error('[FATAL] Missing or invalid ODDS_API_KEY in production.');
  process.exit(1);
}

const config = {
  nodeEnv: NODE_ENV,
  port: process.env.PORT || 4000,

  oddsApiKey: oddsApiKey || 'DUMMY_KEY',

  betterBetsApiKey: process.env.BETTERBETS_API_KEY || null,

  corsOrigins: (process.env.CORS_ORIGINS || 'http://localhost:4000')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean),
};

module.exports = config;
