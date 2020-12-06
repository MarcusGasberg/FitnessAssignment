const Highscore = require("../models/highscore");

function list(req, res) {
    Highscore
        .find({})
        .sort({rank: 1})
        .exec((err, result) => {
            if (err) {
                return res.status(400).json(err);
            } else {
                return res.status(200).json(result);
            }
        });
}

// Note: should use a transaction, but that requires a replicaset
async function create(req, res) {
    let score = req.body.score;
    let name = req.body.name;
    if (!score || !name) {
        return res.status(404).json({message: 'Not found, score and name required'});
    }
    let count = await Highscore
        .find({score: {$gte: score}})
        .countDocuments((err) => {
            if (err) {
                return res.status(400).json({message: err.message});
            }
        });
    let newRank = count + 1;
    let newHighscore = new Highscore({
        rank: newRank,
        name: name,
        score: score
    });
    await newHighscore.save((err) => {
        if (err) {
            return res.status(400).json({message: err.message});
        } else {
            Highscore.updateMany(
                {score: {$lt: score}},
                {$inc: {rank: 1}},
                (err) => {
                    if (err) {
                        return res.status(400).json({message: err.message});
                    }
                }
            );
        }
    });
    return res.status(201).json(newRank);
}

module.exports = {
    list: list,
    create: create
};
