const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

//create a new task
router.post('/', async (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        dueDate: req.body.dueDate
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

//retrieve tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find().sort({createdAt: -1});
        res.json(tasks);
    } catch (error) {
        res.status(500).json({message: error.message});
    }

});

//Update by ID
router.put('/:id', async(req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if(!task) return res.status(404).json({message: "Task could not be found"});

        const updateTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        res.json(updateTask);
    } catch (error) {
        res.status(401).json({message: error.message});
    }
});

//delete task by id
router.delete('/:id', async(req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if(!task) return res.status(404).json({message: "Task could not be found"});

        await Task.findByIdAndDelete(req.params.id);
        res.json({message: "Task deleted successfuly"});
    } catch (error) {
        res.status(401).json({message: error.message});
    }
})

module.exports = router;