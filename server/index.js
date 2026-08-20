const path = require('path');

// Load environment variables from server/.env
require('dotenv').config({
  path: path.resolve(__dirname, '.env')
});

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth');
const portfolioRoutes = require('./routes/portfolio');

const app = express();

const PORT = process.env.PORT || 5000;

// --------------------------------------------------
// CHECK ENVIRONMENT VARIABLES
// --------------------------------------------------

console.log('----------------------------------------');
console.log('KIBO Backend Starting...');
console.log('PORT:', PORT);
console.log('----------------------------------------');


// --------------------------------------------------
// MIDDLEWARE
// --------------------------------------------------

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error('Origin is not allowed by the portfolio API'));
    },
    credentials: true
  })
);


// --------------------------------------------------
// ROUTES
// --------------------------------------------------

app.use('/api/auth', authRoutes);

app.use('/api/portfolio', portfolioRoutes);


// --------------------------------------------------
// HEALTH CHECK
// --------------------------------------------------

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date()
  });
});


// --------------------------------------------------
// API ERROR HANDLER
// --------------------------------------------------

app.use((err, req, res, next) => {
  console.error('API error:', err);

  if (res.headersSent) return next(err);
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ error: 'Media files must be 100 MB or smaller' });
  }
  res.status(500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
});


// --------------------------------------------------
// START SERVER
// --------------------------------------------------

if (require.main === module) {
  app.listen(PORT, () => {
    console.log('');
    console.log('========================================');
    console.log(`KIBO Backend running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
    console.log('========================================');
  });
}

module.exports = app;