const dns = require("node:dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

// ... rest of your code starts here ...
require("dotenv").config();

require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  family: 4
});

const connectToMongoDB = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

const getConnectedClient = () => client;

module.exports = { connectToMongoDB, getConnectedClient };