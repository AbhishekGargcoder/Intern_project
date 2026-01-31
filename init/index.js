const mongoose = require('mongoose');
const MONGO_URL = "mongodb://127.0.0.1:27017/intern_db";
const Task = require('../model/task.js'); // task schema
let data = require('../init/data');
// Database connectivity
const main = async()=>{
    await mongoose.connect(MONGO_URL);
}
main().then(() => { console.log('Connected to MongoDB');}).catch((err) => console.log(err));

const initDB = async()=>{
    await Task.deleteMany({});
    // data  = data.map((obj)=>({...obj,owner :"671b2e07d13ba985fb3dc432"}));
    await Task.insertMany(data);
};
initDB().then(() => { console.log('Data inserted');}).catch((err) => console.log(err));