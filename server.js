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
  const id = await UserModel.find({}).sort({ _id: -1 }).limit(1).select('_id');
  return id[0]._id +1
 };

const getExercisesFromUser = async (id) => {
  const data = await ExerciseModel.find({}).populate(id);
  return data;
}

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  err
    ? console.log("Error on connection")
    : console.log("Connected Sucessfully");
});

Server.get('/',(req,res) =>{
  res.sendFile(__dirname + '/public/views/index.html');
});

Server.post('/api/exercise/new-user', async (req,res) =>{
  const id = await getLastUserId();
  const User = new UserModel({_id: id, username: req.body.userValue});
  const response = await User.save();
  console.log(response);
  res.sendStatus(200);
})

Server.post('/api/exercise/add',async (req,res) =>{
  const Exercise = new ExerciseModel({
    userId: req.body.userId,
    description: req.body.description,
    duration: req.body.duration,
    date: req.body.date
  });
  const response = await Exercise.save();
  console.log(response);
  res.sendStatus(200)
})

Server.get('/api/exercise/log',async (req,res) =>{
  const { userId } = req.query;
  const log = await getExercisesFromUser(userId);
  console.log(log);
  res.json(log);
})

Server.get('/api/users',async (req,res) =>{
  const data = await UserModel.find({});
  res.json(data).status(200);
})


Server.listen(process.env.PORT || 3000, function () {
  console.log("Express listening on port: " + this.address().port);
});

