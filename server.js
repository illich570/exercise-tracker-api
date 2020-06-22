require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const UserModel = require('./public/js/user.schema');
const ExerciseModel = require('./public/js/exercise.schema');

const Server = express();

Server.use(express.static('public'));
Server.use(cors());
Server.use(bodyParser.json());
Server.use(bodyParser.urlencoded({extended: true}));

const getLastUserId = async () => {
  return await UserModel.find({}).sort({ _id: -1 }).limit(1).select('-_id');
 };

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, (err) => {
  err
    ? console.log("Error on connection")
    : console.log("Connected Sucessfully");
});

Server.get('/',(req,res) =>{
  res.sendFile(__dirname + '/public/views/index.html');
});

Server.post('/api/exercise/new-user',(req,res) =>{
  res.send(200)
})

Server.post('/api/exercise/add',(req,res) =>{
  res.send(200)
})

Server.get('/api/exercise/log',(req,res) =>{
  res.send(200)
})

Server.listen(process.env.PORT || 3000, function () {
  console.log("Express listening on port: " + this.address().port);
});

