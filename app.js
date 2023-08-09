const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors());
// Replace with your MongoDB connection string
const uri = 'mongodb+srv://eliaf2:fVkqoLNpokzqO65F@moviles.xddr9.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/rutas', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('incidentes');
    const collection = database.collection('Rutas');

    const documents = await collection.find().toArray();
    res.json(documents);
  } catch (error) {
    console.error('Error retrieving documents:', error);
    res.status(500).send('Error retrieving documents');
  }
});

app.get('/incidentes', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('incidentes');
    const collection = database.collection('incidentes');

    const documents = await collection.find().toArray();
    res.json(documents);
  } catch (error) {
    console.error('Error retrieving documents:', error);
    res.status(500).send('Error retrieving documents');
  }
});

app.post('/incidentes', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('incidentes');
    const collection = database.collection('incidentes');

    const newIncident = req.body;
    const result = await collection.insertOne(newIncident);

    res.json(result);
  } catch (error) {
    console.error('Error adding incident:', error);
    res.status(500).send('Error adding incident');
  }
});

app.get('/latest', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('incidentes');
    const collection = database.collection('incidentes');

    const documents = await collection
      .find()
      .sort({ _id: -1 }) // Sort in reverse order by _id (assuming _id is a timestamp)
      .limit(10) // Limit to the last 10 documents
      .toArray();

    res.json(documents);
  } catch (error) {
    console.error('Error retrieving documents:', error);
    res.status(500).send('Error retrieving documents');
  }
});





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});