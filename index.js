require('dotenv').config();
const express = require('express');
const server = express();
const mongoose = require('mongoose');
const cors = require('cors');
const path=require('path');
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');

console.log('env',process.env.DB_PASSWORD);

//db connection
main().catch(err => console.log(err));

async function main() {
  try{
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Database connceted');
  }catch(err){
    console.log(err);
  }
  
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// Middleware
server.use(cors());
server.use(express.json()); // bodyParser
server.use(express.static(path.resolve(__dirname,process.env.PUBLIC_DIR))); //static hosting
server.use('/products',productRouter.router);
server.use('/users',userRouter.router);
//integrating the frontend and the backend
server.use('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'build','index.html'));
})

server.listen(process.env.PORT, ()=>{
  console.log('server stared')
});