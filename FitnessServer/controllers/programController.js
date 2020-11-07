const mongoose = require("mongoose"),
    exercise = require("../models/exercise"),
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
    })
}

async function show(req, res) {
    try {
        let program = await Program.findOne({name: req.body.fname}).exec();

        if (program) {
            res.render("list", {
                title: "Program",
                programs: [program],
                locals: {
                    user: req.user,
                },
            });
        } else {
            res.render("find", {
                error: "Program does not exist ",
                locals: {
                    user: req.user,
                },
            });
        }
    } catch (err) {
        console.log(err);
    }
}

function create(req, res, next) {
    let programName = req.body.name;
    let username = req.body.username;
    if (!programName || !username) {
        res.status(404).json({message: "Not found, program name and username required"});
        next();
    }

    let program = new Program({
        name: programName,
        username: username
    });

    program.save((err, result) => {
        if (err) {
            return res.status(400).json(err);
        } else {
            return res.status(201).json(result);
        }
    });
}

async function update(req, res) {
    try {
        let programName = req.body.fprogramName;
        let exercise = new Exercise({
            name: req.body.fname,
            description: req.body.fdesc,
            sets: req.body.fsets,
            repsOrTime: req.body.frepsOrTime,
        });

        let program = await Program.findOne({name: programName}).exec();
        program.exercises.push(exercise);
        await program.save();

        console.log(`added exercise ${exercise.name} to ${programName}`);
        res.render("edit", {
            programName: programName,
            locals: {
                user: req.user,
            },
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    list: list,
    listByUsername: listByUsername,
    show: show,
    create: create,
    update: update,
};
