const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
const exercise = require("../models/exercise"),
    ExerciseSchema = exercise.ExerciseSchema;

const ProgramSchema = new Schema({
    name: { type: String, required: true },
    exercises: [ExerciseSchema]
});

const Program = mongoose.model("Program", ProgramSchema);

module.exports = Program;