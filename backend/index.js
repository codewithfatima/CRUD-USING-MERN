const express = require('express');
require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080; 
const TaskRouter = require('./Routes/TaskRouter');
const bodyParser = require('body-parser');
const TaskModel = require('./Models/TaskModel')
const cors = require('cors')


const app = express();


//middleware
app.use(cors())
app.use(bodyParser.json());

//routes
app.use('/tasks', TaskRouter);


app.get('/', (req , res)=>{
    res.send('hello from backend')
})


app.listen(PORT , ()=>{
    console.log(`Server is running on : ${PORT}`);
})


