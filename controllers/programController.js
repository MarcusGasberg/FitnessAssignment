const mongoose = require("mongoose"),
    exercise = require("../models/exercise"),
    Program = require("../models/program"),
    Exercise = exercise.Exercise;


async function list(req, res) {
    try {
        let programs = await Program.find({}).exec();

        console.log(`Fetched ${programs.length} programs`);

        res.render("list", {
            title: "Programs",
            programs: programs
        });
    } catch (err) {
        console.log(err);
        handleError(err, res);
    }
}

function find(req, res) {
    res.render("find", { error: "" });
}

async function show(req, res) {
    try {
        let program = await Program.findOne({ name: req.body.fname }).exec();

        if (program) {
            res.render("list", {
                title: "Program",
                programs: [program]
            });
        } else {
            res.render("find", { error: "Program does not exist "});
        }
    } catch (err) {
        console.log(err);
        handleError(err, res);
    }
}

function add(req, res) {
    res.render("add");
}

async function create(req, res) {
    try {
        let program = new Program({ name: req.body.fname });

        await program.save();

        console.log(`created program ${program.name}`);

        res.render("edit", { programName: program.name });
    } catch (err) {
        console.log(err);
        handleError(err, res);
    }
}

function edit(req, res) {
    res.render("edit", { programName: req.params.name });
}

async function update(req, res) {
    try {
        let programName = req.body.fprogramName;
        let exercise = new Exercise({
            name: req.body.fname,
            description: req.body.fdesc,
            sets: req.body.fsets,
            repsOrTime: req.body.frepsOrTime
        });

        let program = await Program.findOne({ name: programName }).exec();
        program.exercises.push(exercise);
        await program.save();

        console.log(`added exercise ${exercise.name} to ${programName}`);
        res.render("edit", { programName: programName });
    } catch (err) {
        console.log(err);
        handleError(err, res);
    }
}

function handleError(res, err) {
    return res.status(400).send({ message: err });
}

module.exports = {
    list: list,
    find: find,
    show: show,
    add: add,
    create: create,
    edit: edit,
    update: update,
}