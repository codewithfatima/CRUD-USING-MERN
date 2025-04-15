import React, { useEffect, useState } from 'react';
import { FaEdit, FaSearch, FaCheck, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CreateTask, DeleteTaskById, GetAllTasks, UpdateTaskById } from '../api';
import './todo.css';

const Todolist = () => {
    const [input, setInput] = useState('');
    const [tasks, setTask] = useState([]);
    const [copyTasks, setCopyTask] = useState([]);
    const [updateTask, setUpdateTask] = useState(null);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        const results = copyTasks.filter((item) =>
            item.taskName.toLowerCase().includes(term)
        );
        setTask(results);
    };

    const handleAddTask = async () => {
        if (!input.trim()) return;

        try {
            if (updateTask) {
                await UpdateTaskById(updateTask._id, {
                    taskName: input,
                    isDone: updateTask.isDone,
                });
                toast.success('Task updated successfully');
                setUpdateTask(null);
            } else {
                const newTask = { taskName: input, isDone: false };
                const { success, message } = await CreateTask(newTask);
                if (success) {
                    toast.success(message);
                } else {
                    toast.error(message);
                }
            }
            setInput('');
            fetchAllTasks();
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        }
    };

    const fetchAllTasks = async () => {
        try {
            const { data } = await GetAllTasks(); // Removed the invalid body from GET request
            setTask(data);
            setCopyTask(data);
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch tasks');
        }
    };

    useEffect(() => {
        fetchAllTasks();
    }, []);

    useEffect(() => {
        if (updateTask) {
            setInput(updateTask.taskName);
        }
    }, [updateTask]);

    const handleDelete = async (id) => {
        try {
            const { success, message } = await DeleteTaskById(id);
            if (success) {
                toast.success(message);
                fetchAllTasks();
            } else {
                toast.error(message);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete task');
        }
    };

    const handleCheckAndUnChecked = async (id) => {
        const taskToUpdate = tasks.find(task => task._id === id);
        if (!taskToUpdate) return;

        try {
            const updatedTask = {
                ...taskToUpdate,
                isDone: !taskToUpdate.isDone,
            };
            await UpdateTaskById(id, updatedTask);
            fetchAllTasks();
        } catch (error) {
            console.error(error);
            toast.error('Failed to update task status');
        }
    };

    return (
        <div>
            <div className="head">
                <h1>To-Do List</h1>
                <div className="container">
                    <div className="input-group">
                        <input
                            type="text"
                            id="taskInput"
                            placeholder="Enter task"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button type="submit" onClick={handleAddTask}>
                            {updateTask ? 'Update' : 'Save'}
                        </button>
                    </div>

                    <div className="search-container">
                        <input
                            type="search"
                            id="searchInput"
                            placeholder="Search tasks"
                            onChange={handleSearch}
                            className="input-search"
                        />
                        <FaSearch className="search-icon" />
                    </div>
                </div>
            </div>

            <div className="list-container">
                <div className="list-content">
                    {Array.isArray(tasks) && tasks.length > 0 ? (
                        tasks.map((item) => (
                            <div className="li" key={item._id}>
                                <li className={`task-item ${item.isDone ? 'completed' : ''}`}>
                                    {item.taskName}
                                </li>
                                <div className="icon-container">
                                    <button onClick={() => handleCheckAndUnChecked(item._id)} className="icon-check"><FaCheck /></button>
                                    <button onClick={() => setUpdateTask(item)}><FaEdit /></button>
                                    <button onClick={() => handleDelete(item._id)} className="icon-delete"><FaTrash /></button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No tasks found.</p>
                    )}
                </div>
            </div>

            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        </div>
    );
};

export default Todolist;
