const mongoose = require("mongoose"),
    exercise = require("../models/exercise"),
    Schema = mongoose.Schema,
    ExerciseSchema = exercise.ExerciseSchema;

const ProgramSchema = new Schema({
    name: { type: String, required: true, unique: true },
    username: {type: String, required: true },
    exercises: [ExerciseSchema]
});

const Program = mongoose.model("Program", ProgramSchema);

module.exports = Program;
