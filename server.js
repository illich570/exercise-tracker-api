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

const getUsernameById = async (id) =>{
  const user = await UserModel.findOne({_id : id}).select('username -_id');
  return user.username;
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
  res.status(200).json({_id: response._id, username: response.username});
})

Server.post('/api/exercise/add',async (req,res) =>{
  const date = req.body.date == '' ? new Date(): new Date(req.body.date);
  const Exercise = new ExerciseModel({
    userId: req.body.userId,
    description: req.body.description,
    duration: +req.body.duration,
    date: date.toString()
  });
  const response = await Exercise.save();
  const redata = await UserModel.find({_id: req.body.userId}); 
  const data = {
    ...response,
    description: req.body.description,
    duration: +req.body.duration,
    date: date.toString()
  }
  res.status(200).json(response);
})

Server.get('/api/exercise/log',async (req,res) =>{
  const { userId, from, to, limit } = req.query;
  let log = await getExercisesFromUser(userId);

  if(from){
    const fromDate = new Date(from);
    log = log.filter(el => new Date(el.date) > fromDate);
  }

  if(to){
    const toDate = new Date(to);
    log = log.filter(el => new Date(el.date) < toDate);
  }
  if(limit){
    log = log.slice(0,+limit);
  }

  res.json({
    _id: userId,
    username: await getUsernameById(userId),
    count: log.length,
    log
  })
})

Server.get('/api/exercise/users',async (req,res) =>{
  const data = await UserModel.find({});
  res.json(data).status(200);
})


Server.listen(process.env.PORT || 3000, function () {
  console.log("Express listening on port: " + this.address().port);
});

