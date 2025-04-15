const express = require('express');
const { createTask  , fetchAllTasks , updateTaskById , deleteTaskById } = require('../Controllers/TaskController');
const router = express.Router(); 

// Route to get all tasks
// router.get('/', (req, res) => {
//   res.send('All tasks');
// });

router.post('/' , createTask);
router.get('/' , fetchAllTasks);
router.put('/:id' , updateTaskById);
router.delete('/:id' , deleteTaskById)
// router.delete('/tasks/:id', deleteTaskById);


module.exports = router;
