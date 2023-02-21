const Task = require('../models/task')


const getAllTasks = async (req,res) =>{
    try 
    {
        const tasks = await Task.find()
        res.json({tasks})
    } 
    catch (error) 
    {
        res.status(500).json({msg: error})
    }
}

const createTask = async (req,res) =>{

    try 
    {
        const task = await Task.create(req.body)
        res.json({
        task
         })
    }

    catch (error) 
    {
        res.status(500).json({msg: error}) 
    }
}
const getTask = async (req,res) =>{
    try 
    {
        const {id:taskID } = req.params;
        const task = await Task.findOne({_id:taskID});
        if(!task)
        {
            res.status(404).json({'msg': `No task with id ${taskID}`})
        }   
        res.status(200).json({task}) 
    } 
    catch (error) 
    {
        res.status(500).json({msg: error})  
    }
}

const deleteTask = async (req,res) =>{
    const {id:taskID} = req.params
    const task = await Task.findOneAndDelete({_id:taskID})
    if(!task){
        res.status(404).json({'msg': `No task with id ${taskID}`})
    }
    res.status(200).json({task})
}


const updateTask = async (req,res) =>{
    const {id:taskID} = req.params
    const task = await Task.findOneAndUpdate({_id:taskID},req.body, {
        new: true,
        runValidators: true
    })
    if(!task){
        res.status(404).json({'msg': `No task with id ${taskID}`})
    }
    res.status(200).json({task})
}

module.exports = {
    getAllTasks,
    createTask,
    deleteTask,
    getTask,
    updateTask
}