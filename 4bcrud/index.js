const dbConnect = require('./mongodb'); // Import the database connection
const express = require('express');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// GET API - Fetch all profiles
app.get('/', async (req, res) => {
    try {
        const db = await dbConnect(); // Establish database connection
        const result = await db.find().toArray(); // Fetch all data from the collection
        res.status(200).send(result); // Send response with the fetched result
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Internal Server Error' }); // Handle internal server errors
    }
});

// GET API - Fetch a profile by name
app.get('/:name', async (req, res) => {
    try {
        const db = await dbConnect(); // Establish database connection
        const { name } = req.params; // Get the name from URL parameters
        const result = await db.findOne({ name: name }); // Find a document by name in the collection

        if (!result) {
            return res.status(404).send({ message: 'Profile not found' }); // Handle case where no profile is found
        }

        res.status(200).send(result); // Send the profile data
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).send({ message: 'Internal Server Error' }); // Handle internal server errors
    }
});

// POST API - Create a new profile
app.post('/', async (req, res) => {
    try {
        const db = await dbConnect(); // Establish database connection
        const newProfile = req.body; // Get data from the request body

        // Validation: Ensure required fields are provided
        if (!newProfile.name || !newProfile.email || !newProfile.city) {
            return res.status(400).send({ message: 'All fields (name, email, city) are required.' });
        }

        const result = await db.insertOne(newProfile); // Insert a new document into the collection
        res.status(201).send({ message: 'Profile created', id: result.insertedId }); // Send success response with inserted ID
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).send({ message: 'Internal Server Error' }); // Handle internal server errors
    }
});

// PUT API - Update an existing profile by name
app.put('/:name', async (req, res) => {
    try {
        const db = await dbConnect(); // Establish database connection
        const { name } = req.params; // Get the name from URL parameters
        const updatedProfile = req.body; // Get updated data from the request body

        // Update the profile in the database by name
        const result = await db.updateOne(
            { name: name }, // Find the document by name
            { $set: updatedProfile } // Set the updated fields
        );

        if (result.matchedCount === 0) {
            return res.status(404).send({ message: 'Profile not found' }); // Handle case where no profile matches the name
        }

        res.status(200).send({ message: 'Profile updated successfully' }); // Send success response
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).send({ message: 'Internal Server Error' }); // Handle internal server errors
    }
});

// DELETE API - Delete a profile by name
app.delete('/:name', async (req, res) => {
    try {
        const db = await dbConnect(); // Establish database connection
        const { name } = req.params; // Get the name from URL parameters

        // Delete the profile from the database by name
        const result = await db.deleteOne({ name: name });

        if (result.deletedCount === 0) {
            return res.status(404).send({ message: 'Profile not found' }); // Handle case where no profile matches the name
        }

        res.status(200).send({ message: 'Profile deleted successfully' }); // Send success response
    } catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).send({ message: 'Internal Server Error' }); // Handle internal server errors
    }
});

// 404 Error Handler for undefined routes
app.use((req, res) => {
    res.status(404).send({ message: 'Route not found' });
});

// Start the server
const PORT = 3005; // Define port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Log the server start
});
