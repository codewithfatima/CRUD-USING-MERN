const TaskModel = require("../Models/TaskModel");
const { param } = require("../Routes/TaskRouter");

// Function to create a task
const createTask = async (req, res) => {
    const data = req.body;
    console.log('Received data:', data);
    try {
        const model = new TaskModel(data);
        await model.save();
        res.status(201).json({ message: 'Task is created', success: true });
    } catch (err) {
        console.error('Error creating task:', err);
        res.status(500).json({ message: 'Failed to create Task', success: false });
    }
};

// Function to fetch all tasks
const fetchAllTasks = async (req, res) => {
    try {
        const data = await TaskModel.find({});
     
        res.status(200).json({ message: 'All tasks fetched successfully', success: true, data });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ message: 'Failed to fetch tasks', success: false });
    }
};

// Function to update all tasks
const updateTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const obj = { $set: { ...body } };
        await TaskModel.findByIdAndUpdate(id, obj);
        
        res.status(200).json({ message: 'Task Updated successfully', success: true });
    } catch (err) {
        console.error(err); 
        res.status(500).json({ message: 'Failed to updated tasks', success: false });
    }
};


// Function to fetch all tasks
const deleteTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedTask = await TaskModel.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found', success: false });
        }

        res.status(200).json({ message: 'Task deleted', success: true, data: deletedTask });
    } catch (err) {
        console.error(err); 
        res.status(500).json({ message: 'Failed to delete task', success: false });
    }
};


module.exports = {
    createTask,
    fetchAllTasks,
    updateTaskById,
    deleteTaskById
};
