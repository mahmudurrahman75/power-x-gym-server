const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pjh6q.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 4000;

app.get('/', (req, res) => {
    res.send("HI,power x-xm developer from db it's working working")
})



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
client.connect(err => {
  const ClassesCollection = client.db("power-xym").collection("classesIteam");
  const ShipmentCollection = client.db("power-xym").collection("shipmentInfo");

// all classes data adding 

app.post('/allClasesDataAdd', (req, res) => {
    const classes = req.body;
    ClassesCollection.insertMany(classes)
    .then(result =>{
        res.send(result.insertedCount > 0)
        
    })
})

// shipment 
app.post('/shipmentInfoAdd', (req, res) => {
    const shipment = req.body;
    ShipmentCollection.insertOne(shipment)
    .then(result =>{
        res.send(result.insertedCount > 0)
        
    })
})


// load data 

app.get('/allDataRecive', (req, res) => {
    ClassesCollection.find({})
    .toArray( (err , document) => {
        res.send(document);
    })
})




});




app.listen(process.env.PORT || port);