const mongoose = require('mongoose');
const { mongoUri } = require('./env');

async function connectDatabase() {
  if (!mongoUri) throw new Error('MONGODB_URI is not configured');
  await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 10000,
    maxPoolSize: 10,
    autoIndex: process.env.NODE_ENV !== 'production',
  });
}

module.exports = { connectDatabase };
