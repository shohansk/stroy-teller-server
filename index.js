const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const ObjectId = require('mongodb').ObjectID;

const port= 8000;


const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nug9z.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const bookCollection = client.db("book-shop").collection("books");
  const ordersCollection = client.db("book-shop").collection("orders");
  console.log('database connected');


  app.post('/addEvent' ,(req,res) => {
    const newEvent = req.body;
    console.log('adding new evnt',newEvent);
    bookCollection.insertOne(newEvent)
    .then(result => {
        console.log(result.insertedCount);
        res.send(result.insertedCount > 0)
        
     
        
    })
}) 

app.get('/event' , (req,res) =>{

  bookCollection.find()
  .toArray((err,items) => {
      res.send(items)
      
  })
})


app.get('/orders' , (req,res) =>{

  ordersCollection.find()
  .toArray((err,items) => {
      res.send(items)
      
  })
})

app.delete('/delete/:id', (req,res) => {
  bookCollection.deleteOne({_id:ObjectId( req.params.id)})
  .then((result)=> {
   
  })
})


app.post('/addOrder', (req,res) => {
        
  const order =req.body;

  
 ordersCollection.insertOne(order)
  .then(result => {
      console.log(result.insertedCount);
      res.send(result.insertedCount > 0)
  })
  

})

  
});
app.use(cors());
app.use(express.json());




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT|| port)