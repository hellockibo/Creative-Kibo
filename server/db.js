const { MongoClient } = require('mongodb');

let client;
let database;

async function getDatabase() {
  if (database) return database;

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not configured in server/.env');
  }

  client = new MongoClient(process.env.MONGODB_URI, {
    tls: true,
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
    maxPoolSize: 5,
  });
  await client.connect();
  database = client.db(process.env.MONGODB_DB_NAME || 'kibo');
  await database.collection('portfolio_projects').createIndex({ created_at: -1 });
  return database;
}

module.exports = { getDatabase };
