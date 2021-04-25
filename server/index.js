const express = require('express')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const ObjectId = require("mongodb").ObjectId;
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json())

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ulzfk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const port =process.env.PORT || 5000;


app.get('/',(req,res)=>{
    res.send('Hello World');
})

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const productCollection = client.db("deshifood").collection("products");
  const orderCollection = client.db("deshifood").collection("orders");
 
  console.log('Database Connected!!!');
  
  //Insert Product
  app.post('/addProduct',(req,res)=>{
      const newProduct=req.body;
      console.log('Adding new Product',newProduct);
      productCollection.insertOne(newProduct).then(result =>{
          res.send(result.insertedCount>0)
      })

  })

  //Get All Products
  app.get('/products',(req,res)=>{
    productCollection.find()
    .toArray((err,items)=>{
        res.send(items);
    })
  })

  //Delete one product by ID
  app.delete("/deleteProduct/:id", (req, res) => {
    console.log("id:", req.params.id)

    productCollection.deleteOne({ _id: ObjectId(req.params.id) })
        .then((result) => {
            console.log(result);
            res.send(result.deletedCount > 0)
        })
})

//Get Single Product By ID

app.get('/getProduct/:_id', (req, res) => {
    productCollection
      .find({ _id: ObjectId(req.params._id) })
      .toArray((err, documents) => {
        res.send(documents[0]);
      });
  });


  //Create New Order 
   
    app.post('/addOrder', (req, res) => {
        const newOrder = req.body;
        orderCollection.insertOne(newOrder).then((result) => {
          res.send(result.insertedCount > 0);
        });
      });

 
   // Show Order for login user (Read)
   app.get('/userOrders', (req, res) => {
    // console.log(req.query.email)
    orderCollection
      .find({ email: req.query.email })
      .toArray((err, documents) => {
        res.send(documents);
      });
  });










});


app.listen(port,()=>console.log('Listening to port 5000'))