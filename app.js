require('dotenv').config()
const express = require("express")
const app = express()
const tasks = require('./routes/tasks')
const connectdb = require('./db/connect')
//middleware
app.use(express.static('./public'))
app.use(express.json())


//routes
app.get("/hello", (req,res) => {
    res.send("hello world")
})

app.use('/api/v1/tasks',tasks)

const start = async () => {
    try{
        await connectdb(process.env.MONGO_URL)
        app.listen(3000, () => console.log("server listening on 3000..."))
    }
    catch(error){
        console.log(error)
    }
}

start()
