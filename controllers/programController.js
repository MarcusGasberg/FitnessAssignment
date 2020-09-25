const mongoose = require("mongoose"),
    exercise = require("../models/exercise"),
    Program = require("../models/program"),
    Exercise = exercise.Exercise;

function create(req, res) {
    res.render("program/create", { title: "Program" });
}

async function add(req, res) {
    try {
        let program = new Program({ name: req.body.fname });

        await program.save();

        console.log(`created program ${program.name}`);

        res.render("program/update", {
            title: "Exercises",
            programName: program.name
        });
    } catch (err) {
        console.log(err);
    }
}

async function update(req, res) {
    try {
        let programName = req.body.fname;
        let exercise = new Exercise({
            name: req.body.fexName,
            description: req.body.fexDesc,
            sets: req.body.fexSets,
            repetitions: req.body.fexReps
        });

        let program = await Program.findOne({ name: programName }).exec();
        program.exercises.push(exercise);
        await program.save();

        console.log(`added exercise ${exercise.name} to ${programName}`);
        res.render("program/update", {
            title: "Exercises",
            programName: programName
        });
    } catch (err) {
        console.log(err);
    }
}

async function list(req, res) {
    try {
        let programs = await Program.find({}).exec();

        console.log(`Fetched ${programs.length} programs`);

        res.render("program/list", {
            title: 'All programs',
            programs: programs
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    create: create,
    add: add,
    update: update,
    list: list
}

