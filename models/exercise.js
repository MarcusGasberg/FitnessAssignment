const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    name: String,
    description: String,
    sets: Number,
    repetitions: Number
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = {
    Exercise:Exercise,
    ExerciseSchema: ExerciseSchema
}