// JS code for visitor counter
// const counter = document.querySelector(".counter-number");

// async function updateCounter() {
//     try {
//         let response = await fetch("https://gcvbryl5r4exmiel6oba4r6ql40ktdqx.lambda-url.us-east-1.on.aws/");
//         let data = await response.json();

//         if (data && data['Visit_Count']) {
//             var visitCount = data['Visit_Count'];
//             counter.innerHTML = `Views: ${visitCount}`;
//         } else if (data && data['error']) {
//             var errorMessage = data['error'];
//             document.getElementById('counter-error').innerHTML = errorMessage;
//         } else {
//             document.getElementById('counter-error').innerHTML = 'Unknown error occurred.';
//         }
//     } catch (error) {
//         console.error("Error:", error);
//         document.getElementById('counter-error').innerHTML = 'Error occurred while fetching counter data.';
//     }
// }

// updateCounter();

// JS code version 2
// JS code for visitor counter
// const counter = document.getElementById("Views");

// async function updateCounter() {
//     try {
//         let response = await fetch("https://gcvbryl5r4exmiel6oba4r6ql40ktdqx.lambda-url.us-east-1.on.aws/");
//         let data = await response.json();

//         if (data && data['Visit_Count']) {
//             var visitCount = data['Visit_Count'];
//             counter.innerHTML = visitCount;
//         } else if (data && data['error']) {
//             var errorMessage = data['error'];
//             console.error("Error:", errorMessage);
//         } else {
//             console.error("Unknown error occurred.");
//         }
//     } catch (error) {
//         console.error("Error:", error);
//     }
// }

// updateCounter();

// JS code version 3 - works!
// async function updateCounter() {
//     try {
//       let response = await fetch("https://gcvbryl5r4exmiel6oba4r6ql40ktdqx.lambda-url.us-east-1.on.aws/");
//       let data = await response.json();
  
//       if (data && data['Visit_Count']) {
//         var visitCount = data['Visit_Count'];
//         document.getElementById('counter').textContent = visitCount;
//       } else {
//         console.error("Unknown error occurred.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   }
  
//   updateCounter();  


// // MongoDB atlas connection string
// mongodb+srv://Cloud-resume-challenge:<password>@cloud-resume-challenge.62zy35f.mongodb.net/?retryWrites=true&w=majority
// // Mongodb atlas code sample
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://Cloud-resume-challenge:M191VLsBir5YvVWx@cloud-resume-challenge.62zy35f.mongodb.net/?retryWrites=true&w=majority";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

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
