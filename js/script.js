const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://Cloud-resume-challenge:M191VLsBir5YvVWx@cloud-resume-challenge.62zy35f.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

// Middleware to parse JSON data
app.use(express.json());

// Connect to MongoDB
async function connectToDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas!");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
  }
}

connectToDB();

// Define a route to handle the button click and increment the counter
let clickCount = 0;
app.post('/increment', async (req, res) => {
  try {
    clickCount++;

    // Save the click count to the MongoDB database
    const db = client.db("Cloud-resume-challenge-Database");
    const collection = db.collection("Cloud-resume-challenge-view-count");
    await collection.updateOne({}, { $set: { count: clickCount } }, { upsert: true });

    res.json({ count: clickCount });
  } catch (error) {
    console.error("Error incrementing the count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Use Express.js to serve the index.html file.
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});






