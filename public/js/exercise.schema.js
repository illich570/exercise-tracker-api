const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  userId: { type: Number, ref: 'User', required: true},
  description: { type: String, required: true},
  duration: { type: Number, required: true},
  date: { type: Date}
});

const ExerciseModel = mongoose.model('Exercise',exerciseSchema);

module.exports = ExerciseModel;