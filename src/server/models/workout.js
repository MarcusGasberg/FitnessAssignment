const mongoose = require("mongoose"),
  exercise = require("../models/exercise"),
  Schema = mongoose.Schema,
  ExerciseSchema = exercise.ExerciseSchema;

const WorkoutSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  comment: String,
  exercises: [ExerciseSchema]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
