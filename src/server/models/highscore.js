const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HighscoreSchema = new Schema({
    rank: {type: Number, default: 0},
    name: {type: String, required: true},
    score: {type: Number, required: true}
});

const Highscore = mongoose.model("Highscore", HighscoreSchema);

module.exports = Highscore;
