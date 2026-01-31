// This is the main application file for the Express server.
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const ejsMate = require('ejs-mate');
const path = require('path');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
// Set EJS as the templating engine
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")));

// Database connectivity
const mongoose = require('mongoose');
const MONGO_URL = "mongodb://127.0.0.1:27017/intern_db";
const Task = require('./model/task.js'); // task schema
// Database connectivity
const main = async()=>{
    await mongoose.connect(MONGO_URL);
}
main().then(() => { console.log('Connected to MongoDB');}).catch((err) => console.log(err));

// let tasks=[
//     {id:1, title:"Task One", description:"This is task one",status:"incomplete"},
//     {id:2, title:"Task Two", description:"This is task two",status:"complete"},
//     {id:3, title:"Task Three", description:"This is task three",status:"incomplete"},
// ];

//Routes
app.get('/', (req, res) => {
  res.send('root is working!');
});
//show all tasks
app.get("/tasks", async (req,res)=>{
    // res.send("Tasks route is working!");
    let tasks = await Task.find({});
    res.render("tasks/index",{tasks});
});
// new task
app.get("/tasks/new",(req,res)=>{
    res.render("tasks/new");
})
// create new task
app.post("/tasks",async (req,res)=>{
    let task = req.body;
    console.log("task = ",task);
    let taskCreated = new Task(task);
    await taskCreated.save();
    res.redirect("/tasks");
});
// Edit task form
app.get("/tasks/:id/edit", async (req,res)=>{
    let id = req.params.id;
    console.log("id = " ,id);
    let task_to_be_edited = await Task.findById(id);
    console.log("task_to_be_edited =",task_to_be_edited);
    res.render("tasks/edit",{task:task_to_be_edited});
});
app.put("/tasks/:id", async (req,res)=>{
    let id = req.params.id;
    const {title, description, status} = req.body;
    let updatedTask = await Task.findByIdAndUpdate(id, {id,title, description, status});
    res.redirect("/tasks");
});
    









app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = app;
