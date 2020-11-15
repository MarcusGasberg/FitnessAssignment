const exercise = require("../models/exercise"),
  Workout = require("../models/workout"),
  Exercise = exercise.Exercise;

function listWorkoutsByUsername(req, res, next) {
  let username = req.params.username;
  if (!username) {
    res.status(404).json({message: "Not found, username required"});
    next();
  }

  Workout.find({username: username}).exec((err, programs) => {
    if (err) {
      return res.status(400).json(err);
    } else {
      return res.status(200).json(programs);
    }
  });
}

function createWorkout(req, res, next) {
  let workoutName = req.body.name;
  let username = req.body.username;
  if (!workoutName || !username) {
    res
      .status(404)
      .json({message: "Not found, workout name and username required"});
    next();
  }

  let workout = new Workout({
    name: workoutName,
    username: username,
    comment: req.body.comment,
    exercises: req.body.exercises
  });
  workout.save((err, result) => {
    if (err) {
      return res.status(400).json(err);
    } else {
      return res.status(201).json(result);
    }
  });
}

function deleteWorkout(req, res) {
  let workoutId = req.params.workoutId;
  if (!workoutId) {
    res.status(404).json({message: "Not found, workout id required"});
    return;
  }

  Workout.deleteOne({_id: workoutId}).exec((err, _) => {
    if (err) {
      return res.status(400).json(err);
    } else {
      return res.status(200).json();
    }
  });
}

module.exports = {
  listWorkoutsByUsername: listWorkoutsByUsername,
  createWorkout: createWorkout,
  deleteWorkout: deleteWorkout
};
