const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config()

// Create an Express application
const app = express();
app.use(express.json());

// MongoDB connection URI
const mongoURI = process.env.URI;
const dbName = 'Event';

// Define the API endpoints
//gets an event by its unique id
app.get('/api/v3/app/events/:id', async (req, res) => {
    try {
        const event_id = req.params.id;
        const query = event_id ? { _id: new ObjectId(event_id) } : {};

        const client = await MongoClient.connect(mongoURI);
        const db = client.db(dbName);

        const events = await db.collection('events').find(query).toArray();

        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
//get all the event
app.get('/api/v3/app/events/', async (req, res) => {
    try {
        const limit = 5;
        const page = 1;
        const query = { type: 'event' };
        const client = await MongoClient.connect(mongoURI);
        const db = client.db(dbName);

        const events = await db.collection('events')
            .find(query)
            .limit(limit)
            .skip((page - 1) * limit)
            .toArray();

        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
//create a event
app.post('/api/v3/app/events', async (req, res) => {
    try {
        const eventData = req.body;

        const client = await MongoClient.connect(mongoURI);
        const db = client.db(dbName);

        const result = await db.collection('events').insertOne(eventData);

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
//update the event
app.put('/api/v3/app/events/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        const eventData = req.body;

        const client = await MongoClient.connect(mongoURI);
        const db = client.db(dbName);

        const result = await db.collection('events')
            .updateOne({ _id: new ObjectId(eventId) }, { $set: eventData });

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
//delete the event
app.delete('/api/v3/app/events/:id', async (req, res) => {
    try {
        const eventId = req.params.id;

        const client = await MongoClient.connect(mongoURI);
        const db = client.db(dbName);

        const result = await db.collection('events')
            .deleteOne({ _id: new ObjectId(eventId) });

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
