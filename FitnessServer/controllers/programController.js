const mongoose = require("mongoose"),
    exercise = require("../models/exercise"),
    Program = require("../models/program"),
    Exercise = exercise.Exercise;

function list(req, res) {
    Program.find({}).exec((err, programs) => {
        if (err) {
            return res
                .status(500)
                .json({
                    message: `Error fetching programs: ${err.message}`
                });
        } else {
            return res.status(200).json(programs);
        }
    });
}

function find(req, res) {
    res.render("find", {
        error: "",
        locals: {
            user: req.user,
        },
    });
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
        handleError(err, res);
    }
}

function add(req, res) {
    res.render("add", {
        locals: {
            user: req.user,
        },
    });
}

async function create(req, res) {
    try {
        let program = new Program({name: req.body.fname});

        await program.save();

        console.log(`created program ${program.name}`);

        res.render("edit", {
            programName: program.name,
            locals: {
                user: req.user,
            },
        });
    } catch (err) {
        console.log(err);
        handleError(err, res);
    }
}

function edit(req, res) {
    res.render("edit", {
        programName: req.params.name,
        locals: {
            user: req.user,
        },
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
        handleError(err, res);
    }
}

function handleError(res, err) {
    return res.status(400).send({message: err});
}

module.exports = {
    list: list,
    find: find,
    show: show,
    add: add,
    create: create,
    edit: edit,
    update: update,
};
