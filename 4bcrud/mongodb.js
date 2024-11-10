const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017";
const databaseName = 'Student'; // Name of your database
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true }); // MongoClient options

// Function to connect to the database and return the 'profile' collection
const dbConnect = async () => {
    try {
        // Connect to the MongoDB server
        await client.connect();
        console.log("Connected to MongoDB");

        // Access the 'Student' database and return the 'profile' collection
        const db = client.db(databaseName);
        return db.collection('profile');
    } catch (error) {
        console.error('Database connection error:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
};

// Gracefully close the MongoDB client when the Node.js process exits
process.on('SIGINT', async () => {
    await client.close();
    console.log("MongoDB connection closed");
    process.exit(0);
});

module.exports = dbConnect; // Export the dbConnect function
