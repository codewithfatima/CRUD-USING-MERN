const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    taskName :{
        type : String ,
        required : true 
    },
    isDone : {
        type : Boolean,
        required : true
    }
});

const TaskModel = mongoose.model('Task', TaskSchema);
module.exports = TaskModel;