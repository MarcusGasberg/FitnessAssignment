const mongoose = require("mongoose");

const exercise = require("../models/exercise"),
  Program = require("../models/program"),
  Exercise = exercise.Exercise;

function list(req, res) {
  Program.find({}).exec((err, programs) => {
    if (err) {
      return res.status(400).json(err);
    } else {
      return res.status(200).json(programs);
    }
  });
}

function listByUsername(req, res, next) {
  let username = req.params.username;
  if (!username) {
    res.status(404).json({message: "Not found, username required"});
    next();
  }

  Program.find({username: username}).exec((err, programs) => {
    if (err) {
      return res.status(400).json(err);
    } else {
      return res.status(200).json(programs);
    }
  });
}

function create(req, res, next) {
  let programName = req.body.name;
  let username = req.body.username;
  if (!programName || !username) {
    res
      .status(404)
      .json({message: "Not found, program name and username required"});
    next();
  }

  let program = new Program({
    name: programName,
    username: username,
  });

  program.save((err, result) => {
    if (err) {
      return res.status(400).json(err);
    } else {
      return res.status(201).json(result);
    }
  });
}

function updateProgram(req, res) {
  let programId = req.params.programId;
  if (!programId) {
    res.status(404).json({message: "Not found, program id required"});
    next();
  }

  let programUpdate = new Program({
    _id: req.body.id,
    name: req.body.name,
    username: req.body.username,
    exercises: req.body.exercises,
  });

  Program.findByIdAndUpdate(programId, programUpdate, {useFindAndModify: false}).exec((err) => {
    if (err) {
      return res.status(400).json(err);
    } else {
      return res.status(200).json();
    }
  });
}

function deleteProgram(req, res, next) {
  let programId = req.params.programId;
  if (!programId) {
    res.status(404).json({message: "Not found, username required"});
    return;
  }

  Program.deleteOne({_id: programId}).exec((err, _) => {
    if (err) {
      return res.status(400).json(err);
    } else {
      return res.status(200).json();
    }
  });
}

function createExercise(req, res, next) {
  let programId = req.params.programId;
  if (!programId) {
    res.status(404).json({message: "Not found, program id required"});
    next();
  }

  let exercise = new Exercise({
    name: req.body.name,
    description: req.body.description,
    sets: req.body.sets,
    repsOrTime: req.body.repsOrTime,
  });

  Program.findById(programId).exec((err, program) => {
    if (err) {
      return res.status(400).json(err);
    } else {
      program.exercises.push(exercise);
      program.save((err, result) => {
        if (err) {
          return res.status(400).json(err);
        } else {
          return res.status(201).json(result);
        }
      });
    }
  });
}

function deleteExercise(req, res, next) {
  let programId = req.params.programId;
  let exerciseId = req.params.exerciseId;
  if (!programId || !exerciseId) {
    res.status(404).json({message: "Not found, program and exercise id's required"});
    next();
  }

  Program.update(
    {"_id": programId},
    {"$pull": {"exercises": {"_id": exerciseId}}},
    function (err) {
      if (err) {
        return res.status(400).json(err);
      } else {
        return res.status(204).json();
      }
    }
  );
}

module.exports = {
  list: list,
  listByUsername: listByUsername,
  create: create,
  update: updateProgram,
  delete: deleteProgram,
  createExercise: createExercise,
  deleteExercise: deleteExercise,
};
