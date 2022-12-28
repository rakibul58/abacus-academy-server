const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const { query } = require('express');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const port = process.env.PORT || 5000;

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bebjeyw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {

    try {
        // collections
        const coursesCollection = client.db("abacusAcademy").collection("courses");
        const videosCollection = client.db("abacusAcademy").collection("videos");
        const usersCollection = client.db("abacusAcademy").collection("users");
        const enrollCollection = client.db("abacusAcademy").collection("enroll");


        // get enrolled 
        app.get('/enroll', async (req, res) => {
            const email = req.query.email;
            const query = {email};
            const result = await enrollCollection.find(query).toArray();
            res.send(result);
        });

        // add enroll 
        app.post('/enroll', async (req, res) => {
            const enroll = req.body;
            const email = enroll.email;
            const id = enroll.id;
            const query = { email, id };
            const result = await enrollCollection.findOne(query);
            if (result) {
                res.send({ available: true });
            }
            else {
                const result = await enrollCollection.insertOne(enroll);
                res.send(result);
            }

        });


        // get  user
        app.get('/users', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const result = await usersCollection.findOne(query);
            res.send(result);
        });

        // add users 
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);
        });

        //for student
        app.get('/users/student/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email };
            const user = await usersCollection.findOne(query);
            res.send({ isStudent: user?.role === 'student' });
        });

        // for teacher 
        app.get('/users/teacher/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email };
            const user = await usersCollection.findOne(query);
            res.send({ isTeacher: user?.role === 'teacher' });
        });


        // //get all courses/products

        app.get('/allcourses', async (req, res) => {

            const query = {};
            const result = await coursesCollection.find(query).toArray();
            res.send(result);

        });

        //fetch a course by id
        app.get('/courses/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await coursesCollection.findOne(query);
            res.send(result);
        });
        //fetch courses by email
        app.get('/courses', async (req, res) => {
            const email = req.query.email;
            console.log(email);
            const query = { email: email };
            const result = await coursesCollection.find(query).toArray();
            res.send(result);
        });


        // course post

        app.post('/courses', async (req, res) => {
            const course = req.body;
            const result = await coursesCollection.insertOne(course);
            res.send(result);
        });

        // course delete

        app.delete('/courses/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await coursesCollection.deleteOne(query);
            res.send(result);
        });

        app.get('/videos/:id', async (req, res) => {
            const id = req.params.id;
            const query = { course_id: id }
            const result = await videosCollection.find(query).toArray();
            res.send(result);
        });

        // video post
        app.post('/videos', async (req, res) => {
            const course = req.body;
            const result = await videosCollection.insertOne(course);
            res.send(result);
        });

        // video delete
        app.delete('/videos/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await videosCollection.deleteOne(query);
            res.send(result);
        });


    }
    finally {

    }

}

run().catch(err => console.error(err));


app.get('/', async (req, res) => {
    res.send('Abacus Academy server is running')
});

app.listen(port, () => {
    console.log(`Abacus Academy Server is running on ${port}`);
});